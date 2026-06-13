import Image from "next/image";
import { latestRelease, type ReleasePlatformTone } from "@/lib/site-data";
import { getFeaturedReleaseData } from "@/lib/content";

const platformToneClasses: Record<ReleasePlatformTone, string> = {
  spotify: "border-black/5 bg-[#1CD562]",
  light: "border-black/10 bg-white",
  black: "border-black/5 bg-black",
  bandcamp: "border-black/5 bg-[#5f9fb1]",
};

function getPlatformTone(platform: string): ReleasePlatformTone {
  const key = platform.toLowerCase();
  if (key.includes("spotify")) return "spotify";
  if (key.includes("bandcamp")) return "bandcamp";
  if (key.includes("deezer")) return "black";
  return "light";
}

export default async function LatestReleaseSection() {
  const dynamicRelease = await getFeaturedReleaseData();
  const release = dynamicRelease
    ? {
        label: "Latest Release",
        title: dynamicRelease.title,
        coverSrc: dynamicRelease.cover_image_path,
        coverAlt: `${dynamicRelease.title} cover artwork.`,
        platforms: dynamicRelease.links.length
          ? dynamicRelease.links.map((link) => ({
              name: link.platform,
              href: link.url,
              logo:
                latestRelease.platforms.find((platform) =>
                  link.platform.toLowerCase().includes(platform.name.toLowerCase().split(" ")[0])
                )?.logo ?? "/media/youtube.avif",
              tone: getPlatformTone(link.platform),
            }))
          : latestRelease.platforms,
      }
    : latestRelease;

  return (
    <section id="latest-release" className="relative overflow-hidden bg-white text-black" aria-labelledby="latest-release-title">
      <div className="pointer-events-none absolute inset-0 opacity-10 mix-blend-multiply">
        <div className="absolute inset-0 film-grain-dark" aria-hidden="true" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 sm:pb-24 sm:pt-36 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start">
          <div className="animate-fade-up flex flex-col items-start">
            <header className="mb-6">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.5em] text-black/50">
                {release.label}
              </p>
              <h2
                id="latest-release-title"
                className="font-anton mt-4 text-2xl font-bold uppercase leading-tight text-black sm:text-3xl lg:text-4xl"
              >
                {release.title}
              </h2>
            </header>

            <div className="relative w-full max-w-md">
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_25px_60px_rgba(0,0,0,0.18)]">
                <Image
                  src={release.coverSrc}
                  alt={release.coverAlt}
                  fill
                  unoptimized={release.coverSrc.startsWith("http")}
                  sizes="(max-width: 768px) calc(100vw - 48px), 448px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="animate-fade-up animate-delay-1 mt-4 flex flex-col gap-3 md:mt-8">
            <ul className="flex flex-col gap-3" aria-label={`${release.title} listening links`}>
              {release.platforms.map((platform) => (
                <li key={platform.name} className="flex">
                  <a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${release.title} on ${platform.name}`}
                    className={[
                      "flex h-14 w-full items-center justify-center rounded-full border px-6 py-3",
                      "shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.22)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                      "sm:h-16 sm:py-3.5",
                      platformToneClasses[platform.tone],
                    ].join(" ")}
                  >
                    <Image
                      src={platform.logo}
                      alt=""
                      width={280}
                      height={32}
                      className="h-7 w-full max-w-[280px] object-contain sm:h-8"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
