import { useEffect, useState } from 'react';
import Section from '@/components/Section';

const PHASE_DURATIONS = [
  1500, // 0: idle — cursor in center
  800,  // 1: cursor moves to button
  400,  // 2: button click
  700,  // 3: popup opens
  2300, // 4: fields fill in
  600,  // 5: cursor on submit + click
  600,  // 6: popup closes, whatsapp mounts
  2800, // 7: whatsapp visible
  200,  // 8: reset
];

const CURSOR_POS = [
  { left: '58%', top: '36%' },  // 0: idle
  { left: '13%', top: '83%' },  // 1: to button
  { left: '13%', top: '83%' },  // 2: click
  { left: '50%', top: '44%' },  // 3: popup
  { left: '50%', top: '56%' },  // 4: form
  { left: '50%', top: '76%' },  // 5: submit
  { left: '16%', top: '84%' },  // 6: whatsapp area
  { left: '16%', top: '84%' },  // 7: whatsapp
  { left: '58%', top: '36%' },  // 8: reset
];

const STEP_ACTIVATE_PHASE = [0, 1, 3, 6];

const DemoVideoSection = () => {
  const [phase, setPhase] = useState(0);
  const [formData, setFormData] = useState({ name: '', phone: '', business: '' });
  const [wsEntered, setWsEntered] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const advance = (current: number) => {
      const next = (current + 1) % PHASE_DURATIONS.length;
      timeout = setTimeout(() => {
        setPhase(next);
        if (next === 0) {
          setFormData({ name: '', phone: '', business: '' });
          setWsEntered(false);
        }
        advance(next);
      }, PHASE_DURATIONS[current]);
    };
    advance(0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (phase !== 4) return;
    const t1 = setTimeout(() => setFormData(p => ({ ...p, name: 'ישראל ישראלי' })), 350);
    const t2 = setTimeout(() => setFormData(p => ({ ...p, phone: '052-1234567' })), 1100);
    const t3 = setTimeout(() => setFormData(p => ({ ...p, business: 'עורך דין' })), 1800);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== 6) return;
    const t = setTimeout(() => setWsEntered(true), 80);
    return () => clearTimeout(t);
  }, [phase]);

  const activeStep = STEP_ACTIVATE_PHASE.reduce((acc, threshold, i) => (phase >= threshold ? i : acc), 0);
  const showPopup = phase >= 3 && phase <= 5;
  const showWs = phase === 6 || phase === 7;
  const buttonGlow = phase === 1 || phase === 2;
  const buttonClick = phase === 2;
  const submitClick = phase === 5;
  const cursorPos = CURSOR_POS[phase] ?? CURSOR_POS[0];

  return (
    <Section id="demo" className="bg-background">
      <div className="max-w-3xl mx-auto" dir="rtl">
        {/* Title */}
        <div className="text-center mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary mb-3">הדגמה חיה</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">ראה איך זה עובד</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            מהכניסה לאתר ועד קבלת הודעת ווצאפ — תוך שניות
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center items-center mb-10 gap-0">
          {['נכנסים לאתר', 'לוחצים כפתור', 'ממלאים פרטים', 'מקבלים ווצאפ'].map((label, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center px-3">
                <div
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-500"
                  style={{
                    borderColor: activeStep >= i ? 'hsl(160,84%,39%)' : 'hsl(215,20%,30%)',
                    background: activeStep >= i ? 'hsl(160,84%,39%,0.12)' : 'transparent',
                    color: activeStep >= i ? 'hsl(160,84%,39%)' : 'hsl(215,20%,50%)',
                  }}
                >
                  {i + 1}
                </div>
                <span
                  className="text-xs mt-1.5 whitespace-nowrap transition-colors duration-500"
                  style={{ color: activeStep >= i ? 'hsl(160,84%,39%)' : 'hsl(215,20%,50%)' }}
                >
                  {label}
                </span>
              </div>
              {i < 3 && (
                <div
                  className="h-px w-8 transition-all duration-700"
                  style={{ background: activeStep > i ? 'hsl(160,84%,39%)' : 'hsl(215,20%,25%)' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Browser mockup */}
        <div
          className="relative mx-auto rounded-2xl overflow-hidden border shadow-2xl"
          style={{ borderColor: 'hsl(215,20%,20%)', background: 'hsl(220,15%,7%)' }}
        >
          {/* Chrome bar */}
          <div
            className="flex items-center gap-2 px-4 py-2.5 border-b"
            style={{ background: 'hsl(220,15%,11%)', borderColor: 'hsl(215,20%,18%)' }}
          >
            <div className="flex gap-1.5 flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div
              className="flex-1 mx-3 px-3 py-1 rounded-md text-xs text-center font-mono"
              style={{ background: 'hsl(220,15%,8%)', color: 'hsl(215,20%,50%)' }}
            >
              eh-automation.com
            </div>
          </div>

          {/* Content area */}
          <div className="relative overflow-hidden" style={{ height: 390 }}>
            {/* Subtle grid background */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(hsl(160,84%,39%) 1px, transparent 1px), linear-gradient(90deg, hsl(160,84%,39%) 1px, transparent 1px)',
                backgroundSize: '44px 44px',
              }}
            />

            {/* Mini hero content */}
            <div className="absolute inset-0 flex flex-col items-center justify-start pt-14 px-8 select-none">
              <div className="text-center" style={{ opacity: showPopup ? 0.2 : 0.55, transition: 'opacity 0.5s' }}>
                <div
                  className="text-xs font-mono mb-2 tracking-widest"
                  style={{ color: 'hsl(160,84%,39%)' }}
                >
                  EH AUTOMATION
                </div>
                <div className="text-2xl font-bold mb-1" style={{ color: 'hsl(210,20%,98%)' }}>
                  אוטומציות חכמות לעסקים
                </div>
                <div className="text-sm" style={{ color: 'hsl(215,20%,55%)' }}>
                  חסכו זמן. סגרו יותר. עבדו פחות.
                </div>
              </div>
            </div>

            {/* CTA button — bottom-left */}
            <div
              className="absolute bottom-5 left-5 transition-all duration-500 select-none"
              style={{
                transform: buttonClick ? 'scale(0.93)' : buttonGlow ? 'scale(1.06)' : 'scale(1)',
                boxShadow: buttonGlow ? '0 0 22px 5px rgba(16,185,129,0.45)' : undefined,
                borderRadius: 12,
              }}
            >
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium cursor-default"
                style={{ background: 'hsl(160,84%,39%)', color: '#fff' }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                שיחת אפיון
              </div>
            </div>

            {/* Popup / Form */}
            {showPopup && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(2px)', animation: 'fadeIn 0.35s ease-out' }}
              >
                <div
                  className="rounded-xl border w-64 p-5 shadow-2xl"
                  style={{
                    background: 'hsl(220,15%,13%)',
                    borderColor: 'hsl(215,20%,22%)',
                    animation: 'slideUp 0.35s ease-out',
                  }}
                >
                  <div className="text-center mb-4">
                    <div className="text-sm font-semibold" style={{ color: 'hsl(210,20%,96%)' }}>
                      שיחת אפיון לאוטומציה
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'hsl(215,20%,55%)' }}>
                      מלאו פרטים ונחזור אליכם
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { label: 'שם מלא', value: formData.name, key: 'name', ltr: false },
                      { label: 'טלפון', value: formData.phone, key: 'phone', ltr: true },
                      { label: 'סוג עיסוק', value: formData.business, key: 'business', ltr: false },
                    ].map(({ label, value, key, ltr }) => (
                      <div key={key}>
                        <div className="text-xs mb-1" style={{ color: 'hsl(215,20%,55%)' }}>
                          {label}
                        </div>
                        <div
                          className="h-7 px-2.5 rounded-lg border flex items-center text-xs"
                          dir={ltr ? 'ltr' : 'rtl'}
                          style={{
                            background: 'hsl(220,15%,8%)',
                            borderColor: 'hsl(215,20%,22%)',
                            color: 'hsl(210,20%,92%)',
                          }}
                        >
                          <span>{value}</span>
                          {phase === 4 && !value && (
                            <span
                              style={{ color: 'hsl(160,84%,39%)', animation: 'blink 0.9s step-end infinite' }}
                            >
                              |
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    <button
                      className="w-full py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-default"
                      style={{
                        background: 'hsl(160,84%,39%)',
                        color: '#fff',
                        transform: submitClick ? 'scale(0.95)' : 'scale(1)',
                        opacity: submitClick ? 0.75 : 1,
                      }}
                    >
                      קביעת שיחה
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* WhatsApp notification */}
            {showWs && (
              <div
                className="absolute bottom-5 left-4"
                style={{
                  transform: wsEntered ? 'translateY(0)' : 'translateY(110%)',
                  opacity: wsEntered ? 1 : 0,
                  transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease-out',
                }}
              >
                <div
                  className="flex items-start gap-2.5 p-3 rounded-xl border shadow-2xl"
                  style={{
                    background: 'hsl(220,15%,13%)',
                    borderColor: 'rgba(37,211,102,0.28)',
                    maxWidth: 230,
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: '#25D366' }}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold mb-0.5" style={{ color: '#25D366' }}>
                      EH Automation
                    </div>
                    <div className="text-xs leading-relaxed" style={{ color: 'hsl(210,20%,88%)' }}>
                      שלום ישראל! קיבלנו את פנייתך 🎉 ניצור איתך קשר בהקדם לשיחת אפיון
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cursor */}
            <div
              className="absolute pointer-events-none z-50 transition-all duration-700 ease-in-out"
              style={{ left: cursorPos.left, top: cursorPos.top, transform: 'translate(-2px, -2px)' }}
            >
              <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                <path
                  d="M1 1L1 17L5 12.5L7.5 19L9.5 18.2L7 12L13 12L1 1Z"
                  fill="white"
                  stroke="rgba(0,0,0,0.6)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="text-center text-xs mt-4" style={{ color: 'hsl(215,20%,45%)' }}>
          הדגמה מדמה את חוויית הלקוח האמיתית — מהכניסה לאתר ועד קבלת ההודעה
        </p>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
      `}</style>
    </Section>
  );
};

export default DemoVideoSection;
