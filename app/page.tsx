"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const HeroSection = () => (
  <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 relative overflow-hidden">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-7xl relative"
    >
      <h1 className="text-center text-[10vw] md:text-[clamp(6rem,12vw,12rem)] font-serif font-black tracking-[-0.07em] text-white z-10 leading-[0.75] uppercase mb-12">
        NATHAN <br className="md:hidden" /> SOMEVI
      </h1>
      
      <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden group border border-white/10">
        <Image
          src="https://static.wixstatic.com/media/0b48cb_202c25545e7d476e97547772533949b2~mv2.jpg"
          alt="Nathan Somevi"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>

        <motion.div
          className="absolute bottom-8 right-8 z-20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a
            href="mailto:manager@nathansomevi.com"
            className="bg-white text-black px-8 py-4 rounded-full font-sans font-bold text-xs uppercase tracking-widest transition-all hover:bg-amber-500 hover:text-white flex items-center gap-3"
          >
            Let&apos;s Chat
            <span className="text-lg">→</span>
          </a>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

const FeaturesSection = () => (
  <section className="py-32 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <span className="text-amber-500 font-mono text-xs tracking-widest uppercase">01 / Sound</span>
        <h3 className="text-2xl font-serif italic text-white/90">Hybrid Artistry</h3>
        <p className="text-white/40 leading-relaxed font-light">
          Merging the deep resonant tones of a bass with the melodic intricacy of a guitar, Nathan creates a sonic landscape that is uniquely his own.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <span className="text-amber-500 font-mono text-xs tracking-widest uppercase">02 / Live</span>
        <h3 className="text-2xl font-serif italic text-white/90">Immersive Experience</h3>
        <p className="text-white/40 leading-relaxed font-light">
          From the Edinburgh Jazz & Blues Festival to intimate club settings, every performance is an exploration of rhythm and soulful expression.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <span className="text-amber-500 font-mono text-xs tracking-widest uppercase">03 / Roots</span>
        <h3 className="text-2xl font-serif italic text-white/90">Heritage & Vision</h3>
        <p className="text-white/40 leading-relaxed font-light">
          Inspired by his Ghanaian heritage and the vibrant UK jazz scene, Nathan&apos;s music is a bridge between tradition and contemporary innovation.
        </p>
      </motion.div>
    </div>
  </section>
);

const ContactSection = () => (
  <section className="py-40 px-6 text-center bg-zinc-950/30">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-6xl md:text-8xl font-serif font-black text-white mb-8 tracking-tight uppercase">
        Get in Touch
      </h2>
      <p className="text-white/40 mb-12 text-lg max-w-xl mx-auto font-light leading-relaxed">
        For bookings, collaborations, or just to say hello, feel free to reach out.
      </p>
      <a
        href="mailto:manager@nathansomevi.com"
        className="text-white text-2xl md:text-4xl hover:text-amber-500 transition-all duration-500 font-serif italic relative inline-block group"
      >
        manager@nathansomevi.com
        <span className="absolute -bottom-2 left-0 w-full h-px bg-amber-500/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
      </a>
    </motion.div>
  </section>
);

export default function Home() {
  return (
    <div className="bg-black selection:bg-amber-500/30">
      <HeroSection />
      <FeaturesSection />
      <ContactSection />
    </div>
  );
}
