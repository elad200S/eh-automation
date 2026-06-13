import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/portal');
      } else if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
      <div className="text-center space-y-3">
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '3px solid rgba(16,185,129,0.2)',
          borderTopColor: 'hsl(160,84%,39%)',
          animation: 'spin 0.7s linear infinite',
          margin: '0 auto',
        }} />
        <p className="text-muted-foreground text-sm">מתחבר לפאנל...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
