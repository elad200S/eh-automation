CREATE POLICY "Admins can view all contact submissions"
ON public.contact_submissions FOR SELECT
TO authenticated
USING (
  (auth.jwt() ->> 'email') IN ('eladauto66@gmail.com', 'elad200226@gmail.com')
);

GRANT SELECT ON public.contact_submissions TO authenticated;