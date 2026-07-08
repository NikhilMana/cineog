import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-Variable.woff2", style: "normal" },
    { path: "./fonts/GeneralSans-VariableItalic.woff2", style: "italic" },
  ],
  display: "swap",
  variable: "--font-general-sans",
});

export const metadata: Metadata = {
  title: "CineOg | Premium Photography & Cinematography",
  description: "A premium photography and cinematography agency delivering cinematic experiences for forward-thinking brands.",
  keywords: ["Cinematography", "Photography", "Agency", "Luxury"],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth"><body className={`${generalSans.variable} font-sans antialiased bg-background text-foreground flex flex-col min-h-screen`}><SmoothScroll><Header /><main className="flex-1">{children}</main><Footer /></SmoothScroll></body></html>
  );
}
