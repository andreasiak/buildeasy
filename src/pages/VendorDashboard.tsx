import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Star, Clock, MessageSquare, DollarSign, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface QuoteRequest {
  id: string;
  project: {
    title: string;
    description: string;
    budget_range: string;
    location: string;
    created_at: string;
  };
  client: {
    full_name: string;
    user_id: string;
  };
  status: string;
  created_at: string;
}

const VendorDashboard = () => {
  const { user } = useAuth();
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuoteRequests();
  }, [user]);

  const fetchQuoteRequests = async () => {
    if (!user) return;
    
    // Sample data for demonstration
    const sampleData = [
      {
        id: '1',
        status: 'pending',
        created_at: new Date().toISOString(),
        project: {
          title: 'Modern House Construction',
          description: '4 bedroom modern house, 2 large baths, landscaped garden and pool',
          budget_range: '$200,000 - $300,000',
          location: 'San Francisco, CA',
          created_at: new Date().toISOString()
        },
        client: {
          full_name: 'John Smith',
          user_id: 'sample-user-id'
        }
      },
      {
        id: '2',
        status: 'quoted',
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        project: {
          title: 'Kitchen Renovation',
          description: 'Complete kitchen remodel with modern appliances',
          budget_range: '$50,000 - $75,000',
          location: 'Oakland, CA',
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        },
        client: {
          full_name: 'Sarah Johnson',
          user_id: 'sample-user-id-2'
        }
      }
    ];
    
    setQuoteRequests(sampleData);
    setLoading(false);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'default';
      case 'quoted': return 'secondary';
      case 'accepted': return 'default';
      case 'declined': return 'destructive';
      default: return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.email}</p>
            </div>
          </div>
          <Button asChild variant="outline">
            <Link to="/vendor-profile">
              <User className="w-4 h-4 mr-2" />
              Profile Settings
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Quotes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {quoteRequests.filter(q => q.status === 'pending').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {quoteRequests.filter(q => q.status === 'accepted').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">94%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1">
                <div className="text-2xl font-bold">4.8</div>
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quote Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Quote Requests
            </CardTitle>
            <CardDescription>
              Manage incoming project requests and send quotes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : quoteRequests.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No quote requests yet. Keep your profile updated to receive more opportunities!
              </div>
            ) : (
              <div className="space-y-4">
                {quoteRequests.map((quote) => (
                  <Card key={quote.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{quote.project.title}</h3>
                            <Badge variant={getStatusBadgeVariant(quote.status)}>
                              {quote.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">
                            {quote.project.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {quote.project.budget_range}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {formatDate(quote.created_at)}
                            </span>
                            {quote.project.location && (
                              <span>{quote.project.location}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          {quote.status === 'pending' && (
                            <Button size="sm" className="bg-gradient-primary">
                              Send Quote
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Chat
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorDashboard;