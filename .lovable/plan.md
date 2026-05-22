
## אנימציות Scroll-Reveal דרמטיות בכל האתר

### על השאיפה מ-lusion.co
lusion.co בנוי על WebGL/Three.js עם סצנות 3D — אי-אפשר לשחזר 1:1 בלי לשנות את הסטאק. אנחנו ניקח את **השפה הויזואלית**: כניסות חלקות, תזוזה דרמטית כלפי מעלה, עקומת easing מקצועית (`power3.out` / `expo.out`), ו-stagger מדורג בין אלמנטים — כל זה בכלים הקיימים (GSAP + ScrollTrigger + ה-hook `useScrollReveal` הקיים).

### פרמטרים — סגנון "דרמטי יותר"
- **תזוזה:** 60px מלמטה
- **משך:** 1.2s
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (expo.out — חלק וניחת רך)
- **Stagger בין ילדים:** 100ms בין אלמנטים פנימיים
- **טריגר:** כשהמקטע 15% בתוך ה-viewport
- **ריצה:** פעם אחת בלבד (לא חוזר בגלילה הפוכה)
- **נגישות:** מכובד `prefers-reduced-motion` — מציג מיידית בלי אנימציה

### היקף — כל האתר
המנגנון המרכזי כבר קיים: רוב המקטעים עוברים דרך `<Section>` שמשתמש ב-`useScrollReveal` + class `.section-reveal`. נשדרג את הליבה במקום אחד וכל האתר ישתנה אוטומטית.

### השינויים

**1. `src/index.css` — שדרוג `.section-reveal`**
- תזוזה מ-`translate-y-8` (32px) ל-`translate-y-[60px]`
- משך מ-`duration-700` ל-`duration-[1200ms]`
- החלפת `ease-out` ב-`cubic-bezier(0.16, 1, 0.3, 1)` מותאם

**2. `src/hooks/useScrollReveal.ts` — חיזוק ה-hook**
- שינוי `translateY(16px)` ל-`translateY(60px)` ב-style ה-inline
- משך מ-600ms ל-1200ms
- Easing חדש ל-expo.out
- שינוי `threshold` מ-0 ל-0.15 כדי לטרגר רק כשהמקטע באמת נכנס
- `useScrollRevealGroup`: stagger ברירת-מחדל מ-120ms ל-100ms, תזוזה ל-40px

**3. `src/components/sections/HeroSection.tsx`**
ה-Hero לא נכנס בגלילה (הוא בראש הדף). נשאיר את אנימציית ה-GSAP הקיימת שלו כפי שהיא — היא כבר מטופלת בנפרד ("Hero Animation" בזיכרון).

**4. עמודי שירות/פתרון פנימיים**
`ServicePageLayout`, `SolutionPageLayout`, `IndustryPageLayout` — נוודא שגם הם משתמשים ב-Section או ב-useScrollReveal. אם לא, נעטוף את הבלוקים העיקריים שלהם.

### למה הגישה הזו
- **שינוי מינימלי:** עורכים 2 קבצים מרכזיים → כל האתר מתעדכן.
- **עקבי:** כל מקטע מקבל בדיוק את אותה שפה ויזואלית.
- **בטוח:** ה-Hero, ה-Navbar, ה-Footer וה-Popups לא נפגעים.
- **ביצועים:** IntersectionObserver (כבר בשימוש) — אפס עלות גלילה.

### קבצים שיערכו
- `src/index.css`
- `src/hooks/useScrollReveal.ts`
- אולי `src/components/ServicePageLayout.tsx` / `SolutionPageLayout.tsx` / `IndustryPageLayout.tsx` (לבדיקה והוספת ref במידת הצורך)

### מה שלא יקרה
- אין הוספת תלויות חדשות
- אין שינוי לוגיקה עסקית, טקסטים, או צבעים
- אין שינוי ל-Hero, Navbar, ChatBot או Popups
- אין שימוש ב-Three.js / WebGL
