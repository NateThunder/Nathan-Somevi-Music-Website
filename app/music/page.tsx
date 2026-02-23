import Image from "next/image";

const musicLinks = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/album/6WyZeuKM8kTglJGmebxJSt",
    img: "https://static.wixstatic.com/media/0b48cb_100fb3f996104a96a746f2a9dc00f92b~mv2.png/v1/crop/x_0,y_194,w_768,h_159/fill/w_305,h_60,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/folder_920_201707260845-1.png",
  },
  {
    name: "Apple Music",
    url: "https://music.apple.com/gb/album/brave-ep/1680881944",
    img: "https://static.wixstatic.com/media/0b48cb_37a035dd3b4345189739ca2a8437edae~mv2.png/v1/crop/x_0,y_34,w_800,h_167/fill/w_305,h_60,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5433786-apple-music-commercial-production-the-madrona-bureau-apple-music-logo-png-800_416_.png",
  },
  {
    name: "Deezer",
    url: "https://www.deezer.com/en/album/426134147",
    img: "https://static.wixstatic.com/media/0b48cb_8b05440c957a4ec2b54433ab009ea03f~mv2.jpg/v1/crop/x_0,y_133,w_810,h_196/fill/w_305,h_69,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/06PkJTvZ141lzEoed0OZ61w-11_1569482420_fit_lim_size_1050x591.jpg",
  },
  {
    name: "Bandcamp",
    url: "https://nathansomevi.bandcamp.com/album/brave",
    img: "https://static.wixstatic.com/media/0b48cb_3cf8beda9a90405e9229d04a6fd79779~mv2.png/v1/crop/x_0,y_28,w_365,h_79/fill/w_305,h_62,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/images.png",
  },
  {
    name: "Tidal",
    url: "https://tidal.com/browse/album/287462562",
    img: "https://static.wixstatic.com/media/0b48cb_cf1dfd5fef974e37a483310219b9d020~mv2.png/v1/crop/x_0,y_153,w_900,h_195/fill/w_305,h_63,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/tidal-vector-logo.png",
  },
  {
    name: "Amazon Music",
    url: "https://music.amazon.co.uk/albums/B0C1SRY631",
    img: "https://static.wixstatic.com/media/0b48cb_c74c5d115c944c1aa955e88dd1dd0058~mv2.jpg/v1/crop/x_0,y_181,w_800,h_173/fill/w_305,h_64,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/800-x-500-2-2.jpg",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/watch?v=lQaLu4_bqYo&list=PLeVn9UP6Np29qdV3A0qQBbzNuQuyh9_5I",
    img: "https://static.wixstatic.com/media/0b48cb_8879e69d458642239562de8fae1e546c~mv2.png/v1/fill/w_303,h_62,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/download.png",
  },
];

export default function Music() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-20 flex flex-col items-center px-4">
      <div className="max-w-4xl w-full flex flex-col items-center">
        <div className="relative w-72 h-72 mb-12 shadow-2xl">
          <Image
            src="https://static.wixstatic.com/media/0b48cb_8abf9d2f4f7048cebeb961c32a2e677f~mv2.jpg"
            alt="Brave EP"
            fill
            className="object-cover border border-white/10"
            unoptimized
          />
        </div>

        <h1 className="text-white text-4xl md:text-5xl font-serif font-black mb-12 tracking-tighter uppercase">BRAVE EP</h1>

        <div className="flex flex-col gap-6 w-full max-w-[305px]">
          {musicLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105 active:scale-95"
            >
              <Image
                src={link.img}
                alt={link.name}
                width={305}
                height={60}
                className="object-contain"
                unoptimized
              />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
