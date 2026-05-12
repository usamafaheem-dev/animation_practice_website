"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 85%", "end center"]
  });
  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 max-w-7xl mx-auto px-4 md:px-6 py-4", className)}>
        <p
          className={
            "flex flex-wrap px-2 py-4 md:p-5 text-xl font-extrabold text-slate-200 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl leading-[1.3] md:leading-[1.2] tracking-tighter font-poppins text-left"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mx-1 lg:mx-3">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-slate-900"}
      >
        {children}
      </motion.span>
    </span>
  );
};

export { TextRevealByWord };
