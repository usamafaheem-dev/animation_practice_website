"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "What service do you affor?", a: "We specialize in modern web development, UI/UX design, and 3D visual storytelling for premium brands." },
  { q: "How do you handle custom projects?", a: "Each project starts with a discovery phase to align on goals, followed by design and agile development." },
  { q: "What industries do you specialize in?", a: "We work across Tech, Fintech, Fashion, and Creative agencies looking for high-end digital presence." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Frequently Asked <br />
            Questions
          </h2>
        </motion.div>

        {/* Accordion - Minimal style from screenshot */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-3xl border transition-all ${
                open === i ? 'bg-white border-neutral-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]' : 'bg-transparent border-neutral-100'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 p-8 text-left"
              >
                <span className={`text-base md:text-lg font-bold transition-colors ${
                   open === i ? 'text-neutral-900' : 'text-neutral-600'
                }`}>
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${
                   open === i ? 'rotate-180 bg-brand text-white' : 'bg-neutral-50 text-neutral-400'
                }`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0">
                      <p className="text-neutral-500 leading-relaxed font-medium">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
