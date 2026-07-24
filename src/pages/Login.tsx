import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// להוסיף לקוח חדש: הוסף שורה עם האימייל וקוד הגישה שלו
const ACCESS_CODES: Record<string, string> = {
  'elad200226@gmail.com': 'EH2026',
  'eladauto66@gmail.com':  'EH2026',
  'test@client.com':       'TEST123',
};

const Login = () => {
  const [email, setEmail]       = useState('');
  const [code, setCode]         = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const normalizedEmail = email.trim().toLowerCase();
    const expectedCode    = ACCESS_CODES[normalizedEmail];

    if (!expectedCode || code.trim().toUpperCase() !== expectedCode.toUpperCase()) {
      setError('אימייל או קוד גישה שגויים.');
      setLoading(false);
      return;
    }

    login({ email: normalizedEmail });
    navigate('/portal');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md">

        <div className="text-center mb-10">
          <Link to="/">
            <img src="/logo-hey.png" alt="HEY Digital" className="h-12 mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">כניסת לקוחות</h1>
          <p className="text-muted-foreground text-sm mt-2">הכנס לפאנל הניהול האישי שלך</p>
        </div>

        <div className="bg-muted/20 border border-border rounded-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">אימייל</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">סיסמה</label>
              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                placeholder="הסיסמה שלך"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              כניסה לפאנל
            </button>

          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          אין לך קוד גישה? <a href="mailto:eladauto66@gmail.com" className="text-primary hover:underline">צור קשר</a>
        </p>
        <p className="text-center text-xs text-muted-foreground mt-2">
          <a
            href="mailto:eladauto66@gmail.com?subject=שכחתי סיסמה&body=שלום, שכחתי את סיסמת הכניסה לפאנל. האימייל שלי: "
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            שכחתי סיסמה
          </a>
        </p>
        <div className="text-center mt-4">
          <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            ← חזרה לאתר
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
