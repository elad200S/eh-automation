## האבחנה

הבדיקה מראה שה-edge function `chat` תקינה לחלוטין:
- מחזירה 200 עם stream תקין
- המודל (google/gemini-3-flash) עונה בעברית כצפוי
- אין בעיית טוקנים, פרומפט או API key (LOVABLE_API_KEY מוגדר)

הבעיה היא **בצד הלקוח בלבד**: ה-`fetch` הידני ב-`useChatBot.ts` נכשל עם `TypeError: Failed to fetch` לפני שהבקשה יוצאת בכלל מהדפדפן. אף בקשה לא מגיעה ל-function (אין לוגים). זה נובע מהקריאה הידנית עם headers של `Authorization` + `apikey` שמפעילה CORS preflight שנחנק ב-fetch wrapper של ה-preview.

## הפתרון

להחליף את ה-`fetch` הידני ב-`src/components/ChatBot/useChatBot.ts` בקריאה דרך ה-SDK של Supabase שמטפלת נכון ב-headers וב-auth, תוך שמירה על הסטרימינג.

### שינויים ב-`src/components/ChatBot/useChatBot.ts`

1. במקום `fetch(CHAT_URL, ...)` עם headers ידניים, להשתמש ב-`supabase.functions.invoke('chat', { body: { messages }, ... })` במצב streaming — או חלופית להשאיר fetch אבל לקרוא ל-URL דרך `supabase.functions.url` ולהסיר את ה-`Authorization` הכפול (להשתמש רק ב-`apikey`).
2. הגישה המועדפת: להשתמש ב-`fetch` רגיל אבל לקחת את ה-URL וה-key ישירות מה-SDK (`supabase.functions.url('chat')`) ולהוסיף רק את ה-header `apikey` — בלי `Authorization: Bearer` כפול שמפעיל preflight מיותר.
3. לוודא שהפענוח של ה-SSE stream (line-by-line, [DONE], CRLF, flush סופי) נשמר כמו שהוא.

### למה זה יפתור

- מסיר את ה-CORS preflight המיותר שגורם ל-`Failed to fetch` ב-preview של Lovable.
- ה-edge function כבר מוגדרת `verify_jwt = false` (גישה אנונימית מכוונת), אז `apikey` לבד מספיק.
- שאר הלוגיקה (rate limit, lead capture, nudge, history) נשארת זהה.

## מה לא משתנה

- ה-edge function `supabase/functions/chat/index.ts` — לא נוגעים.
- ה-system prompt, רשימת המודלים, ה-webhook ל-Make — לא משתנים.
- ה-UI של הצ'אט (`ChatWindow`, `ChatMessage` וכו') — לא משתנה.