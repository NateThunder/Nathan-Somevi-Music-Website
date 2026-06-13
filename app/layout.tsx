import type { Metadata } from "next";
import { Anton, Montserrat, Playfair_Display } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nathansomevi.com"),
  title: {
    default: "Nathan Somevi | Music",
    template: "%s | Nathan Somevi",
  },
  description:
    "Nathan Somevi is an artist, guitarist, songwriter and performer building future afro-jazz in live rooms, releases and collaborations.",
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${montserrat.variable} ${playfair.variable} page-shell antialiased`}>
        <SiteHeader />
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
