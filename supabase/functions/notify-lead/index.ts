import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const AUTOMATION_TYPE_LABELS: Record<string, string> = {
  leads: "אוטומציה ללידים",
  quotes: "אוטומציה להצעות מחיר",
  scheduling: "אוטומציה לקביעת תורים",
  data: "אוטומציה לניהול נתונים",
  custom: "תהליך מותאם אישית",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    // Supabase database webhook sends: { type, table, record, old_record }
    const record = payload.record ?? payload;

    const name = record.name ?? "לא ידוע";
    const phone = record.phone ?? "";
    const business = record.business ?? "";
    const automationType = AUTOMATION_TYPE_LABELS[record.automation_type] ?? record.automation_type ?? "";
    const createdAt = new Date(record.created_at ?? Date.now()).toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" });

    const messageText = `ליד חדש מהאתר 🔔\n\nשם: ${name}\nטלפון: ${phone}\nעיסוק: ${business}\nסוג אוטומציה: ${automationType}\nזמן: ${createdAt}`;

    const results: { email?: string; whatsapp?: string } = {};

    // ── Email via Resend ──────────────────────────────────────────
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const notifyEmail = Deno.env.get("NOTIFY_EMAIL") ?? "eladauto66@gmail.com";

    if (resendKey) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "EH Automation <onboarding@resend.dev>",
          to: notifyEmail,
          subject: `ליד חדש: ${name}`,
          html: `
            <div dir="rtl" style="font-family:Arial,sans-serif;max-width:480px">
              <h2 style="color:#2563eb">ליד חדש מהאתר 🔔</h2>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;color:#6b7280">שם</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280">טלפון</td><td style="padding:8px 0;font-weight:600"><a href="tel:${phone}">${phone}</a></td></tr>
                <tr><td style="padding:8px 0;color:#6b7280">עיסוק</td><td style="padding:8px 0">${business}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280">סוג אוטומציה</td><td style="padding:8px 0">${automationType}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280">זמן</td><td style="padding:8px 0">${createdAt}</td></tr>
              </table>
              <a href="https://wa.me/972${phone.replace(/^0/, '')}" style="display:inline-block;margin-top:16px;padding:10px 20px;background:#25D366;color:#fff;border-radius:8px;text-decoration:none">פתח WhatsApp</a>
            </div>
          `,
        }),
      });
      results.email = emailRes.ok ? "sent" : `error ${emailRes.status}`;
    }

    // ── WhatsApp via CallMeBot ────────────────────────────────────
    const callmebotKey = Deno.env.get("CALLMEBOT_API_KEY");
    const notifyPhone = Deno.env.get("NOTIFY_PHONE") ?? "972547108219";

    if (callmebotKey) {
      const encoded = encodeURIComponent(messageText);
      const waRes = await fetch(
        `https://api.callmebot.com/whatsapp.php?phone=${notifyPhone}&text=${encoded}&apikey=${callmebotKey}`
      );
      results.whatsapp = waRes.ok ? "sent" : `error ${waRes.status}`;
    }

    // ── Make Webhook (fire-and-forget) ──────────────────────────
    const makeUrl = Deno.env.get("MAKE_WEBHOOK_URL");
    if (makeUrl) {
      fetch(makeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          business,
          automation_type: record.automation_type ?? "",
          automation_type_label: automationType,
          created_at: record.created_at ?? new Date().toISOString(),
          source: "website",
        }),
      }).catch((e) => console.error("make webhook error:", e));
    }

    return new Response(JSON.stringify({ ok: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("notify-lead error:", err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
