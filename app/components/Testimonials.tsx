"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Card, CardContent } from "@/app/components/ui/card";
import { Marquee } from "@/app/components/ui/3d-testimonails";

// Unique reviews data with high-quality unsplash images
const testimonials = [
  {
    name: 'Ava Green',
    username: '@ava_design',
    body: 'Usama8Faheem made our vision 10x faster and more cinematic!',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    country: '🇦🇺 Australia',
  },
  {
    name: 'Ana Miller',
    username: '@ana_dev',
    body: 'The 3D engineering is absolutely a game changer for our brand!',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    country: '🇩🇪 Germany',
  },
  {
    name: 'Mateo Rossi',
    username: '@mat_motion',
    body: 'Animations are buttery smooth! Never seen such performance.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    country: '🇮🇹 Italy',
  },
  {
    name: 'Maya Patel',
    username: '@maya_creative',
    body: 'Setup was a breeze! The output is premium and elite.',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    country: '🇮🇳 India',
  },
  {
    name: 'Noah Smith',
    username: '@noah_tech',
    body: 'Best agency component work we have ever commissioned.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    country: '🇺🇸 USA',
  },
  {
    name: 'Lucas Stone',
    username: '@luc_vision',
    body: 'Very customizable and highly cinematic. Professional work.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    country: '🇫🇷 France',
  },
];

function TestimonialCard({ img, name, username, body, country }: (typeof testimonials)[number]) {
  return (
    <Card className="w-[240px] md:w-72 bg-white/90 border-neutral-100 shadow-xl shadow-neutral-100/20 rounded-[2rem] p-2 hover:border-brand/30 transition-colors will-change-transform">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 border-2 border-brand/10 bg-neutral-100">
            <AvatarImage src={img} alt={name} loading="lazy" />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-sm font-bold text-slate-900 flex items-center gap-2">
              {name} <span className="text-[10px]">{country}</span>
            </figcaption>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{username}</p>
          </div>
        </div>
        <blockquote className="mt-4 text-sm text-slate-600 leading-relaxed font-medium italic">"{body}"</blockquote>
      </CardContent>
    </Card>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="pt-12 md:pt-16 pb-10 bg-white relative overflow-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-10 md:mb-16">
           <div className="text-brand font-bold text-xs uppercase tracking-[0.3em]">
              Wall of Love
           </div>
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight"
           >
             What Our Clients <br /> Are Saying
           </motion.h2>
        </div>

        {/* 3D Marquee Demo Interaction */}
        <div className="relative flex h-[500px] md:h-[600px] w-full flex-row items-center justify-center overflow-hidden gap-4 md:gap-6 [perspective:1200px] py-10 scale-[0.8] sm:scale-95 md:scale-100">
          <div
            className="flex flex-row items-center gap-4 md:gap-6 will-change-transform"
            style={{
              transform:
                'rotateX(20deg) rotateY(-10deg) rotateZ(10deg)',
            }}
          >
            {/* 1st Row - Infinite Animation */}
            <div className="flex flex-col gap-6">
              <Marquee vertical repeat={6} className="[--duration:50s]">
                {testimonials.map((review) => (
                  <TestimonialCard key={review.username} {...review} />
                ))}
              </Marquee>
            </div>

            {/* 2nd Row - Upwards Infinite Animation */}
            <div className="flex flex-col gap-6">
              <Marquee vertical reverse repeat={6} className="[--duration:45s]">
                {testimonials.map((review) => (
                  <TestimonialCard key={review.username} {...review} />
                ))}
              </Marquee>
            </div>

            {/* 3rd Row - Downwards Infinite Animation (hidden on mobile) */}
            <div className="hidden md:flex flex-col gap-6">
              <Marquee vertical repeat={6} className="[--duration:55s]">
                {testimonials.map((review) => (
                  <TestimonialCard key={review.username} {...review} />
                ))}
              </Marquee>
            </div>
          </div>

          {/* Gradient overlays for cinematic fade */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white"></div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white"></div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center">
            <button className="bg-slate-900 text-white px-10 py-3.5 rounded-full font-bold text-sm shadow-2xl shadow-slate-200 hover:scale-105 transition-all">
                Join our vision
            </button>
        </div>
      </div>
    </section>
  );
}
