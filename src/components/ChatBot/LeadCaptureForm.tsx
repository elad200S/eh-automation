import { useState } from 'react';
import { Send } from 'lucide-react';

interface LeadCaptureFormProps {
  onSubmit: (name: string, phone: string) => void;
}

const LeadCaptureForm = ({ onSubmit }: LeadCaptureFormProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (name.trim() && phone.trim()) {
      onSubmit(name.trim(), phone.trim());
      setSubmitted(true);
    }
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
        placeholder="שם מלא"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        dir="rtl"
      />
      <input
        type="tel"
        placeholder="מספר טלפון"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        dir="rtl"
      />
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