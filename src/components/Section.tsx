import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  withSeparator?: boolean;
}

const Section = ({ children, className, id, withSeparator = true }: SectionProps) => {
  return (
    <section
      id={id}
      className={cn('py-16 md:py-20', className)}
    >
      <div className="container">
        {children}
      </div>
      {withSeparator && (
        <div className="container mt-16 md:mt-20">
          <div className="section-separator" />
        </div>
      )}
    </section>
  );
};

Section.displayName = 'Section';

export default Section;
