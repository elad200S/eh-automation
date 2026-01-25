import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `אתה הבוט החכם של EH Automation - חברה שמתמחה באוטומציה עסקית לעסקים קטנים.

כללים קשיחים:
1. ענה בעברית בלבד.
2. תשובות קצרות וברורות (3-6 שורות, מקסימום 1200 תווים).
3. אל תמציא מידע - אם אתה לא יודע, הפנה לטופס יצירת קשר.
4. היה ידידותי ומקצועי, בלי שפת שיווק מוגזמת.

נושאי ליבה שאתה יכול לענות עליהם:
- מה זה אוטומציה עסקית
- כלים נפוצים: Make, Airtable, HubSpot, WhatsApp API
- יתרונות אוטומציה לעסקים קטנים
- סוגי תהליכים שניתן לאוטומט

כשמשתמש מביע כוונת קנייה/יישום (שואל על מחיר, רוצה לבנות, איך עושים, צריך אוטומציה, יש לו בעיה בתהליך):
עבור למצב מיני-אבחון. שאל 3 שאלות בזו אחר זו:
1. "מה סוג העסק שלך? (B2B / שירותים / חנות / אחר)"
2. "מה הפעולה הכי ידנית שאתה עושה כל יום/שבוע?"
3. "באילו כלים אתה עובד? (WhatsApp / Gmail / Sheets / CRM / אחר)"

אחרי 3 התשובות:
- הצע 2-3 רעיונות אוטומציה מותאמים
- הפנה לטופס: "אם תרצה, אפשר להתקדם - השאר פרטים בטופס יצירת הקשר ואחזור אליך."`;

const TRIGGER_PHRASES = [
  "כמה עולה", "כמה זה עולה", "מחיר", "מחירים", "עלות", "מה העלות",
  "הצעת מחיר", "אפשר לבנות", "אפשר שתבנה לי", "לבנות לי",
  "איך עושים", "איך עושים את זה", "ליישום", "יישום", "לבנייה", "בנייה",
  "צריך אוטומציה", "יש לי בעיה", "מתאים לעסק שלי", "רוצה לדעת יותר",
  "כמה זמן", "תוך כמה זמן", "תכלס"
];

function normalize(text: string): string {
  return text
    .replace(/[?!.,;:'"״׳]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function detectBuyingIntent(text: string): boolean {
  const normalized = normalize(text);
  return TRIGGER_PHRASES.some(phrase => normalized.includes(normalize(phrase)));
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate and limit input
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.content?.length > 1500) {
      lastMessage.content = lastMessage.content.slice(0, 1500);
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check for buying intent in the last message
    const hasBuyingIntent = lastMessage?.role === 'user' && detectBuyingIntent(lastMessage.content || '');
    
    // Enhanced system prompt if buying intent detected
    let systemPrompt = SYSTEM_PROMPT;
    if (hasBuyingIntent) {
      systemPrompt += "\n\nהמשתמש הביע כוונת קנייה/יישום. התחל במיני-אבחון אם עוד לא התחלת.";
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.slice(-20), // Limit context window
        ],
        stream: true,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Return streaming response
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
