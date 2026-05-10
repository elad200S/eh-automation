import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const STORAGE_KEY = 'intro_played';

const IMAGES = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80',
  'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600&q=80',
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80',
  'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
];

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (!stripRef.current || !rootRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => {
            setRemoved(true);
            onComplete();
          },
        });
      },
    });

    tl.fromTo(
      stripRef.current,
      { x: '0%' },
      { x: '-50%', duration: 1.6, ease: 'power2.inOut' }
    );

    return () => { tl.kill(); };
  }, [onComplete]);

  if (removed) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] bg-black flex items-center overflow-hidden"
      aria-hidden="true"
    >
      <div ref={stripRef} style={{ display: 'flex', width: '200%' }}>
        {[...IMAGES, ...IMAGES].map((src, i) => (
          <div key={i} style={{ flexShrink: 0, width: '300px', height: '100vh' }}>
            <img
              src={src}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }}
              draggable={false}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'Heebo, sans-serif',
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.1em',
            mixBlendMode: 'difference',
          }}
        >
          EH Automation
        </span>
      </div>
    </div>
  );
};

export default IntroScreen;
export { STORAGE_KEY as INTRO_STORAGE_KEY };
