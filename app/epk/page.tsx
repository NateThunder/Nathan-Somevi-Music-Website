"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function EPK() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 text-center"
        >
          <span className="text-amber-500 font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Press Resources</span>
          <h1 className="text-6xl md:text-9xl font-serif font-black text-white tracking-tighter uppercase leading-none">
            EPK
          </h1>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-sm aspect-[3/4] group"
          >
            <div className="absolute inset-0 bg-amber-500 rounded-3xl -rotate-6 group-hover:-rotate-12 transition-transform duration-700 opacity-10" />
            <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 group-hover:border-amber-500/30 transition-all duration-500 shadow-2xl">
              <Image
                src="https://static.wixstatic.com/media/0b48cb_d071d2c14fda47a693c38a547f0fb0a7~mv2.jpg"
                alt="Nathan Somevi EPK Preview"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                 <p className="text-white font-serif italic text-2xl">Visual Assets</p>
                 <p className="text-white/40 text-xs uppercase tracking-widest font-mono">Hi-Res Gallery</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="max-w-md space-y-12 text-center md:text-left"
          >
            <div className="space-y-6">
               <h2 className="text-3xl font-serif italic text-white/90">Electronic Press Kit</h2>
               <p className="text-white/40 leading-relaxed font-light">
                  Download the complete press package including high-resolution promotional photos, full biography, technical riders, and media highlights.
               </p>
            </div>

            <div className="space-y-4">
              <motion.a
                href="https://www.nathansomevi.com/_files/archives/0b48cb_719963f62d3a4445bfbf6e987a4dff21.zip?dn=EPK.zip"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block w-full text-center bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-amber-500 hover:text-white transition-all shadow-xl shadow-white/5"
              >
                Download Full EPK (.zip)
              </motion.a>
              <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-mono">Size: approx 45MB</p>
            </div>

            <div className="pt-8 border-t border-white/5">
               <p className="text-white/30 text-xs leading-relaxed">
                  For interview requests or specialized media assets, please contact: <br />
                  <a href="mailto:manager@nathansomevi.com" className="text-amber-500/60 hover:text-amber-500 transition-colors">manager@nathansomevi.com</a>
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
