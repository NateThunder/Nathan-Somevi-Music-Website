import Image from "next/image";
import type { GalleryImage } from "@/lib/site-data";

const layoutMap: Record<GalleryImage["layout"], string> = {
  portrait: "aspect-[4/5]",
  tall: "aspect-[4/5] md:aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[16/10]",
};

type PhotoGalleryProps = {
  images: GalleryImage[];
  priorityCount?: number;
};

export default function PhotoGallery({ images, priorityCount = 0 }: PhotoGalleryProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {images.map((image, index) => (
        <li key={image.src} className={`group relative overflow-hidden rounded-[8px] border border-white/10 ${layoutMap[image.layout]}`}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index < priorityCount}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </li>
      ))}
    </ul>
  );
}
