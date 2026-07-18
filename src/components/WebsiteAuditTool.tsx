import { useState, useEffect, useRef } from 'react';
import { Search, X, CheckCircle2, Loader2, Smartphone, Globe, Eye, Zap } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';

type ScanState = 'idle' | 'loading' | 'done' | 'error' | 'timeout';

interface CategoryResult {
  id: string;
  name: string;
  score: number;
  icon: React.ReactNode;
  businessImpact: string;
}

const CATEGORY_META: Record<string, { name: string; icon: React.ReactNode; businessImpact: string }> = {
  performance: {
    name: 'מהירות',
    icon: <Zap className="w-4 h-4" />,
    businessImpact: 'כל שניה נוספת בטעינה גורמת ל-20% מהמבקרים לעזוב',
  },
  seo: {
    name: 'דירוג בגוגל',
    icon: <Globe className="w-4 h-4" />,
    businessImpact: 'ציון נמוך = גוגל לא מדרג אתכם — לקוחות לא מוצאים אתכם',
  },
  accessibility: {
    name: 'נגישות',
    icon: <Eye className="w-4 h-4" />,
    businessImpact: 'קריאות נמוכה = אנשים עוזבים לפני שהספיקו לקרוא',
  },
  'best-practices': {
    name: 'תקנים',
    icon: <Smartphone className="w-4 h-4" />,
    businessImpact: 'אתר שלא עומד בתקנים נראה לא מקצועי ומרחיק לקוחות',
  },
};

const CATEGORY_ORDER = ['performance', 'seo', 'accessibility', 'best-practices'];

const PASS_THRESHOLD = 95;

const scoreColor = (score: number) => {
  if (score >= PASS_THRESHOLD) return 'text-green-400';
  if (score >= 50) return 'text-yellow-400';
  return 'text-red-400';
};

const scoreBarColor = (score: number) => {
  if (score >= PASS_THRESHOLD) return 'bg-green-400';
  if (score >= 50) return 'bg-yellow-400';
  return 'bg-red-400';
};

const scoreBorder = (score: number) => {
  if (score >= PASS_THRESHOLD) return 'border-green-400/25 bg-green-400/5';
  if (score >= 50) return 'border-yellow-400/25 bg-yellow-400/5';
  return 'border-red-400/25 bg-red-400/5';
};

// צבעים לגרסה הבהירה של הדוח בפופ-אפ
const lightScoreColor = (score: number) => {
  if (score >= PASS_THRESHOLD) return 'text-emerald-600';
  if (score >= 50) return 'text-amber-500';
  return 'text-red-500';
};

const lightBarColor = (score: number) => {
  if (score >= PASS_THRESHOLD) return 'bg-emerald-500';
  if (score >= 50) return 'bg-amber-400';
  return 'bg-red-500';
};

const ScoreCard = ({
  icon, name, score, detail, animated = false,
}: {
  icon: React.ReactNode; name: string; score: number; detail: string; animated?: boolean;
}) => (
  <div className={`flex flex-col gap-2 p-4 rounded-xl border ${scoreBorder(score)}`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={scoreColor(score)}>{icon}</span>
        <span className="font-semibold text-foreground text-sm">{name}</span>
      </div>
      <span className={`text-2xl font-bold tabular-nums ${scoreColor(score)}`}>{score}</span>
    </div>
    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
      <div
        className={`h-full rounded-full ${scoreBarColor(score)} ${animated ? '' : 'transition-all duration-700'}`}
        style={{ width: `${score}%` }}
      />
    </div>
    <p className="text-xs text-muted-foreground leading-snug">
      {animated ? 'מנתח...' : (score >= PASS_THRESHOLD ? '✓ תקין' : detail)}
    </p>
  </div>
);

const WebsiteAuditTool = () => {
  const [url, setUrl] = useState('');
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [categories, setCategories] = useState<CategoryResult[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [animScores, setAnimScores] = useState<Record<string, number>>({
    performance: 88, seo: 74, accessibility: 81, 'best-practices': 79,
  });
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { openPopup } = useContactPopup();

  useEffect(() => {
    if (scanState === 'loading') {
      animRef.current = setInterval(() => {
        setAnimScores(prev => {
          const next = { ...prev };
          CATEGORY_ORDER.forEach(key => {
            const delta = Math.floor(Math.random() * 11) - 7;
            next[key] = Math.max(15, Math.min(97, next[key] + delta));
          });
          return next;
        });
      }, 130);
    } else {
      if (animRef.current) clearInterval(animRef.current);
    }
    return () => { if (animRef.current) clearInterval(animRef.current); };
  }, [scanState]);

  const normalizeUrl = (input: string) => {
    if (!input.startsWith('http://') && !input.startsWith('https://')) {
      return 'https://' + input;
    }
    return input;
  };

  // הפונקציה רצה על פרויקט eh-automation-portal (אותו פרויקט כמו הצ'אטבוט)
  const AUDIT_FN_URL = 'https://wotfxbniypocfsgpawak.supabase.co/functions/v1/audit-scan';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvdGZ4Ym5peXBvY2ZzZ3Bhd2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNjUyNzQsImV4cCI6MjA5Njk0MTI3NH0._fL3RSiTsq6XoOPIAKw-FnMRFVYskCNxolefjEUelec';

  const runPagespeed = async (normalized: string) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);
    try {
      // סריקה דרך צד השרת — המפתח נשאר מוסתר
      const res = await fetch(AUDIT_FN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ url: normalized }),
        signal: controller.signal,
      });
      // אם הפונקציה עוד לא פרוסה — נופלים חזרה לקריאה ישירה לגוגל
      if (res.status === 404) {
        const direct = await fetch(
          `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(normalized)}&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices`,
          { signal: controller.signal }
        );
        const directData = await direct.json();
        return { status: direct.status, ok: direct.ok, data: directData };
      }
      const data = await res.json();
      return { status: res.status, ok: res.ok, data };
    } finally {
      clearTimeout(timeout);
    }
  };

  const handleScan = async () => {
    if (!url.trim()) return;
    setScanState('loading');
    setErrorMsg('');
    const normalized = normalizeUrl(url.trim());

    let lastError: 'timeout' | 'error' = 'error';
    let lastMsg = 'לא הצלחנו לסרוק — ייתכן שהאתר חסום לסריקה. נסה כתובת אחרת.';

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const { status, ok, data } = await runPagespeed(normalized);

        if (status === 429) {
          lastMsg = 'יש עומס רגעי על שירות הסריקה — נסה שוב בעוד דקה.';
          lastError = 'error';
          break; // ניסיון נוסף מיידי לא יעזור במכסה חסומה
        }
        if (status === 400) {
          lastMsg = 'הכתובת לא תקינה או שהאתר לא נגיש. בדוק את הכתובת ונסה שוב.';
          lastError = 'error';
          break;
        }
        if (!ok || data.error || !data.lighthouseResult) {
          lastMsg = 'הסריקה נכשלה בצד של גוגל — לפעמים זה קורה באופן זמני. נסה שוב.';
          lastError = 'error';
          continue; // כשל זמני — שווה ניסיון נוסף
        }

        const cats = data.lighthouseResult.categories ?? {};
        const results: CategoryResult[] = Object.entries(cats).map(([id, cat]: [string, any]) => {
          const score = Math.round((cat.score ?? 0) * 100);
          const meta = CATEGORY_META[id] ?? { name: id, icon: null, businessImpact: '' };
          return { id, name: meta.name, score, icon: meta.icon, businessImpact: meta.businessImpact };
        });

        setCategories(results);
        setScanState('done');
        if (results.some(c => c.score < PASS_THRESHOLD)) setShowModal(true);
        return;
      } catch (err: any) {
        if (err?.name === 'AbortError') {
          lastError = 'timeout';
          lastMsg = 'הסריקה לקחה יותר מדי זמן. האתר כנראה איטי במיוחד — נסה שוב או נסה אתר אחר.';
        } else {
          lastError = 'error';
          lastMsg = 'בעיית תקשורת — בדוק את החיבור לאינטרנט ונסה שוב.';
        }
      }
    }

    setErrorMsg(lastMsg);
    setScanState(lastError);
  };

  const failingCount = categories.filter(c => c.score < PASS_THRESHOLD).length;
  const avgScore = categories.length > 0
    ? Math.round(categories.reduce((s, c) => s + c.score, 0) / categories.length)
    : 0;
  const missedPotential = 100 - avgScore;

  const isErrorState = scanState === 'error' || scanState === 'timeout';

  return (
    <div className="mt-8 p-6 md:p-8 rounded-2xl border border-primary/20 bg-card" dir="rtl">
      <h3 className="text-lg font-bold text-foreground mb-1">בדוק את האתר שלך בחינם</h3>
      <p className="text-sm text-muted-foreground mb-5">הכנס כתובת אתר ונגלה כמה פוטנציאל האתר מפסיד</p>

      {(scanState === 'idle' || isErrorState) && (
        <>
          <div className="flex gap-3 flex-col sm:flex-row">
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleScan()}
              placeholder="https://example.co.il"
              className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
              dir="ltr"
            />
            <button
              onClick={handleScan}
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold rounded-xl px-6 py-3 hover:opacity-90 transition-opacity text-sm whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              סרוק עכשיו
            </button>
          </div>
          {scanState === 'error' && (
            <p className="mt-3 text-sm text-red-400">{errorMsg}</p>
          )}
          {scanState === 'timeout' && (
            <p className="mt-3 text-sm text-yellow-400">{errorMsg}</p>
          )}
        </>
      )}

      {scanState === 'loading' && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Loader2 className="w-4 h-4 text-primary animate-spin flex-shrink-0" />
            <p className="text-sm text-muted-foreground">סורק את האתר... זה יכול לקחת עד דקה</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORY_ORDER.map(id => {
              const meta = CATEGORY_META[id];
              return (
                <ScoreCard
                  key={id}
                  icon={meta.icon}
                  name={meta.name}
                  score={animScores[id] ?? 50}
                  detail=""
                  animated
                />
              );
            })}
          </div>
        </div>
      )}

      {scanState === 'done' && failingCount === 0 && (
        <div className="flex items-center gap-3 py-4">
          <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
          <p className="text-sm text-foreground">האתר שלך מצוין! כל הקטגוריות מעל {PASS_THRESHOLD}.</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" dir="rtl">
          <div className="w-full max-w-lg relative rounded-2xl overflow-hidden shadow-2xl bg-white max-h-[90vh] overflow-y-auto">

            {/* כותרת הדוח — פס ירוק ממותג */}
            <div className="relative px-6 py-5 text-white" style={{ background: 'linear-gradient(135deg,#0e7a4e,#06462c)' }}>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 left-4 text-white/70 hover:text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-extrabold text-lg">HEY <span style={{ color: '#3ddc97' }}>Digital</span></div>
                  <div className="text-xs opacity-75 mt-0.5">דוח אבחון מהיר</div>
                  <div className="text-xs mt-2 opacity-90 truncate" dir="ltr" style={{ textAlign: 'right' }}>
                    {normalizeUrl(url.trim())}
                  </div>
                </div>
                <div
                  className="w-24 h-24 rounded-full grid place-items-center flex-shrink-0"
                  style={{ background: `conic-gradient(#3ddc97 ${avgScore}%, rgba(255,255,255,.15) 0)` }}
                >
                  <div className="w-[76px] h-[76px] rounded-full grid place-items-center text-center" style={{ background: '#06462c' }}>
                    <div>
                      <div className="text-2xl font-extrabold leading-none tabular-nums">{avgScore}</div>
                      <div className="text-[10px] opacity-70 mt-0.5">מתוך 100</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 pt-4">
              <h3 className="text-base font-extrabold" style={{ color: '#0e1b14' }}>
                האתר מפסיד {missedPotential}% מהפוטנציאל שלו
              </h3>
              <p className="text-xs mt-0.5" style={{ color: '#5f7a6c' }}>הנה מה שגורם לך להפסיד לקוחות:</p>
            </div>

            <div className="p-6 pt-4 grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="rounded-xl border p-3.5 flex flex-col gap-2"
                  style={{ borderColor: '#dfe9e3', background: '#f4faf7' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={lightScoreColor(cat.score)}>{cat.icon}</span>
                      <span className="font-semibold text-sm" style={{ color: '#0e1b14' }}>{cat.name}</span>
                    </div>
                    <span className={`text-2xl font-bold tabular-nums ${lightScoreColor(cat.score)}`}>{cat.score}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: '#dfe9e3' }}>
                    <div className={`h-full rounded-full ${lightBarColor(cat.score)}`} style={{ width: `${cat.score}%` }} />
                  </div>
                  <p className="text-xs leading-snug" style={{ color: '#5f7a6c' }}>
                    {cat.score >= PASS_THRESHOLD ? '✓ תקין' : cat.businessImpact}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA — הצעדים הבאים */}
            <div className="mx-6 mb-6 rounded-xl p-5 text-white" style={{ background: 'linear-gradient(135deg,#0e7a4e,#06462c)' }}>
              <p className="font-bold text-sm mb-1">רוצים שנתקן את זה בשבילכם?</p>
              <p className="text-xs opacity-80 mb-4">נשמח להראות לכם בדיוק מה אפשר לשפר ובכמה זמן.</p>

              {/* דוח מפורט בתשלום — מבצע */}
              <div className="rounded-xl bg-white/10 border border-white/15 p-4 mb-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap" style={{ background: '#3ddc97', color: '#06462c' }}>
                    מחיר מיוחד לשבוע הקרוב
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs line-through opacity-60">₪299</span>
                    <span className="text-xl font-extrabold" style={{ color: '#3ddc97' }}>₪50</span>
                  </div>
                </div>
                <p className="font-bold text-sm">דוח אבחון מפורט מלא</p>
                <p className="text-xs opacity-80 mt-0.5 leading-snug">
                  ניתוח מעמיק של כל האתר + מומחה שעובר איתכם על כל ממצא עם תוכנית פעולה מסודרת
                </p>
                <button
                  onClick={() => { setShowModal(false); openPopup(); }}
                  className="w-full mt-3 font-bold rounded-xl px-6 py-2.5 hover:opacity-90 transition-opacity text-sm"
                  style={{ background: '#3ddc97', color: '#06462c' }}
                >
                  הזמן דוח מפורט — ₪50
                </button>
              </div>

              <button
                onClick={() => { setShowModal(false); openPopup(); }}
                className="w-full border border-white/30 text-white font-bold rounded-xl px-6 py-3 hover:bg-white/10 transition-colors text-sm"
              >
                דבר עם מומחה עכשיו — חינם
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full text-xs text-white/70 hover:text-white transition-colors pt-3"
              >
                סגור
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteAuditTool;
