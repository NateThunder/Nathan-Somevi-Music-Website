"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contactInfo, primaryNav } from "@/lib/site-data";

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
          isScrolled || isOpen ? "bg-[#04070c]/86 shadow-[0_18px_48px_rgba(0,0,0,0.28)] backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[var(--header-height)] w-full max-w-7xl items-center px-6 sm:px-8 lg:px-12">
          <Link href="/" className="flex flex-col leading-none text-white">
            <span className="text-base font-bold uppercase tracking-[0.24em] text-[var(--accent)] sm:text-xl">
              Nathan Somevi
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-7 lg:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-bold uppercase tracking-[0.18em] ${
                  isActivePath(pathname, item.href) ? "text-white" : "text-white/68 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-6 hidden lg:block">
            <Link
              href="/music"
              className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[var(--accent)] px-4 text-xs font-extrabold uppercase tracking-[0.16em] text-[#2e210d] shadow-[0_18px_48px_var(--accent-shadow)] hover:brightness-105"
            >
              Listen
            </Link>
          </div>

          <button
            type="button"
            className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/16 bg-white/6 text-white lg:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((open) => !open)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {isOpen ? (
                <path d="M6 6 18 18M18 6 6 18" />
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 lg:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <button
          type="button"
          aria-label="Close menu backdrop"
          className={`absolute inset-0 bg-black/52 transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[min(86vw,24rem)] flex-col bg-[#070b11] px-6 pb-8 pt-28 transition-transform duration-200 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="grid gap-3">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b border-white/10 pb-3 text-sm font-bold uppercase tracking-[0.18em] ${
                  isActivePath(pathname, item.href) ? "text-white" : "text-white/72"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/music"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[var(--accent)] px-4 text-sm font-extrabold uppercase tracking-[0.16em] text-[#2e210d]"
            onClick={() => setIsOpen(false)}
          >
            Listen
          </Link>
          <a href={`mailto:${contactInfo.email}`} className="mt-5 text-sm text-[var(--muted)]">
            {contactInfo.email}
          </a>
        </div>
      </div>
    </>
  );
}
