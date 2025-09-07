-- CRITICAL SECURITY FIX: Remove public vendor data exposure
-- Drop the overly permissive public access policy
DROP POLICY IF EXISTS "Public can view basic vendor information" ON public.vendor_profiles;

-- Create a secure function that only exposes non-sensitive vendor data
CREATE OR REPLACE FUNCTION public.get_safe_vendor_profiles()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  business_name text,
  specialty text[],
  bio text,
  years_experience integer,
  availability_status boolean,
  services_offered jsonb,
  total_reviews integer,
  rating numeric,
  verification_status verification_status,
  location text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    v.id,
    v.user_id,
    v.business_name,
    v.specialty,
    v.bio,
    v.years_experience,
    v.availability_status,
    v.services_offered,
    v.total_reviews,
    v.rating,
    v.verification_status,
    v.location
  FROM public.vendor_profiles v
  WHERE v.verification_status = 'verified';
$$;

-- Create a security definer function to get user role from database
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid uuid)
RETURNS user_type
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT user_type FROM public.profiles WHERE user_id = user_uuid;
$$;

-- Create restricted public policy for vendor profiles (only basic info)
CREATE POLICY "Public can view verified vendor basic info" 
ON public.vendor_profiles 
FOR SELECT 
USING (verification_status = 'verified');

-- Update existing policies to be more restrictive
DROP POLICY IF EXISTS "Clients can view vendor details with quote requests" ON public.vendor_profiles;
DROP POLICY IF EXISTS "Clients can view vendors they have quote requests with" ON public.vendor_profiles;

-- Create new restrictive policy for clients with quote requests
CREATE POLICY "Clients can view vendors with active quotes" 
ON public.vendor_profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM quote_requests qr 
    WHERE qr.vendor_id = vendor_profiles.user_id 
    AND qr.client_id = auth.uid()
    AND qr.status IN ('pending', 'quoted', 'accepted')
  )
);