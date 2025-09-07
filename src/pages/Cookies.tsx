import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Cookie } from 'lucide-react';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Cookie className="w-8 h-8" />
                Cookie Policy
              </h1>
              <p className="text-muted-foreground">Effective Date: January 1, 2024</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>What Are Cookies?</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and 
                enabling certain functionality on our platform.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Types of Cookies We Use</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4 className="font-semibold">Essential Cookies</h4>
              <p>
                These cookies are necessary for the website to function properly. They enable core 
                functionality such as security, authentication, and accessibility features.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Authentication and session management</li>
                <li>Security and fraud prevention</li>
                <li>Load balancing and site performance</li>
                <li>Basic functionality and navigation</li>
              </ul>

              <h4 className="font-semibold mt-4">Functional Cookies</h4>
              <p>
                These cookies enhance your experience by remembering your preferences and settings.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Language and region preferences</li>
                <li>User interface customizations</li>
                <li>Remember login status</li>
                <li>Form data retention</li>
              </ul>

              <h4 className="font-semibold mt-4">Analytics Cookies</h4>
              <p>
                These cookies help us understand how visitors interact with our website by collecting 
                and reporting information anonymously.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Page views and user journey tracking</li>
                <li>Performance metrics and error reporting</li>
                <li>Feature usage statistics</li>
                <li>Conversion and goal tracking</li>
              </ul>

              <h4 className="font-semibold mt-4">Marketing Cookies</h4>
              <p>
                These cookies track your online activity to help advertisers deliver more relevant 
                advertising or to limit how many times you see an ad.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Advertising personalization</li>
                <li>Cross-site tracking for marketing</li>
                <li>Social media integration</li>
                <li>Remarketing and retargeting</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Cookies</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We may use third-party services that set their own cookies. These include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Analytics:</strong> For website analytics and performance tracking</li>
                <li><strong>Payment Processors:</strong> For secure payment processing</li>
                <li><strong>Customer Support:</strong> For chat and support functionality</li>
                <li><strong>Social Media:</strong> For social sharing and login features</li>
              </ul>
              <p>
                These third parties have their own privacy policies and cookie practices that govern 
                their use of cookies.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Managing Your Cookie Preferences</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4 className="font-semibold">Browser Settings</h4>
              <p>
                You can control cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>View and delete cookies</li>
                <li>Block cookies from specific sites</li>
                <li>Block all cookies</li>
                <li>Get a warning before a cookie is stored</li>
                <li>Delete all cookies when you close your browser</li>
              </ul>

              <h4 className="font-semibold mt-4">Platform Settings</h4>
              <p>
                We provide cookie preference controls within our platform where you can manage 
                optional cookies while keeping essential functionality intact.
              </p>

              <h4 className="font-semibold mt-4">Impact of Disabling Cookies</h4>
              <p>
                Please note that disabling certain cookies may impact your experience:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>You may need to re-enter information more frequently</li>
                <li>Some features may not work properly</li>
                <li>Personalization features will be limited</li>
                <li>You may see less relevant content</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookie Consent and Legal Basis</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We obtain your consent for non-essential cookies in accordance with applicable laws. 
                Our legal basis for using cookies includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Consent:</strong> For marketing and analytics cookies</li>
                <li><strong>Legitimate Interest:</strong> For functionality and performance improvements</li>
                <li><strong>Contractual Necessity:</strong> For essential service delivery</li>
                <li><strong>Legal Obligation:</strong> For compliance and security purposes</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookie Retention and Updates</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4 className="font-semibold">Retention Periods</h4>
              <p>Different cookies have different retention periods:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain for a set period (typically 30 days to 2 years)</li>
                <li><strong>Analytics Cookies:</strong> Usually expire after 2 years</li>
                <li><strong>Marketing Cookies:</strong> Typically expire after 30-90 days</li>
              </ul>

              <h4 className="font-semibold mt-4">Policy Updates</h4>
              <p>
                We may update this Cookie Policy to reflect changes in our practices or applicable 
                laws. We will notify you of any significant changes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us About Cookies</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                If you have questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p><strong>Email:</strong> privacy@buildeasy.com</p>
                <p><strong>Subject Line:</strong> Cookie Policy Inquiry</p>
                <p><strong>Address:</strong> 123 Build Street, Construction City, BC 12345</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cookies;