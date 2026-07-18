## הבעיה (מאומתת)

בפרויקט קיימים שני קליינטים של Supabase שמצביעים לשני backends שונים:

- `src/lib/supabase.ts` — קליינט ידני שמצביע לפרויקט ישן (`wotfxbniypocfsgpawak`).
- `src/integrations/supabase/client.ts` — הקליינט הרשמי של Lovable Cloud (`dgsuukvywkxoecrpwddh`), בו יושבת טבלת `contact_submissions` שהפורטל קורא ממנה.

כל שלושת הטפסים (`ContactSection`, `ContactPopup`, `ChatWindow`) מייבאים מ-`@/lib/supabase` ולכן ה-INSERT נשלח ל-backend הלא נכון. הפורטל קורא מה-backend הנכון ולכן `contact_submissions` שם ריקה (אומת: `count = 0`). לכן "אין לידים עדיין".

## תוכנית התיקון

### 1. איחוד לקליינט אחד (התיקון המרכזי)
- לעדכן את `src/lib/supabase.ts` לייצא מחדש את הקליינט הרשמי של Lovable Cloud מ-`@/integrations/supabase/client`, במקום ליצור אינסטנס חדש עם URL/מפתח קשיחים לפרויקט הישן. כך כל הקוד הקיים שמייבא מ-`@/lib/supabase` ימשיך לעבוד — אבל יפנה ל-backend הנכון.
- כך `ContactSection`, `ContactPopup`, ו-`ChatWindow` יבצעו INSERT לטבלה שהפורטל באמת קורא ממנה.

### 2. אכיפת ולידציה תואמת ל-CHECK constraint לפני INSERT
ה-DB דורש: שם 2–100 תווים, טלפון בפורמט `^0[5-9][0-9]{8}$` (10 ספרות בלי מקף), עסק 2–200 תווים, `automation_type ∈ {leads, quotes, scheduling, data, custom}`.
- `ContactSection`: השדה "עסק" אופציונלי — היום שולח `'—'` כשריק, וזה נכשל ב-CHECK (אורך 1). לשלוח במקום זה ערך תקין כמו `'לא צוין'` (2+ תווים). כנ"ל לוודא שגם ב-`ChatWindow` אין שדות שלא עומדים ב-CHECK.
- להוסיף `toast` שגיאה אמיתי כאשר `dbError` חוזר, במקום רק `console.error`, כדי שלא ייווצר שוב מצב שקט של "הכל נראה עובד אבל שום דבר לא נשמר".

### 3. Realtime לפורטל — אימות
המנוי שכבר קיים ב-`LeadsTab` מסתמך על publication `supabase_realtime`. לוודא עם מיגרציה קטנה שהטבלה כלולה שם; אם כבר קיימת ה-`ALTER PUBLICATION` יהיה idempotent.

### 4. שיפורים מוצעים (אחרי אישור, לא חובה עכשיו)
- **שדה סטטוס לליד** (`new | contacted | closed | irrelevant`) עם ברירת מחדל `new`, ועדכון ישיר מהטבלה בפורטל (dropdown). דורש מיגרציה + policy `UPDATE` לאדמינים.
- **שדה `notes`** לרשום הערות פנימיות על כל ליד.
- **סימון "נצפה"** אוטומטי + ספירת לידים חדשים מעל ה-Tab.
- **ייצוא ל-CSV** מהפורטל.
- **התראת מייל/וואטסאפ מיידית** על ליד חדש דרך Edge Function `notify-lead` שכבר קיימת בפרויקט (לחבר אותה ל-trigger על `contact_submissions`).
- **מקור הליד** (`source`: main_form / popup / chatbot) בעמודה נפרדת במקום להיות מוסתר בלוגיקה — עוזר להבין מה ממיר.

## פרטים טכניים

קבצים שיתעדכנו בשלב 1–2:
- `src/lib/supabase.ts` — להפוך ל-re-export של הקליינט הרשמי.
- `src/components/sections/ContactSection.tsx` — ברירת מחדל תקינה ל-`business`, טיפול ב-`dbError` עם toast.
- `src/components/ContactPopup.tsx` — טיפול ב-`dbError` עם toast.
- `src/components/ChatBot/ChatWindow.tsx` — לוודא שההכנסה תואמת ל-CHECK ולטפל בשגיאה.

לא נוגעים ב-`src/integrations/supabase/client.ts` ולא ב-`types.ts` (מנוהלים אוטומטית).

## מה לא כלול
- לא משנים את זרימת ה-Make webhook.
- לא נוגעים בעיצוב הטפסים או בפורטל עצמו בשלב הזה (מעבר ל-toast השגיאה).

אחרי שתאשר, אבצע את שלבים 1–3 ואמתין להחלטה שלך על השיפורים בשלב 4.