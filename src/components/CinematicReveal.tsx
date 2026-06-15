import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  index?: number;
  delay?: number;
  className?: string;
}

const CinematicReveal = ({ children, index, delay = 0, className = '' }: Props) => {
  const ref  = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <div ref={ref} className={className} style={{ position: 'relative' }}>

      {/* Ambient section number — huge, very faint */}
      {index !== undefined && (
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            top:           '-0.15em',
            left:          '-0.04em',
            fontSize:      'clamp(140px, 22vw, 260px)',
            fontWeight:    900,
            fontFamily:    '"IBM Plex Mono", monospace',
            letterSpacing: '-0.06em',
            lineHeight:    1,
            color:         'rgba(11,184,112,0.045)',
            pointerEvents: 'none',
            userSelect:    'none',
            zIndex:        0,
          }}
        >
          {String(index).padStart(2, '0')}
        </div>
      )}

      {/* Animated content */}
      <motion.div
        initial={{ opacity: 0, y: 48, filter: 'blur(4px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{
          duration: 0.85,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default CinematicReveal;
