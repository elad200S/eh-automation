import { useState } from 'react';
import { Send } from 'lucide-react';

interface LeadCaptureFormProps {
  onSubmit: (name: string, phone: string) => void;
}

const isValidPhone = (phone: string): boolean => /^0[5-9][0-9]-?[0-9]{7}$/.test(phone.trim());

const LeadCaptureForm = ({ onSubmit }: LeadCaptureFormProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleSubmit = () => {
    if (honeypot) return;
    if (!name.trim() || !phone.trim()) return;
    if (!isValidPhone(phone)) {
      setPhoneError('מספר טלפון לא תקין (לדוגמה: 050-1234567)');
      return;
    }
    setPhoneError('');
    onSubmit(name.trim(), phone.trim());
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="mt-3 text-sm font-medium text-primary">
        תודה! אלעד יחזור אליך בהקדם ✓
      </p>
    );
  }

  return (
    <div className="mt-3 flex flex-col gap-2">
      <input
        type="text"
        name="website_url"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <input
        type="text"
        placeholder="שם מלא"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        dir="rtl"
      />
      <input
        type="tel"
        placeholder="מספר טלפון (050-1234567)"
        value={phone}
        onChange={(e) => { setPhone(e.target.value); setPhoneError(''); }}
        className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        dir="ltr"
      />
      {phoneError && <p className="text-xs text-destructive">{phoneError}</p>}
      <button
        onClick={handleSubmit}
        disabled={!name.trim() || !phone.trim()}
        className="w-full py-2 px-4 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Send className="w-3.5 h-3.5" />
        שלח
      </button>
    </div>
  );
};

export default LeadCaptureForm;