import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Nathan Somevi - Musician",
  description: "Official website of Nathan Somevi, musician and artist",
};

const Navigation = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-end">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6 text-white text-[11px] font-bold uppercase tracking-[0.2em]">
          <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <Link href="/gigs" className="hover:text-amber-500 transition-colors">Gigs</Link>
          <Link href="/music" className="hover:text-amber-500 transition-colors">Music</Link>
          <Link href="/videos" className="hover:text-amber-500 transition-colors">Videos</Link>
          <Link href="/bio" className="hover:text-amber-500 transition-colors">Bio</Link>
          <Link href="/epk" className="hover:text-amber-500 transition-colors">EPK</Link>
        </div>
        <div className="flex items-center gap-4 border-l border-white/20 pl-6">
          <a href="https://www.youtube.com/user/somesomevi" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
            <Image src="https://static.wixstatic.com/media/7ea344_411993f3503f44609a633604f8b0e797~mv2.png/v1/fill/w_34,h_34,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7ea344_411993f3503f44609a633604f8b0e797~mv2.png" alt="YouTube" width={17} height={17} unoptimized />
          </a>
          <a href="https://www.instagram.com/nathansomevi/" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
            <Image src="https://static.wixstatic.com/media/7ea344_272a29037c8a417e8055627f4958ce71~mv2.png/v1/fill/w_34,h_34,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7ea344_272a29037c8a417e8055627f4958ce71~mv2.png" alt="Instagram" width={17} height={17} unoptimized />
          </a>
          <a href="https://www.tiktok.com/@nathansomevi" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
            <Image src="https://static.wixstatic.com/media/7ea344_77b311746a8449c294136979606d15a5~mv2.png/v1/fill/w_34,h_34,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7ea344_77b311746a8449c294136979606d15a5~mv2.png" alt="TikTok" width={17} height={17} unoptimized />
          </a>
          <a href="https://twitter.com/NSomevi" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
            <Image src="https://static.wixstatic.com/media/7ea344_899214736f1c4e7fa26d4ef639396324~mv2.png/v1/fill/w_34,h_34,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7ea344_899214736f1c4e7fa26d4ef639396324~mv2.png" alt="Twitter" width={17} height={17} unoptimized />
          </a>
          <a href="https://www.facebook.com/Nathan-Somevi-102137791151677" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
            <Image src="https://static.wixstatic.com/media/7ea344_b0185994270d49929849514e8c15664a~mv2.png/v1/fill/w_34,h_34,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7ea344_b0185994270d49929849514e8c15664a~mv2.png" alt="Facebook" width={17} height={17} unoptimized />
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
