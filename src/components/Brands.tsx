import React from "react";
import { LogoCloud } from "@/components/ui/logo-cloud";

const BRAND_LOGOS = [
  { src: "/brands/LOGOS-01.png", alt: "Brand 1" },
  { src: "/brands/LOGOS-02.png", alt: "Brand 2" },
  { src: "/brands/LOGOS-03.png", alt: "Brand 3" },
  { src: "/brands/LOGOS-04.png", alt: "Brand 4" },
  { src: "/brands/LOGOS-05.png", alt: "Brand 5" },
  { src: "/brands/LOGOS-06.png", alt: "Brand 6" },
  { src: "/brands/LOGOS-07.png", alt: "Brand 7" },
  { src: "/brands/LOGOS-08.png", alt: "Brand 8" },
  { src: "/brands/ESCOBAR.png", alt: "Escobar" },
  { src: "/brands/LOGOS-10.png", alt: "Brand 10" },
  { src: "/brands/LOGOS-11.png", alt: "Brand 11" },
  { src: "/brands/LOGOS-12.png", alt: "Brand 12" },
  { src: "/brands/LOGOS-13.png", alt: "Brand 13" },
  { src: "/brands/LOGOS-14.png", alt: "Brand 14" },
  { src: "/brands/LOGOS-15.png", alt: "Brand 15" },
];

export function Brands() {
  return (
    <section className="w-full bg-background py-10 md:py-20 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-10 md:mb-16 text-center max-w-4xl">
        <h3 className="text-sm md:text-base font-bold tracking-[0.2em] text-[#D61F3B] uppercase mb-4">
          Trusted By
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-6">
          Companies we <span className="text-[#D61F3B]">collaborate</span> with.
        </h2>
        <p className="text-muted-foreground text-lg">
          We are proud to work alongside some of the world's most innovative brands to craft exceptional cinematic experiences.
        </p>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <LogoCloud logos={BRAND_LOGOS} />
      </div>
    </section>
  );
}
