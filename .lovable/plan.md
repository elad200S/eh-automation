

# Update Chatbot System Prompt

## What Changes

**Single file:** `supabase/functions/chat/index.ts`

### 1. Replace `SYSTEM_PROMPT` (lines 38-73)

New prompt implements the full conversation flow from the user's spec:
- Step 1: Understand the business (open question)
- Step 2: Clarify the workflow (one follow-up)
- Step 3: Suggest realistic automation direction
- Step 4: CTA — 15-minute discovery call via WhatsApp
- Pricing handler, objection handling, security/anti-injection rules
- Hebrew-only responses, 2-5 lines max

### 2. Expand `TRIGGER_PHRASES` (lines 75-81)

Add: `"שיחה"`, `"לקבוע"`, `"פגישה"`, `"אפיון"`, `"רק בודק"`, `"אין לי זמן"`

### 3. Update buying intent enhancement (line ~150)

Simplify the intent-detected system prompt addition to align with the new flow — nudge toward discovery call instead of mini-diagnosis.

### What stays the same
- Edge function structure (CORS, rate limiting, streaming, error handling)
- Client-side chatbot UI, quick replies, proactive bubbles
- All other files untouched

