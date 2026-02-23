"use client";

import { motion } from "framer-motion";

const videos = [
  { title: "Can't Be Done", id: "qLIwXeKniNc", category: "Performance" },
  { title: "EJBF Introducing Series", id: "Z1df7R9oyVo", category: "Interview" },
  { title: "Happy Times", id: "IxF0Db9PRI4", category: "Live Session" },
  { title: "Family Party", id: "EG5R5IJrTAY", category: "Live Session" },
  { title: "Don't Know Why (Cover)", id: "B2NtNqFnf_M", category: "Cover" },
  { title: "You've Got A Friend (Cover)", id: "UWFQcgs7Tsw", category: "Cover" },
  { title: "Brave EP Showcase", id: "lQaLu4_bqYo", category: "Full Album" }
];

export default function Videos() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="text-amber-500 font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Visual Experience</span>
          <h1 className="text-6xl md:text-9xl font-serif font-black text-white tracking-tighter uppercase leading-none">
            VIDEOS
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group space-y-6"
            >
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 group-hover:border-amber-500/30 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(177,93,28,0.1)]">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </div>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-amber-500 font-mono text-[10px] uppercase tracking-widest">{video.category}</span>
                  <h3 className="text-white text-xl font-serif italic opacity-90 group-hover:opacity-100 group-hover:text-amber-500/90 transition-all">
                    {video.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
