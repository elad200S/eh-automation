import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (prefersReduced()) { setRevealed(true); return; }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
        } else if (entry.boundingClientRect.bottom < 0) {
          setRevealed(false);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties = {
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(60px)',
    transition: `opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 1200ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  };

  return { ref, revealed, style };
}

export function useScrollRevealGroup(stagger = 100) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (prefersReduced()) { setRevealed(true); return; }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
        } else if (entry.boundingClientRect.bottom < 0) {
          setRevealed(false);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const itemStyle = (index: number): CSSProperties => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1) ${index * stagger}ms, transform 1200ms cubic-bezier(0.16, 1, 0.3, 1) ${index * stagger}ms`,
  });

  return { ref, revealed, itemStyle };
}
