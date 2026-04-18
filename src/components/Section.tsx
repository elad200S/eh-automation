import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeUp } from '@/lib/animations';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  withSeparator?: boolean;
}

const Section = ({ children, className, id, withSeparator = true }: SectionProps) => {
  return (
    <motion.section
      id={id}
      className={cn('py-16 md:py-20', className)}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px 0px' }}
    >
      <div className="container">
        {children}
      </div>
      {withSeparator && (
        <div className="container mt-16 md:mt-20">
          <div className="section-separator" />
        </div>
      )}
    </motion.section>
  );
};

Section.displayName = 'Section';

export default Section;
