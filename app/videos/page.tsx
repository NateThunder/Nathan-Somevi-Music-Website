const videos = [
  {
    title: "Nathan Somevi x Niall Ford x Mateusz Sobieski - Can't Be Done",
    id: "qLIwXeKniNc",
  },
  {
    title: "EJBF Introducing Series - Nathan Somevi",
    id: "Z1df7R9oyVo",
  },
  {
    title: "Nathan Somevi - Happy Times [Distiller & Friends]",
    id: "IxF0Db9PRI4",
  },
  {
    title: "Nathan Somevi - Family Party [Distiller & Friends]",
    id: "EG5R5IJrTAY",
  },
  {
    title: "Norah Jones - Don't Know Why (Cover)",
    id: "B2NtNqFnf_M",
  },
  {
    title: "Carole King - You've Got A Friend (Cover)",
    id: "UWFQcgs7Tsw",
  },
  {
    title: "Nathan Somevi - Brave EP",
    id: "lQaLu4_bqYo",
  }
];

export default function Videos() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-5xl md:text-7xl font-serif font-black mb-16 tracking-tighter uppercase text-center">VIDEOS</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {videos.map((video, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="relative aspect-video w-full group overflow-hidden border border-white/10">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
              <h3 className="text-white text-sm uppercase tracking-widest font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
