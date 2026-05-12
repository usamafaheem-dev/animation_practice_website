import React from "react";
import { TextRevealByWord } from "./ui/text-reveal";

// --- Zero-Dependency Icons ---
const Box = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
const Layers = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const PenTool = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>;
const Layout = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>;
const Monitor = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
const Smartphone = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>;
const Globe = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const Wand2 = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4.5l-2-2-12 12-2 2a2.828 2.828 0 0 0 4 4l2-2 12-12-2-2z"/><path d="M9 11l4 4"/><path d="M3.5 13l2 2-2-2z"/><path d="M11 3.5l2 2-2-2z"/><path d="M15.5 8l2 2-2-2z"/></svg>;

const cardsData = [
  { title: "3D Motion", subtitle: "on hover", icon: Box },
  { title: "Visual Loops", subtitle: "on hover", icon: Layers },
  { title: "Creative", subtitle: "Services", icon: PenTool },
  { title: "Interactive", subtitle: "Cards", icon: Layout },
  { title: "UI/UX", subtitle: "Engineering", icon: Monitor },
  { title: "Marketing", subtitle: "Assets", icon: Globe },
  { title: "App Design", subtitle: "on hover", icon: Smartphone },
  { title: "Magic Flow", subtitle: "Management", icon: Wand2 },
];

export default function About() {
  return (
    <section id="about" className="relative bg-white pt-4 pb-10 md:pt-10 md:pb-20 overflow-hidden -mt-1">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center relative z-10 bg-white pb-2">
         <div className="text-brand font-bold text-xs uppercase tracking-[0.3em]">
            About Us
         </div>
      </div>

      <TextRevealByWord 
        text="Design is our engine. Precision is our craft. We define the future of digital expression through elite code and cinematic motion. We don't just build websites; we engineer digital emotions that resonate. Every frame is a masterpiece, every interaction is a journey." 
        className="font-poppins"
      />
      
      {/* 3D Cards Grid Segment */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-12 relative z-10 bg-white">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {cardsData.map((data, idx) => (
               <div 
                 key={idx} 
                 className="group relative bg-white/80 backdrop-blur-xl border border-neutral-100 p-6 md:p-8 rounded-[2rem] flex flex-col items-center text-center gap-4 md:gap-6 cursor-pointer transition-all duration-500 hover:-translate-y-3 shadow-[0_20px_40px_-15px_rgba(244,63,94,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(244,63,94,0.25)]"
               >
                 {/* 3D Icon Container */}
                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand to-rose-400 shadow-lg shadow-brand/30 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <data.icon className="w-8 h-8 text-white stroke-[1.5]" />
                 </div>
                 
                 {/* Text Content */}
                 <div>
                    <h3 className="text-slate-900 font-bold text-base md:text-lg tracking-tight font-poppins">{data.title}</h3>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-1">{data.subtitle}</p>
                 </div>

                 {/* Subtle inner highlight for 3D glass effect */}
                 <div className="absolute inset-0 rounded-[2rem] border-2 border-white/40 pointer-events-none mix-blend-overlay"></div>
               </div>
            ))}
         </div>
      </div>
    </section>
  );
}
