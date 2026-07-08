import React from "react";
import { IntroAnimation } from "@/components/ui/scroll-morph-hero";
import { About } from "@/components/About";
import { Brands } from "@/components/Brands";
import { Services } from "@/components/Services";
import { StickyScrollGallery } from "@/components/ui/sticky-scroll";
import { ReelsSection } from "@/components/ReelsSection";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-clip">
      <section className="w-full relative">
        <IntroAnimation />
      </section>
      <About />
      <Brands />
      <Services />
      <StickyScrollGallery />
      <ReelsSection />
      <Contact />
    </div>
  );
}
