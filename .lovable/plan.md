
# אפשרות 4: שילוב Fade + Scale

## מה נשנה
נחליף את אנימציית ההחלקה הצידית (translateX) לאנימציית Fade + Scale - התוכן מתגלה תוך כדי שהוא גדל מעט מ-97% ל-100%.

## תחושה צפויה
- פרימיום וקולנועי
- התוכן "מתגבש" לתוך המסך
- רגוע ואלגנטי

---

## שינויים בקוד

**קובץ:** `src/components/sections/HeroSection.tsx`

### עדכון `getAnimationClasses`:
```tsx
// לפני
return `transition-[transform,opacity] duration-[15000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
  mounted 
    ? 'opacity-100 translate-x-0' 
    : 'opacity-0 translate-x-[60px]'
}`;

// אחרי
return `transition-[transform,opacity] duration-[2200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
  mounted 
    ? 'opacity-100 scale-100' 
    : 'opacity-0 scale-[0.97]'
}`;
```

### פירוט השינויים:
| פרמטר | לפני | אחרי |
|-------|------|------|
| משך | 15000ms | 2200ms |
| התחלה | opacity-0, translateX(60px) | opacity-0, scale(0.97) |
| סוף | opacity-1, translateX(0) | opacity-1, scale(1) |

---

## למה 2200ms?
עם Scale האנימציה מרגישה איטית יותר באותו משך זמן (כי התנועה עדינה יותר). 2-2.5 שניות זה המקום המתוק לאפקט הזה.

---

## בדיקות
1. רענון העמוד - לוודא שהתוכן מתגלה בצורה חלקה עם אפקט "התגבשות"
2. לוודא שאין שינוי במיקום הסופי של התוכן
