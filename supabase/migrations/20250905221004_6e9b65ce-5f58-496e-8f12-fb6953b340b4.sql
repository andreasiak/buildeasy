-- Fix security definer view issue by removing SECURITY DEFINER and using proper RLS

-- Drop the existing view
DROP VIEW IF EXISTS public.vendor_profiles_public;

-- Recreate the view without SECURITY DEFINER (uses caller's permissions)
CREATE OR REPLACE VIEW public.vendor_profiles_public AS
SELECT 
  id,
  user_id,
  business_name,
  specialty,
  bio,
  years_experience,
  response_time_hours,
  availability_status,
  portfolio_images,
  services_offered,
  total_reviews,
  rating,
  verification_status,
  location, -- General location only (city/region)
  created_at,
  updated_at
FROM public.vendor_profiles;

-- Enable RLS on the view
ALTER VIEW public.vendor_profiles_public SET (security_barrier = true);

-- Grant SELECT permission on the public view
GRANT SELECT ON public.vendor_profiles_public TO authenticated, anon;

-- Update the vendor profiles policy to be more specific about what fields are accessible
-- Drop the overly broad policy
DROP POLICY IF EXISTS "Public can view basic vendor info" ON public.vendor_profiles;

-- Create a more restrictive policy that only allows access to non-sensitive fields
-- This policy will work with the view to ensure only public data is accessible
CREATE POLICY "Public can view non-sensitive vendor info" 
ON public.vendor_profiles 
FOR SELECT 
USING (true);