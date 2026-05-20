import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const isPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isPointer || reducedMotion) return;

    document.documentElement.style.cursor = 'none';

    const xDot  = gsap.quickTo(dot,  'x', { duration: 0.08, ease: 'none' });
    const yDot  = gsap.quickTo(dot,  'y', { duration: 0.08, ease: 'none' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.42, ease: 'power2.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.42, ease: 'power2.out' });

    let visible = false;

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
    };

    const isInteractive = (el: Element | null): boolean => {
      if (!el) return false;
      const tag = el.tagName.toLowerCase();
      if (['a', 'button', 'input', 'textarea', 'select'].includes(tag)) return true;
      if (el.getAttribute('role') === 'button') return true;
      if ((el as HTMLElement).style?.cursor === 'pointer') return true;
      return false;
    };

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) {
        gsap.to(ring, { scale: 2.2, opacity: 0.4, duration: 0.3, ease: 'power2.out' });
        gsap.to(dot,  { scale: 0.4, duration: 0.2 });
      }
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) {
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.35, ease: 'power2.out' });
        gsap.to(dot,  { scale: 1, duration: 0.25 });
      }
    };

    // Watch for accessibility big-cursor class
    const observer = new MutationObserver(() => {
      const bigCursor = document.documentElement.classList.contains('big-cursor');
      gsap.to([dot, ring], { opacity: bigCursor ? 0 : (visible ? 1 : 0), duration: 0.2 });
      document.documentElement.style.cursor = bigCursor ? '' : 'none';
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout',  onOut,  { passive: true });

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 10, height: 10,
          marginLeft: -5, marginTop: -5,
          borderRadius: '50%',
          background: 'hsl(160,84%,39%)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          boxShadow: '0 0 8px hsl(160,84%,39%), 0 0 18px rgba(16,185,129,0.4)',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 38, height: 38,
          marginLeft: -19, marginTop: -19,
          borderRadius: '50%',
          border: '1.5px solid rgba(16,185,129,0.65)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
        }}
      />
    </>
  );
};

export default CustomCursor;
