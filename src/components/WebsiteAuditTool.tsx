import { useState } from 'react';
import { Search, X, AlertTriangle, CheckCircle2, Loader2, Smartphone, Globe, Eye, Zap } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';

type ScanState = 'idle' | 'loading' | 'done' | 'error';

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
    businessImpact: 'כל שניה נוספת בטעינה גורמת ל-20% מהמבקרים לעזוב לפני שראו כלום',
  },
  seo: {
    name: 'אינדקס בגוגל',
    icon: <Globe className="w-4 h-4" />,
    businessImpact: 'ציון נמוך = גוגל לא מדרג את האתר גבוה — לקוחות לא מוצאים אותך',
  },
  accessibility: {
    name: 'נגישות וקריאות',
    icon: <Eye className="w-4 h-4" />,
    businessImpact: 'קריאות נמוכה = אנשים לא קוראים את התוכן — אפילו אם הגיעו לאתר',
  },
  'best-practices': {
    name: 'רספונסיביות ותקנים',
    icon: <Smartphone className="w-4 h-4" />,
    businessImpact: 'אתר שלא עומד בתקנים נראה לא מקצועי ומרחיק לקוחות',
  },
};

const scoreColor = (score: number) => {
  if (score >= 90) return 'text-green-400';
  if (score >= 50) return 'text-yellow-400';
  return 'text-red-400';
};

const scoreBg = (score: number) => {
  if (score >= 90) return 'bg-green-400/5 border-green-400/20';
  if (score >= 50) return 'bg-yellow-400/5 border-yellow-400/20';
  return 'bg-red-400/5 border-red-400/20';
};

const WebsiteAuditTool = () => {
  const [url, setUrl] = useState('');
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [categories, setCategories] = useState<CategoryResult[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { openPopup } = useContactPopup();

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
    try {
      const res = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(normalized)}&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices`
      );
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
      if (results.some(c => c.score < 90)) setShowModal(true);
    } catch {
      setScanState('error');
    }
  };

  const failingCount = categories.filter(c => c.score < 90).length;
  const avgScore = categories.length > 0
    ? Math.round(categories.reduce((s, c) => s + c.score, 0) / categories.length)
    : 0;
  const missedPotential = 100 - avgScore;

  return (
    <div className="mt-8 p-6 md:p-8 rounded-2xl border border-primary/20 bg-card" dir="rtl">
      <h3 className="text-lg font-bold text-foreground mb-1">בדוק את האתר שלך בחינם</h3>
      <p className="text-sm text-muted-foreground mb-5">הכנס כתובת אתר ונגלה כמה פוטנציאל האתר מפסיד</p>

      {(scanState === 'idle' || scanState === 'error') && (
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
            <p className="mt-3 text-sm text-red-400">לא הצלחנו לסרוק את האתר. בדוק שהכתובת נכונה ונסה שוב.</p>
          )}
        </>
      )}

      {scanState === 'loading' && (
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">סורק את האתר...</p>
        </div>
      )}

      {scanState === 'done' && failingCount === 0 && (
        <div className="flex items-center gap-3 py-4">
          <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
          <p className="text-sm text-foreground">האתר שלך מצוין! כל הקטגוריות מעל 90.</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" dir="rtl">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg relative shadow-2xl max-h-[90vh] flex flex-col">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 left-4 text-muted-foreground hover:text-foreground transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="p-6 pb-4 text-center border-b border-border">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-3 mx-auto">
                <AlertTriangle className="w-7 h-7 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                האתר שלך מפסיד {missedPotential}% מהפוטנציאל שלו
              </h3>
              <p className="text-sm text-muted-foreground mt-1">הנה מה שגורם לך להפסיד לקוחות:</p>
            </div>

            {/* Category scores */}
            <div className="overflow-y-auto flex-1 p-6 space-y-3">
              {categories.map((cat, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border ${scoreBg(cat.score)}`}>
                  <div className={`text-2xl font-bold min-w-[3.5rem] text-center tabular-nums ${scoreColor(cat.score)}`}>
                    {cat.score}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={scoreColor(cat.score)}>{cat.icon}</span>
                      <span className="font-semibold text-foreground text-sm">{cat.name}</span>
                    </div>
                    {cat.score < 90
                      ? <p className="text-xs text-muted-foreground">{cat.businessImpact}</p>
                      : <p className="text-xs text-green-400">תקין</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="p-6 pt-4 border-t border-border">
              <button
                onClick={() => { setShowModal(false); openPopup(); }}
                className="w-full bg-primary text-primary-foreground font-bold rounded-xl px-6 py-3 hover:opacity-90 transition-opacity"
              >
                דבר עם מומחה עכשיו
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="mt-2 w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
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
