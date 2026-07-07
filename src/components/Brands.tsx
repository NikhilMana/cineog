"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const BRAND_LOGOS = [
  "/brands/LOGOS-01.png",
  "/brands/LOGOS-02.png",
  "/brands/LOGOS-03.png",
  "/brands/LOGOS-04.png",
  "/brands/LOGOS-05.png",
  "/brands/LOGOS-06.png",
  "/brands/LOGOS-07.png",
  "/brands/LOGOS-08.png",
  "/brands/LOGOS-09.png",
  "/brands/LOGOS-10.png",
  "/brands/LOGOS-11.png",
  "/brands/LOGOS-12.png",
  "/brands/LOGOS-13.png",
  "/brands/LOGOS-14.png",
  "/brands/LOGOS-15.png",
];

export function Brands() {
  return (
    <section className="w-full bg-background py-20 overflow-hidden">
      <div className="container mx-auto px-6 mb-10 text-center">
        <h3 className="text-xl md:text-2xl font-bold tracking-widest text-[#D61F3B] uppercase">
          Trusted By
        </h3>
      </div>
      <div className="relative w-full flex items-center">
        <motion.div
          animate={{ x: [0, -100 * BRAND_LOGOS.length] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
          className="flex whitespace-nowrap"
        >
          {[...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS].map((logo, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 mx-10 md:mx-20 w-48 md:w-72 h-24 md:h-36 relative"
            >
              <Image
                src={logo}
                alt={`Brand ${idx}`}
                fill
                className="object-contain"
                sizes="300px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
