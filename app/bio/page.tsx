import Image from "next/image";
import Link from "next/link";
import PhotoGallery from "@/components/PhotoGallery";
import { getAboutContent } from "@/lib/content";
import { contactInfo, galleryImages, pageHeroImages } from "@/lib/site-data";

export default async function BioPage() {
  const about = await getAboutContent();

  return (
    <>
      <section className="px-6 pb-20 pt-32 sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <p className="eyebrow">Bio</p>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="section-copy max-w-2xl">
                {paragraph}
              </p>
            ))}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/music"
                className="inline-flex min-h-[54px] min-w-[150px] items-center justify-center rounded-[8px] border border-[#e7aa35] bg-[#e7aa35] px-7 text-sm font-extrabold uppercase text-black shadow-none hover:bg-black hover:text-[#e7aa35]"
              >
                Listen
              </Link>
              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-flex min-h-[54px] min-w-[150px] items-center justify-center rounded-[8px] border border-[#e7aa35] bg-[#e7aa35] px-7 text-sm font-extrabold uppercase text-black shadow-none hover:bg-black hover:text-[#e7aa35]"
              >
                Email
              </a>
            </div>
          </div>
          <div className="relative aspect-[1383/2048] w-full overflow-hidden rounded-[8px] border border-white/10">
            <Image
              src={pageHeroImages.contact}
              alt="Nathan Somevi studio portrait."
              fill
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <div>
            <PhotoGallery images={galleryImages} priorityCount={2} />
          </div>
        </div>
      </section>
    </>
  );
}
