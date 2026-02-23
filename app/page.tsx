import Image from "next/image";
import { Youtube, Instagram, Twitter, Facebook, Music2 } from "lucide-react";

const HeroSection = () => (
  <section className="min-h-screen bg-black flex flex-col items-center pt-40 pb-20 px-4 md:px-8 relative overflow-hidden">
    <div className="w-full max-w-6xl flex flex-col items-center relative">
      <h1 className="text-center text-[8vw] md:text-[120px] font-serif font-black tracking-[-0.05em] text-white mb-16 z-10 leading-[0.8] uppercase">
        NATHAN SOMEVI
      </h1>
      
      <div className="relative w-full aspect-[16/10] md:max-h-[75vh] group shadow-[0_0_100px_rgba(255,255,255,0.05)]">
        <Image
          src="https://static.wixstatic.com/media/0b48cb_202c25545e7d476e97547772533949b2~mv2.jpg"
          alt="Nathan Somevi"
          fill
          className="object-cover transition-all duration-1000 group-hover:scale-105"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

        <button className="absolute bottom-10 right-10 bg-[#8B4513] hover:bg-[#6D3610] text-white px-10 py-5 rounded-none font-serif italic text-xl transition-all hover:pr-14 hover:shadow-2xl z-20 group">
          <span>Let&apos;s Chat!</span>
          <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all">→</span>
        </button>
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section className="bg-black py-40 px-4 text-center">
    <h2 className="text-[10vw] md:text-[100px] font-serif font-black text-white mb-16 tracking-tighter uppercase">CONTACT</h2>
    <a href="mailto:manager@nathansomevi.com" className="text-white text-xl md:text-2xl mb-24 block hover:text-amber-500 transition-colors underline decoration-amber-500/50 underline-offset-[12px] decoration-1 font-light tracking-widest">
      manager@nathansomevi.com
    </a>
    
    <div className="flex justify-center gap-12">
      <a href="https://www.youtube.com/user/somesomevi" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-all transform hover:-translate-y-2">
        <Youtube size={36} strokeWidth={1} />
      </a>
      <a href="https://www.instagram.com/nathansomevi/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-all transform hover:-translate-y-2">
        <Instagram size={36} strokeWidth={1} />
      </a>
      <a href="https://www.tiktok.com/@nathansomevi" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-all transform hover:-translate-y-2">
        <Music2 size={36} strokeWidth={1} />
      </a>
      <a href="https://twitter.com/NSomevi" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-all transform hover:-translate-y-2">
        <Twitter size={36} strokeWidth={1} />
      </a>
      <a href="https://www.facebook.com/Nathan-Somevi-102137791151677" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-all transform hover:-translate-y-2">
        <Facebook size={36} strokeWidth={1} />
      </a>
    </div>
  </section>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-black selection:bg-amber-900 selection:text-white">
      <HeroSection />
      <ContactSection />
    </main>
  );
}
