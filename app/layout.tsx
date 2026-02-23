import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nathan Somevi | Official Website",
  description: "British-Ghanaian musician Nathan Somevi - Official website for music, tour dates, and more.",
};

const Navigation = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-serif tracking-tighter hover:text-amber-500 transition-colors">
        NS
      </Link>
      <div className="flex items-center gap-10">
        <div className="hidden md:flex items-center gap-8 text-white/70 text-[11px] font-bold uppercase tracking-[0.25em]">
          <Link href="/" className="hover:text-white transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 transition-all group-hover:w-full" />
          </Link>
          <Link href="/gigs" className="hover:text-white transition-colors relative group">
            Gigs
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 transition-all group-hover:w-full" />
          </Link>
          <Link href="/music" className="hover:text-white transition-colors relative group">
            Music
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 transition-all group-hover:w-full" />
          </Link>
          <Link href="/videos" className="hover:text-white transition-colors relative group">
            Videos
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 transition-all group-hover:w-full" />
          </Link>
          <Link href="/bio" className="hover:text-white transition-colors relative group">
            Bio
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 transition-all group-hover:w-full" />
          </Link>
          <Link href="/epk" className="hover:text-white transition-colors relative group">
            EPK
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 transition-all group-hover:w-full" />
          </Link>
        </div>
        <div className="flex items-center gap-4 border-l border-white/10 pl-8">
          <a href="https://www.youtube.com/user/somesomevi" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
            <Image src="https://static.wixstatic.com/media/7ea344_411993f3503f44609a633604f8b0e797~mv2.png/v1/fill/w_34,h_34,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7ea344_411993f3503f44609a633604f8b0e797~mv2.png" alt="YouTube" width={18} height={18} unoptimized />
          </a>
          <a href="https://www.instagram.com/nathansomevi/" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
            <Image src="https://static.wixstatic.com/media/7ea344_272a29037c8a417e8055627f4958ce71~mv2.png/v1/fill/w_34,h_34,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7ea344_272a29037c8a417e8055627f4958ce71~mv2.png" alt="Instagram" width={18} height={18} unoptimized />
          </a>
          <a href="https://www.tiktok.com/@nathansomevi" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
            <Image src="https://static.wixstatic.com/media/7ea344_77b311746a8449c294136979606d15a5~mv2.png/v1/fill/w_34,h_34,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7ea344_77b311746a8449c294136979606d15a5~mv2.png" alt="TikTok" width={18} height={18} unoptimized />
          </a>
        </div>
      </div>
    </div>
  </nav>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased bg-black text-white selection:bg-amber-500/30`}
      >
        <div className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        <Navigation />
        <main className="pt-24 min-h-screen">
          {children}
        </main>
        <footer className="py-20 border-t border-white/5 bg-black">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <h2 className="font-serif text-3xl mb-8">Nathan Somevi</h2>
            <div className="flex gap-8 mb-12 text-white/50 text-xs uppercase tracking-widest">
              <Link href="/music" className="hover:text-white transition-colors">Music</Link>
              <Link href="/gigs" className="hover:text-white transition-colors">Gigs</Link>
              <Link href="/videos" className="hover:text-white transition-colors">Videos</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
            <p className="text-white/30 text-[10px] uppercase tracking-[0.3em]">
              © {new Date().getFullYear()} Nathan Somevi. All Rights Reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
