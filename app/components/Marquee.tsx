"use client";

const brands = [
  "Microsoft", "Figma", "Stripe", "Next.js", "Vercel", "Tailwind", "Github", "Prisma"
];

export default function Marquee() {
  return (
    <section className="py-20 bg-white border-y border-neutral-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-center bg-transparent">
        <h3 className="text-xl font-black text-neutral-900 tracking-tighter uppercase italic">
          Intersection of Art <br /> & Technology
        </h3>
        <div className="flex gap-4">
           <div className="w-10 h-10 rounded-full border border-neutral-100 flex items-center justify-center text-neutral-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
           </div>
           <div className="w-10 h-10 rounded-full border border-neutral-100 flex items-center justify-center text-neutral-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
           </div>
        </div>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden group select-none py-10">
          <div className="flex gap-20 md:gap-32 animate-marquee whitespace-nowrap min-w-full items-center">
            {brands.map((brand, i) => (
              <div 
                key={`${brand}-${i}`} 
                className="flex items-center gap-4 grayscale opacity-20 hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full border-4 border-neutral-900" />
                <span className="text-lg md:text-xl font-black text-neutral-900 uppercase tracking-widest">
                  {brand}
                </span>
              </div>
            ))}
          </div>
          
          <div className="absolute top-10 flex gap-20 md:gap-32 animate-marquee2 whitespace-nowrap min-w-full items-center" aria-hidden="true">
            {brands.map((brand, i) => (
              <div 
                key={`${brand}-${i}-copy`} 
                className="flex items-center gap-4 grayscale opacity-20 hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full border-4 border-neutral-900" />
                <span className="text-lg md:text-xl font-black text-neutral-900 uppercase tracking-widest">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 50s linear infinite;
        }
      `}</style>
    </section>
  );
}
