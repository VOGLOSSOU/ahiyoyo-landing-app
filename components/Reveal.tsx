"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface RevealProps {
  children: React.ReactNode;
  stagger?: boolean;
  className?: string;
  delay?: number;
}

export default function Reveal({ children, stagger = false, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: stagger ? 0.15 : 0.1, rootMargin: stagger ? "0px 0px -60px 0px" : "0px 0px -40px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [stagger]);

  return (
    <div
      ref={ref}
      className={clsx(
        stagger ? "reveal-stagger" : "reveal",
        inView && "in-view",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}