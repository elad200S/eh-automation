import { useEffect, useLayoutEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Single element — scrub-based, fully reversible
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(_delay = 0) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    gsap.set(el, { y: 50, opacity: 0 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReduced()) {
      gsap.set(el, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          end: 'top 60%',
          scrub: 0.9,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Return empty style — GSAP owns the transform/opacity
  return { ref, revealed: true, style: {} as CSSProperties };
}

// Group — each child gets its own scrub trigger (reversible stagger)
export function useScrollRevealGroup(stagger = 100) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    gsap.set(Array.from(el.children) as HTMLElement[], { y: 44, opacity: 0 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = Array.from(el.children) as HTMLElement[];

    if (prefersReduced()) {
      gsap.set(items, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      items.forEach((item) => {
        gsap.to(item, {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            end: 'top 65%',
            scrub: 0.9,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // Return empty itemStyle — GSAP owns everything
  return { ref, revealed: true, itemStyle: (_i: number): CSSProperties => ({}) };
}
