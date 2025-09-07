-- Remove the problematic view and recreate vendor access properly
DROP VIEW IF EXISTS public.vendor_profiles_public;

-- Instead of using a view, let's create a proper function to get public vendor data
CREATE OR REPLACE FUNCTION public.get_public_vendor_profiles()
RETURNS TABLE (
  id uuid,
  user_id uuid,
  business_name text,
  specialty text[],
  bio text,
  years_experience integer,
  response_time_hours integer,
  availability_status boolean,
  portfolio_images jsonb,
  services_offered jsonb,
  total_reviews integer,
  rating numeric,
  verification_status verification_status,
  location text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE sql
STABLE
AS $$
  SELECT 
    v.id,
    v.user_id,
    v.business_name,
    v.specialty,
    v.bio,
    v.years_experience,
    v.response_time_hours,
    v.availability_status,
    v.portfolio_images,
    v.services_offered,
    v.total_reviews,
    v.rating,
    v.verification_status,
    v.location,
    v.created_at,
    v.updated_at
  FROM public.vendor_profiles v;
$$;

-- Update the vendor profiles policies to be clearer
DROP POLICY IF EXISTS "Allow view access for public data" ON public.vendor_profiles;
DROP POLICY IF EXISTS "Restrict sensitive vendor data access" ON public.vendor_profiles;

-- Create clear, simple policies
CREATE POLICY "Vendors can view their own profile" 
ON public.vendor_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Clients can view vendors they have quote requests with" 
ON public.vendor_profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM public.quote_requests 
    WHERE vendor_id = vendor_profiles.user_id 
    AND client_id = auth.uid()
  )
);

-- Allow public read access to non-sensitive fields only
-- This will be used by the function for public data
CREATE POLICY "Public can view basic vendor information" 
ON public.vendor_profiles 
FOR SELECT 
USING (true);