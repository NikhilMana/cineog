"use client";
import React, { forwardRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const Component = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  (props, ref) => {
    const images = [
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

    const [activeImage, setActiveImage] = useState<string | null>(null);

    return (
      <section className="bg-background w-full relative" ref={ref} id="gallery">
        <div className="wrapper relative">
          <section className="text-foreground h-[50vh] md:h-[80vh] w-full bg-background grid place-content-center ">
            <h2 className="text-4xl md:text-6xl px-8 font-bold text-center tracking-tighter z-10 text-foreground">
              Timeless Gallery <br />
              <span className="text-muted-foreground font-medium text-lg tracking-widest uppercase mt-4 block">
                Scroll to view
              </span>
            </h2>
          </section>
        </div>
        <section className="text-foreground w-full bg-background py-12 container mx-auto px-6 relative">
          <div className="grid grid-cols-12 gap-2 md:gap-4 relative items-start">
            <div className="grid gap-2 md:gap-4 col-span-4">
              {images.slice(0, 7).map((img, i) => (
                <figure
                  key={i}
                  className="w-full relative h-[300px] md:h-96 rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => setActiveImage(img)}
                >
                  <Image
                    src={img}
                    alt={`Gallery Image ${i}`}
                    fill
                    className="transition-transform duration-500 w-full h-full align-bottom object-cover group-hover:scale-105"
                    sizes="(max-width: 768px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </figure>
              ))}
            </div>
            <div className="sticky top-24 h-[80vh] w-full col-span-4 gap-2 md:gap-4 grid grid-rows-3">
              {images.slice(7, 10).map((img, i) => (
                <figure
                  key={i}
                  className="w-full h-full relative rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => setActiveImage(img)}
                >
                  <Image
                    src={img}
                    alt={`Gallery Anchor ${i}`}
                    fill
                    className="transition-transform duration-500 h-full w-full align-bottom object-cover group-hover:scale-105"
                    sizes="(max-width: 768px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </figure>
              ))}
            </div>
            <div className="grid gap-2 md:gap-4 col-span-4">
              {images.slice(10, 17).map((img, i) => (
                <figure
                  key={i}
                  className="w-full relative h-[300px] md:h-96 rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => setActiveImage(img)}
                >
                  <Image
                    src={img}
                    alt={`Gallery Image ${i + 10}`}
                    fill
                    className="transition-transform duration-500 w-full h-full align-bottom object-cover group-hover:scale-105"
                    sizes="(max-width: 768px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
              onClick={() => setActiveImage(null)}
            >
              <button
                className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage(null);
                }}
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative w-full h-full max-h-[85vh] max-w-[90vw] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={activeImage}
                  alt="Fullscreen View"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={100}
                  priority
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    );
  },
);
Component.displayName = "StickyScrollGallery";
export { Component as StickyScrollGallery };
