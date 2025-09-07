-- Fix function search path issue
DROP FUNCTION IF EXISTS public.get_public_vendor_profiles();

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
SET search_path = public
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