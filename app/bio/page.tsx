"use client";

import { motion } from "framer-motion";

export default function Bio() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 text-center md:text-left"
        >
          <span className="text-amber-500 font-mono text-xs tracking-[0.4em] uppercase mb-4 block">The Journey</span>
          <h1 className="text-6xl md:text-9xl font-serif font-black text-white tracking-tighter uppercase leading-none">
            BIOGRAPHY
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:col-span-4 space-y-8"
          >
            <div className="h-px bg-amber-500/30 w-full" />
            <div className="space-y-4">
               <p className="text-white/40 text-xs uppercase tracking-widest font-mono">Based In</p>
               <p className="text-white font-serif italic text-lg">Glasgow, UK</p>
            </div>
            <div className="space-y-4">
               <p className="text-white/40 text-xs uppercase tracking-widest font-mono">Instruments</p>
               <p className="text-white font-serif italic text-lg">Hybrid Guitar, Bass</p>
            </div>
            <div className="space-y-4">
               <p className="text-white/40 text-xs uppercase tracking-widest font-mono">Recognition</p>
               <p className="text-white/70 text-sm leading-relaxed">
                  Scottish Alternative Music Award Nominee (2020)<br />
                  Scottish Jazz Award Nominee (2023)
               </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-8 space-y-12 text-white/80 text-lg md:text-xl leading-relaxed font-light"
          >
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-amber-500 first-letter:mr-3 first-letter:float-left">
              Nathan Somevi, a Ghanaian-born British musician, honed his musical talents in the vibrant atmosphere of church performances during his upbringing. Inspired by his roots, he embarked on a musical journey enriched by diverse influences. Among his inspirations, the innovative guitar stylings of Charlie Hunter have left an indelible mark on Somevi&apos;s sound, particularly his use of hybrid guitars blending bass and guitar elements.
            </p>

            <p className="border-l border-amber-500/20 pl-8 italic font-serif text-white/90">
              &quot;The challenges of the pandemic encouraged me to discover the joy of creating my own music and finding fulfillment in expressing my unique musical voice.&quot;
            </p>

            <p>
              In 2020, Somevi released his debut EP &quot;Can&apos;t Be Done,&quot; a testament to his evolving artistry. Following this success, he continued to push boundaries, releasing &quot;Brave&quot; in 2023, further solidifying his position as a versatile and dynamic artist in the contemporary UK jazz scene.
            </p>

            <p>
              Initially recognized for his contributions as a session musician, Nathan has now emerged as a compelling solo voice. His music is a bridge between tradition and contemporary innovation, captivated by the resonant tones of hybrid strings and soulful rhythmic exploration.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
