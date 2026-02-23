"use client";

import { motion } from "framer-motion";

const gigs = [
  {
    city: "Glasgow",
    date: "22 JUN 2025",
    time: "13:00",
    festival: "Glasgow Jazz Festival",
    venue: "Saint Luke's & The Winged Ox",
    link: "https://www.seetickets.com/event/new-jazzwegians-azamiah-aku-nathan-somevi-trio/st-luke-s/3423819",
    linkLabel: "Tickets",
  },
  {
    city: "Edinburgh",
    date: "15 JUL 2025",
    time: "20:00",
    festival: "Edinburgh Jazz Festival",
    venue: "The Jazz Bar",
    link: "https://ejbf.co.uk/products/nathan-somevi-future-afro-jazz",
    linkLabel: "Tickets",
  },
  {
    city: "Aberdeen",
    date: "20 JUL 2025",
    time: "TBA",
    festival: "Tall Ships festival",
    venue: "Quayside Concerts",
    link: "https://www.tallshipsaberdeen.com/whats-on/quayside-concerts/",
    linkLabel: "Info",
  },
];

export default function Gigs() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <span className="text-amber-500 font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Tour Dates 2025</span>
          <h1 className="text-6xl md:text-9xl font-serif font-black text-white tracking-tighter uppercase leading-none">
            GIGS
          </h1>
        </motion.div>

        <div className="space-y-4">
          {gigs.map((gig, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col md:flex-row items-center justify-between p-8 rounded-2xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/60 hover:border-amber-500/30 transition-all duration-500 gap-8"
            >
              <div className="flex flex-col items-center md:items-start space-y-2">
                <span className="text-white text-3xl font-serif italic tracking-tight">{gig.date}</span>
                <span className="text-amber-500 font-mono text-xs tracking-widest uppercase">{gig.time}</span>
              </div>

              <div className="flex-1 text-center md:text-left space-y-1">
                <h3 className="text-white text-2xl font-bold uppercase tracking-tight group-hover:text-amber-500 transition-colors">
                  {gig.city}
                </h3>
                <p className="text-white/40 font-light italic">
                   {gig.venue} • <span className="text-white/20 not-italic uppercase text-[10px] tracking-widest">{gig.festival}</span>
                </p>
              </div>

              <motion.a
                href={gig.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto text-center border border-white/20 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all"
              >
                {gig.linkLabel}
              </motion.a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center p-12 rounded-3xl bg-amber-500/5 border border-amber-500/10"
        >
          <p className="text-amber-500/60 font-serif italic text-xl">More dates to be announced soon.</p>
        </motion.div>
      </div>
    </div>
  );
}
