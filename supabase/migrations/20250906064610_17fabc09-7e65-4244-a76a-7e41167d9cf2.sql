-- SECURITY FIX MIGRATION
-- Remove overly permissive vendor profile access and implement secure data exposure

-- 1. Drop the existing overly permissive public policy
DROP POLICY IF EXISTS "Public can view verified vendor basic info" ON public.vendor_profiles;

-- 2. Create a secure function for public vendor directory that only exposes safe fields
CREATE OR REPLACE FUNCTION public.get_public_vendor_directory()
RETURNS TABLE(
  id uuid,
  user_id uuid,
  business_name text,
  specialty text[],
  location text,
  rating numeric,
  total_reviews integer,
  verification_status verification_status
) 
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    v.id,
    v.user_id,
    v.business_name,
    v.specialty,
    v.location,
    v.rating,
    v.total_reviews,
    v.verification_status
  FROM public.vendor_profiles v
  WHERE v.verification_status = 'verified';
$$;

-- 3. Create a restrictive public policy that only allows viewing basic directory info
CREATE POLICY "Public can view basic vendor directory info" 
ON public.vendor_profiles 
FOR SELECT 
USING (
  verification_status = 'verified' AND 
  -- Only allow access to safe fields through the function
  false -- This effectively blocks direct table access for public
);

-- 4. Strengthen message privacy controls with explicit sender/recipient checks
DROP POLICY IF EXISTS "Users can view their messages" ON public.messages;
CREATE POLICY "Users can view their messages" 
ON public.messages 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  (auth.uid() = sender_id OR auth.uid() = recipient_id)
);

-- 5. Strengthen profile access controls
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  auth.uid() = user_id
);

-- 6. Add audit function for sensitive data access (for monitoring)
CREATE OR REPLACE FUNCTION public.log_vendor_profile_access(
  vendor_user_id uuid,
  accessing_user_id uuid,
  access_type text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log access attempts for security monitoring
  -- This can be extended to insert into an audit table if needed
  RAISE NOTICE 'Vendor profile access: vendor_id=%, accessor_id=%, type=%', 
    vendor_user_id, accessing_user_id, access_type;
END;
$$;

-- 7. Create a secure function for clients to view vendors they have quote requests with
CREATE OR REPLACE FUNCTION public.get_vendor_for_quote_request(quote_request_id_param uuid)
RETURNS TABLE(
  id uuid,
  user_id uuid,
  business_name text,
  specialty text[],
  bio text,
  years_experience integer,
  portfolio_images jsonb,
  services_offered jsonb,
  rating numeric,
  total_reviews integer,
  location text,
  response_time_hours integer
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    v.id,
    v.user_id,
    v.business_name,
    v.specialty,
    v.bio,
    v.years_experience,
    v.portfolio_images,
    v.services_offered,
    v.rating,
    v.total_reviews,
    v.location,
    v.response_time_hours
  FROM public.vendor_profiles v
  INNER JOIN public.quote_requests qr ON qr.vendor_id = v.user_id
  WHERE qr.id = quote_request_id_param
    AND qr.client_id = auth.uid()
    AND qr.status IN ('pending', 'quoted', 'accepted');
$$;