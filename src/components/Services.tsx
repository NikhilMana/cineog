import React from "react";
import {
  Camera,
  Package,
  Building2,
  UtensilsCrossed,
  Home,
  CalendarDays,
  Film,
  Share2,
  Mic,
} from "lucide-react";

const DroneIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="4" cy="4" r="2" />
    <circle cx="20" cy="4" r="2" />
    <circle cx="4" cy="20" r="2" />
    <circle cx="20" cy="20" r="2" />
    <line x1="6" y1="5.5" x2="10" y2="10" />
    <line x1="18" y1="5.5" x2="14" y2="10" />
    <line x1="6" y1="18.5" x2="10" y2="14" />
    <line x1="18" y1="18.5" x2="14" y2="14" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
  </svg>
);

const services = [
  { icon: <Camera className="w-7 h-7" />, title: "Commercial Photography" },
  { icon: <Package className="w-7 h-7" />, title: "Product Photography" },
  { icon: <Building2 className="w-7 h-7" />, title: "Corporate Shoots" },
  { icon: <UtensilsCrossed className="w-7 h-7" />, title: "Food Photography" },
  { icon: <Home className="w-7 h-7" />, title: "Interior Photography" },
  { icon: <CalendarDays className="w-7 h-7" />, title: "Event Coverage" },
  { icon: <DroneIcon className="w-7 h-7" />, title: "Drone Shoots" },
  { icon: <Film className="w-7 h-7" />, title: "Reels" },
  { icon: <Share2 className="w-7 h-7" />, title: "Social Media Content" },
  { icon: <Mic className="w-7 h-7" />, title: "Podcast Production" },
];

export function Services() {
  return (
    <section id="services" className="w-full bg-background py-10 md:py-20">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">
        <div className="text-center max-w-3xl mb-10 md:mb-16">
          <h3 className="text-sm md:text-base font-bold tracking-[0.2em] text-[#D61F3B] uppercase mb-4">
            Our Expertise
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-6">
            Comprehensive <span className="text-[#D61F3B]">cinematic</span> services.
          </h2>
          <p className="text-muted-foreground text-lg">
            From commercial photography to high-end drone shoots and podcast production, we provide everything needed to elevate your brand.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-12 w-full max-w-6xl">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-4 group">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-foreground group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
