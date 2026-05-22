import { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  withSeparator?: boolean;
  story?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, id, withSeparator = true, story = false }, ref) => {
    return (
      <section
        ref={ref as React.RefObject<HTMLElement>}
        id={id}
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
