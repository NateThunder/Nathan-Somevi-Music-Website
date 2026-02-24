"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const musicLinks = [
  { name: "Spotify", url: "https://open.spotify.com/album/6WyZeuKM8kTglJGmebxJSt" },
  { name: "Apple Music", url: "https://music.apple.com/gb/album/brave-ep/1680881944" },
  { name: "Deezer", url: "https://www.deezer.com/en/album/426134147" },
  { name: "Bandcamp", url: "https://nathansomevi.bandcamp.com/album/brave" },
  { name: "Tidal", url: "https://tidal.com/browse/album/287462562" },
  { name: "Amazon", url: "https://music.amazon.co.uk/albums/B0C1SRY631" },
  { name: "YouTube", url: "https://www.youtube.com/watch?v=lQaLu4_bqYo&list=PLeVn9UP6Np29qdV3A0qQBbzNuQuyh9_5I" },
];

export default function Music() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Full Page Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="https://static.wixstatic.com/media/0b48cb_8abf9d2f4f7048cebeb961c32a2e677f~mv2.jpg"
          alt="Background"
          fill
          className="object-cover opacity-40 grayscale"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
      </div>

      <div className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row gap-16 items-center md:items-start"
          >
            {/* Left Side: Album Cover */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square w-full max-w-md mx-auto group">
                <div className="absolute inset-0 bg-amber-500 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20" />
                <Image
                  src="https://static.wixstatic.com/media/0b48cb_8abf9d2f4f7048cebeb961c32a2e677f~mv2.jpg"
                  alt="Brave EP"
                  fill
                  className="object-cover rounded-2xl shadow-2xl z-10"
                  unoptimized
                />
              </div>
            </div>

            {/* Right Side: Details & Links */}
            <div className="w-full md:w-1/2 space-y-12">
              <div className="space-y-4">
                <span className="text-amber-500 font-mono text-xs tracking-[0.3em] uppercase">Latest Release</span>
                <h1 className="text-6xl md:text-8xl font-serif font-black text-white tracking-tighter uppercase leading-none">
                  BRAVE <br /> EP
                </h1>
                <p className="text-white/80 text-lg max-w-md font-light leading-relaxed">
                  A journey through hybrid strings and soulful rhythms. &quot;Brave&quot; represents a step into a new sonic territory, blending tradition with modern jazz innovation.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {musicLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex items-center justify-between p-6 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all rounded-xl border border-white/10 hover:border-amber-500/30"
                  >
                    <span className="text-white font-sans text-sm font-bold uppercase tracking-widest transition-colors">
                      {link.name}
                    </span>
                    <span className="text-amber-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                      Listen Now →
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Previous Releases Placeholder */}
          <div className="mt-40 border-t border-white/10 pt-20">
            <h2 className="text-3xl font-serif italic text-white mb-12">Past Explorations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <div className="aspect-[4/3] bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center group cursor-pointer hover:bg-white/10 transition-all overflow-hidden relative">
                  <div className="text-center space-y-2 relative z-10">
                     <p className="text-white font-serif italic text-xl">Can&apos;t Be Done</p>
                     <p className="text-amber-500 text-[10px] uppercase tracking-widest font-mono">2020 • EP</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
