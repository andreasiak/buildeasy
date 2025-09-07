-- Create vendor profile for necronofficial@gmail.com to handle all fake vendor quotes
INSERT INTO public.vendor_profiles (
  user_id,
  business_name,
  specialty,
  location,
  rating,
  total_reviews,
  verification_status,
  years_experience,
  bio,
  services_offered,
  availability_status,
  response_time_hours
) VALUES (
  'e98fb33b-6856-41c3-823c-6a1932ff41ac',
  'All-Service Construction Pro',
  ARRAY['Real Estate', 'Architecture Firm', 'Construction', 'Electrical', 'Mechanical', 'Lawyer', 'Pool Construction', 'Landscaping', 'Furniture', 'Lighting and Fixtures'],
  'Multi-Location Service Provider',
  4.8,
  245,
  'verified',
  15,
  'Professional multi-service provider handling all construction and development needs. Experienced in residential, commercial, and specialized projects across all service categories.',
  '["Real Estate", "Architecture Firm", "Construction", "Electrical", "Mechanical", "Lawyer", "Pool Construction", "Landscaping", "Furniture", "Lighting and Fixtures"]'::jsonb,
  true,
  24
) ON CONFLICT (user_id) DO UPDATE SET
  business_name = EXCLUDED.business_name,
  specialty = EXCLUDED.specialty,
  location = EXCLUDED.location,
  rating = EXCLUDED.rating,
  total_reviews = EXCLUDED.total_reviews,
  verification_status = EXCLUDED.verification_status,
  years_experience = EXCLUDED.years_experience,
  bio = EXCLUDED.bio,
  services_offered = EXCLUDED.services_offered,
  availability_status = EXCLUDED.availability_status,
  response_time_hours = EXCLUDED.response_time_hours;