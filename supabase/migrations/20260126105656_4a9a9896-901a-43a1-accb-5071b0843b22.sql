-- Add CHECK constraints for data validation
ALTER TABLE public.contact_submissions 
  ADD CONSTRAINT name_length CHECK (length(name) >= 2 AND length(name) <= 100),
  ADD CONSTRAINT phone_format CHECK (phone ~ '^0[5-9][0-9]{8}$'),
  ADD CONSTRAINT business_length CHECK (length(business) >= 2 AND length(business) <= 200),
  ADD CONSTRAINT automation_type_valid CHECK (automation_type IN ('leads', 'quotes', 'scheduling', 'data', 'custom'));

-- Replace permissive INSERT policy with validated one
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

CREATE POLICY "Validated contact submissions"
ON public.contact_submissions FOR INSERT
WITH CHECK (
  length(name) >= 2 AND length(name) <= 100
  AND phone ~ '^0[5-9][0-9]{8}$'
  AND length(business) >= 2 AND length(business) <= 200
  AND automation_type IN ('leads', 'quotes', 'scheduling', 'data', 'custom')
);