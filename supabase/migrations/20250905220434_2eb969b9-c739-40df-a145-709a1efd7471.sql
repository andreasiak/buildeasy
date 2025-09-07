-- Add VAT ID and business address fields to vendor_profiles table
ALTER TABLE public.vendor_profiles 
ADD COLUMN vat_id text,
ADD COLUMN business_address text;

-- Add email change tracking to profiles table
ALTER TABLE public.profiles 
ADD COLUMN last_email_change timestamp with time zone,
ADD COLUMN email_change_count integer DEFAULT 0;