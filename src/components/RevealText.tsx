import { useEffect, useLayoutEffect, useRef, ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  children: string;
  as?: ElementType;
  className?: string;
}

/*
  Splits a heading into individual words.
  Each word rises from clip-hidden to visible as the user scrolls,
  with a slight stagger. Fully reverses on scroll-up.
*/
export default function RevealText({
  children,
  as: Tag = 'h2',
  className = '',
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const words = children.split(' ').filter(Boolean);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const inners = el.querySelectorAll<HTMLSpanElement>('.rv-inner');
    gsap.set(inners, { y: '108%' });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const inners = Array.from(el.querySelectorAll<HTMLSpanElement>('.rv-inner'));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(inners, { y: '0%' });
      return;
    }

    const ctx = gsap.context(() => {
      inners.forEach((inner, i) => {
        gsap.to(inner, {
          y: '0%',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            // Each word starts slightly later — creates the stagger via scroll position
            start: `top ${90 - i * 1.5}%`,
            end:   `top ${62 - i * 1.5}%`,
            scrub: 0.8,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    
    <Tag ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="rv-word inline-block overflow-hidden leading-[1.15]"
          style={{ marginInlineEnd: i < words.length - 1 ? '0.28em' : 0 }}
        >
          <span className="rv-inner inline-block">{word}</span>
        </span>
      ))}
    </Tag>
  );
}
