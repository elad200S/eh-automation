

# תוכנית: אנימציית החלקה של Hero כיחידה אחת

## מה ישתנה

במקום לעשות אנימציה לכל אלמנט בנפרד (כותרת, תיאור, כפתור), כל תוכן ה-Hero יחליק לתוך העמוד כבלוק אחד מאוחד.

## התנהגות האנימציה

- **כיוון**: מימין לשמאל (RTL)
- **מצב התחלתי**: הקטע מוסתר מימין, מחוץ לתצוגה
- **מצב סופי**: הקטע במקומו הרגיל
- **תחושה**: החלקה רכה ואלגנטית לתוך העמוד

## פרטים טכניים

**קובץ לעריכה:** `src/components/sections/HeroSection.tsx`

**שינויים:**

1. במקום להחיל אנימציה על כל אלמנט בנפרד, לעטוף את כל התוכן ב-wrapper אחד עם האנימציה

2. להסיר את ה-transition delays מהאלמנטים הבודדים

3. פרמטרי האנימציה:
   - **משך**: 1800ms (כמו עכשיו)
   - **Easing**: cubic-bezier(0.16, 1, 0.3, 1) - חלק מאוד
   - **התחלה**: opacity: 0, translateX(60px) - מרחק גדול יותר לתחושת החלקה
   - **סוף**: opacity: 1, translateX(0)

4. שמירה על הגישות: כיבוי אנימציה כש-prefers-reduced-motion מופעל

**לפני:**
```tsx
<div className="max-w-3xl">
  <div className={`... ${getAnimationClasses()}`} style={{ transitionDelay: '250ms' }}>
    // label
  </div>
  <h1 className={`... ${getAnimationClasses()}`} style={{ transitionDelay: '470ms' }}>
    // heading
  </h1>
  // ... כל אלמנט עם אנימציה משלו
</div>
```

**אחרי:**
```tsx
<div className={`max-w-3xl ${getAnimationClasses()}`}>
  <div className="text-technical mb-6">
    // label - ללא אנימציה עצמאית
  </div>
  <h1 className="text-5xl ...">
    // heading - ללא אנימציה עצמאית
  </h1>
  // ... כל האלמנטים יחליקו יחד
</div>
```

## תוצאה צפויה

כל תוכן ה-Hero יחליק לתוך העמוד כיחידה אחת, בתנועה חלקה ואלגנטית מימין לשמאל.

