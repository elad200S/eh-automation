import { ReactNode, forwardRef, useRef, useEffect, useLayoutEffect } from 'react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  withSeparator?: boolean;
  story?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, id, withSeparator = true, story = false }, ref) => {
    const innerRef = useRef<HTMLElement | null>(null);

    useLayoutEffect(() => {
      const el = innerRef.current;
      if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.set(el, { opacity: 0, y: 64, scale: 0.96 });
    }, []);

    useEffect(() => {
      const el = innerRef.current;
      if (!el) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(el, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      const ctx = gsap.context(() => {
        // Dramatic lift-in — lusion.co style
        gsap.fromTo(
          el,
          { opacity: 0, y: 90, scale: 0.93 },
          {
            opacity: 1, y: 0, scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 94%',
              end: 'top 48%',
              scrub: 1.2,
            },
          }
        );

        // Subtle push-back as section exits
        gsap.fromTo(
          el,
          { opacity: 1, y: 0, scale: 1 },
          {
            opacity: 0.45, y: -60, scale: 0.96,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 4%',
              end: 'top -32%',
              scrub: 1.4,
            },
          }
        );
      });

      return () => ctx.revert();
    }, []);

    const setRefs = (el: HTMLElement | null) => {
      innerRef.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = el;
    };

    return (
      <section
        ref={setRefs}
        id={id}
        style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
        className={cn(
          story ? 'story-section min-h-screen flex flex-col' : 'py-10 md:py-14',
          className
        )}
      >
        <div className={cn('container', story && 'flex-1 flex flex-col justify-center py-16 md:py-20')}>
          {children}
        </div>
        {withSeparator && (
          <div className="container mt-10 md:mt-14">
            <div className="section-separator" />
          </div>
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';
export default Section;
