'use client'

import { motion } from 'framer-motion'

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-amber-500 uppercase tracking-widest text-sm font-medium mb-4 block"
        >
          Get In Touch
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-8xl font-serif mb-12"
        >
          CONTACT
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-12 rounded-2xl"
        >
          <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
            For bookings, press inquiries, or general questions, please reach out via email.
          </p>

          <a
            href="mailto:contact@nathansomevi.com"
            className="text-2xl md:text-4xl font-serif text-white hover:text-amber-500 transition-colors duration-300 underline underline-offset-8"
          >
            contact@nathansomevi.com
          </a>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
            <div>
              <h3 className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-4">Management</h3>
              <p className="text-zinc-300">Represented by [Agency Name]</p>
            </div>
            <div>
              <h3 className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-4">Press</h3>
              <p className="text-zinc-300">press@nathansomevi.com</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
