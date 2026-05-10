import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const STORAGE_KEY = 'intro_played';

const IMAGES = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
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
      { xPercent: 0 },
      { xPercent: -100, duration: 1.2, ease: 'power2.inOut' }
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (removed) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] bg-black flex items-center overflow-hidden"
      aria-hidden="true"
    >
      <div ref={stripRef} className="flex gap-4 flex-nowrap shrink-0">
        {IMAGES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="object-cover shrink-0"
            style={{ width: 300, height: 200 }}
          />
        ))}
      </div>
    </div>
  );
};

export default IntroScreen;
export { STORAGE_KEY as INTRO_STORAGE_KEY };
