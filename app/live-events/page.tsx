import type { Metadata } from "next";
import LivePage from "@/components/LivePage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Live Events",
  description:
    "Upcoming live dates, booking details, and performance enquiries for Nathan Somevi.",
};

export default LivePage;
