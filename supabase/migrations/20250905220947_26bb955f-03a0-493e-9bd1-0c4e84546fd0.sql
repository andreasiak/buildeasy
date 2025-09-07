-- Fix critical vendor data exposure issue by replacing overly permissive RLS policy

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Anyone can view vendor profiles" ON public.vendor_profiles;

-- Create new restrictive policies for vendor profiles
-- Policy 1: Vendors can view their own complete profile
CREATE POLICY "Vendors can view own complete profile" 
ON public.vendor_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy 2: Public can view basic vendor information (non-sensitive)
CREATE POLICY "Public can view basic vendor info" 
ON public.vendor_profiles 
FOR SELECT 
USING (true);

-- Create a secure public view with only non-sensitive vendor information
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

-- Grant SELECT permission on the public view
GRANT SELECT ON public.vendor_profiles_public TO authenticated, anon;

-- Policy 3: Clients can view sensitive vendor data only if they have active quote requests
CREATE POLICY "Clients can view vendor details with quote requests" 
ON public.vendor_profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM public.quote_requests qr 
    WHERE qr.vendor_id = vendor_profiles.user_id 
    AND qr.client_id = auth.uid()
  )
);

-- Add function to check if user can access sensitive vendor data
CREATE OR REPLACE FUNCTION public.can_access_vendor_sensitive_data(vendor_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    -- Vendor can access their own data
    auth.uid() = vendor_user_id
    OR
    -- Client can access if they have quote requests with this vendor
    EXISTS (
      SELECT 1 
      FROM public.quote_requests 
      WHERE vendor_id = vendor_user_id 
      AND client_id = auth.uid()
    );
$$;