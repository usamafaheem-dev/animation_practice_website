"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameCount = 157;

  // Track scroll progress of the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to frame index (0 to 156)
  const rawFrameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);
  const frameIndex = useSpring(rawFrameIndex, { stiffness: 300, damping: 30 });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Preload images for smooth playback (Optimized: Desktop only)
  useEffect(() => {
    // Save massive bandwidth: abort preload entirely if on mobile
    if (window.innerWidth < 1024) return;

    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const frameNumber = i.toString().padStart(3, '0');
        img.src = `/frames/ezgif-frame-${frameNumber}.png`;
        img.onload = () => {
            loadedCount++;
            if (loadedCount === frameCount) {
                setImages(loadedImages);
                // Draw initial frame
                const ctx = canvasRef.current?.getContext('2d');
                if (ctx && loadedImages[0]) {
                   ctx.drawImage(loadedImages[0], 0, 0, 800, 800);
                }
            }
        };
        loadedImages.push(img);
    }
  }, []);

  // Sync scroll to canvas draw directly (bypassing slow React state)
  useEffect(() => {
    return frameIndex.on("change", (latest) => {
        const idx = Math.round(latest);
        if (images.length > 0 && images[idx] && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, 800, 800);
                ctx.drawImage(images[idx], 0, 0, 800, 800);
            }
        }
    });
  }, [frameIndex, images]);

  return (
    <section ref={sectionRef} id="services" className="relative bg-white min-h-0 lg:min-h-[400vh]" style={{ fontFamily: "'Poppins', 'Arial', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-0 flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-20 items-center lg:sticky lg:top-0 lg:h-[100vh] lg:overflow-hidden transition-all duration-300">
        
        {/* Left - Content (Clean & Normal Typography) */}
        <div
           className="relative space-y-6 lg:space-y-8 z-10 w-full shrink-0"
        >
          <div className="space-y-2 lg:space-y-4">
             <div className="text-brand font-bold text-xs uppercase tracking-widest">
                Our Services
             </div>

             <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
               Precision Engineering <span className="hidden lg:inline"><br/></span>& Visual Mastery
             </h2>

             <p className="text-slate-600 max-w-lg leading-relaxed text-sm md:text-base">
                Transforming complex concepts into cinematic digital realities. 
                Our team builds high-performance 3D systems that bridge 
                the gap between technology and creative vision.
             </p>
          </div>

          {/* Service Stats - Simplified */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
             <div className="space-y-1">
                <p className="text-3xl lg:text-3xl font-bold text-slate-900">99%</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Visual Fidelity</p>
             </div>
             <div className="space-y-1">
                <p className="text-3xl lg:text-3xl font-bold text-slate-900">120+</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Projects Delivered</p>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 pt-2 w-full">
             <button className="w-full sm:w-auto bg-brand text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-brand/20 hover:bg-brand/90 transition-all duration-300">
                View Capabilities
             </button>
             <button className="w-full sm:w-auto bg-white border border-neutral-200 text-slate-800 px-8 py-3 rounded-full font-bold text-sm hover:bg-neutral-50 transition-all duration-300">
                Tech Stack
             </button>
          </div>
        </div>

        {/* Right - Scroll-Triggered Frame Animation (Desktop Only) */}
        <div className="hidden lg:flex relative flex-1 min-h-0 items-center justify-center z-0 lg:z-10 mt-2 lg:mt-0 w-full overflow-hidden">
            <motion.div 
               className="relative w-full max-w-full h-full lg:max-w-[480px] aspect-square flex items-center justify-center bg-transparent overflow-hidden"
            >
                <canvas 
                   ref={canvasRef}
                   width={800}
                   height={800}
                   className="w-full h-full object-cover lg:object-contain pointer-events-none scale-110"
                />
            </motion.div>
        </div>
      </div>
    </section>
  );
}
