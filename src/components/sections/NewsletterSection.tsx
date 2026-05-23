import { useState } from 'react';
import { Mail } from 'lucide-react';

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzKNGnoiCqfq7qBFTS1QvNbbSxROFKEjFtfX-aZ-qaudOa34Ov0PUwgw5asEa1yUWUoyg/exec';

function extractName(email: string): string {
  const local = email.split('@')[0] || '';
  return local
    .replace(/[._\-+]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const name = extractName(email);
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('name', name);
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    }).catch(() => {});
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary-light/20">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            הישארו מעודכנים
          </h2>
          <p className="text-muted-foreground mb-8">
            טיפים, אוטומציות ועדכונים ישירות לתיבת הדואר שלכם. בלי ספאם.
          </p>

          {submitted ? (
            <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-lg font-semibold text-primary">תודה שנרשמת!</p>
              <p className="text-sm text-muted-foreground mt-1">ניצור קשר בקרוב.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="כתובת אימייל"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm"
              />
              <input
                type="tel"
                required
                placeholder="מספר טלפון"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 whitespace-nowrap"
              >
                {loading ? '...' : 'הירשם'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
