"use client";
import { cn } from "@/lib/utils";
import { LogoCloud } from "@/app/components/ui/logo-cloud-3";
import { motion } from "framer-motion";

const logos = [
  {
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
    alt: "Nvidia Logo",
  },
  {
    src: "https://svgl.app/library/supabase_wordmark_light.svg",
    alt: "Supabase Logo",
  },
  {
    src: "https://svgl.app/library/openai_wordmark_light.svg",
    alt: "OpenAI Logo",
  },
  {
    src: "https://svgl.app/library/turso-wordmark-light.svg",
    alt: "Turso Logo",
  },
  {
    src: "https://svgl.app/library/vercel_wordmark.svg",
    alt: "Vercel Logo",
  },
  {
    src: "https://svgl.app/library/github_wordmark_light.svg",
    alt: "GitHub Logo",
  },
  {
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
    alt: "Claude AI Logo",
  },
  {
    src: "https://svgl.app/library/clerk-wordmark-light.svg",
    alt: "Clerk Logo",
  },
];

export default function LogoSection() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div
        aria-hidden="true"
        className={cn(
          "-z-10 -top-1/2 -translate-x-1/2 pointer-events-none absolute left-1/2 h-[100vmin] w-[100vmin] rounded-b-full",
          "bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.05),transparent_60%)]",
          "blur-[40px]"
        )}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-10"
        >
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
              <span className="text-slate-400 font-medium">Trusted by industry leaders.</span>
              <br />
              Helping visionaries build the future.
            </h2>
            <div className="mx-auto mt-4 h-px max-w-xs bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
        </motion.div>

        <LogoCloud logos={logos} />

        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      </div>
    </section>
  );
}
