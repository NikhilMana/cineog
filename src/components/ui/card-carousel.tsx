"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { SparklesIcon, Play, X } from "lucide-react"
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"

import { Badge } from "@/components/ui/badge"

export interface CarouselItem {
  src: string;
  alt?: string;
  type?: "image" | "video";
}

interface CarouselProps {
  items: CarouselItem[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
  title?: string;
  description?: string;
}

export const CardCarousel: React.FC<CarouselProps> = ({
  items,
  autoplayDelay = 2500,
  showPagination = true,
  showNavigation = true,
  title = "Cinematic Reels",
  description = "Short-form, engaging cinematic videos perfectly paced and optimized for maximum impact.",
}) => {
  const [activeVideoSrc, setActiveVideoSrc] = React.useState<string | null>(null);

  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 280px;
  }

  @media (min-width: 768px) {
    .swiper-slide {
      width: 320px;
    }
  }
  
  .swiper-slide img, .swiper-slide video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `
  
  // For small arrays, duplicate items to ensure swiper loop works correctly
  const displayItems = items.length < 5 ? [...items, ...items, ...items] : items;

  return (
    <section id="reels" className="w-full relative bg-background py-10 md:py-20 overflow-hidden">
      <style>{css}</style>
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
        <div className="mx-auto w-full rounded-[24px] p-2 md:rounded-t-[44px]">
          <div className="relative mx-auto flex w-full flex-col rounded-[24px] bg-secondary/20 p-2 md:items-start md:gap-8 md:rounded-b-[20px] md:rounded-t-[40px] md:p-2">
            <div className="flex flex-col justify-center pb-2 pl-4 pt-10 md:pt-16 md:items-center w-full text-center">
              <div className="flex gap-2 w-full justify-center">
                <div className="max-w-2xl">
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {description}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex w-full items-center justify-center gap-4 mt-4 md:mt-8">
              <div className="w-full">
                <Swiper
                  spaceBetween={40}
                  autoplay={{
                    delay: autoplayDelay,
                    disableOnInteraction: false,
                  }}
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
                  loop={true}
                  slidesPerView={"auto"}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                  }}
                  pagination={showPagination}
                  navigation={
                    showNavigation
                      ? {
                          nextEl: ".swiper-button-next",
                          prevEl: ".swiper-button-prev",
                        }
                      : undefined
                  }
                  modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
                >
                  {displayItems.map((item, index) => {
                    const isVideo = item.type === "video" || item.src.endsWith(".mp4");
                    return (
                      <SwiperSlide key={index}>
                        <div 
                          onClick={() => isVideo && setActiveVideoSrc(item.src)}
                          className="size-full rounded-2xl md:rounded-[2rem] overflow-hidden aspect-[9/16] relative group shadow-xl cursor-pointer"
                        >
                          {isVideo ? (
                            <video
                              src={item.src}
                              className="size-full object-cover"
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          ) : (
                            <Image
                              src={item.src}
                              fill
                              sizes="(max-width: 768px) 280px, 320px"
                              className="size-full object-cover"
                              alt={item.alt || "Carousel media"}
                            />
                          )}
                          {isVideo && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                              <div className="w-14 h-14 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                                <Play className="w-6 h-6 ml-0.5" fill="white" />
                              </div>
                            </div>
                          )}
                        </div>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideoSrc && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setActiveVideoSrc(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-[110] p-2 bg-black/50 rounded-full"
            onClick={() => setActiveVideoSrc(null)}
            aria-label="Close video"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div 
            className="relative w-full max-w-[420px] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={activeVideoSrc}
              autoPlay
              controls
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </section>
  )
}
