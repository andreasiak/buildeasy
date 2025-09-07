-- Create fake vendor profiles for testing
-- These will have FAKE in their names for easy identification and deletion

-- First, let's create some fake user IDs (these would normally be auth.users IDs)
-- Real Estate vendors
INSERT INTO public.vendor_profiles (
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
  location,
  license_number,
  business_address,
  vat_id
) VALUES 
-- Real Estate (5 vendors)
('00000001-0001-4000-8000-000000000001', 'Prime Properties Group FAKE', ARRAY['Land Development'], 'Specialized in land development and commercial properties', 12, 24, true, '[]'::jsonb, '["Land Development", "Zoning", "Permits"]'::jsonb, 127, 4.8, 'verified', 'Downtown', 'RE-2024-001', '123 Real Estate Ave', 'VAT-001'),
('00000001-0001-4000-8000-000000000002', 'BuildLand Solutions FAKE', ARRAY['Residential Plots'], 'Expert in residential plot development', 8, 24, true, '[]'::jsonb, '["Residential Development", "Plot Planning"]'::jsonb, 89, 4.6, 'verified', 'North District', 'RE-2024-002', '456 Land St', 'VAT-002'),
('00000001-0001-4000-8000-000000000003', 'Metro Land Advisors FAKE', ARRAY['Zoning & Permits'], 'Professional zoning and permit specialists', 15, 48, true, '[]'::jsonb, '["Zoning", "Permits", "Legal Compliance"]'::jsonb, 203, 4.7, 'pending', 'City Center', 'RE-2024-003', '789 Metro Blvd', 'VAT-003'),
('00000001-0001-4000-8000-000000000004', 'Urban Development Co FAKE', ARRAY['Commercial Land'], 'Commercial land development experts', 10, 36, true, '[]'::jsonb, '["Commercial Development", "Urban Planning"]'::jsonb, 156, 4.5, 'verified', 'East Side', 'RE-2024-004', '321 Urban Way', 'VAT-004'),
('00000001-0001-4000-8000-000000000005', 'Green Acres Realty FAKE', ARRAY['Eco-Friendly Lots'], 'Sustainable and eco-friendly development', 6, 24, true, '[]'::jsonb, '["Sustainable Development", "Eco Planning"]'::jsonb, 78, 4.9, 'verified', 'Suburbs', 'RE-2024-005', '654 Green Ave', 'VAT-005'),

-- Architecture Firm (5 vendors)
('00000002-0002-4000-8000-000000000001', 'Modern Design Studio FAKE', ARRAY['Contemporary Homes'], 'Award-winning contemporary home designs', 18, 72, true, '[]'::jsonb, '["Residential Design", "Contemporary Architecture"]'::jsonb, 67, 4.9, 'verified', 'Design District', 'ARCH-2024-001', '123 Design St', 'VAT-006'),
('00000002-0002-4000-8000-000000000002', 'Heritage Architects FAKE', ARRAY['Traditional Style'], 'Traditional and classical architecture specialists', 25, 96, true, '[]'::jsonb, '["Traditional Design", "Heritage Restoration"]'::jsonb, 134, 4.7, 'verified', 'Historic Quarter', 'ARCH-2024-002', '456 Heritage Rd', 'VAT-007'),
('00000002-0002-4000-8000-000000000003', 'Eco Architecture Lab FAKE', ARRAY['Sustainable Design'], 'Sustainable and green building design', 12, 120, true, '[]'::jsonb, '["Sustainable Architecture", "Green Building"]'::jsonb, 92, 4.8, 'verified', 'Green Valley', 'ARCH-2024-003', '789 Eco Lane', 'VAT-008'),
('00000002-0002-4000-8000-000000000004', 'Urban Planning Co FAKE', ARRAY['Multi-Family Units'], 'Multi-family and commercial building design', 20, 96, true, '[]'::jsonb, '["Multi-Family Design", "Commercial Architecture"]'::jsonb, 178, 4.6, 'pending', 'Business District', 'ARCH-2024-004', '321 Planning Ave', 'VAT-009'),
('00000002-0002-4000-8000-000000000005', 'Innovative Spaces FAKE', ARRAY['Smart Homes'], 'Smart home and technology integration', 8, 72, true, '[]'::jsonb, '["Smart Home Design", "Technology Integration"]'::jsonb, 89, 4.8, 'verified', 'Tech Hub', 'ARCH-2024-005', '654 Innovation Blvd', 'VAT-010'),

-- Construction (5 vendors)
('00000003-0003-4000-8000-000000000001', 'Elite Builders Inc FAKE', ARRAY['Custom Homes'], 'Premium custom home construction', 30, 168, true, '[]'::jsonb, '["Custom Construction", "High-End Residential"]'::jsonb, 234, 4.7, 'verified', 'Industrial Zone', 'CONST-2024-001', '123 Builder St', 'VAT-011'),
('00000003-0003-4000-8000-000000000002', 'Precision Construction FAKE', ARRAY['High-End Residential'], 'Luxury residential construction specialists', 22, 192, true, '[]'::jsonb, '["Luxury Construction", "Premium Finishes"]'::jsonb, 189, 4.8, 'verified', 'North Side', 'CONST-2024-002', '456 Precision Ave', 'VAT-012'),
('00000003-0003-4000-8000-000000000003', 'Rapid Build Solutions FAKE', ARRAY['Fast Construction'], 'Quick turnaround construction services', 15, 96, true, '[]'::jsonb, '["Fast Construction", "Efficient Building"]'::jsonb, 298, 4.5, 'verified', 'South District', 'CONST-2024-003', '789 Rapid Way', 'VAT-013'),
('00000003-0003-4000-8000-000000000004', 'Heritage Builders FAKE', ARRAY['Traditional Methods'], 'Traditional building methods and restoration', 35, 240, true, '[]'::jsonb, '["Traditional Construction", "Restoration"]'::jsonb, 167, 4.6, 'pending', 'Old Town', 'CONST-2024-004', '321 Heritage Rd', 'VAT-014'),
('00000003-0003-4000-8000-000000000005', 'Green Build Co FAKE', ARRAY['Sustainable Building'], 'Eco-friendly and sustainable construction', 18, 168, true, '[]'::jsonb, '["Green Construction", "Sustainable Building"]'::jsonb, 145, 4.9, 'verified', 'Eco District', 'CONST-2024-005', '654 Green Build Ave', 'VAT-015'),

-- Electrical (5 vendors)
('00000004-0004-4000-8000-000000000001', 'Power Pro Electrical FAKE', ARRAY['Residential Wiring'], 'Residential electrical installation and repair', 20, 24, true, '[]'::jsonb, '["Residential Electrical", "Wiring", "Panel Installation"]'::jsonb, 156, 4.7, 'verified', 'Electric District', 'ELEC-2024-001', '123 Electric St', 'VAT-016'),
('00000004-0004-4000-8000-000000000002', 'Smart Home Electrics FAKE', ARRAY['Smart Systems'], 'Smart home electrical systems', 12, 48, true, '[]'::jsonb, '["Smart Home Systems", "Automation"]'::jsonb, 89, 4.8, 'verified', 'Tech Valley', 'ELEC-2024-002', '456 Smart Ave', 'VAT-017'),
('00000004-0004-4000-8000-000000000003', 'Industrial Electric Co FAKE', ARRAY['Commercial Electrical'], 'Commercial and industrial electrical services', 25, 72, true, '[]'::jsonb, '["Commercial Electrical", "Industrial Systems"]'::jsonb, 234, 4.6, 'verified', 'Industrial Park', 'ELEC-2024-003', '789 Industrial Blvd', 'VAT-018'),
('00000004-0004-4000-8000-000000000004', 'Green Energy Electric FAKE', ARRAY['Solar Systems'], 'Solar and renewable energy systems', 15, 96, true, '[]'::jsonb, '["Solar Installation", "Renewable Energy"]'::jsonb, 123, 4.9, 'verified', 'Solar Heights', 'ELEC-2024-004', '321 Solar Way', 'VAT-019'),
('00000004-0004-4000-8000-000000000005', 'Emergency Electric Services FAKE', ARRAY['Emergency Repairs'], 'Emergency electrical repair services', 18, 2, true, '[]'::jsonb, '["Emergency Repairs", "24/7 Service"]'::jsonb, 278, 4.5, 'verified', 'Service Center', 'ELEC-2024-005', '654 Emergency Ln', 'VAT-020'),

-- Mechanical (5 vendors)
('00000005-0005-4000-8000-000000000001', 'HVAC Masters FAKE', ARRAY['HVAC Systems'], 'Complete HVAC installation and maintenance', 22, 48, true, '[]'::jsonb, '["HVAC Installation", "Climate Control"]'::jsonb, 189, 4.8, 'verified', 'Climate District', 'MECH-2024-001', '123 HVAC St', 'VAT-021'),
('00000005-0005-4000-8000-000000000002', 'Plumbing Plus FAKE', ARRAY['Plumbing Systems'], 'Professional plumbing installation and repair', 28, 24, true, '[]'::jsonb, '["Plumbing", "Water Systems"]'::jsonb, 345, 4.7, 'verified', 'Water Works', 'MECH-2024-002', '456 Plumbing Ave', 'VAT-022'),
('00000005-0005-4000-8000-000000000003', 'Smart Mechanical FAKE', ARRAY['Smart Systems'], 'Smart mechanical systems integration', 10, 72, true, '[]'::jsonb, '["Smart Mechanical", "Automation"]'::jsonb, 67, 4.9, 'verified', 'Smart District', 'MECH-2024-003', '789 Mechanical Blvd', 'VAT-023'),
('00000005-0005-4000-8000-000000000004', 'Industrial Mechanical FAKE', ARRAY['Industrial Systems'], 'Industrial mechanical systems', 30, 96, true, '[]'::jsonb, '["Industrial Mechanical", "Heavy Systems"]'::jsonb, 156, 4.6, 'verified', 'Factory Row', 'MECH-2024-004', '321 Industrial Way', 'VAT-024'),
('00000005-0005-4000-8000-000000000005', 'Eco Mechanical FAKE', ARRAY['Green Systems'], 'Eco-friendly mechanical solutions', 16, 48, true, '[]'::jsonb, '["Green Mechanical", "Energy Efficient"]'::jsonb, 98, 4.8, 'verified', 'Eco Zone', 'MECH-2024-005', '654 Green Mech St', 'VAT-025');