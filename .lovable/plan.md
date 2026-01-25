
# תוכנית יישום צ'אט בוט AI - גרסה סופית

## סקירה כללית

צ'אט בוט עברית בלבד לאתר EH Automation עם:
- גישת FAQ-first לשאלות פשוטות
- זיהוי כוונת קנייה ומעבר למיני-אבחון (3 שאלות)
- הפניה לטופס יצירת קשר הקיים
- אפשרות לאיפוס שיחה בכל שלב

## ארכיטקטורת הפתרון

```text
┌──────────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                             │
├──────────────────────────────────────────────────────────────────────┤
│  ChatBot.tsx          │  ChatWindow.tsx       │  useChatBot.ts       │
│  - Floating button    │  - Header + Close     │  - State management  │
│  - Open/close toggle  │  - Messages scroll    │  - Rate limiting     │
│  - Bottom-right pos   │  - Input + Send       │  - Streaming logic   │
│                       │  - Quick Replies      │  - Reset detection   │
├──────────────────────────────────────────────────────────────────────┤
│  ChatMessage.tsx      │  QuickReplies.tsx     │  TypingIndicator.tsx │
│  - User bubble (left) │  - 3 buttons          │  - Animated dots     │
│  - Bot bubble (right) │  - Click handlers     │                      │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    Backend (Edge Function)                           │
├──────────────────────────────────────────────────────────────────────┤
│  supabase/functions/chat/index.ts                                    │
│  - Lovable AI connection (google/gemini-3-flash-preview)             │
│  - Hebrew system prompt with FAQ + diagnosis logic                   │
│  - Trigger word detection for buying intent                          │
│  - Streaming response with fallback                                  │
│  - Input validation (1500 chars max)                                 │
│  - Error handling (429, 402, generic)                                │
└──────────────────────────────────────────────────────────────────────┘
```

## קבצים שייווצרו

### 1. ChatBot.tsx - רכיב ראשי
**נתיב: `src/components/ChatBot/ChatBot.tsx`**

מאפיינים:
- כפתור צף עגול (56x56px) בפינה ימנית תחתונה
- מיקום: `bottom: 24px`, `right: 24px`
- z-index: 9998 (מתחת לכפתור נגישות)
- אייקון MessageCircle מ-lucide-react
- אנימציית scale בהובר
- Toggle לפתיחה/סגירה של חלון הצ'אט

### 2. ChatWindow.tsx - חלון הצ'אט
**נתיב: `src/components/ChatBot/ChatWindow.tsx`**

מבנה:
```text
┌─────────────────────────────────────┐
│ [Bot Icon] EH Automation Bot    [X] │  ← Header כחול
├─────────────────────────────────────┤
│                                     │
│  ┌────────────────────────────────┐ │
│  │ הודעת פתיחה + Quick Replies   │ │  ← Bot (right aligned)
│  └────────────────────────────────┘ │
│                                     │
│  ┌────────────────────────────────┐ │
│  │ הודעת משתמש                   │ │  ← User (left aligned)
│  └────────────────────────────────┘ │
│                                     │
│  ● ● ●                             │  ← Typing indicator
│                                     │
├─────────────────────────────────────┤
│ [___________________________] [שלח] │  ← Input + Button
└─────────────────────────────────────┘
```

מידות:
- רוחב: 360px (מקסימום)
- גובה: 500px (מקסימום)
- border-radius: rounded-2xl
- RTL מלא (dir="rtl")

### 3. ChatMessage.tsx - בועת הודעה
**נתיב: `src/components/ChatBot/ChatMessage.tsx`**

יישור (RTL):
- **הודעות משתמש**: צד שמאל, רקע כחול (bg-primary), טקסט לבן
- **הודעות בוט**: צד ימין, רקע אפור בהיר (bg-muted), טקסט כהה

### 4. QuickReplies.tsx - כפתורי תגובה מהירה
**נתיב: `src/components/ChatBot/QuickReplies.tsx`**

שלושה כפתורים:
1. "יש לי תהליך ידני שמבזבז זמן"
2. "אני רוצה יותר לידים בלי כאב ראש"
3. "אני רוצה סדר ודוחות בעסק"

עיצוב:
- כפתורים אנכיים
- רקע: bg-primary/10
- hover: bg-primary/20
- border-radius: rounded-lg
- לחיצה שולחת את הטקסט כהודעת משתמש

### 5. TypingIndicator.tsx - אינדיקטור מקליד
**נתיב: `src/components/ChatBot/TypingIndicator.tsx`**

- שלוש נקודות עם אנימציית bounce
- מוצג בזמן שהבוט מגיב

### 6. useChatBot.ts - Hook לניהול מצב
**נתיב: `src/components/ChatBot/useChatBot.ts`**

```text
State:
├── messages: Message[]         // היסטוריית הודעות
├── isLoading: boolean          // האם ממתין לתשובה
├── isOpen: boolean             // האם החלון פתוח
└── messageCount: number        // ספירת הודעות לדקה

Functions:
├── sendMessage(text)           // שליחת הודעה + streaming
├── resetChat()                 // איפוס שיחה
├── toggleOpen()                // פתיחה/סגירה
└── checkRateLimit()            // בדיקת rate limit
```

זיהוי איפוס (בצד הלקוח):
- מילות מפתח: "שיחה חדשה", "התחל מחדש", "איפוס", "reset", "new chat"
- בזיהוי: מחיקת כל ההודעות והצגת הודעת פתיחה מחדש

Rate Limiting:
- מקסימום 10 הודעות לדקה
- ספירה מתאפסת כל 60 שניות
- הודעת שגיאה: "לאט לאט... נסה שוב בעוד כמה שניות"

### 7. Edge Function - Backend
**נתיב: `supabase/functions/chat/index.ts`**

חיבור ל-Lovable AI:
- מודל: google/gemini-3-flash-preview
- Streaming מופעל
- Fallback לתשובה מלאה אם streaming נכשל

System Prompt:
```text
אתה הבוט החכם של EH Automation - חברה שמתמחה באוטומציה עסקית לעסקים קטנים.

כללים קשיחים:
1. ענה בעברית בלבד.
2. תשובות קצרות וברורות (3-6 שורות, מקסימום 1200 תווים).
3. אל תמציא מידע - אם אתה לא יודע, הפנה לטופס יצירת קשר.
4. היה ידידותי ומקצועי, בלי שפת שיווק מוגזמת.

נושאי ליבה:
- מה זה אוטומציה עסקית
- כלים נפוצים: Make, Airtable, HubSpot, WhatsApp API
- יתרונות אוטומציה לעסקים קטנים
- סוגי תהליכים שניתן לאוטומט

כשמשתמש מביע כוונת קנייה/יישום:
עבור למצב מיני-אבחון. שאל 3 שאלות בזו אחר זו:
1. "מה סוג העסק שלך? (B2B / שירותים / חנות / אחר)"
2. "מה הפעולה הכי ידנית שאתה עושה כל יום/שבוע?"
3. "באילו כלים אתה עובד? (WhatsApp / Gmail / Sheets / CRM / אחר)"

אחרי 3 התשובות:
- הצע 2-3 רעיונות אוטומציה מותאמים
- הפנה לטופס: "אם תרצה, אפשר להתקדם - השאר פרטים בטופס יצירת הקשר ואחזור אליך."
```

מילות Trigger (normalized matching):
```javascript
const TRIGGER_PHRASES = [
  "כמה עולה", "כמה זה עולה", "מחיר", "מחירים", "עלות", "מה העלות",
  "הצעת מחיר", "אפשר לבנות", "אפשר שתבנה לי", "לבנות לי",
  "איך עושים", "איך עושים את זה", "ליישום", "יישום", "לבנייה", "בנייה",
  "צריך אוטומציה", "יש לי בעיה", "מתאים לעסק שלי", "רוצה לדעת יותר",
  "כמה זמן", "תוך כמה זמן", "תכלס"
];
```

Normalization:
```javascript
function normalize(text) {
  return text
    .replace(/[?!.,;:'"]/g, '')  // הסרת פיסוק
    .replace(/\s+/g, ' ')         // נרמול רווחים
    .trim()
    .toLowerCase();
}
```

### 8. עדכון config.toml
**נתיב: `supabase/config.toml`**

```toml
project_id = "dgsuukvywkxoecrpwddh"

[functions.chat]
verify_jwt = false
```

### 9. עדכון Index.tsx
**נתיב: `src/pages/Index.tsx`**

הוספת ChatBot component:
```tsx
import ChatBot from '@/components/ChatBot/ChatBot';

// בסוף הרכיב, לפני AccessibilityButton
<ChatBot />
```

## הגבלות ואבטחה

| הגבלה | ערך | מיקום |
|-------|-----|-------|
| אורך קלט מקסימלי | 1500 תווים | Frontend + Backend |
| אורך פלט מקסימלי | 1200 תווים | Backend (system prompt) |
| הודעות לדקה | 10 | Frontend (session) |
| היסטוריה מקסימלית | 30 הודעות | Frontend |

## טיפול בשגיאות

| קוד | הודעה בעברית |
|-----|--------------|
| Rate limit (client) | "לאט לאט... נסה שוב בעוד כמה שניות" |
| 429 | "יותר מדי בקשות, נסה שוב בעוד דקה" |
| 402 | "השירות לא זמין כרגע" |
| Generic/Network | "משהו השתבש, נסה שוב" |

## זרימת שיחה

```text
┌─────────────────────────────────────────────────────────────────┐
│                      הודעת פתיחה                                │
│  "היי! אני הבוט של EH Automation.                               │
│   אשמח לענות על שאלות בנושא אוטומציה עסקית."                    │
│                                                                 │
│  [Quick Replies]                                                │
│  ┌─────────────────────────────────────────┐                    │
│  │ יש לי תהליך ידני שמבזבז זמן             │                    │
│  ├─────────────────────────────────────────┤                    │
│  │ אני רוצה יותר לידים בלי כאב ראש         │                    │
│  ├─────────────────────────────────────────┤                    │
│  │ אני רוצה סדר ודוחות בעסק               │                    │
│  └─────────────────────────────────────────┘                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     משתמש שולח שאלה                             │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
┌──────────────────────┐       ┌──────────────────────────────────┐
│   שאלת FAQ רגילה    │       │   זוהתה כוונת קנייה/יישום       │
│   (אין trigger)      │       │   (יש trigger word)              │
└──────────────────────┘       └──────────────────────────────────┘
              │                               │
              ▼                               ▼
┌──────────────────────┐       ┌──────────────────────────────────┐
│  תשובה קצרה וברורה  │       │        מיני-אבחון               │
│  (3-6 שורות)        │       │  Q1: סוג עסק                     │
└──────────────────────┘       │  Q2: פעולה ידנית                 │
                               │  Q3: כלים בשימוש                 │
                               └──────────────────────────────────┘
                                              │
                                              ▼
                               ┌──────────────────────────────────┐
                               │  2-3 רעיונות אוטומציה מותאמים   │
                               │  + הפניה לטופס יצירת קשר         │
                               └──────────────────────────────────┘
```

## איפוס שיחה

בכל שלב, אם המשתמש מקליד אחת מהמילים:
- "שיחה חדשה"
- "התחל מחדש"
- "איפוס"
- "reset"
- "new chat"

התוצאה:
1. מחיקת כל ההודעות
2. איפוס מצב הצ'אט
3. הצגת הודעת פתיחה + Quick Replies מחדש

## מבנה קבצים סופי

```text
src/
├── components/
│   └── ChatBot/
│       ├── ChatBot.tsx           # Main component + floating button
│       ├── ChatWindow.tsx        # Chat UI window
│       ├── ChatMessage.tsx       # Message bubble
│       ├── QuickReplies.tsx      # Quick reply buttons
│       ├── TypingIndicator.tsx   # Typing animation
│       └── useChatBot.ts         # State management hook
│
├── pages/
│   └── Index.tsx                 # Updated: add ChatBot import
│
supabase/
├── config.toml                   # Updated: add chat function config
└── functions/
    └── chat/
        └── index.ts              # Edge function for AI
```

## סיכום טכני

| רכיב | טכנולוגיה |
|------|-----------|
| Frontend | React + TypeScript + Tailwind |
| State | Custom hook (useChatBot) |
| Backend | Supabase Edge Function (Deno) |
| AI | Lovable AI Gateway (gemini-3-flash-preview) |
| Streaming | SSE with line-by-line parsing |
| RTL | Full support (dir="rtl") |
| Icons | lucide-react |
| Animations | Tailwind + keyframes |

