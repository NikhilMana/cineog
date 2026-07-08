import React from "react"

import { CardCarousel } from "@/components/ui/card-carousel"

const CardCarouselDemo = () => {
  const images = [
    { src: "https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=500&h=888&auto=format&fit=crop", alt: "Cinematic portrait 1" },
    { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=500&h=888&auto=format&fit=crop", alt: "Cinematic portrait 2" },
    { src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=500&h=888&auto=format&fit=crop", alt: "Cinematic portrait 3" },
    { src: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=500&h=888&auto=format&fit=crop", alt: "Cinematic portrait 4" },
    { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&h=888&auto=format&fit=crop", alt: "Cinematic portrait 5" },
  ]

  return (
    <div className="w-full">
      <CardCarousel
        items={images.map(img => ({ ...img, type: "image" }))}
        autoplayDelay={2000}
        showPagination={true}
        showNavigation={true}
      />
    </div>
  )
}

export default CardCarouselDemo;
