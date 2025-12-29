import { ReactNode, forwardRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  withSeparator?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, id, withSeparator = true }, _ref) => {
    const { ref, isVisible } = useScrollReveal();

    return (
      <section
        ref={ref as React.RefObject<HTMLElement>}
        id={id}
        className={cn(
          'py-24 md:py-32',
          'section-reveal',
          isVisible && 'visible',
          className
        )}
      >
        <div className="container">
          {children}
        </div>
        {withSeparator && (
          <div className="container mt-24 md:mt-32">
            <div className="section-separator" />
          </div>
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;
