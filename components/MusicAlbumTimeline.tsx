import Image from "next/image";
import styles from "@/app/music/music.module.css";

type Platform = "apple" | "bandcamp" | "deezer" | "tidal" | "amazon" | "spotify";

type AlbumLink = {
  label: string;
  href: string;
  platform: Platform;
};

type Album = {
  title: string;
  year: string;
  coverSrc: string;
  coverAlt: string;
  summary: string;
  links: AlbumLink[];
};

const albums: Album[] = [
  {
    title: "Brave",
    year: "2023",
    coverSrc: "/images/albums/brave.jpg",
    coverAlt: "Brave EP artwork by Nathan Somevi.",
    summary: "Four tracks led by guitar, voice and a live-band sense of lift.",
    links: [
      { label: "Spotify", href: "https://open.spotify.com/playlist/2wI28exDiZg7PhucyWFyf9", platform: "spotify" },
      { label: "Apple Music", href: "https://music.apple.com/gb/album/brave-ep/1680881944", platform: "apple" },
      { label: "Bandcamp", href: "https://nathansomevi.bandcamp.com/album/brave", platform: "bandcamp" },
      { label: "Deezer", href: "https://www.deezer.com/album/426134147", platform: "deezer" },
      { label: "Tidal", href: "https://listen.tidal.com/album/287462562", platform: "tidal" },
    ],
  },
  {
    title: "Can't Be Done",
    year: "2020",
    coverSrc: "/images/albums/cant-be-done.jpg",
    coverAlt: "Can't Be Done EP artwork by Nathan Somevi.",
    summary: "The debut EP: future afro-jazz sketches with a warm rhythmic centre.",
    links: [
      { label: "Spotify", href: "https://open.spotify.com/album/6eaef6roLM8ehY8169VZtI", platform: "spotify" },
      { label: "Apple Music", href: "https://music.apple.com/gb/album/cant-be-done-ep/1532802688", platform: "apple" },
      { label: "Bandcamp", href: "https://nathansomevi.bandcamp.com/album/cant-be-done", platform: "bandcamp" },
      { label: "Amazon Music", href: "https://music.amazon.com/albums/B08JQQ5GJF", platform: "amazon" },
      { label: "Tidal", href: "https://listen.tidal.com/album/156174473", platform: "tidal" },
    ],
  },
];

function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === "spotify") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.29 17.34a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.58-1.17a.75.75 0 1 1-.33-1.47c4.6-1.03 8.53-.58 11.69 1.35.36.22.48.68.25 1.04Zm1.47-3.28a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.55-11.97-1.4a.94.94 0 1 1-.54-1.79c4.36-1.32 9.79-.67 13.49 1.6.44.27.58.85.31 1.28Zm.13-3.42c-3.89-2.31-10.31-2.52-14.02-1.37a1.13 1.13 0 1 1-.67-2.16c4.26-1.31 11.35-1.06 15.84 1.6a1.13 1.13 0 0 1-1.15 1.93Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (platform === "apple") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M15.7 6.3c.8-1 1.2-2.3 1.2-3.3-1.1.1-2.4.8-3.1 1.7-.7.8-1.3 2.1-1.2 3.3 1.3.1 2.4-.6 3.1-1.7Zm3.4 10.4c-.4 1-1 2.1-1.8 3-.9 1-1.9 2-3.3 2-1.3 0-1.8-.7-3.4-.7-1.6 0-2.1.7-3.5.7-1.4 0-2.4-.9-3.3-2C2 17.2 1 14.3 2.7 11.6c1.2-1.9 3.1-3.1 5.2-3.1 1.4 0 2.6.8 3.4.8.8 0 2.3-1 3.9-.9.7 0 2.7.3 4 2.2-3.5 1.8-2.9 5.9 0 6.1Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (platform === "bandcamp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.2 7.3h14.2l-4.6 9.4H1.6l4.6-9.4Z" fill="currentColor" />
      </svg>
    );
  }

  if (platform === "amazon") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.2 10.1c1.6 2.8 4.2 4.2 7.1 4.2 1.9 0 3.7-.5 5.4-1.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M16.8 12.9h2.9v2.9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.3 6.2h5.4a3 3 0 0 1 3 3v8.6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 12.2h8M12 8.2v8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export default function MusicAlbumTimeline() {
  return (
    <div className={styles.timeline} aria-label="Nathan Somevi releases in reverse chronological order">
      {albums.map((album, index) => (
        <article key={album.title} className={styles.albumSection}>
          <div className={styles.albumLayout} style={{ animationDelay: `${index * 120}ms` }}>
            <div className={styles.coverShell}>
              <Image
                className={styles.coverImage}
                src={album.coverSrc}
                alt={album.coverAlt}
                width={1200}
                height={1200}
                sizes="(max-width: 900px) 82vw, (max-width: 1200px) 38vw, 360px"
                priority={index === 0}
              />
            </div>

            <div className={styles.albumMeta}>
              <p className={styles.albumYear}>{album.year}</p>
              <h2 className={styles.albumTitle}>{album.title}</h2>
              <p className={styles.albumSummary}>{album.summary}</p>
            </div>

            <div className={styles.streamStack} aria-label={`${album.title} listening links`}>
              {album.links.map((link) => (
                <a
                  key={`${album.title}-${link.platform}`}
                  className={`${styles.streamLink} ${styles[link.platform]}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.streamIcon} aria-hidden="true">
                    <PlatformIcon platform={link.platform} />
                  </span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {index < albums.length - 1 ? <div className={styles.divider} aria-hidden="true" /> : null}
        </article>
      ))}
    </div>
  );
}
