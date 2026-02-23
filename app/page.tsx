import Image from "next/image";

const Navigation = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 bg-opacity-90 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <span className="text-white font-serif text-sm tracking-widest hidden sm:inline"></span>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6 text-white text-sm">
          <a href="#home" className="hover:text-amber-600 transition">Home</a>
          <a href="#gigs" className="hover:text-amber-600 transition">Gigs</a>
          <a href="#music" className="hover:text-amber-600 transition">Music</a>
          <a href="#videos" className="hover:text-amber-600 transition">Videos</a>
          <a href="#bio" className="hover:text-amber-600 transition">Bio</a>
          <a href="#lpk" className="hover:text-amber-600 transition">LPK</a>
        </div>
        <div className="flex items-center gap-3 border-l border-white/20 pl-6">
          <a href="#youtube" className="text-white hover:text-amber-600 transition">▶</a>
          <a href="#insta" className="text-white hover:text-amber-600 transition">📷</a>
          <a href="#tiktok" className="text-white hover:text-amber-600 transition">🎵</a>
          <a href="#twitter" className="text-white hover:text-amber-600 transition">𝕏</a>
          <a href="#facebook" className="text-white hover:text-amber-600 transition">f</a>
        </div>
      </div>
    </div>
  </nav>
);

const HeroSection = () => (
  <section className="min-h-screen bg-zinc-800 flex flex-col items-center justify-center pt-20 px-4 md:px-8 relative">
    <div className="w-full max-w-6xl relative">
      <h1 className="text-center text-5xl md:text-7xl font-serif tracking-wide text-white mb-8 md:mb-12">
        NATHAN SOMEVI
      </h1>
      
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] mb-8">
        <Image
          src="/nathan-hero.jpg"
          alt="Nathan Somevi with guitar"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <button className="absolute bottom-8 right-8 bg-amber-700 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium transition shadow-lg">
        💬 Let's Chat!
      </button>
    </div>
  </section>
);

const ContactSection = () => (
  <section className="bg-black py-20 px-4 text-center">
    <h2 className="text-4xl font-serif text-white mb-8 tracking-wide">CONTACT</h2>
    <p className="text-white text-lg mb-12">manager@nathansomevi.com</p>
    
    <div className="flex justify-center gap-6">
      <a href="#youtube" className="text-white text-3xl hover:text-amber-600 transition">▶</a>
      <a href="#insta" className="text-white text-3xl hover:text-amber-600 transition">📷</a>
      <a href="#tiktok" className="text-white text-3xl hover:text-amber-600 transition">🎵</a>
      <a href="#twitter" className="text-white text-3xl hover:text-amber-600 transition">𝕏</a>
      <a href="#facebook" className="text-white text-3xl hover:text-amber-600 transition">f</a>
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="bg-black">
      <Navigation />
      <HeroSection />
      <ContactSection />
    </div>
  );
}
