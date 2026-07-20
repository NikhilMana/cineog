import React from "react";
import fs from "fs";
import path from "path";
import { IntroAnimation } from "@/components/ui/scroll-morph-hero";
import { About } from "@/components/About";
import { Brands } from "@/components/Brands";
import { Services } from "@/components/Services";
import { StickyScrollGallery } from "@/components/ui/sticky-scroll";
import { ReelsSection } from "@/components/ReelsSection";
import { Contact } from "@/components/Contact";

import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic";

interface MediaConfig {
  hero?: string[];
  about?: string;
  gallery?: string[];
  reels?: { src: string; type?: "video" | "image" }[];
}

async function getMediaConfig(): Promise<MediaConfig | null> {
  if (process.env.KV_REST_API_URL) {
    try {
      const data = await kv.get<MediaConfig>("media_config");
      if (data) return data;
    } catch (error) {
      console.error("Error reading media config from Vercel KV:", error);
    }
  }

  const filePath = path.join(process.cwd(), "src/lib/config.json");
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading media config from local file:", error);
  }
  return null;
}

export default async function Home() {
  const config = await getMediaConfig();

  return (
    <div className="flex flex-col w-full overflow-clip">
      <section className="w-full relative">
        <IntroAnimation images={config?.hero} />
      </section>
      <About imageSrc={config?.about} />
      <Brands />
      <Services />
      <StickyScrollGallery images={config?.gallery} />
      <ReelsSection reels={config?.reels} />
      <Contact />
    </div>
  );
}

