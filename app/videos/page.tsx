import { videoEmbeds } from "@/lib/site-data";
import { getFeaturedVideoUrl } from "@/lib/content";

export const dynamic = "force-dynamic";

const r2VideoBaseUrl =
  process.env.NEXT_PUBLIC_VIDEOS_BUCKET_BASE_URL?.trim() ||
  "https://pub-0dee575e552a4e74abaca2e55b934b92.r2.dev";

const hostedVideos = [
  {
    kind: "hosted",
    title: "VENESSA - Final Video",
    src: `${r2VideoBaseUrl}/venessa-final-video.mp4`,
    poster: "/video/venessa-thumbnail.jpg",
  },
  {
    kind: "hosted",
    title: "boh",
    src: `${r2VideoBaseUrl}/boh.mp4`,
    poster: "/video/boh-thumbnail.jpg",
  },
] as const;

const orderedVideos = [
  hostedVideos[0],
  { kind: "youtube", ...videoEmbeds[3] },
  { kind: "youtube", ...videoEmbeds[5] },
  hostedVideos[1],
  { kind: "youtube", ...videoEmbeds[1] },
  { kind: "youtube", ...videoEmbeds[2] },
  { kind: "youtube", ...videoEmbeds[4] },
  { kind: "youtube", ...videoEmbeds[0] },
] as const;

function getYouTubeEmbedUrl(input: string): string {
  try {
    const url = new URL(input);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}` : input;
    }

    if (host.includes("youtube.com")) {
      const videoId = url.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;

      const parts = url.pathname.split("/").filter(Boolean);
      const markerIndex = parts.findIndex((part) =>
        ["shorts", "live", "embed", "v"].includes(part)
      );
      if (markerIndex >= 0 && parts[markerIndex + 1]) {
        return `https://www.youtube.com/embed/${parts[markerIndex + 1]}`;
      }
    }

    return input;
  } catch {
    return input;
  }
}

export default async function VideosPage() {
  const featuredVideoUrl = await getFeaturedVideoUrl();
  const featuredEmbedUrl = featuredVideoUrl ? getYouTubeEmbedUrl(featuredVideoUrl) : "";

  return (
    <section className="px-6 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-6xl">
        {featuredEmbedUrl ? (
          <article className="mb-10 overflow-hidden rounded-[8px] border border-black/20 bg-[var(--accent)]">
            <div className="aspect-video">
              <iframe
                src={featuredEmbedUrl}
                title="Featured video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <div className="px-4 py-4 sm:px-5">
              <p className="eyebrow">Featured video</p>
              <h1 className="mt-3 text-2xl font-semibold text-white">
                Current feature
              </h1>
            </div>
          </article>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-2">
          {orderedVideos.map((video) => (
            <article
              key={video.kind === "hosted" ? video.src : video.id}
              className="overflow-hidden rounded-[8px] border border-black/20 bg-[var(--accent)]"
            >
              <div className="aspect-video">
                {video.kind === "hosted" ? (
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={video.poster}
                    className="h-full w-full bg-black"
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                ) : (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full"
                  />
                )}
              </div>
              <div className="px-4 py-4 sm:px-5">
                <p className="eyebrow">Featured video</p>
                <h2 className="mt-3 text-xl font-semibold text-white">{video.title}</h2>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
