import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollStoryAnimator = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    const sections = document.querySelectorAll<HTMLElement>('.story-section');

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { yPercent: 6 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 95%',
              end: 'top 15%',
              scrub: 1.8,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
};

export default ScrollStoryAnimator;
