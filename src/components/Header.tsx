"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "Reels", href: "#reels" },
];
export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isDashboard = pathname?.startsWith("/dashboard");
  const logoSrc = isDashboard ? "/Cineog_white_logo-01.png" : "/logo.png";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? "bg-background/90 backdrop-blur-md py-2 border-b border-border/10"
            : "bg-transparent py-3"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50" onClick={() => setMobileMenuOpen(false)}>
            <Image
              src={logoSrc}
              alt="CineOg Logo"
              width={150}
              height={35}
              className="object-contain"
              priority
            />
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-base font-medium transition-colors ${
                  isDashboard
                    ? "text-zinc-400 hover:text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contact"
              className={`text-base font-medium px-8 py-2.5 rounded-full transition-all ${
                isDashboard
                  ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white border border-zinc-700"
                  : "bg-foreground text-background hover:opacity-80"
              }`}
            >
              Book a Shoot
            </Link>
          </nav>
          
          {/* Mobile Nav Toggle */}
          <button
            className={`relative z-50 md:hidden p-2 ${
              isDashboard ? "text-zinc-100" : "text-foreground"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed inset-0 z-40 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden pt-20 ${
              isDashboard ? "bg-zinc-950/95 text-white" : "bg-background/95 text-foreground"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-3xl font-semibold transition-colors ${
                  isDashboard
                    ? "text-zinc-400 hover:text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`mt-8 text-lg font-medium px-8 py-3 rounded-full transition-colors ${
                isDashboard
                  ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white border border-zinc-700"
                  : "bg-foreground text-background hover:opacity-80"
              }`}
            >
              Book a Shoot
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
