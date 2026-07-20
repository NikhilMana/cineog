import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";
import { DashboardClient } from "@/components/DashboardClient";

export const dynamic = "force-dynamic";

const COOKIE_NAME = "cineog_session";
const SESSION_VALUE = "cineog_admin_session_active";

const DEFAULT_HERO = [
  "/hero/1960d98d-4ee6-40cf-a4ce-b4738982892e.png",
  "/hero/C7200T01.JPG",
  "/hero/C7242T01.JPG",
  "/hero/DSC00140.JPG",
  "/hero/DSC02065.JPG",
  "/hero/DSC05348.JPG",
  "/hero/DSC07020.JPG",
  "/hero/DSC07059.JPG",
  "/hero/DSC07080.JPG",
  "/hero/DSC07094.JPG",
  "/hero/DSC07755.JPG",
  "/hero/DSC07767.JPG",
  "/hero/DSC08556.JPG",
  "/hero/DSC09549.JPG",
  "/hero/DSC09570.JPG",
  "/hero/DSC09573.JPG",
  "/hero/DSC09736.JPG",
  "/hero/Image-537.jpg",
  "/hero/bto1.png",
  "/hero/udssf.png"
];
const DEFAULT_ABOUT = "/hero/DSC08556.JPG";
const DEFAULT_GALLERY = [
  "/gallery/DSC00080.JPG",
  "/gallery/DSC07018.JPG",
  "/gallery/DSC00109.JPG",
  "/gallery/DSC02408.JPG",
  "/gallery/DSC00105.JPG",
  "/gallery/DSC07053.JPG",
  "/gallery/DSC07085.JPG",
  "/gallery/DSC07633.JPG",
  "/gallery/DSC07751.JPG",
  "/gallery/Changed.png",
  "/gallery/DSC07080.JPG",
  "/gallery/DSC09849.JPG",
  "/gallery/2nd 43.png",
  "/gallery/DSC07778.JPG",
  "/gallery/DSC09605.png",
  "/gallery/Image-341.jpg",
  "/gallery/imagesd.png"
];
const DEFAULT_REELS = [
  { src: "/reels/Videos/Escobar imp.mp4", type: "video" as const },
  { src: "/reels/Videos/Kashmir Organic Nuts.mp4", type: "video" as const },
  { src: "/reels/Videos/Bandioke Nights At BanngBar.mp4", type: "video" as const },
  { src: "/reels/Videos/Escobar.mp4", type: "video" as const },
  { src: "/reels/Videos/Escobar2.mp4", type: "video" as const },
  { src: "/reels/Videos/Indian Accent 2.mp4", type: "video" as const },
  { src: "/reels/Videos/Indian Accent.mp4", type: "video" as const },
  { src: "/reels/Videos/Koishii.mp4", type: "video" as const },
  { src: "/reels/Videos/Koliwada Cocktail Club.mp4", type: "video" as const },
  { src: "/reels/Videos/VANAHA GIN.mp4", type: "video" as const },
  { src: "/reels/Videos/Video-637.mp4", type: "video" as const },
  { src: "/reels/Videos/The Cointreau Margarita Challenge 2026.mp4", type: "video" as const },
  { src: "/reels/Videos/Zarna_s Customised Art and Accessories.mp4", type: "video" as const }
];

import { kv } from "@vercel/kv";

async function getConfig() {
  if (process.env.KV_REST_API_URL) {
    try {
      const parsed = await kv.get<any>("media_config");
      if (parsed) {
        return {
          hero: parsed.hero || DEFAULT_HERO,
          about: parsed.about || DEFAULT_ABOUT,
          gallery: parsed.gallery || DEFAULT_GALLERY,
          reels: parsed.reels || DEFAULT_REELS,
        };
      }
    } catch (error) {
      console.error("Error reading config from Vercel KV:", error);
    }
  }

  const configPath = path.join(process.cwd(), "src", "lib", "config.json");
  let config = { hero: DEFAULT_HERO, about: DEFAULT_ABOUT, gallery: DEFAULT_GALLERY, reels: DEFAULT_REELS };
  
  if (fs.existsSync(configPath)) {
    try {
      const data = fs.readFileSync(configPath, "utf8");
      const parsed = JSON.parse(data);
      
      return {
        hero: parsed.hero || DEFAULT_HERO,
        about: parsed.about || DEFAULT_ABOUT,
        gallery: parsed.gallery || DEFAULT_GALLERY,
        reels: parsed.reels || DEFAULT_REELS,
      };
    } catch (e) {
      console.error("Error reading config, using system defaults:", e);
    }
  }
  return config;
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;

  if (session !== SESSION_VALUE) {
    redirect("/dashboard/login");
  }

  const currentConfig = await getConfig();

  return (
    <DashboardClient initialConfig={currentConfig} />
  );
}
