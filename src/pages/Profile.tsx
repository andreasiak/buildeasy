import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Home, User, Building2, Mail, Phone, MapPin, CreditCard } from 'lucide-react';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email('Invalid email address'),
});

const vendorProfileSchema = z.object({
  businessName: z.string().min(2, 'Business name is required'),
  vatId: z.string().min(1, 'VAT ID is required'),
  businessAddress: z.string().min(1, 'Business address is required'),
});

type ProfileForm = z.infer<typeof profileSchema>;
type VendorProfileForm = z.infer<typeof vendorProfileSchema>;

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [vendorProfile, setVendorProfile] = useState<any>(null);
  const [canChangeEmail, setCanChangeEmail] = useState(true);

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      address: '',
      email: '',
    }
  });

  const vendorForm = useForm<VendorProfileForm>({
    resolver: zodResolver(vendorProfileSchema),
    defaultValues: {
      businessName: '',
      vatId: '',
      businessAddress: '',
    }
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError) throw profileError;

      setProfile(profileData);
      
      // Check if user can change email (once per month)
      const lastChange = profileData.last_email_change;
      if (lastChange) {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        setCanChangeEmail(new Date(lastChange) < oneMonthAgo);
      }

      profileForm.reset({
        fullName: profileData.full_name || '',
        phoneNumber: profileData.phone_number || '',
        address: profileData.address || '',
        email: user.email || '',
      });

      // If user is a vendor, fetch vendor profile
      if (profileData.user_type === 'vendor') {
        const { data: vendorData, error: vendorError } = await supabase
          .from('vendor_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (!vendorError && vendorData) {
          setVendorProfile(vendorData);
          vendorForm.reset({
            businessName: vendorData.business_name || '',
            vatId: vendorData.vat_id || '',
            businessAddress: vendorData.business_address || '',
          });
        }
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load profile data',
        variant: 'destructive'
      });
    }
  };

  const handleProfileUpdate = async (data: ProfileForm) => {
    if (!user) return;

    setLoading(true);
    try {
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: data.fullName,
          phone_number: data.phoneNumber,
          address: data.address,
        })
        .eq('user_id', user.id);

      if (profileError) throw profileError;

      // Update email if changed and allowed
      if (data.email !== user.email && canChangeEmail) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: data.email
        });

        if (emailError) throw emailError;

        // Update email change tracking
        await supabase
          .from('profiles')
          .update({
            last_email_change: new Date().toISOString(),
            email_change_count: (profile?.email_change_count || 0) + 1
          })
          .eq('user_id', user.id);

        toast({
          title: 'Email Updated',
          description: 'Please check your new email for verification. You can change your email again in one month.',
        });
      }

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.',
      });

      fetchProfile();
    } catch (error: any) {
      toast({
        title: 'Update Failed',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVendorUpdate = async (data: VendorProfileForm) => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('vendor_profiles')
        .update({
          business_name: data.businessName,
          vat_id: data.vatId,
          business_address: data.businessAddress,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: 'Business Profile Updated',
        description: 'Your business information has been updated successfully.',
      });

      fetchProfile();
    } catch (error: any) {
      toast({
        title: 'Update Failed',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Profile Settings</h1>
              <p className="text-muted-foreground">Manage your account information</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate(profile.user_type === 'vendor' ? '/vendor-dashboard' : '/dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>

        <div className="grid gap-6">
          {/* Personal Information */}
          <Card className="shadow-elegant bg-white/90 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)} className="space-y-4">
                  <FormField
                    control={profileForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address
                          {!canChangeEmail && (
                            <span className="text-xs text-muted-foreground">(Can change once per month)</span>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your@email.com" 
                            {...field} 
                            disabled={!canChangeEmail}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Address
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Your address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Personal Information'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Vendor Business Information */}
          {profile.user_type === 'vendor' && (
            <Card className="shadow-elegant bg-white/90 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Business Information
                </CardTitle>
                <CardDescription>
                  Manage your business details and credentials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...vendorForm}>
                  <form onSubmit={vendorForm.handleSubmit(handleVendorUpdate)} className="space-y-4">
                    <FormField
                      control={vendorForm.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your business name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={vendorForm.control}
                      name="vatId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            VAT ID
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Your VAT ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={vendorForm.control}
                      name="businessAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Business Address
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Your business address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={loading}>
                      {loading ? 'Updating...' : 'Update Business Information'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Account Information */}
          <Card className="shadow-elegant bg-white/90 backdrop-blur-sm border border-white/20">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                View your account details and restrictions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="font-medium">Account Type</Label>
                  <p className="text-muted-foreground capitalize">{profile.user_type}</p>
                </div>
                <div>
                  <Label className="font-medium">Member Since</Label>
                  <p className="text-muted-foreground">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label className="font-medium">Email Changes</Label>
                  <p className="text-muted-foreground">
                    {profile.email_change_count || 0} times
                  </p>
                </div>
                {profile.last_email_change && (
                  <div>
                    <Label className="font-medium">Last Email Change</Label>
                    <p className="text-muted-foreground">
                      {new Date(profile.last_email_change).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;