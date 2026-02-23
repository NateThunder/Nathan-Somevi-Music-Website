import Image from "next/image";

export default function EPK() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-white text-5xl md:text-7xl font-serif font-black mb-12 tracking-tighter uppercase text-center">EPK</h1>

        <p className="text-white/60 text-center mb-12 uppercase tracking-[0.2em] text-sm">Click below to download my EPK</p>

        <div className="flex flex-col items-center gap-12">
          <div className="relative w-48 h-64 shadow-2xl transition-transform hover:scale-105">
            <Image
              src="https://static.wixstatic.com/media/0b48cb_d071d2c14fda47a693c38a547f0fb0a7~mv2.jpg"
              alt="Nathan Somevi EPK"
              fill
              className="object-cover border border-white/10"
              unoptimized
            />
          </div>

          <a
            href="https://www.nathansomevi.com/_files/archives/0b48cb_719963f62d3a4445bfbf6e987a4dff21.zip?dn=EPK.zip"
            className="bg-[#8B4513] hover:bg-[#6D3610] text-white px-12 py-5 font-bold uppercase tracking-widest transition-all hover:px-16"
          >
            Download EPK
          </a>
        </div>
      </div>
    </main>
  );
}
