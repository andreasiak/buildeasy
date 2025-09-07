import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield } from 'lucide-react';

const Privacy = () => {
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
                <Shield className="w-8 h-8" />
                Privacy Policy
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
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4 className="font-semibold">Personal Information</h4>
              <p>We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Name, email address, phone number</li>
                <li>Account credentials and profile information</li>
                <li>Project descriptions and requirements</li>
                <li>Communication with professionals and support</li>
                <li>Payment and billing information</li>
              </ul>

              <h4 className="font-semibold mt-4">Automatically Collected Information</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Device information and browser type</li>
                <li>IP address and location data</li>
                <li>Usage patterns and platform interactions</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>We use collected information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve our platform services</li>
                <li>Match you with appropriate professionals</li>
                <li>Process payments and transactions</li>
                <li>Communicate with you about your projects</li>
                <li>Provide customer support</li>
                <li>Ensure platform security and prevent fraud</li>
                <li>Comply with legal obligations</li>
                <li>Send important updates and notifications</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4 className="font-semibold">With Professionals</h4>
              <p>
                When you submit a project request, we share relevant project information with 
                matched professionals to enable them to provide accurate quotes.
              </p>

              <h4 className="font-semibold mt-4">Service Providers</h4>
              <p>
                We share information with third-party service providers who assist us in operating 
                our platform, including payment processors, cloud hosting, and customer support tools.
              </p>

              <h4 className="font-semibold mt-4">Legal Requirements</h4>
              <p>
                We may disclose information when required by law, to protect our rights, or to 
                ensure platform safety and security.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Data Security</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>We implement comprehensive security measures to protect your data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure payment processing through certified providers</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
                <li>Incident response and breach notification procedures</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in portable format</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
              </ul>
              <p>
                To exercise these rights, contact us at privacy@buildeasy.com.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>We use cookies and similar technologies for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Authentication and account management</li>
                <li>Remembering your preferences</li>
                <li>Analytics and platform improvement</li>
                <li>Security and fraud prevention</li>
              </ul>
              <p>
                You can control cookie settings through your browser preferences. Some features 
                may not function properly if cookies are disabled.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We retain your information for as long as necessary to provide our services and 
                comply with legal obligations. Specific retention periods vary by data type:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account information: Until account deletion</li>
                <li>Project data: 7 years for legal compliance</li>
                <li>Communication records: 3 years</li>
                <li>Analytics data: 2 years in aggregated form</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Your information may be transferred to and processed in countries other than your 
                own. We ensure appropriate safeguards are in place for international transfers, 
                including standard contractual clauses and adequacy decisions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Our platform is not intended for children under 18. We do not knowingly collect 
                personal information from children. If we become aware that we have collected 
                information from a child, we will take steps to delete it promptly.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We may update this Privacy Policy periodically. We will notify you of significant 
                changes by email or through platform notifications. Your continued use of our 
                services constitutes acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                For questions about this Privacy Policy or our data practices, contact us at:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p><strong>Email:</strong> privacy@buildeasy.com</p>
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

export default Privacy;