export type NavItem = {
  href: string;
  label: string;
};

export type SocialLink = {
  name: "YouTube" | "Instagram" | "TikTok" | "X" | "Facebook";
  href: string;
};

export type MusicPlatform = {
  label: string;
  href: string;
  description: string;
};

export type ReleasePlatformTone = "spotify" | "light" | "black" | "bandcamp";

export type ReleasePlatformLink = {
  name: string;
  href: string;
  logo: string;
  tone: ReleasePlatformTone;
};

export type LatestRelease = {
  label: string;
  title: string;
  coverSrc: string;
  coverAlt: string;
  platforms: ReleasePlatformLink[];
};

export type VideoEmbed = {
  id: string;
  title: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  layout: "portrait" | "tall" | "square" | "wide";
};

export const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/music", label: "Music" },
  { href: "/videos", label: "Videos" },
  { href: "/live", label: "Live" },
  { href: "/bio", label: "Bio" },
  { href: "/epk", label: "EPK" },
];

export const contactInfo = {
  email: "manager@nathansomevi.com",
  supportingCopy:
    "Use the form for direct submissions, or email the manager address for a straight booking or press conversation.",
};

export const socialLinks: SocialLink[] = [
  { name: "YouTube", href: "https://www.youtube.com/user/somesomevi" },
  { name: "Instagram", href: "https://www.instagram.com/nathansomevi/" },
  { name: "TikTok", href: "https://www.tiktok.com/@nathansomevi" },
  { name: "X", href: "https://twitter.com/NSomevi" },
  { name: "Facebook", href: "https://www.facebook.com/Nathan-Somevi-102137791151677" },
];

export const musicPlatforms: MusicPlatform[] = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/playlist/2wI28exDiZg7PhucyWFyf9",
    description: "Stream the featured playlist and keep new releases close in the Spotify library.",
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/gb/album/brave-ep/1680881944",
    description: "Open the release on Apple Music for playback across the wider Apple ecosystem.",
  },
  {
    label: "Bandcamp",
    href: "https://nathansomevi.bandcamp.com/album/brave",
    description: "Visit Bandcamp for the direct-support route to the release.",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/user/somesomevi",
    description: "Watch the video catalogue and live-session footage on the main channel.",
  },
];

export const spotifyAlbumEmbedUrl =
  "https://open.spotify.com/embed/playlist/2wI28exDiZg7PhucyWFyf9?utm_source=generator&theme=0";

export const latestRelease: LatestRelease = {
  label: "Latest Release",
  title: "Brave - EP",
  coverSrc: "/images/albums/brave.jpg",
  coverAlt: "Brave EP artwork by Nathan Somevi.",
  platforms: [
    {
      name: "Spotify",
      href: "https://open.spotify.com/playlist/2wI28exDiZg7PhucyWFyf9",
      logo: "/media/spotify.avif",
      tone: "spotify",
    },
    {
      name: "Apple Music",
      href: "https://music.apple.com/gb/album/brave-ep/1680881944",
      logo: "/media/apple.avif",
      tone: "light",
    },
    {
      name: "Deezer",
      href: "https://www.deezer.com/album/426134147",
      logo: "/media/deezer.avif",
      tone: "black",
    },
    {
      name: "Bandcamp",
      href: "https://nathansomevi.bandcamp.com/album/brave",
      logo: "/media/bandcamp.avif",
      tone: "bandcamp",
    },
    {
      name: "Tidal",
      href: "https://listen.tidal.com/album/287462562",
      logo: "/media/tidal.avif",
      tone: "light",
    },
    {
      name: "Amazon Music",
      href: "https://music.amazon.co.uk/albums/B0C1SRY631",
      logo: "/media/amazon.avif",
      tone: "light",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/user/somesomevi",
      logo: "/media/youtube.avif",
      tone: "light",
    },
  ],
};

export const videoEmbeds: VideoEmbed[] = [
  { id: "B2NtNqFnf_M", title: "Nathan Somevi video selection 01" },
  { id: "EG5R5IJrTAY", title: "Nathan Somevi video selection 02" },
  { id: "IxF0Db9PRI4", title: "Nathan Somevi video selection 03" },
  { id: "qLIwXeKniNc", title: "Nathan Somevi video selection 04" },
  { id: "UWFQcgs7Tsw", title: "Nathan Somevi video selection 05" },
  { id: "Z1df7R9oyVo", title: "Nathan Somevi video selection 06" },
];

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/ifro/nathan-portrait-01.jpg",
    alt: "Nathan Somevi seated with guitar during portrait session.",
    layout: "tall",
  },
  {
    src: "/images/ifro/nathan-portrait-02.jpg",
    alt: "Nathan Somevi in black shirt holding guitar.",
    layout: "portrait",
  },
  {
    src: "/images/ifro/nathan-portrait-03.jpg",
    alt: "Nathan Somevi close portrait with guitar across frame.",
    layout: "portrait",
  },
  {
    src: "/images/ifro/nathan-portrait-04.jpg",
    alt: "Nathan Somevi seated with guitar in white shirt.",
    layout: "portrait",
  },
  {
    src: "/images/ifro/nathan-portrait-05.jpg",
    alt: "Nathan Somevi side profile portrait in grey jacket.",
    layout: "portrait",
  },
  {
    src: "/images/ifro/nathan-portrait-06.jpg",
    alt: "Nathan Somevi smiling in black jacket portrait.",
    layout: "portrait",
  },
  {
    src: "/images/ifro/nathan-portrait-07.jpg",
    alt: "Nathan Somevi studio portrait with guitar on shoulder.",
    layout: "portrait",
  },
  {
    src: "/images/ifro/nathan-portrait-08.jpg",
    alt: "Nathan Somevi standing beside guitar in checked trousers.",
    layout: "portrait",
  },
  {
    src: "/images/ifro/nathan-portrait-09.jpg",
    alt: "Nathan Somevi close neutral portrait facing camera.",
    layout: "portrait",
  },
  {
    src: "/images/ifro/nathan-portrait-10.jpg",
    alt: "Nathan Somevi portrait in light jacket.",
    layout: "portrait",
  },
  {
    src: "/images/ifro/nathan-portrait-11.jpg",
    alt: "Nathan Somevi with guitar held upright in studio.",
    layout: "portrait",
  },
  {
    src: "/images/ifro/nathan-portrait-12.jpg",
    alt: "Nathan Somevi in close portrait with black jacket and guitar.",
    layout: "portrait",
  },
];

export const featuredGalleryImages = galleryImages.slice(0, 4);

export const pageHeroImages = {
  music: galleryImages[3].src,
  videos: galleryImages[5].src,
  bio: galleryImages[2].src,
  contact: galleryImages[9].src,
};

export const siteCopy = {
  heroTitle: "Nathan Somevi",
  heroSummary:
    "Future afro-jazz rooted in live feel, guitar-led songwriting and a performance approach built to hold the room.",
  homeIntro: [
    "Nathan Somevi builds songs, sessions and live sets around a clear rhythmic centre, warm low-end detail and a vocal-led sense of motion.",
    "This version of the site keeps the public routes clean: music, video and biography all sit one step away from the first screen.",
  ],
};

export const homeFeatureLinks = [
  {
    href: "/videos",
    kicker: "Watch",
    label: "Live and studio clips",
    description: "Current YouTube selections gathered into one viewing page.",
    imageSrc: galleryImages[5].src,
    imageAlt: galleryImages[5].alt,
  },
];

export const bioParagraphs = [
  "Nathan Somevi, a Ghanaian-born British musician, honed his musical talents in the vibrant atmosphere of church performances during his upbringing. Inspired by his roots, he embarked on a musical journey enriched by diverse influences.",
  "Among his inspirations, the innovative guitar stylings of Charlie Hunter have left an indelible mark on Somevi's sound, particularly his use of hybrid guitars blending bass and guitar elements, contributing to the captivating essence of his musical projects.",
  "In 2020, Somevi released his EP \"Can't Be Done,\" a testament to his evolving artistry. Following this success, he continued to push boundaries, releasing \"Brave\" in 2023, further solidifying his position as a versatile and dynamic artist.",
  "Throughout his career, Somevi's talent has not gone unnoticed. He was honored with nominations for both the Scottish Alternative Music Award in 2020 and the Scottish Jazz Award in 2023, affirming his impact on the contemporary music scene.",
  "While initially recognized for his contributions as a session musician, the challenges presented by the pandemic encouraged Somevi to explore new avenues, leading him to discover the joy of creating his own music and finding fulfillment in expressing his unique musical voice.",
];
