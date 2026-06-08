import { useState, useEffect, useRef } from 'react';
import { Search, X, AlertTriangle, CheckCircle2, Loader2, Smartphone, Globe, Eye, Zap } from 'lucide-react';
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

  const handleScan = async () => {
    if (!url.trim()) return;
    setScanState('loading');
    const normalized = normalizeUrl(url.trim());
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const res = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(normalized)}&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices&key=AIzaSyCXNa0-KUik3LdYd7xovIpR-ZAAjgRP-1I`,
        { signal: controller.signal }
      );
      clearTimeout(timeout);
      const data = await res.json();

      if (!res.ok || data.error || !data.lighthouseResult) {
        setScanState('error');
        return;
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
    } catch (err: any) {
      clearTimeout(timeout);
      setScanState(err?.name === 'AbortError' ? 'timeout' : 'error');
    }
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
            <p className="mt-3 text-sm text-red-400">לא הצלחנו לסרוק — ייתכן שהאתר חסום לסריקה. נסה כתובת אחרת.</p>
          )}
          {scanState === 'timeout' && (
            <p className="mt-3 text-sm text-yellow-400">הסריקה לקחה יותר מדי זמן — האתר גדול מדי. נסה אתר אחר.</p>
          )}
        </>
      )}

      {scanState === 'loading' && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Loader2 className="w-4 h-4 text-primary animate-spin flex-shrink-0" />
            <p className="text-sm text-muted-foreground">סורק את האתר... עד 30 שניות</p>
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
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg relative shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 left-4 text-muted-foreground hover:text-foreground transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-5 pb-4 text-center border-b border-border">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-2 mx-auto">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                האתר מפסיד {missedPotential}% מהפוטנציאל שלו
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">הנה מה שגורם לך להפסיד לקוחות:</p>
            </div>

            <div className="p-5 grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <ScoreCard
                  key={cat.id}
                  icon={cat.icon}
                  name={cat.name}
                  score={cat.score}
                  detail={cat.businessImpact}
                />
              ))}
            </div>

            <div className="px-5 pb-5 flex flex-col gap-2">
              <button
                onClick={() => { setShowModal(false); openPopup(); }}
                className="w-full bg-primary text-primary-foreground font-bold rounded-xl px-6 py-3 hover:opacity-90 transition-opacity text-sm"
              >
                דבר עם מומחה עכשיו
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
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
