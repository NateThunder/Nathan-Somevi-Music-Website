const gigs = [
  {
    city: "Glasgow",
    date: "22/06/2025 @ 13:00",
    festival: "Glasgow Jazz Festival",
    venue: "Saint Luke's & The Winged Ox",
    link: "https://www.seetickets.com/event/new-jazzwegians-azamiah-aku-nathan-somevi-trio/st-luke-s/3423819",
    linkLabel: "Tickets",
  },
  {
    city: "Edinburgh",
    date: "15/07/2025 @ 20:00",
    festival: "Edinburgh Jazz Festival",
    venue: "The Jazz Bar",
    link: "https://ejbf.co.uk/products/nathan-somevi-future-afro-jazz",
    linkLabel: "Tickets",
  },
  {
    city: "Aberdeen",
    date: "20/07/2025",
    festival: "Aberdeen Tall Ships festival",
    venue: "Quayside Concerts",
    link: "https://www.tallshipsaberdeen.com/whats-on/quayside-concerts/",
    linkLabel: "Info",
  },
];

export default function Gigs() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-5xl md:text-7xl font-serif font-black mb-16 tracking-tighter uppercase text-center">GIGS</h1>

        <div className="flex flex-col gap-8">
          {gigs.map((gig, index) => (
            <div
              key={index}
              className="group flex flex-col md:flex-row items-center justify-between py-8 border-b border-white/10 hover:border-amber-500/50 transition-colors gap-6"
            >
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-1">{gig.city}</span>
                <span className="text-white text-xl font-medium">{gig.date}</span>
              </div>

              <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 md:ml-12">
                <span className="text-white/60 text-sm uppercase tracking-widest mb-1">{gig.festival}</span>
                <span className="text-white text-lg italic font-serif">{gig.venue}</span>
              </div>

              <a
                href={gig.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-amber-500 hover:text-white transition-all"
              >
                {gig.linkLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
