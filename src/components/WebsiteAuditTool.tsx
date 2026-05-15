import { useState } from 'react';
import { Search, X, AlertTriangle, CheckCircle2, Loader2, Smartphone, Globe, Eye, Zap } from 'lucide-react';
import { useContactPopup } from '@/contexts/ContactPopupContext';

type ScanState = 'idle' | 'loading' | 'done' | 'error';

interface AuditRule {
  name: string;
  explanation: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  context: string;
  audits: Record<string, AuditRule>;
}

const CATEGORIES: Category[] = [
  {
    id: 'responsive',
    name: 'רספונסיביות',
    icon: <Smartphone className="w-4 h-4" />,
    context: 'האתר צריך לעבוד טוב בכל מסך — נייד, טאבלט, מחשב',
    audits: {
      'viewport':       { name: 'אין הגדרת מובייל', explanation: 'האתר לא מוגדר כ"מותאם לנייד" — גוגל מדרג אותו נמוך אוטומטית' },
      'font-size':      { name: 'טקסט קטן בנייד', explanation: 'הגופן קטן מדי לקריאה נוחה במסך נייד — משתמשים עוזבים' },
      'tap-targets':    { name: 'כפתורים קטנים מדי', explanation: 'קישורים וכפתורים קטנים מדי — קשה ללחוץ עליהם באצבע' },
      'content-width':  { name: 'תוכן רחב מהמסך', explanation: 'יש גלילה אופקית לא רצויה — שובר את חוויית הנייד' },
    },
  },
  {
    id: 'seo',
    name: 'אינדקס בגוגל',
    icon: <Globe className="w-4 h-4" />,
    context: 'גוגל צריך להיות מסוגל למצוא, לקרוא ולהבין את האתר — בלי זה אתה פשוט לא קיים בחיפוש',
    audits: {
      'document-title':    { name: 'חסרה כותרת לדף', explanation: 'אין כותרת — גוגל לא יודע על מה האתר ולא יכול לדרג אותו' },
      'meta-description':  { name: 'חסר תיאור SEO', explanation: 'אין meta description — הדף לא יופיע נכון בתוצאות החיפוש' },
      'is-crawlable':      { name: 'האתר חסום לגוגל', explanation: 'קוד באתר מונע מגוגל לסרוק את הדפים — הדף לא יאוינדקס' },
      'link-text':         { name: 'קישורים לא ברורים', explanation: 'קישורים כתובים "לחץ כאן" — גוגל לא מבין לאן הם מובילים' },
      'crawlable-anchors': { name: 'קישורים שגוגל לא עוקב', explanation: 'קישורים שכתובים בצורה שגוגל לא יכול לזהות כקישורים' },
    },
  },
  {
    id: 'colors',
    name: 'צבעים וקריאות',
    icon: <Eye className="w-4 h-4" />,
    context: 'צבעים שלא עובדים עם התוכן גורמים לאנשים לא לקרוא — אפילו אם העיצוב נראה יפה',
    audits: {
      'color-contrast': { name: 'ניגודיות צבעים נמוכה', explanation: 'הטקסט לא בולט מהרקע — קשה לקרוא, במיוחד בשמש או לאנשים עם לקות ראייה' },
      'image-alt':      { name: 'תמונות ללא תיאור', explanation: 'לתמונות אין alt text — גוגל לא יודע מה הן מציגות ולא יכול לאנדקס אותן' },
    },
  },
  {
    id: 'speed',
    name: 'מהירות',
    icon: <Zap className="w-4 h-4" />,
    context: 'כל שניה נוספת בטעינה = 20% מהמבקרים עוזבים לפני שראו כלום',
    audits: {
      'largest-contentful-paint': { name: 'טעינה איטית', explanation: 'האלמנט הראשי בדף טוען לאט — זה מה שהמשתמש מחכה לו' },
      'total-blocking-time':      { name: 'דף קפוא בטעינה', explanation: 'הדף לא מגיב ללחיצות בזמן הטעינה — תחושה שהאתר תקוע' },
      'unused-javascript':        { name: 'קוד מיותר שמאט', explanation: 'JavaScript שלא בשימוש יורד ומואט את הטעינה — צריך להסיר' },
      'render-blocking-resources':{ name: 'קבצים שחוסמים תצוגה', explanation: 'קבצי CSS/JS שעוצרים את הצגת הדף עד שהם נטענים' },
    },
  },
];


interface FailingAudit {
  categoryName: string;
  categoryIcon: React.ReactNode;
  categoryContext: string;
  items: { name: string; explanation: string }[];
}

const WebsiteAuditTool = () => {
  const [url, setUrl] = useState('');
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [failingCategories, setFailingCategories] = useState<FailingAudit[]>([]);
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
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(normalized)}&strategy=mobile`
      );
      const data = await res.json();
      const audits = data?.lighthouseResult?.audits ?? {};

      const failing = CATEGORIES.map(category => {
        const failedItems = Object.entries(category.audits)
          .filter(([id]) => {
            const audit = audits[id];
            return audit && audit.score !== null && audit.score !== undefined && audit.score < 0.5;
          })
          .map(([, rule]) => ({ name: rule.name, explanation: rule.explanation }));

        return {
          categoryName: category.name,
          categoryIcon: category.icon,
          categoryContext: category.context,
          items: failedItems,
        };
      }).filter(c => c.items.length > 0);

      const totalIssues = failing.reduce((sum, c) => sum + c.items.length, 0);

      setFailingCategories(failing);
      setScanState('done');
      if (totalIssues >= 2) setShowModal(true);
    } catch {
      setScanState('error');
    }
  };

  const totalIssues = failingCategories.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <div className="mt-8 p-6 md:p-8 rounded-2xl border border-primary/20 bg-card" dir="rtl">
      <h3 className="text-lg font-bold text-foreground mb-1">בדוק את האתר שלך בחינם</h3>
      <p className="text-sm text-muted-foreground mb-5">הכנס כתובת אתר ונמצא תקלות תוך שניות</p>

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

      {scanState === 'done' && totalIssues < 2 && (
        <div className="flex items-center gap-3 py-4">
          <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
          <p className="text-sm text-foreground">האתר שלך נראה תקין! לא נמצאו בעיות משמעותיות.</p>
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
              <h3 className="text-xl font-bold text-foreground">נמצאו {totalIssues} בעיות באתר שלך</h3>
              <p className="text-sm text-muted-foreground mt-1">הנה מה שמפסיד לך לקוחות:</p>
            </div>

            {/* Issues list */}
            <div className="overflow-y-auto flex-1 p-6 space-y-5">
              {failingCategories.map((cat, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary">{cat.categoryIcon}</span>
                    <span className="font-semibold text-foreground text-sm">{cat.categoryName}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 pr-6">{cat.categoryContext}</p>
                  <div className="space-y-2 pr-6">
                    {cat.items.map((item, j) => (
                      <div key={j} className="bg-background rounded-xl p-3 border border-border">
                        <p className="text-sm font-medium text-foreground mb-0.5">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.explanation}</p>
                      </div>
                    ))}
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
