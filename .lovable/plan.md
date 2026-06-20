## הבעיה
הטפסים באתר לא שומרים ללידים בכלל. הם שולחים רק ל-Make webhook ולא מבצעים `INSERT` לטבלת `contact_submissions`. לכן הפורטל מציג "אין לידים".

## מה אעשה

### 1. לשמור כל ליד ל-DB (בנוסף ל-Make)
אוסיף קריאה `supabase.from('contact_submissions').insert(...)` בכל מקום שיש טופס:
- `src/components/sections/ContactSection.tsx`
- `src/components/ContactPopup.tsx` (פופאפ "שיחת אפיון")
- `src/components/ChatBot/ChatWindow.tsx` (לכרגע מנסה להכניס ל-`eh_leads` שלא קיימת — אעדכן ל-`contact_submissions`)

הטבלה דורשת: `name`, `phone`, `business`, `automation_type` (אחד מ-`leads|quotes|scheduling|data|custom`). במקומות שאין שדה עסק/סוג — אמלא ערכי ברירת מחדל תקינים (למשל `business='—'`, `automation_type='custom'`) כדי לא להישבר מול ה-CHECK constraint, וטלפון יישלח כ-10 ספרות בלי מקף.

המשך השליחה ל-Make נשמר כדי שלא לפגוע בזרימה הקיימת. אם ה-INSERT נכשל — עדיין נציג למשתמש "נשלח" כדי לא לחסום, אבל נלוג שגיאה.

### 2. כפתור WhatsApp בטבלת הלידים בפורטל
ב-`src/pages/Portal.tsx` בעמודת הטלפון של `LeadsTab` אוסיף כפתור ירוק עם אייקון WhatsApp שפותח:
`https://wa.me/972{phone-without-leading-0}?text=שלום {name}, מדבר אלעד מ-EH Automation בהמשך לפנייתך באתר.`
(פותח בטאב חדש, ליד הכפתור הקיים של `tel:`)

## מה לא משנה
- לא נוגע ב-Make webhook, ולא בעיצוב הטפסים.
- ה-RLS על `contact_submissions` כבר תומך ב-INSERT אנונימי (יש policy `Validated contact submissions`) וב-SELECT לאדמינים — לא צריך מיגרציה.
