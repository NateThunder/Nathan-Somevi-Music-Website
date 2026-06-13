import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";
import LatestReleaseSection from "@/components/LatestReleaseSection";
import { contactInfo } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <HeroBanner />

      <LatestReleaseSection />

      <section className="border-y-[10px] border-black bg-[#e7aa35] px-6 py-24 text-[#171008] sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto w-full max-w-[966px]">
          <h2 className="font-anton max-w-none text-[clamp(2rem,12vw,3.15rem)] font-normal uppercase leading-[0.98] text-black sm:whitespace-nowrap sm:text-[2.3rem] lg:text-[2.75rem]">
            Discography starts here.
          </h2>
          <p className="mt-7 max-w-[790px] text-lg leading-[1.55] text-black/82 sm:text-xl">
            Move through the releases, streaming links and guitar-led songs in one place.
          </p>

          <Link
            href="/music"
            className="mt-9 inline-flex min-h-[54px] min-w-[210px] items-center justify-center rounded-[8px] border border-black px-7 text-sm font-extrabold uppercase text-black hover:bg-black hover:text-[#e7aa35]"
          >
            Listen
          </Link>

          <a
            href={`mailto:${contactInfo.email}`}
            className="mt-8 block break-words text-sm font-bold uppercase text-black/82 hover:text-black"
          >
            {contactInfo.email}
          </a>
        </div>
      </section>
    </>
  );
}
