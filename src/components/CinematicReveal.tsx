import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  index?: number;  // kept for API compatibility — no longer rendered
  delay?: number;
  className?: string;
}

const CinematicReveal = ({ children, delay = 0, className = '' }: Props) => {
  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 44, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-8% 0px' }}
        transition={{ duration: 0.82, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default CinematicReveal;
