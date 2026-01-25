interface QuickRepliesProps {
  onSelect: (text: string) => void;
  disabled?: boolean;
}

const QUICK_REPLIES = [
  'יש לי תהליך ידני שמבזבז זמן',
  'אני רוצה יותר לידים בלי כאב ראש',
  'אני רוצה סדר ודוחות בעסק',
];

const QuickReplies = ({ onSelect, disabled }: QuickRepliesProps) => {
  return (
    <div className="flex flex-col gap-2 mt-3">
      {QUICK_REPLIES.map((text, index) => (
        <button
          key={index}
          onClick={() => onSelect(text)}
          disabled={disabled}
          className="text-right px-3 py-2 bg-primary/10 hover:bg-primary/20 text-foreground text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {text}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;
