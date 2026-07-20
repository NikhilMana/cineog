"use client"

import React, { useMemo } from "react"
import { CardCarousel } from "@/components/ui/card-carousel"

interface ReelItem {
  src: string;
  type?: "video" | "image";
}

export const ReelsSection = ({ reels: propReels }: { reels?: ReelItem[] }) => {
  const reels = useMemo(
    () => propReels || [
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
      { src: "/reels/Videos/Zarna_s Customised Art and Accessories.mp4", type: "video" as const },
    ],
    [propReels]
  );

  return (
    <CardCarousel
      items={reels}
      autoplayDelay={2500}
      showPagination={true}
      showNavigation={true}
      title="Cinematic Reels"
      description="Short-form, engaging cinematic videos perfectly paced and optimized for maximum impact."
    />
  )
}
