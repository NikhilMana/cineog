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
  title: "CineOg | Premium Photography & Cinematography Agency",
  description: "CineOg is a premier boutique photography and cinematography agency based in Mumbai. We craft timeless visual narratives, luxury commercials, brand campaigns, and high-end video productions for forward-thinking brands.",
  keywords: [
    "CineOg",
    "CineOg agency",
    "cinematography agency Mumbai",
    "photography agency Mumbai",
    "luxury brand video production",
    "commercial videographer Mumbai",
    "premium fashion photographer",
    "corporate video agency India",
    "timeless brand campaign design",
    "commercial food and beverage photographer",
    "architectural photography Mumbai",
    "hotel cinematic video production",
    "restaurant advertising photographer",
    "social media video marketing agency",
    "high-end commercial production house"
  ],
  metadataBase: new URL("https://cineog.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cineog.com",
    title: "CineOg | Premium Photography & Cinematography Agency",
    description: "CineOg is a premier boutique photography and cinematography agency based in Mumbai. We craft timeless visual narratives, luxury commercials, brand campaigns, and high-end video productions.",
    siteName: "CineOg",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "CineOg Agency Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CineOg | Premium Photography & Cinematography Agency",
    description: "CineOg is a premier boutique photography and cinematography agency based in Mumbai. We craft timeless visual narratives, luxury commercials, brand campaigns, and high-end video productions.",
    images: ["/logo.png"],
  },
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
