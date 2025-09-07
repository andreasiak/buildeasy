-- Remove the SECURITY DEFINER function as it's flagged by security linter
-- The function was not being used anyway, so we can safely drop it
DROP FUNCTION IF EXISTS public.can_access_vendor_sensitive_data(uuid);

-- Fix the RLS policies to be more specific about field access
-- The issue is that even with a view, the underlying table policy is too permissive

-- Drop the current permissive policy
DROP POLICY IF EXISTS "Public can view non-sensitive vendor info" ON public.vendor_profiles;

-- Create a more restrictive base policy that still allows legitimate access patterns
-- This policy ensures sensitive fields are only accessible to authorized users
CREATE POLICY "Restrict sensitive vendor data access" 
ON public.vendor_profiles 
FOR SELECT 
USING (
  -- Vendor can always see their own data
  auth.uid() = user_id
  OR
  -- For other users, limit to specific scenarios
  (
    -- Only allow access if user is authenticated
    auth.uid() IS NOT NULL
    AND
    -- Either the user has quote requests with this vendor
    EXISTS (
      SELECT 1 
      FROM public.quote_requests 
      WHERE vendor_id = vendor_profiles.user_id 
      AND client_id = auth.uid()
    )
  )
);

-- For anonymous and general public access, we'll rely on the view
-- The view should be the primary interface for public vendor data
CREATE POLICY "Allow view access for public data" 
ON public.vendor_profiles 
FOR SELECT 
USING (false); -- This effectively forces use of the view for public access