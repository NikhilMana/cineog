import React from "react";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";

const InstagramIcon = ({ size }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-secondary py-16 md:py-24">

      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-12">

        {/* Brand */}
        <div className="md:w-1/3">

          <Link
            href="/"
            className="text-3xl font-bold tracking-tighter text-foreground inline-block mb-6"
          >

            CineOg.
          </Link>
          <p className="text-muted-foreground text-sm max-w-sm">

            A premium photography and cinematography agency delivering cinematic
            experiences for forward-thinking brands.
          </p>
        </div>
        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:w-2/3">

          <div className="flex flex-col gap-4">

            <h4 className="text-foreground font-medium mb-2">Company</h4>
            <Link
              href="#about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="#services"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <Link
              href="#process"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Process
            </Link>
          </div>
          <div className="flex flex-col gap-4">

            <h4 className="text-foreground font-medium mb-2">Work</h4>
            <Link
              href="#projects"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Featured Projects
            </Link>
            <Link
              href="#gallery"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="#reels"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Reels
            </Link>
          </div>
          <div className="flex flex-col gap-4">

            <h4 className="text-foreground font-medium mb-2">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/cineog_?igsh=MXR6MG5iNzhlcTVqcA=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="mailto:cineog12@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail size={20} />
              </a>
              <a
                href="tel:+918779776586"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone size={20} />
              </a>
            </div>
            <a
              href="mailto:cineog12@gmail.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
            >
              cineog12@gmail.com
            </a>
            <a
              href="tel:+918779776586"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              +91 87797 76586
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 md:px-12 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">

        <p>
          &copy; {new Date().getFullYear()} CineOg. All rights reserved.
        </p>
        <div className="flex gap-6">

          <Link
            href="#"
            className="hover:text-muted-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="hover:text-muted-foreground transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
