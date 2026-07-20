import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { put } from "@vercel/blob";
import { kv } from "@vercel/kv";

const COOKIE_NAME = "cineog_session";
const SESSION_VALUE = "cineog_admin_session_active";

export async function POST(req: NextRequest) {
  try {
    const session = req.cookies.get(COOKIE_NAME)?.value;
    if (session !== SESSION_VALUE) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const section = formData.get("section") as string;
    const indexStr = formData.get("index") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!section || !["hero", "about", "gallery", "reels"].includes(section)) {
      return NextResponse.json({ error: "Invalid section" }, { status: 400 });
    }

    let publicPath = "";

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const ext = path.extname(file.name) || (file.type.startsWith("video/") ? ".mp4" : ".jpg");
      const blobName = `${section}-${indexStr || "main"}-${Date.now()}${ext}`;
      const blob = await put(blobName, file, {
        access: "public",
      });
      publicPath = blob.url;
    } else {
      const buffer = Buffer.from(await file.arrayBuffer());
      
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const ext = path.extname(file.name) || (file.type.startsWith("video/") ? ".mp4" : ".jpg");
      const uniqueFileName = `${section}-${indexStr || "main"}-${Date.now()}${ext}`;
      const filePath = path.join(uploadDir, uniqueFileName);
      
      fs.writeFileSync(filePath, buffer);
      publicPath = `/uploads/${uniqueFileName}`;
    }

    let config: any = null;

    if (process.env.KV_REST_API_URL) {
      try {
        config = await kv.get("media_config");
      } catch (err) {
        console.error("Error reading config from Vercel KV:", err);
      }
    }

    if (!config) {
      const configPath = path.join(process.cwd(), "src", "lib", "config.json");
      if (fs.existsSync(configPath)) {
        try {
          const configData = fs.readFileSync(configPath, "utf8");
          config = JSON.parse(configData);
        } catch (err) {
          console.error("Error parsing config file, using fallback template", err);
        }
      }
    }

    if (!config) {
      config = { hero: [], about: "", gallery: [], reels: [] };
    }

    if (section === "about") {
      config.about = publicPath;
    } else if (section === "hero") {
      const idx = parseInt(indexStr, 10);
      if (!isNaN(idx)) {
        config.hero[idx] = publicPath;
      }
    } else if (section === "gallery") {
      const idx = parseInt(indexStr, 10);
      if (!isNaN(idx)) {
        config.gallery[idx] = publicPath;
      }
    } else if (section === "reels") {
      const idx = parseInt(indexStr, 10);
      if (!isNaN(idx)) {
        config.reels[idx] = {
          src: publicPath,
          type: file.type.startsWith("video/") ? "video" : "image"
        };
      }
    }

    if (process.env.KV_REST_API_URL) {
      await kv.set("media_config", config);
    } else {
      const configPath = path.join(process.cwd(), "src", "lib", "config.json");
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
    }

    return NextResponse.json({ success: true, path: publicPath }, { status: 200 });
  } catch (error: any) {
    console.error("Upload handler error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
