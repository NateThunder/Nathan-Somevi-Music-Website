import LiveEventsSection from "@/components/LiveEventsSection";
import { getTourDates } from "@/lib/content";

export default async function LivePage() {
  const tourDates = await getTourDates();

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <LiveEventsSection events={tourDates} />
    </div>
  );
}
