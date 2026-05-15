import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PageIntro = () => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 1.8,
      delay: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        if (overlayRef.current) overlayRef.current.style.display = 'none';
      },
    });
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'hsl(220, 15%, 9%)',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
};

export default PageIntro;
