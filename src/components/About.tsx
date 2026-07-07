"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityTransform = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
  );
  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full bg-background py-24 md:py-32 overflow-hidden"
    >

      <div className="container mx-auto px-6 md:px-12">

        <motion.div
          style={{ y: yTransform, opacity: opacityTransform }}
          className="flex flex-col md:flex-row items-center gap-16 md:gap-24"
        >

          {/* Image */}
          <div className="w-full md:w-1/2 relative h-[500px] md:h-[700px] rounded-2xl overflow-hidden">

            <Image
              src="/hero/DSC08556.JPG"
              alt="About CineOg"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-foreground/20" />
          </div>
          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">

            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-foreground mb-8">

              We capture moments that transcend time.
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed mb-12">

              Based at the intersection of art and commerce, CineOg is a premier
              photography and cinematography agency dedicated to telling the
              visual stories of forward-thinking brands. Our vision is to
              elevate the ordinary into the cinematic, turning everyday moments
              into powerful narratives.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
