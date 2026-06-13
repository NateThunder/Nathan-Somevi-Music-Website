"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialLinks from "@/components/SocialLinks";
import { contactInfo, primaryNav } from "@/lib/site-data";

export default function SiteFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/videos")) {
    return null;
  }

  return (
    <footer className="border-t border-white/10 px-6 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="eyebrow">Nathan Somevi</p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-white">Music, live rooms and collaborations.</h2>
          <a href={`mailto:${contactInfo.email}`} className="mt-5 inline-flex text-base font-semibold text-[var(--accent-strong)] hover:text-white">
            {contactInfo.email}
          </a>
        </div>
        <div className="flex flex-col gap-6 lg:items-end">
          <nav className="flex flex-wrap gap-x-5 gap-y-3">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-bold uppercase tracking-[0.18em] text-white/70 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
