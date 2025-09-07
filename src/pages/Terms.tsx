import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText } from 'lucide-react';

const Terms = () => {
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
                <FileText className="w-8 h-8" />
                Terms of Service
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
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                By accessing and using BuildEasy's platform, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not 
                use this service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Description of Service</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                BuildEasy provides a platform that connects clients seeking construction and renovation 
                services with qualified professionals. Our service includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Project matching and professional recommendations</li>
                <li>Secure communication tools</li>
                <li>Payment processing and escrow services</li>
                <li>Project management tools</li>
                <li>Customer support</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. User Accounts and Registration</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                To use our service, you must register for an account and provide accurate, complete, 
                and current information. You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Ensuring your account information remains accurate and up-to-date</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. User Conduct and Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>Users agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and truthful information in all communications</li>
                <li>Treat all users with respect and professionalism</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not engage in fraudulent, deceptive, or misleading practices</li>
                <li>Not use the platform for any illegal or unauthorized purposes</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Payment processing is handled through our secure platform. Key terms include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service fees are clearly disclosed before any transaction</li>
                <li>Payments may be held in escrow until project milestones are met</li>
                <li>Refunds are subject to our refund policy and dispute resolution process</li>
                <li>Users are responsible for any applicable taxes</li>
                <li>Payment disputes will be resolved through our mediation process</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Professional Services Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                BuildEasy is a platform that facilitates connections between clients and professionals. 
                We do not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Directly provide construction or professional services</li>
                <li>Guarantee the quality of work performed by professionals</li>
                <li>Assume liability for project outcomes</li>
                <li>Warrant the accuracy of professional credentials (though we verify them)</li>
              </ul>
              <p>
                All professional services are contracted directly between clients and service providers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                The BuildEasy platform, including its design, functionality, and content, is protected 
                by intellectual property laws. Users retain ownership of content they submit but grant 
                BuildEasy a license to use such content to provide our services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Your privacy is important to us. Our collection, use, and protection of personal 
                information is governed by our Privacy Policy, which is incorporated by reference 
                into these Terms of Service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                BuildEasy's liability is limited to the maximum extent permitted by law. We are not 
                liable for indirect, incidental, special, or consequential damages arising from your 
                use of our platform or professional services arranged through our platform.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Disputes between users and BuildEasy will be resolved through binding arbitration. 
                Disputes between clients and professionals will first go through our mediation process.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Modifications to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We reserve the right to modify these terms at any time. Users will be notified of 
                significant changes, and continued use of the platform constitutes acceptance of 
                modified terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>12. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                For questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p><strong>Email:</strong> legal@buildeasy.com</p>
                <p><strong>Address:</strong> 123 Build Street, Construction City, BC 12345</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;