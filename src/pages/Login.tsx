import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://eh-automation-4t6izxeg3-elad200s-projects.vercel.app/auth/callback',
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md">

        <div className="text-center mb-10">
          <Link to="/">
            <img src="/logo-eh.png" alt="EH Automation" className="h-12 mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">כניסת לקוחות</h1>
          <p className="text-muted-foreground text-sm mt-2">הכנס לפאנל הניהול האישי שלך</p>
        </div>

        <div className="bg-muted/20 border border-border rounded-2xl p-8">
          {sent ? (
            <div className="text-center space-y-4 py-4">
              <div className="text-5xl">📧</div>
              <h2 className="text-lg font-bold text-foreground">בדוק את המייל שלך</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                שלחנו קישור כניסה ל-<strong className="text-foreground">{email}</strong>.<br />
                לחץ על הקישור במייל כדי להיכנס לפאנל.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-xs text-primary hover:underline mt-2"
              >
                שלח שוב לאימייל אחר
              </button>
            </div>
          ) : (
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

              {error && (
                <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'שולח...' : 'שלח קישור כניסה'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          אין לך גישה? <a href="mailto:eladauto66@gmail.com" className="text-primary hover:underline">צור קשר</a>
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
