import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&?!~<>[]';

function scramble(target: string, progress: number) {
  return target.split('').map((ch, i) => {
    if (ch === ' ' || ch === '-' || ch === '—') return ch;
    if (i / target.length < progress) return ch;
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }).join('');
}

export default function ScrambleText({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const ref  = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !done.current) {
        done.current = true;
        let step = 0;
        const total = 22;
        const id = setInterval(() => {
          step++;
          setDisplay(scramble(text, step / total));
          if (step >= total) { clearInterval(id); setDisplay(text); }
        }, 42);
      }
    }, { threshold: 0.5 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [text]);

  return <span ref={ref} className={className}>{display}</span>;
}
