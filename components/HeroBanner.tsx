"use client";

import Link from "next/link";
import type { SyntheticEvent } from "react";
import { useRef, useState } from "react";
import { contactInfo, siteCopy } from "@/lib/site-data";

const r2HeroVideoSrc = "https://pub-d3f17765c8e04c0f8f8637dbfb75aaf4.r2.dev/video/venessa-hero.mp4";
const posterSrc = "/video/venessa-poster.jpg?v=2";
const primaryHeroVideoSrc = process.env.NEXT_PUBLIC_HERO_VIDEO_URL?.trim() || r2HeroVideoSrc;
const heroVideoStartSeconds = 10;

export default function HeroBanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [activeVideoSrc, setActiveVideoSrc] = useState(primaryHeroVideoSrc);
  const [isMuted, setIsMuted] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const shouldMute = !isMuted;
    video.muted = shouldMute;
    setIsMuted(shouldMute);

    if (!shouldMute && video.paused) {
      void video.play().catch(() => {
        video.muted = true;
        setIsMuted(true);
      });
    }
  };

  const handleVideoError = () => {
    if (activeVideoSrc !== r2HeroVideoSrc) {
      setActiveVideoSrc(r2HeroVideoSrc);
      return;
    }

    setVideoFailed(true);
  };

  const handleVideoLoadedMetadata = (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    if (Number.isFinite(video.duration) && video.duration > heroVideoStartSeconds) {
      video.currentTime = heroVideoStartSeconds;
    }
  };

  return (
    <section
      className="relative isolate min-h-[calc(100svh-var(--header-height))] overflow-hidden border-b-[10px] border-black bg-black text-white"
      aria-label="Nathan Somevi hero"
    >
      {!videoFailed ? (
        <video
          key={activeVideoSrc}
          ref={videoRef}
          className="hero-video absolute inset-0"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          poster={posterSrc}
          onLoadedMetadata={handleVideoLoadedMetadata}
          onError={handleVideoError}
        >
          <source src={activeVideoSrc} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${posterSrc})` }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 flex min-h-[calc(100svh-var(--header-height))] w-full items-end px-6 pb-16 pt-[calc(var(--header-height)+3rem)] sm:px-8 sm:pb-20 lg:px-12">
        <div className="mx-auto w-full max-w-[966px] [text-shadow:0_3px_24px_rgba(0,0,0,0.5)]">
          <h1 className="font-anton animate-fade-up animate-delay-1 max-w-[900px] text-[clamp(3.05rem,15vw,3.6rem)] font-normal uppercase leading-[0.92] text-white sm:text-[5.5rem] sm:leading-[0.9] lg:text-[7.4rem]">
            {siteCopy.heroTitle}
          </h1>
          <p className="animate-fade-up animate-delay-2 mt-7 max-w-[790px] text-lg leading-[1.55] text-white/86 sm:text-xl">
            {siteCopy.heroSummary}
          </p>
          <div className="animate-fade-up animate-delay-2 mt-9 flex flex-wrap gap-3">
            <Link
              href="/music"
              className="inline-flex min-h-[54px] min-w-[150px] items-center justify-center rounded-[8px] border border-[#e7aa35] bg-[#e7aa35] px-7 text-sm font-extrabold uppercase text-black shadow-none [text-shadow:none] hover:bg-black hover:text-[#e7aa35]"
            >
              Listen
            </Link>
            <Link
              href="/videos"
              className="inline-flex min-h-[54px] min-w-[150px] items-center justify-center rounded-[8px] border border-[#e7aa35] bg-[#e7aa35] px-7 text-sm font-extrabold uppercase text-black shadow-none [text-shadow:none] hover:bg-black hover:text-[#e7aa35]"
            >
              Watch
            </Link>
          </div>
          <p className="mt-8 break-words text-sm font-bold uppercase text-white/78">Bookings and enquiries: {contactInfo.email}</p>
        </div>
      </div>

      <button
        type="button"
        className="hero-sound-toggle"
        onClick={toggleSound}
        aria-pressed={!isMuted}
        aria-label={isMuted ? "Unmute hero video" : "Mute hero video"}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          {isMuted ? (
            <>
              <path
                d="M5 9v6h4l5 4V5l-5 4H5Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.2 9.2 20.8 13.8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.8 9.2 16.2 13.8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          ) : (
            <>
              <path
                d="M5 9v6h4l5 4V5l-5 4H5Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.5 9.2a4.5 4.5 0 0 1 0 5.6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}
        </svg>
        <span>{isMuted ? "Sound Off" : "Sound On"}</span>
      </button>
    </section>
  );
}
