import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATES = [
  {
    id: 'hero',
    borderColor: 'rgba(16,185,129,0.22)',
    scale: 1,
    opacity: 0.9,
  },
  {
    id: 'problem',
    borderColor: 'rgba(248,113,113,0.2)',
    scale: 0.84,
    opacity: 0.8,
  },
  {
    id: 'process',
    borderColor: 'rgba(34,211,238,0.2)',
    scale: 0.94,
    opacity: 0.85,
  },
  {
    id: 'showcase',
    borderColor: 'rgba(16,185,129,0.26)',
    scale: 1.08,
    opacity: 0.95,
  },
  {
    id: 'tools',
    borderColor: 'rgba(100,116,139,0.14)',
    scale: 0.8,
    opacity: 0.7,
  },
  {
    id: 'solutions-overview',
    borderColor: 'rgba(16,185,129,0.22)',
    scale: 1.02,
    opacity: 0.9,
  },
  {
    id: 'about',
    borderColor: 'rgba(52,211,153,0.2)',
    scale: 0.9,
    opacity: 0.82,
  },
  {
    id: 'contact',
    borderColor: 'rgba(16,185,129,0.3)',
    scale: 1.14,
    opacity: 1,
  },
];

const ScrollOrb = () => {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    // Rotate the ring as user scrolls — dot orbits the ring
    const rotCtx = gsap.context(() => {
      gsap.to(orb, {
        rotation: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2.5,
        },
      });
    });

    // Change color + scale per section
    const observers: IntersectionObserver[] = [];

    STATES.forEach(({ id, borderColor, scale, opacity }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          gsap.to(orb, {
            borderColor,
            scale,
            opacity,
            duration: 1.1,
            ease: 'power2.inOut',
            overwrite: 'auto',
          });
        },
        { threshold: 0.3 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      rotCtx.revert();
      observers.forEach(o => o.disconnect());
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="hidden md:block"
      style={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        marginLeft: -260,
        marginTop: -260,
        width: 520,
        height: 520,
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      <div
        ref={orbRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '1px solid rgba(16,185,129,0.22)',
          opacity: 0.9,
        }}
      >
        {/* Inner ring */}
        <div
          style={{
            position: 'absolute',
            inset: 68,
            borderRadius: '50%',
            border: '1px solid rgba(16,185,129,0.1)',
          }}
        />

        {/* Orbiting dot — moves as ring rotates */}
        <div
          style={{
            position: 'absolute',
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'hsl(160 84% 39%)',
            boxShadow: '0 0 14px hsl(160 84% 39% / 0.8)',
            top: 4,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />

        {/* Second smaller dot — offset for depth */}
        <div
          style={{
            position: 'absolute',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: 'rgba(52,211,153,0.7)',
            bottom: 4,
            right: '28%',
          }}
        />
      </div>
    </div>
  );
};

export default ScrollOrb;
