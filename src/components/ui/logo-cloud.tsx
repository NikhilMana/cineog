import React from "react";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-2 md:grid-cols-5 border",
        className
      )}
      {...props}
    >

      {logos.map((logo, index) => {
        // Desktop calculation (5 columns)
        const isLastInRowDesktop = (index + 1) % 5 === 0;
        const isLastRowDesktop = index >= 10;
        const hasCrosshairDesktop = !isLastInRowDesktop && !isLastRowDesktop;

        // Mobile calculation (2 columns)
        const isLastInRowMobile = (index + 1) % 2 === 0;
        const isLastRowMobile = index >= 14;
        const hasCrosshairMobile = !isLastInRowMobile && !isLastRowMobile;

        // Checkerboard Pattern
        const isGrayDesktop = index % 2 !== 0;
        const isGrayMobile = (Math.floor(index / 2) + (index % 2)) % 2 !== 0;

        const bgMobile = isGrayMobile ? "bg-zinc-50" : "bg-white";
        const bgDesktop = isGrayDesktop ? "md:bg-zinc-50" : "md:bg-white";

        return (
          <LogoCard
            key={index}
            logo={logo}
            className={cn(
              "relative border-r border-b",
              bgMobile,
              bgDesktop,
              // On desktop, the last item in a row doesn't need a right border
              isLastInRowDesktop ? "md:border-r-0" : "md:border-r",
              // On desktop, the last row doesn't need a bottom border
              isLastRowDesktop ? "md:border-b-0" : "md:border-b",
              // Mobile styles
              isLastInRowMobile ? "border-r-0" : "border-r",
              isLastRowMobile ? "border-b-0" : "border-b"
            )}
          >
            {hasCrosshairDesktop && (
              <PlusIcon
                className="absolute -right-[12px] -bottom-[12px] z-10 size-6 text-muted-foreground/30 hidden md:block"
                strokeWidth={1}
              />
            )}
            {hasCrosshairMobile && (
              <PlusIcon
                className="absolute -right-[12px] -bottom-[12px] z-10 size-6 text-muted-foreground/30 md:hidden"
                strokeWidth={1}
              />
            )}
          </LogoCard>
        );
      })}
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo;
};

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center p-4 md:p-6 hover:opacity-80 transition-opacity duration-300",
        className
      )}
      {...props}
    >
      <div className="relative w-full h-16 md:h-28 flex items-center justify-center">
        <Image
          alt={logo.alt}
          className="pointer-events-none object-contain select-none"
          src={logo.src}
          fill
          sizes="(max-width: 768px) 150px, 200px"
        />
      </div>
      {children}
    </div>
  );
}
