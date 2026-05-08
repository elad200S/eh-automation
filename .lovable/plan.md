## הבעיה

בסקשן `SolutionsOverviewSection`, כל כרטיס הוא `<Link>` (שמתרנדר כ-`<a>`). תגית `<a>` היא ברירת מחדל `display: inline`, ולכן הרקע (`bg-card rounded-2xl`) מתכווץ לרוחב התוכן הצר ביותר (האייקון), והטקסט גולש החוצה ויוצר את אפקט "המלבן הצר עם טקסט מסביב".

## התיקון

הוספת `block h-full` ל-className של ה-`<Link>` בתוך `SolutionCard` ב-`src/components/sections/SolutionsOverviewSection.tsx`, כדי שהכרטיס ימלא את כל רוחב תא הגריד וגובה אחיד בין הכרטיסים.

```tsx
className={cn(
  'group relative block h-full p-6 bg-card rounded-2xl border transition-all duration-300 overflow-hidden',
  ...
)}
```

זה מחזיר את הכרטיסים למלבנים רחבים ואחידים, בלי לגעת בעיצוב, בצבעים או באנימציות.

## מה לא משתנה

- אין שינוי בצבעים, גבולות, hover, או אנימציות.
- אין שינוי בלוגיקה או בקבצים אחרים.
