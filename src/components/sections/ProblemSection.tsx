import { useEffect, useRef, useState, useCallback } from 'react';
import Section from '@/components/Section';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const problems = [
  'לידים נכנסים ממקומות שונים',
  'אין מעקב ברור',
  'דברים נופלים בין הכיסאות',
  'יותר מדי עבודה ידנית',
  'לקוחות לא מקבלים מענה בזמן',
  'פולו-אפ שנשכח',
  'מידע מפוזר בין WhatsApp, מייל ואקסל',
];

const LINE_INTERVAL  = 310;
const ERROR_DELAY    = problems.length * LINE_INTERVAL + 450;
const ERROR_MSG      = '> ERROR: business chaos detected';
const CHAR_DELAY     = 32;
const ERROR_DONE     = ERROR_DELAY + ERROR_MSG.length * CHAR_DELAY;
const SOLUTION_DELAY = ERROR_DONE + 1400;

const SOLUTION_LINES = [
  { text: '$ loading EH-Automation...',        dir: 'ltr', color: '#8b949e' },
  { text: '__progress__',                       dir: 'ltr', color: '#3fb950' },
  { text: '',                                   dir: 'ltr', color: '' },
  { text: 'כל ליד מטופל אוטומטית ✓',          dir: 'rtl', color: '#3fb950' },
  { text: 'מעקב מלא ב-CRM ✓',                 dir: 'rtl', color: '#3fb950' },
  { text: 'הסוכן מקבל התראה מיידית ✓',        dir: 'rtl', color: '#3fb950' },
  { text: '',                                   dir: 'ltr', color: '' },
  { text: '⚡ EH Automation — הכל תחת שליטה', dir: 'rtl', color: '#58a6ff' },
];

const SOL_LINE_DELAY = 260;
const TOTAL_CYCLE    = SOLUTION_DELAY + SOLUTION_LINES.length * SOL_LINE_DELAY + 2800;

const ProblemSection = () => {
  const { ref: titleRef, style: titleStyle } = useScrollReveal<HTMLHeadingElement>(0);
  const { ref: terminalRef, style: terminalStyle } = useScrollReveal<HTMLDivElement>(150);
  const [visibleCount,  setVisibleCount]  = useState(0);
  const [errorText,     setErrorText]     = useState('');
  const [phase,         setPhase]         = useState<'idle' | 'problems' | 'error' | 'solution'>('idle');
  const [solutionCount, setSolutionCount] = useState(0);
  const [cursorOn,      setCursorOn]      = useState(true);
  const [progress,      setProgress]      = useState(0);

  const sectionRef   = useRef<HTMLDivElement>(null);
  const timersRef    = useRef<ReturnType<typeof setTimeout>[]>([]);
  const progressRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const inViewRef    = useRef(false);

  const reset = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (progressRef.current) clearInterval(progressRef.current);
    setVisibleCount(0);
    setErrorText('');
    setPhase('idle');
    setSolutionCount(0);
    setProgress(0);
  }, []);

  const startAnimation = useCallback(() => {
    reset();
    setPhase('problems');

    // Problem lines appear one by one
    problems.forEach((_, i) => {
      const t = setTimeout(() => setVisibleCount(i + 1), (i + 1) * LINE_INTERVAL);
      timersRef.current.push(t);
    });

    // Switch to error phase
    const errPhaseT = setTimeout(() => setPhase('error'), ERROR_DELAY);
    timersRef.current.push(errPhaseT);

    // Type out error message
    for (let i = 0; i <= ERROR_MSG.length; i++) {
      const t = setTimeout(() => setErrorText(ERROR_MSG.slice(0, i)), ERROR_DELAY + i * CHAR_DELAY);
      timersRef.current.push(t);
    }

    // Switch to solution phase
    const solT = setTimeout(() => {
      setPhase('solution');
      setVisibleCount(0);
      setErrorText('');
      setProgress(0);
    }, SOLUTION_DELAY);
    timersRef.current.push(solT);

    SOLUTION_LINES.forEach((_, i) => {
      const t = setTimeout(() => {
        setSolutionCount(i + 1);
        // Start progress bar when its line appears (index 1)
        if (i === 1) {
          if (progressRef.current) clearInterval(progressRef.current);
          setProgress(0);
          let p = 0;
          progressRef.current = setInterval(() => {
            p += 2;
            setProgress(p);
            if (p >= 100) clearInterval(progressRef.current!);
          }, 16); // ~800ms to reach 100
        }
      }, SOLUTION_DELAY + (i + 1) * SOL_LINE_DELAY);
      timersRef.current.push(t);
    });

    // Loop
    const loopT = setTimeout(() => {
      if (inViewRef.current) startAnimation();
    }, TOTAL_CYCLE);
    timersRef.current.push(loopT);
  }, [reset]);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorOn(b => !b), 500);
    return () => clearInterval(id);
  }, []);

  // IntersectionObserver
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) startAnimation();
        else reset();
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); reset(); };
  }, [startAnimation, reset]);

  const cursor = (
    <span style={{ opacity: cursorOn ? 1 : 0, color: '#3fb950', userSelect: 'none' }}>█</span>
  );

  return (
    <Section id="problem">
      <div ref={sectionRef} className="max-w-3xl mx-auto text-center">
        <h2 ref={titleRef} style={titleStyle} className="text-3xl md:text-4xl font-semibold text-foreground mb-8">
          מרגיש שהעסק עובד אבל לא באמת מסודר?
        </h2>

        {/* ── Terminal window ── */}
        <div ref={terminalRef} style={{ ...terminalStyle,
          background: '#0d1117',
          borderRadius: 12,
          border: '1px solid #30363d',
          minHeight: 320,
          overflow: 'hidden',
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: 14,
          lineHeight: '1.7',
          boxShadow: '0 25px 70px rgba(0,0,0,0.65)',
        }}>

          {/* Header bar */}
          <div style={{
            background: '#161b22',
            padding: '10px 16px',
            borderBottom: '1px solid #30363d',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
            <span style={{ color: '#8b949e', fontSize: 12, marginLeft: 12 }}>business-audit.sh</span>
          </div>

          {/* Body */}
          <div style={{ padding: '20px 24px' }}>

            {phase === 'solution' ? (

              /* ── Solution output ── */
              <div>
                {SOLUTION_LINES.slice(0, solutionCount).map((line, i) => {
                  if (line.text === '__progress__') {
                    const filledBoxes = Math.floor(progress / 10);
                    const done        = progress >= 100;
                    const boxColor    = done ? '#3fb950' : '#febc2e';
                    return (
                      <div key={i} style={{ marginBottom: 8, marginTop: 4, direction: 'ltr', textAlign: 'left' }}>
                        <span style={{ color: '#8b949e' }}>&gt;&nbsp;</span>
                        <span style={{ display: 'inline-flex', gap: 5, verticalAlign: 'middle', margin: '0 6px' }}>
                          {Array.from({ length: 10 }).map((_, idx) => {
                            const filled = idx < filledBoxes;
                            return (
                              <span
                                key={idx}
                                style={{
                                  display: 'inline-block',
                                  width: 20,
                                  height: 20,
                                  borderRadius: 4,
                                  border: `1px solid ${filled ? boxColor : '#30363d'}`,
                                  background: filled ? boxColor : '#161b22',
                                  boxShadow: filled ? `0 0 6px ${boxColor}66` : 'none',
                                  transition: 'background 0.12s, border-color 0.12s, box-shadow 0.12s',
                                }}
                              />
                            );
                          })}
                        </span>
                        <span style={{ color: boxColor, fontWeight: 'bold', transition: 'color 0.3s' }}>
                          &nbsp;{progress}%
                        </span>
                        {i === solutionCount - 1 && cursor}
                      </div>
                    );
                  }
                  return (
                    <div
                      key={i}
                      style={{
                        marginBottom: 2,
                        direction: line.dir as 'ltr' | 'rtl',
                        textAlign: line.dir === 'rtl' ? 'right' : 'left',
                        color: line.color || 'transparent',
                        fontWeight: line.text.startsWith('⚡') ? 'bold' : 'normal',
                        fontSize: line.text.startsWith('⚡') ? 16 : 14,
                        animation: 'termLine 0.2s ease forwards',
                      }}
                    >
                      {line.text || '\u00A0'}
                      {i === solutionCount - 1 && cursor}
                    </div>
                  );
                })}
              </div>

            ) : (

              /* ── Problems + error ── */
              <div>
                <div style={{ color: '#8b949e', marginBottom: 10 }}>
                  $ scanning business-processes...
                </div>

                {problems.slice(0, visibleCount).map((prob, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: 2,
                      direction: 'rtl',
                      textAlign: 'right',
                      animation: 'termLine 0.15s ease forwards',
                    }}
                  >
                    <span style={{ color: '#ff6b6b' }}>■&nbsp;</span>
                    <span style={{ color: '#e2e8f0' }}>{prob}</span>
                  </div>
                ))}

                {/* Cursor while problems loading */}
                {phase === 'problems' && visibleCount < problems.length && (
                  <div style={{ marginTop: 2 }}>{cursor}</div>
                )}

                {/* Error line */}
                {phase === 'error' && (
                  <div style={{
                    marginTop: 14,
                    color: '#ff4444',
                    fontWeight: 'bold',
                    direction: 'ltr',
                    textAlign: 'left',
                    textShadow: '0 0 8px rgba(255,68,68,0.5)',
                  }}>
                    {errorText}{cursor}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes termLine {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
      `}</style>
    </Section>
  );
};

export default ProblemSection;
