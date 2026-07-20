"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Upload, 
  LogOut, 
  Sparkles, 
  Film, 
  Image as ImageIcon, 
  User, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  ArrowUpRight
} from "lucide-react";

interface ReelItem {
  src: string;
  type?: "video" | "image";
}

interface MediaConfig {
  hero: string[];
  about: string;
  gallery: string[];
  reels: ReelItem[];
}

interface DashboardClientProps {
  initialConfig: MediaConfig;
}

type TabType = "hero" | "about" | "gallery" | "reels";

export function DashboardClient({ initialConfig }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("hero");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{section: string; index?: number} | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedItem, setSelectedItem] = useState<{section: string; index?: number} | null>(null);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth", {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/dashboard/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const triggerUpload = (section: string, index?: number) => {
    setSelectedItem({ section, index });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedItem) return;

    const isVideo = file.type.startsWith("video/");
    const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(`File is too large. Max size: ${isVideo ? "50MB" : "10MB"}.`);
      return;
    }

    setUploading(true);
    setUploadProgress({ section: selectedItem.section, index: selectedItem.index });
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("section", selectedItem.section);
    if (selectedItem.index !== undefined) {
      formData.append("index", selectedItem.index.toString());
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Asset replaced successfully!");
        router.refresh();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error || "Failed to replace asset.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("An error occurred during upload. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(null);
      setSelectedItem(null);
    }
  };

  const tabs = [
    { id: "hero" as TabType, label: "Circle Hero", icon: Layers, desc: "20 scroll morphing flip cards" },
    { id: "about" as TabType, label: "About Section", icon: User, desc: "Primary visual for agency bio" },
    { id: "gallery" as TabType, label: "Timeless Gallery", icon: ImageIcon, desc: "17 columned masonry style photos" },
    { id: "reels" as TabType, label: "Reels Carousel", icon: Film, desc: "13 looping cinematic video items" },
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans select-none">
      <header className="border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
          </div>
          <div>
            <span className="font-bold text-white tracking-tight">CineOg</span>
            <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider ml-2 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">
              Admin CMS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-800/80"
          >
            Live Site <ArrowUpRight className="h-3 w-3" />
          </a>
          <button
            onClick={handleLogout}
            className="text-xs text-zinc-400 hover:text-red-400 transition-colors flex items-center gap-1.5 hover:bg-red-500/10 px-3 py-2 rounded-lg border border-transparent hover:border-red-500/20"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </header>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={activeTab === "reels" ? "video/mp4,video/*" : "image/*"}
        className="hidden"
      />

      <div className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col md:flex-row gap-8">
        
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest px-3 mb-2">
            Sections
          </span>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setError("");
                  setSuccess("");
                }}
                className={`w-full text-left flex flex-col p-3.5 rounded-xl border transition-all ${
                  isActive
                    ? "bg-zinc-900 text-white border-zinc-800 shadow-md shadow-black/20"
                    : "text-zinc-400 hover:text-white border-transparent hover:bg-zinc-900/30"
                }`}
              >
                <div className="flex items-center gap-2.5 font-medium text-sm">
                  <Icon className={`h-4.5 w-4.5 ${isActive ? "text-white" : "text-zinc-500"}`} />
                  {tab.label}
                </div>
                <span className="text-[10px] text-zinc-500 mt-1 font-light block leading-normal">
                  {tab.desc}
                </span>
              </button>
            );
          })}
        </aside>

        <main className="flex-1 min-w-0">
          
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white capitalize">
                {activeTab} Management
              </h2>
              <p className="text-sm text-zinc-500 mt-1 font-light">
                Configure assets rendered inside the {activeTab} section of the landing page.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Error: </span>
                {error}
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-xl p-4 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Success: </span>
                {success}
              </div>
            </div>
          )}

          {activeTab === "hero" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {initialConfig.hero.map((src, i) => (
                <div 
                  key={i}
                  className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden aspect-[3/4] relative group hover:border-zinc-800 transition-all flex flex-col"
                >
                  <div className="relative flex-1 bg-zinc-900">
                    <Image
                      src={src}
                      alt={`Hero Image ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 200px"
                      className="object-cover"
                      unoptimized
                    />
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-3">
                      <button
                        onClick={() => triggerUpload("hero", i)}
                        disabled={uploading}
                        className="bg-white text-black text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 hover:bg-zinc-200 transition-colors shadow-lg disabled:opacity-50"
                      >
                        {uploading && uploadProgress?.section === "hero" && uploadProgress?.index === i ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Upload className="h-3.5 w-3.5" />
                        )}
                        Replace
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-3 border-t border-zinc-900/60 flex items-center justify-between text-xs text-zinc-500 font-medium bg-zinc-950">
                    <span>Card #{i + 1}</span>
                    <span className="truncate max-w-[80px] text-[10px] text-zinc-600 font-mono">
                      {src.split("/").pop()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "about" && (
            <div className="max-w-2xl bg-zinc-950 border border-zinc-900 rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2 relative h-[360px] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <Image
                  src={initialConfig.about}
                  alt="About Main Image"
                  fill
                  sizes="300px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div>
                  <h3 className="font-bold text-white text-lg">About Section Hero Photo</h3>
                  <p className="text-zinc-500 text-xs font-light mt-1">
                    This is the large, premium vertically scrolled profile image loaded at the top of the About segment.
                  </p>
                </div>
                <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-850">
                  <span className="text-[10px] text-zinc-500 font-mono block">PATH:</span>
                  <span className="text-xs text-zinc-300 font-mono break-all mt-1 block">
                    {initialConfig.about}
                  </span>
                </div>
                <button
                  onClick={() => triggerUpload("about")}
                  disabled={uploading}
                  className="bg-white text-black font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors w-full disabled:opacity-50"
                >
                  {uploading && uploadProgress?.section === "about" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  Replace About Photo
                </button>
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {initialConfig.gallery.map((src, i) => (
                <div 
                  key={i}
                  className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden aspect-[4/5] relative group hover:border-zinc-800 transition-all flex flex-col"
                >
                  <div className="relative flex-1 bg-zinc-900">
                    <Image
                      src={src}
                      alt={`Gallery Image ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 250px"
                      className="object-cover"
                      unoptimized
                    />
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-3">
                      <button
                        onClick={() => triggerUpload("gallery", i)}
                        disabled={uploading}
                        className="bg-white text-black text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 hover:bg-zinc-200 transition-colors shadow-lg disabled:opacity-50"
                      >
                        {uploading && uploadProgress?.section === "gallery" && uploadProgress?.index === i ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Upload className="h-3.5 w-3.5" />
                        )}
                        Replace
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-3 border-t border-zinc-900/60 flex items-center justify-between text-xs text-zinc-500 font-medium bg-zinc-950">
                    <span>Photo #{i + 1}</span>
                    <span className="truncate max-w-[100px] text-[10px] text-zinc-600 font-mono">
                      {src.split("/").pop()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reels" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {initialConfig.reels.map((item, i) => (
                <div 
                  key={i}
                  className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden relative group hover:border-zinc-800 transition-all flex flex-col shadow-lg"
                >
                  <div className="relative aspect-[9/16] bg-zinc-900 flex-1 overflow-hidden">
                    <video
                      src={item.src}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                      <button
                        onClick={() => triggerUpload("reels", i)}
                        disabled={uploading}
                        className="bg-white text-black text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-zinc-200 transition-colors shadow-lg disabled:opacity-50"
                      >
                        {uploading && uploadProgress?.section === "reels" && uploadProgress?.index === i ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Upload className="h-3.5 w-3.5" />
                        )}
                        Replace Reel
                      </button>
                    </div>
                  </div>

                  <div className="p-3 border-t border-zinc-900 bg-zinc-950 text-xs flex flex-col gap-1">
                    <div className="flex items-center justify-between text-zinc-400 font-medium">
                      <span>Reel Video #{i + 1}</span>
                      <span className="bg-zinc-900 px-1.5 py-0.5 rounded text-[10px] text-zinc-500 uppercase tracking-wider font-semibold border border-zinc-800">
                        {item.type || "video"}
                      </span>
                    </div>
                    <span className="truncate text-[10px] text-zinc-600 font-mono mt-1 block">
                      {item.src.split("/").pop()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
