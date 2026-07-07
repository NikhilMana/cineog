"use client";

import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Play, X } from "lucide-react";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === "undefined";

export function useMediaQuery(
  query: string,
  { defaultValue = false, initializeWithValue = true }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) return defaultValue;
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) return getMatches(query);
    return defaultValue;
  });

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);
    const handler = () => setMatches(matchMedia.matches);
    handler();
    matchMedia.addEventListener("change", handler);
    return () => matchMedia.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const };

const Carousel = memo(function CarouselInner({
  handleClick,
  controls,
  cards,
  isCarouselActive,
}: {
  handleClick: (videoUrl: string, index: number) => void;
  controls: ReturnType<typeof useAnimation>;
  cards: string[];
  isCarouselActive: boolean;
}) {
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
  const cylinderWidth = isScreenSizeSm ? 1800 : 3000;
  const faceCount = cards.length;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  const rotation = useMotionValue(0);
  const transform = useTransform(
    rotation,
    (value) => `rotate3d(0, 1, 0, ${value}deg)`
  );

  return (
    <div
      className="flex h-full items-center justify-center bg-background"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <motion.div
        drag={isCarouselActive ? "x" : false}
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{
          transform,
          rotateY: rotation,
          width: cylinderWidth,
          transformStyle: "preserve-3d",
        }}
        onDrag={(_, info) => {
          if (isCarouselActive) {
            rotation.set(rotation.get() + info.offset.x * 0.02);
          }
        }}
        onDragEnd={(_, info) => {
          if (isCarouselActive) {
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.02,
              transition: {
                type: "spring",
                stiffness: 60,
                damping: 40,
                mass: 0.2,
              },
            });
          }
        }}
        animate={controls}
      >
        {cards.map((videoUrl, i) => (
          <div
            key={`card-${i}`}
            className="absolute flex h-full origin-center items-center justify-center p-2"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
          >
            <div
              className="relative w-full h-full overflow-hidden cursor-pointer group shadow-xl"
              style={{
                borderRadius: "20px",
                WebkitMaskImage: "-webkit-radial-gradient(white, black)",
              }}
              onClick={() => handleClick(videoUrl, i)}
            >
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="w-14 h-14 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <Play className="w-6 h-6 ml-0.5" fill="white" />
                </div>
              </div>
              <video
                src={videoUrl}
                className="w-full h-full object-cover aspect-[9/16]"
                style={{
                  borderRadius: "20px",
                  clipPath: "inset(0 round 20px)"
                }}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
});

export function ThreeDPhotoCarousel() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const controls = useAnimation();
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const cards = useMemo(
    () => [
      "/reels/Videos/Escobar imp.mp4",
      "/reels/Videos/Kashmir Organic Nuts.mp4",
      "/reels/Videos/Bandioke Nights At BanngBar.mp4",
      "/reels/Videos/Escobar.mp4",
      "/reels/Videos/Escobar2.mp4",
      "/reels/Videos/Indian Accent 2.mp4",
      "/reels/Videos/Indian Accent.mp4",
      "/reels/Videos/Koishii.mp4",
      "/reels/Videos/Koliwada Cocktail Club.mp4",
      "/reels/Videos/VANAHA GIN.mp4",
      "/reels/Videos/Video-637.mp4",
      "/reels/Videos/The Cointreau Margarita Challenge 2026.mp4",
      "/reels/Videos/Zarna_s Customised Art and Accessories.mp4",
    ],
    []
  );

  const handleClick = useCallback(
    (videoUrl: string, _index: number) => {
      setActiveVideo(videoUrl);
      setIsCarouselActive(false);
      controls.stop();
    },
    [controls]
  );

  const handleClose = useCallback(() => {
    setActiveVideo(null);
    setIsCarouselActive(true);
  }, []);

  useEffect(() => {
    if (activeVideo && modalVideoRef.current) {
      modalVideoRef.current.play();
    }
  }, [activeVideo]);

  return (
    <section id="reels" className="relative w-full bg-background py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-6">Cinematic Reels</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Short-form, engaging cinematic videos perfectly paced and optimized for maximum impact.</p>
      </div>
      <div className="relative h-[600px] md:h-[700px] w-full overflow-hidden">
        <Carousel handleClick={handleClick} controls={controls} cards={cards} isCarouselActive={isCarouselActive} />
      </div>
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            key="reels-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionOverlay}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[100] p-4"
            onClick={handleClose}
          >
            <button className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors" onClick={handleClose}>
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <video ref={modalVideoRef} key={activeVideo} src={activeVideo} className="w-full rounded-2xl shadow-2xl aspect-[9/16] object-cover" autoPlay controls playsInline />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
