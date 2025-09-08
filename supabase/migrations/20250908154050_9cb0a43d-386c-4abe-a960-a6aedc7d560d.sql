-- Fix the vendor directory visibility issue
-- The current policy has "AND false" which completely hides all vendors from public view
-- This breaks the core functionality where clients need to discover vendors

DROP POLICY IF EXISTS "Public can view basic vendor directory info" ON public.vendor_profiles;

CREATE POLICY "Public can view basic vendor directory info"
ON public.vendor_profiles 
FOR SELECT
USING (verification_status = 'verified');

-- This allows verified vendors to be visible to everyone, which is necessary for the business model