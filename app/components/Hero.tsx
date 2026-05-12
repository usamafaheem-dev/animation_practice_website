"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the 3D FluidObject to ensure client-side rendering
const FluidObject = dynamic(() => import("./FluidObject"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-50/50 animate-pulse" />
});

export default function Hero() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] flex items-center overflow-hidden bg-white pt-16"
    >
      {/* Background Decor */}
      <motion.div 
        animate={{ 
          x: mousePos.x * 50,
          y: mousePos.y * 50
        }}
        className="absolute top-20 left-10 w-[400px] h-[400px] bg-brand/5 blur-[120px] rounded-full -z-10 pointer-events-none opacity-60"
      />

      {/* Full Hero Background 3D Canvas Area */}
      <div className="absolute inset-0 z-0 overflow-visible pointer-events-none">
        <div className="w-full h-full pointer-events-auto">
          <FluidObject />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full h-full flex flex-col items-center justify-center relative z-10 pointer-events-none text-center">
        {/* Centered Content Area with Refined Proportions */}
        <div className="flex flex-col gap-6 items-center pointer-events-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-4 py-1.5 rounded-full border border-neutral-200 bg-white/50 backdrop-blur-sm text-slate-500 text-[9px] font-bold uppercase tracking-[0.4em] font-poppins"
          >
            Digital Craftsmanship
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight font-poppins"
          >
            Powerful <br /> 
            <span className="text-brand">Expression</span> <br />
            <span className="text-[0.3em] font-bold tracking-[0.4em] block text-slate-500 mt-5 lowercase">code-driven 3d mastery</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-700 max-w-sm leading-relaxed text-sm md:text-base font-medium"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            We define the future of digital interaction through high-impact motion 
            design and production-grade 3D code.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-5 mt-4"
          >
             <button className="relative overflow-hidden group bg-brand text-white px-10 py-3.5 rounded-full font-bold text-[11px] shadow-lg shadow-brand/20 hover:-translate-y-0.5 transition-all uppercase tracking-wider">
                <span className="relative z-10">The Lab</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
             </button>
             <button className="border border-neutral-300 text-slate-800 px-10 py-3.5 rounded-full font-bold text-[11px] hover:bg-neutral-50 transition-all uppercase tracking-wider">
                Case Studies
             </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
