import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  contactInfo,
  galleryImages,
  latestRelease,
  musicPlatforms,
  socialLinks,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "EPK",
  description:
    "Electronic press kit for Nathan Somevi, including bio, music, video, live formats, downloads, and booking details.",
};

const heroActions = [
  { label: "Listen", href: "/music", internal: true },
  { label: "Watch Live", href: "/videos", internal: true },
  { label: "Book Nathan", href: `mailto:${contactInfo.email}` },
  { label: "Download EPK", href: "/Nathan_Somevi_EPK_One_Sheet.pdf", download: "Nathan_Somevi_EPK_One_Sheet.pdf" },
] as const;

const highlights = [
  "Scottish Jazz Awards Rising Star finalist.",
  "SAMA nomination.",
  "Featured work on Black Oot Here: Dreams O Us.",
  "Performances and projects connected with Glasgow Jazz Festival, Edinburgh Jazz & Blues Festival/EXPO and major Scottish venues.",
  "Original releases including Can't Be Done and Brave.",
] as const;

const liveFormats = [
  {
    title: "Solo guitar",
    copy: "Intimate guitar-led set for listening rooms, galleries, churches and small venues.",
  },
  {
    title: "Duo",
    copy: "Flexible format for jazz clubs, receptions and smaller stages.",
  },
  {
    title: "Trio",
    copy: "Guitar-led original music with deeper groove and improvisation.",
  },
  {
    title: "Full band",
    copy: "Hybrid guitar, tenor sax, keyboard and drums for festivals, theatres and larger rooms.",
  },
] as const;

const downloads = [
  {
    group: "Core EPK",
    items: [
      { label: "One-sheet PDF", href: "/Nathan_Somevi_EPK_One_Sheet.pdf", download: "Nathan_Somevi_EPK_One_Sheet.pdf" },
      { label: "Tech rider PDF", href: "/Nathan_Somevi_Tech_Rider.pdf", download: "Nathan_Somevi_Tech_Rider.pdf" },
      { label: "Stage plan PNG", href: "/stage%20plan.png", download: "Nathan_Somevi_Stage_Plan.png" },
    ],
  },
  {
    group: "Editable files",
    items: [
      { label: "EPK web copy DOCX", href: "/Nathan_Somevi_EPK_Web_Copy.docx", download: "Nathan_Somevi_EPK_Web_Copy.docx" },
      { label: "Tech rider DOCX", href: "/Nathan_Somevi_Tech_Rider.docx", download: "Nathan_Somevi_Tech_Rider.docx" },
      { label: "EPK page template", href: "/Nathan_Somevi_EPK_Page_Template.html", download: "Nathan_Somevi_EPK_Page_Template.html" },
    ],
  },
  {
    group: "Images",
    items: [
      { label: "Press photo 01", href: "/images/ifro/nathan-portrait-01.jpg", download: "Nathan_Somevi_Press_Photo_01.jpg" },
      { label: "Press photo 03", href: "/images/ifro/nathan-portrait-03.jpg", download: "Nathan_Somevi_Press_Photo_03.jpg" },
      { label: "Brave artwork", href: "/images/albums/brave.jpg", download: "Nathan_Somevi_Brave_Artwork.jpg" },
    ],
  },
] as const;

const r2VideoBaseUrl =
  process.env.NEXT_PUBLIC_VIDEOS_BUCKET_BASE_URL?.trim() || "https://pub-0dee575e552a4e74abaca2e55b934b92.r2.dev";

function ActionLink({ action }: { action: (typeof heroActions)[number] }) {
  const className =
    "inline-flex min-h-[52px] items-center justify-center rounded-[8px] border border-[#e7aa35] px-5 text-sm font-extrabold uppercase text-[#e7aa35] sm:min-w-[150px]";

  if ("internal" in action && action.internal) {
    return (
      <Link href={action.href} className={className}>
        {action.label}
      </Link>
    );
  }

  return (
    <a href={action.href} download={"download" in action ? action.download : undefined} className={className}>
      {action.label}
    </a>
  );
}

function getFileType(href: string) {
  return href.split("?")[0].split(".").pop()?.toUpperCase() ?? "FILE";
}

function DownloadLink({ item }: { item: (typeof downloads)[number]["items"][number] }) {
  return (
    <a
      href={item.href}
      download={item.download}
      className="flex min-h-[58px] items-center justify-between gap-4 rounded-[8px] border border-white/15 px-4 py-3 text-sm font-bold uppercase text-white"
    >
      <span>{item.label}</span>
      <span className="text-[#e7aa35]" aria-hidden="true">
        {getFileType(item.href)}
      </span>
    </a>
  );
}

export default function EpkPage() {
  return (
    <>
      <section className="relative isolate min-h-[82svh] overflow-hidden border-b border-white/10 bg-black px-6 pb-12 pt-[calc(var(--header-height)+3rem)] text-white sm:px-8 sm:pb-16 lg:px-12">
        <Image
          src="/images/ifro/nathan-portrait-03.jpg"
          alt="Nathan Somevi holding guitar in a close portrait."
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-[center_34%] opacity-45"
        />
        <div className="absolute inset-0 -z-10 bg-black/60" aria-hidden="true" />

        <div className="mx-auto flex min-h-[calc(82svh-var(--header-height)-3rem)] w-full max-w-7xl items-end">
          <div className="max-w-5xl">
            <p className="eyebrow text-[#e7aa35]">EPK | Glasgow, Scotland</p>
            <h1 className="font-anton mt-5 text-[clamp(4rem,16vw,12rem)] font-normal uppercase leading-[0.86] text-white">
              Nathan Somevi
            </h1>
            <p className="mt-7 max-w-3xl text-[clamp(1.15rem,2.4vw,1.8rem)] leading-[1.45] text-white/88">
              Glasgow-based guitarist, composer and independent artist blending jazz, Ghanaian rhythm, gospel harmony,
              R&B colour and improvisation.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {heroActions.map((action) => (
                <ActionLink key={action.label} action={action} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#070707] px-6 py-20 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="eyebrow">About</p>
            <h2 className="section-title mt-5">Guitar-led original music, built for rooms that listen.</h2>
          </div>
          <div className="space-y-6 text-lg leading-[1.72] text-white/80">
            <p>
              Nathan Somevi is a Glasgow-based guitarist, composer and independent artist creating original music across
              jazz, Ghanaian rhythm, gospel harmony, R&B colour and improvisation. His sound is built around expressive
              guitar playing, melodic composition and a deep sense of story, moving between intimate solo textures and
              dynamic ensemble performance.
            </p>
            <p>
              Originally from Ghana and based in Scotland, Nathan brings together the musical languages that shaped him:
              church, jazz, African groove, contemporary soul and the lived experience of being an independent artist.
              His work has included original releases, commissioned composition, live festival appearances and
              collaborative projects across music, film and community-led arts.
            </p>
            <p>
              Nathan performs in solo, duo, trio and full-band formats, with live sets centred on original music,
              improvisation and emotional connection.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-black px-6 py-20 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <p className="eyebrow">Music</p>
            <h2 className="section-title mt-5">{latestRelease.title}</h2>
            <p className="mt-6 max-w-xl text-lg leading-[1.65] text-white/74">
              A guitar-led project exploring memory, movement and life expression through jazz harmony, Ghanaian
              influence and improvisation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {musicPlatforms.slice(0, 4).map((platform) => (
                <a
                  key={platform.label}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center rounded-[8px] border border-white/15 px-4 text-sm font-bold uppercase text-white"
                >
                  {platform.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-[0.72fr_1fr]">
            <div className="relative aspect-square overflow-hidden rounded-[8px] border border-white/15 bg-[#0d0d0d]">
              <Image
                src={latestRelease.coverSrc}
                alt={latestRelease.coverAlt}
                fill
                sizes="(max-width: 640px) 100vw, 34vw"
                className="object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-[8px] border border-white/15 bg-[#0d0d0d]">
              <div className="aspect-video">
                <video controls playsInline preload="metadata" poster="/video/venessa-thumbnail.jpg" className="h-full w-full bg-black">
                  <source src={`${r2VideoBaseUrl}/venessa-final-video.mp4`} type="video/mp4" />
                </video>
              </div>
              <div className="border-t border-white/15 px-4 py-4">
                <p className="eyebrow text-[#e7aa35]">Watch live</p>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  Featured video from the current Nathan Somevi video selection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#070707] px-6 py-20 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Selected highlights</p>
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {highlights.map((highlight) => (
                <li key={highlight} className="py-5 text-lg leading-7 text-white/80">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Live formats</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {liveFormats.map((format) => (
                <article key={format.title} className="rounded-[8px] border border-white/15 bg-black px-5 py-5">
                  <h3 className="font-anton text-2xl font-normal uppercase leading-none text-[#e7aa35]">{format.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/75">{format.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-black px-6 py-20 text-white sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
            <div>
              <p className="eyebrow">Press photos</p>
              <h2 className="section-title mt-5">Portraits and artwork ready for listings.</h2>
            </div>
            <p className="max-w-3xl text-lg leading-[1.65] text-white/74 lg:ml-auto">
              Use the direct image downloads below for press, venue listings and festival announcements.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[galleryImages[0], galleryImages[2], galleryImages[5]].map((image, index) => (
              <a key={image.src} href={image.src} download={`Nathan_Somevi_Press_Photo_${index + 1}.jpg`} className="block">
                <span className="relative block aspect-[4/5] overflow-hidden rounded-[8px] border border-white/15 bg-[#0d0d0d]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#070707] px-6 py-20 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.55fr_1.45fr]">
          <div>
            <p className="eyebrow">Downloads</p>
            <h2 className="section-title mt-5">Press, tech and artwork files.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {downloads.map((downloadGroup) => (
              <section key={downloadGroup.group}>
                <h3 className="font-anton text-2xl font-normal uppercase leading-none text-[#e7aa35]">
                  {downloadGroup.group}
                </h3>
                <div className="mt-5 grid gap-3">
                  {downloadGroup.items.map((item) => (
                    <DownloadLink key={item.href} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-20 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="section-title mt-5">Booking, press and festival enquiries.</h2>
          </div>
          <div>
            <a className="break-words text-2xl font-bold text-[#e7aa35] sm:text-4xl" href={`mailto:${contactInfo.email}`}>
              {contactInfo.email}
            </a>
            <dl className="mt-8 grid gap-5 border-y border-white/10 py-7 text-sm uppercase tracking-[0.16em] text-white/72 sm:grid-cols-2">
              <div>
                <dt className="text-[#e7aa35]">Website</dt>
                <dd className="mt-2 normal-case tracking-normal text-white">nathansomevi.com</dd>
              </div>
              <div>
                <dt className="text-[#e7aa35]">Location</dt>
                <dd className="mt-2 normal-case tracking-normal text-white">Glasgow, Scotland</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center rounded-[8px] border border-white/15 px-4 text-sm font-bold uppercase text-white"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
