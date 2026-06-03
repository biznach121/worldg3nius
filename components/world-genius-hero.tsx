"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

type HeroSlide =
  | {
      type: "video";
      src: string;
      poster?: string;
      label: string;
    }
  | {
      type: "image";
      src: string;
      label: string;
    };

const SLIDES: HeroSlide[] = [
  {
    type: "video",
    src: "https://res.cloudinary.com/dcc5ggnkc/video/upload/v1780490506/f4jogoll4byoya7hdlgw.mp4",
    label: "Campaign film",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780487772/ox8pws8rohmebom7z1ao.png",
    label: "World G3nius campaign look one",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780487992/c1ogmweapq2bk2vqdlam.png",
    label: "World G3nius campaign look two",
  },
];

function LogoLine({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span className="wg-logo-text font-display text-[clamp(4.25rem,15vw,14rem)] uppercase leading-[0.78]">
      {Array.from(text).map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="wg-logo-letter"
          style={{ "--letter-index": index + offset } as CSSProperties}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

function VolumeIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      {muted ? (
        <>
          <path d="m22 9-6 6" />
          <path d="m16 9 6 6" />
        </>
      ) : (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M19 5a10 10 0 0 1 0 14" />
        </>
      )}
    </svg>
  );
}

export function WorldGeniusHero() {
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const activeSlide = SLIDES[active];
  const nextIndex = useMemo(() => (active + 1) % SLIDES.length, [active]);

  useEffect(() => {
    if (activeSlide.type === "video") return;

    const timeout = window.setTimeout(() => {
      setActive((current) => (current + 1) % SLIDES.length);
    }, 6200);
    return () => window.clearTimeout(timeout);
  }, [active, activeSlide.type]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (activeSlide.type !== "video") {
      video.pause();
      return;
    }

    video.currentTime = 0;
    void video.play();
  }, [activeSlide.type, active]);

  const toggleMute = () => {
    setMuted((current) => !current);
    if (videoRef.current) void videoRef.current.play();
  };

  return (
    <section
      className="wg-hero relative min-h-[100svh] overflow-hidden bg-black text-white"
      aria-label="World G3nius campaign carousel"
    >
      {SLIDES.map((slide, index) => {
        const visible = index === active;
        return (
          <div
            key={slide.src}
            className={[
              "absolute inset-0 transition-opacity duration-1000 ease-out",
              visible ? "opacity-100" : "opacity-0",
            ].join(" ")}
            aria-hidden={!visible}
          >
            {slide.type === "video" ? (
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src={slide.src}
                autoPlay
                muted={muted}
                playsInline
                preload="metadata"
                onEnded={() => setActive((current) => (current + 1) % SLIDES.length)}
              />
            ) : (
              <Image
                src={slide.src}
                alt={slide.label}
                fill
                priority={index === 1}
                sizes="100vw"
                className="object-cover"
              />
            )}
          </div>
        );
      })}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0.08)_42%,rgba(0,0,0,0.54)_100%)]" />
      <div className="absolute inset-0 wg-scanlines opacity-25" aria-hidden />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-5 pt-24 text-center">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/76">
          Live drop
        </p>
        <Link
          href="/shop"
          className="group wg-logo-button inline-flex flex-col items-center justify-center text-white outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          aria-label="Shop World G3nius"
        >
          <LogoLine text="WORLD" />
          <LogoLine text="G3NIUS" offset={5} />
        </Link>
        <p className="mt-7 max-w-xl text-sm font-medium uppercase tracking-[0.18em] text-white/84 sm:text-base">
          Cut loud. Built clean. Made for motion.
        </p>
      </div>

      <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between gap-4">
        <div className="hidden max-w-xs text-left text-[11px] uppercase tracking-[0.18em] text-white/75 sm:block">
          <span className="block text-white">0{active + 1}/0{SLIDES.length}</span>
          {activeSlide.label}
        </div>
        <div className="ml-auto flex items-center gap-2">
          {activeSlide.type === "video" ? (
            <button
              type="button"
              onClick={toggleMute}
              title={muted ? "Turn campaign film sound on" : "Mute campaign film"}
              className="inline-grid h-10 w-10 place-items-center border border-white/40 bg-black/24 text-white backdrop-blur transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              aria-label={muted ? "Turn campaign film sound on" : "Mute campaign film"}
              aria-pressed={!muted}
            >
              <VolumeIcon muted={muted} />
            </button>
          ) : null}
          {SLIDES.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActive(index)}
              className={[
                "h-1.5 transition-all duration-300",
                active === index ? "w-12 bg-white" : "w-6 bg-white/36 hover:bg-white/60",
              ].join(" ")}
              aria-label={`Show ${slide.label}`}
              aria-current={active === index}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/70 md:flex">
        <span>Scroll</span>
        <span className="h-12 w-px overflow-hidden bg-white/24">
          <span className="block h-5 w-px animate-[wg-scroll_1.5s_ease-in-out_infinite] bg-white" />
        </span>
      </div>

      <Link
        href="/shop"
        className="absolute bottom-5 left-5 z-10 inline-flex sm:hidden items-center justify-center bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-black"
      >
        Shop now
      </Link>

      <span className="sr-only">Next slide is {SLIDES[nextIndex].label}</span>
    </section>
  );
}
