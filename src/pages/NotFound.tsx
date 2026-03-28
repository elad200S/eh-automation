import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>עמוד לא נמצא (404) | EH Automation</title>
        <meta name="description" content="העמוד שחיפשת לא קיים. חזרו לעמוד הבית של EH Automation ומצאו את המידע שאתם מחפשים." />
        <meta name="robots" content="noindex,nofollow" />
        <html lang="he" dir="rtl" />
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-muted" dir="rtl">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">אופס! העמוד לא נמצא</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            חזרה לעמוד הבית
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
