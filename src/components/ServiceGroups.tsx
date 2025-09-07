import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useQuoteForm } from '@/contexts/QuoteFormContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Building2, Users, Star, MapPin, CheckCircle2, Clock, DollarSign } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  specialty: string;
  avgPrice: string;
  deliveryTime: string;
  verified: boolean;
}

interface ServiceGroup {
  name: string;
  description: string;
  vendors: Vendor[];
  icon: React.ReactNode;
}

interface ServiceGroupsProps {
  serviceGroups: string[];
  onVendorSelect: (groupName: string, vendor: Vendor) => void;
  projectDescription?: string;
  formData?: any;
}

const mockVendors: { [key: string]: Vendor[] } = {
  'Real Estate': [
    { id: '00000001-0001-4000-8000-000000000001', name: 'Prime Properties Group FAKE', rating: 4.8, reviews: 127, location: 'Downtown', specialty: 'Land Development', avgPrice: '$2,500 - $5,000', deliveryTime: '2-4 weeks', verified: true },
    { id: '00000001-0001-4000-8000-000000000002', name: 'BuildLand Solutions FAKE', rating: 4.6, reviews: 89, location: 'North District', specialty: 'Residential Plots', avgPrice: '$3,000 - $6,000', deliveryTime: '1-3 weeks', verified: true },
    { id: '00000001-0001-4000-8000-000000000003', name: 'Metro Land Advisors FAKE', rating: 4.7, reviews: 203, location: 'City Center', specialty: 'Zoning & Permits', avgPrice: '$1,800 - $4,000', deliveryTime: '3-6 weeks', verified: false },
    { id: '00000001-0001-4000-8000-000000000004', name: 'Urban Development Co FAKE', rating: 4.5, reviews: 156, location: 'East Side', specialty: 'Commercial Land', avgPrice: '$4,000 - $8,000', deliveryTime: '2-5 weeks', verified: true },
    { id: '00000001-0001-4000-8000-000000000005', name: 'Green Acres Realty FAKE', rating: 4.9, reviews: 78, location: 'Suburbs', specialty: 'Eco-Friendly Lots', avgPrice: '$2,200 - $4,500', deliveryTime: '1-4 weeks', verified: true }
  ],
  'Architecture Firm': [
    { id: '00000002-0002-4000-8000-000000000001', name: 'Modern Design Studio FAKE', rating: 4.9, reviews: 67, location: 'Design District', specialty: 'Contemporary Homes', avgPrice: '$15,000 - $30,000', deliveryTime: '6-12 weeks', verified: true },
    { id: '00000002-0002-4000-8000-000000000002', name: 'Heritage Architects FAKE', rating: 4.7, reviews: 134, location: 'Historic Quarter', specialty: 'Traditional Style', avgPrice: '$12,000 - $25,000', deliveryTime: '8-14 weeks', verified: true },
    { id: '00000002-0002-4000-8000-000000000003', name: 'Eco Architecture Lab FAKE', rating: 4.8, reviews: 92, location: 'Green Valley', specialty: 'Sustainable Design', avgPrice: '$18,000 - $35,000', deliveryTime: '10-16 weeks', verified: true },
    { id: '00000002-0002-4000-8000-000000000004', name: 'Urban Planning Co FAKE', rating: 4.6, reviews: 178, location: 'Business District', specialty: 'Multi-Family Units', avgPrice: '$20,000 - $40,000', deliveryTime: '8-15 weeks', verified: false },
    { id: '00000002-0002-4000-8000-000000000005', name: 'Innovative Spaces FAKE', rating: 4.8, reviews: 89, location: 'Tech Hub', specialty: 'Smart Homes', avgPrice: '$16,000 - $32,000', deliveryTime: '7-13 weeks', verified: true }
  ],
  'Construction': [
    { id: '00000003-0003-4000-8000-000000000001', name: 'Elite Builders Inc FAKE', rating: 4.7, reviews: 234, location: 'Industrial Zone', specialty: 'Custom Homes', avgPrice: '$200 - $350/sqft', deliveryTime: '16-24 weeks', verified: true },
    { id: '00000003-0003-4000-8000-000000000002', name: 'Precision Construction FAKE', rating: 4.8, reviews: 189, location: 'North Side', specialty: 'High-End Residential', avgPrice: '$250 - $400/sqft', deliveryTime: '18-26 weeks', verified: true },
    { id: '00000003-0003-4000-8000-000000000003', name: 'Rapid Build Solutions FAKE', rating: 4.5, reviews: 298, location: 'South District', specialty: 'Fast Construction', avgPrice: '$180 - $280/sqft', deliveryTime: '12-18 weeks', verified: true },
    { id: '00000003-0003-4000-8000-000000000004', name: 'Heritage Builders FAKE', rating: 4.6, reviews: 167, location: 'Old Town', specialty: 'Traditional Methods', avgPrice: '$220 - $320/sqft', deliveryTime: '20-28 weeks', verified: false },
    { id: '00000003-0003-4000-8000-000000000005', name: 'Green Build Co FAKE', rating: 4.9, reviews: 145, location: 'Eco District', specialty: 'Sustainable Building', avgPrice: '$240 - $380/sqft', deliveryTime: '18-25 weeks', verified: true }
  ],
  'Electrical': [
    { id: '00000004-0004-4000-8000-000000000001', name: 'Power Pro Electrical FAKE', rating: 4.7, reviews: 156, location: 'Electric District', specialty: 'Residential Wiring', avgPrice: '$80 - $150/hr', deliveryTime: '1-2 weeks', verified: true },
    { id: '00000004-0004-4000-8000-000000000002', name: 'Smart Home Electrics FAKE', rating: 4.8, reviews: 89, location: 'Tech Valley', specialty: 'Smart Systems', avgPrice: '$120 - $200/hr', deliveryTime: '2-4 weeks', verified: true },
    { id: '00000004-0004-4000-8000-000000000003', name: 'Industrial Electric Co FAKE', rating: 4.6, reviews: 234, location: 'Industrial Park', specialty: 'Commercial Electrical', avgPrice: '$100 - $180/hr', deliveryTime: '3-6 weeks', verified: true },
    { id: '00000004-0004-4000-8000-000000000004', name: 'Green Energy Electric FAKE', rating: 4.9, reviews: 123, location: 'Solar Heights', specialty: 'Solar Systems', avgPrice: '$150 - $250/hr', deliveryTime: '4-8 weeks', verified: true },
    { id: '00000004-0004-4000-8000-000000000005', name: 'Emergency Electric Services FAKE', rating: 4.5, reviews: 278, location: 'Service Center', specialty: 'Emergency Repairs', avgPrice: '$200 - $300/hr', deliveryTime: 'Same Day', verified: true }
  ],
  'Mechanical': [
    { id: '00000005-0005-4000-8000-000000000001', name: 'HVAC Masters FAKE', rating: 4.8, reviews: 189, location: 'Climate District', specialty: 'HVAC Systems', avgPrice: '$90 - $160/hr', deliveryTime: '2-4 weeks', verified: true },
    { id: '00000005-0005-4000-8000-000000000002', name: 'Plumbing Plus FAKE', rating: 4.7, reviews: 345, location: 'Water Works', specialty: 'Plumbing Systems', avgPrice: '$75 - $130/hr', deliveryTime: '1-3 weeks', verified: true },
    { id: '00000005-0005-4000-8000-000000000003', name: 'Smart Mechanical FAKE', rating: 4.9, reviews: 67, location: 'Smart District', specialty: 'Smart Systems', avgPrice: '$110 - $190/hr', deliveryTime: '3-5 weeks', verified: true },
    { id: '00000005-0005-4000-8000-000000000004', name: 'Industrial Mechanical FAKE', rating: 4.6, reviews: 156, location: 'Factory Row', specialty: 'Industrial Systems', avgPrice: '$95 - $170/hr', deliveryTime: '4-8 weeks', verified: true },
    { id: '00000005-0005-4000-8000-000000000005', name: 'Eco Mechanical FAKE', rating: 4.8, reviews: 98, location: 'Eco Zone', specialty: 'Green Systems', avgPrice: '$85 - $155/hr', deliveryTime: '2-6 weeks', verified: true }
  ]
};

// Add more mock vendors for other service groups
const generateMockVendors = (groupName: string): Vendor[] => {
  if (mockVendors[groupName]) return mockVendors[groupName];
  
  // Use a consistent seed based on group name to avoid random changes
  const seed = groupName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Generate proper UUIDs for testing
  const generateTestUUID = (index: number): string => {
    const groupCode = (seed % 10).toString().padStart(8, '0');
    const itemCode = index.toString().padStart(4, '0');
    return `${groupCode}-0000-4000-8000-${itemCode}00000000`.substring(0, 36);
  };
  
  return Array.from({ length: 5 }, (_, i) => {
    const vendorSeed = seed + i;
    return {
      id: generateTestUUID(i + 1),
      name: `${groupName} Pro ${i + 1} FAKE`,
      rating: 4.5 + (vendorSeed % 4) * 0.1,
      reviews: 50 + (vendorSeed % 150),
      location: ['Downtown', 'North District', 'South Area', 'East Side', 'West End'][i],
      specialty: `${groupName} Services`,
      avgPrice: '$2,000 - $5,000',
      deliveryTime: '2-6 weeks',
      verified: (vendorSeed % 10) > 3
    };
  });
};

const ServiceGroups: React.FC<ServiceGroupsProps> = ({ serviceGroups, onVendorSelect, projectDescription = '', formData = {} }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setWasRedirectedFromAuth } = useQuoteForm();
  const [selectedVendors, setSelectedVendors] = useState<{ [key: string]: string[] }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitQuotes = async () => {
    // Check if user is authenticated
    if (!user) {
      setWasRedirectedFromAuth(true);
      navigate('/auth?type=client&redirect=quote');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // First create the project in the database
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .insert({
          title: projectDescription.substring(0, 100) || 'Project Request',
          description: projectDescription,
          form_data: formData,
          service_groups: serviceGroups,
          client_id: user.id,
          status: 'active'
        })
        .select()
        .single();

      if (projectError) {
        console.error('Error creating project:', projectError);
        toast.error('Failed to create project. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // For testing purposes with mock vendors, we'll simulate quote requests
      // In production, this would create actual quote requests with real vendor user IDs
      const selectedVendorCount = Object.values(selectedVendors).flat().length;
      
      if (selectedVendorCount === 0) {
        toast.error('Please select at least one vendor before submitting.');
        setIsSubmitting(false);
        return;
      }

      // Simulate API delay for realism
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real application, we would:
      // 1. Create quote_requests with actual vendor user IDs from vendor_profiles table
      // 2. Send notifications to vendors
      // 3. Set up proper foreign key relationships
      
      // For now, we'll show success and navigate to tickets
      toast.success(`Successfully sent ${selectedVendorCount} quote requests!`);
      setIsSubmitting(false);
      navigate('/tickets');
      
    } catch (error) {
      console.error('Error submitting quotes:', error);
      toast.error('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const getTotalSelections = () => {
    return Object.values(selectedVendors).flat().length;
  };

  const handleVendorToggle = (groupName: string, vendor: Vendor) => {
    const groupSelections = selectedVendors[groupName] || [];
    const isSelected = groupSelections.includes(vendor.id);

    if (isSelected) {
      setSelectedVendors({
        ...selectedVendors,
        [groupName]: groupSelections.filter(id => id !== vendor.id)
      });
    } else {
      setSelectedVendors({
        ...selectedVendors,
        [groupName]: [...groupSelections, vendor.id]
      });
    }
    // Note: Removed onVendorSelect call - selection only updates UI, doesn't submit quotes
  };

  const getGroupIcon = (groupName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'Real Estate': <Building2 className="w-5 h-5" />,
      'Architecture Firm': <Users className="w-5 h-5" />,
      'Construction': <Building2 className="w-5 h-5" />,
      'Lawyer': <Users className="w-5 h-5" />,
      'Electrical': <Users className="w-5 h-5" />,
      'Mechanical': <Users className="w-5 h-5" />,
      'Pool Construction': <Users className="w-5 h-5" />,
      'Landscaping': <Users className="w-5 h-5" />,
      'Furniture': <Users className="w-5 h-5" />,
      'Lighting and Fixtures': <Users className="w-5 h-5" />
    };
    return icons[groupName] || <Users className="w-5 h-5" />;
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Your Matched Service Providers
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Based on your project requirements, here are the top professionals in each category. 
          Select the ones you'd like to receive quotes from.
        </p>
      </div>

      <div className="grid gap-8">
        {serviceGroups.map((groupName) => {
          const vendors = generateMockVendors(groupName);
          const groupSelections = selectedVendors[groupName] || [];

          return (
            <Card key={groupName} className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  {getGroupIcon(groupName)}
                  <span>{groupName}</span>
                  {groupSelections.length > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      {groupSelections.length} selected
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="grid gap-4">
                  {vendors.map((vendor, index) => {
                    const isSelected = groupSelections.includes(vendor.id);
                    
                    return (
                      <div
                        key={vendor.id}
                        className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                          isSelected 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handleVendorToggle(groupName, vendor)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-lg">{vendor.name}</h3>
                              {vendor.verified && (
                                <CheckCircle2 className="w-4 h-4 text-accent" />
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-blue-400 text-blue-400" />
                                <span className="font-medium">{vendor.rating.toFixed(1)}</span>
                                <span>({vendor.reviews} reviews)</span>
                              </div>
                              
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{vendor.location}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-6 text-sm">
                              <div className="flex items-center space-x-1">
                                <DollarSign className="w-4 h-4 text-accent" />
                                <span className="font-medium">{vendor.avgPrice}</span>
                              </div>
                              
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4 text-primary" />
                                <span>{vendor.deliveryTime}</span>
                              </div>
                            </div>
                            
                            <Badge variant="outline" className="text-xs">
                              {vendor.specialty}
                            </Badge>
                          </div>
                          
                          <Button
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            className={isSelected ? "bg-gradient-primary border-0" : ""}
                          >
                            {isSelected ? 'Selected' : 'Select'}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {Object.values(selectedVendors).some(arr => arr.length > 0) && (
        <Card className="bg-gradient-hero border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              {submitted ? (
                <div className="space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-accent mx-auto" />
                  <h3 className="text-xl font-semibold text-accent">Quote Requests Submitted!</h3>
                  <p className="text-muted-foreground">
                    Your requests have been sent to {getTotalSelections()} service providers. 
                    They will respond within 24 hours with detailed quotes.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Ready to Request Quotes?</h3>
                  <p className="text-muted-foreground">
                    You've selected {getTotalSelections()} service providers. 
                    We'll create individual tickets for each selection and vendors will respond within 24 hours.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-gradient-primary border-0"
                    onClick={handleSubmitQuotes}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Quote Requests'}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServiceGroups;