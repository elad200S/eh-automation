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
  Splits heading into words.
  Each word rises from clip-hidden — fires once as section enters viewport.
  60ms stagger between words → clean premium feel (lusion.co style).
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
    gsap.set(el.querySelectorAll('.rv-inner'), { y: '110%' });
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      inners.forEach((inner, i) => {
        tl.to(
          inner,
          { y: '0%', duration: 0.75, ease: 'power3.out' },
          i * 0.065,
        );
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
