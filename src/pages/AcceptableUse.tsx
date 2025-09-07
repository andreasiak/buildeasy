import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

const AcceptableUse = () => {
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
                <AlertTriangle className="w-8 h-8" />
                Acceptable Use Policy
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
              <CardTitle>1. Purpose and Scope</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                This Acceptable Use Policy governs your use of BuildEasy's platform and services. 
                By using our platform, you agree to comply with these guidelines to ensure a safe, 
                professional, and productive environment for all users.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Prohibited Activities</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4 className="font-semibold">Illegal Activities</h4>
              <p>You may not use our platform to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Engage in any illegal activities or promote illegal services</li>
                <li>Violate any local, state, national, or international laws</li>
                <li>Infringe on intellectual property rights</li>
                <li>Facilitate money laundering or tax evasion</li>
                <li>Engage in fraud, misrepresentation, or identity theft</li>
              </ul>

              <h4 className="font-semibold mt-4">Harmful Content</h4>
              <p>You may not post, share, or transmit content that:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Contains hate speech, harassment, or discrimination</li>
                <li>Promotes violence or threatens harm to others</li>
                <li>Contains explicit sexual or inappropriate content</li>
                <li>Includes malware, viruses, or harmful code</li>
                <li>Violates privacy or confidentiality</li>
              </ul>

              <h4 className="font-semibold mt-4">Platform Abuse</h4>
              <p>You may not:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Create fake accounts or impersonate others</li>
                <li>Spam users with unwanted communications</li>
                <li>Attempt to hack, disrupt, or damage our systems</li>
                <li>Use automated tools to scrape or harvest data</li>
                <li>Circumvent security measures or access controls</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Professional Conduct Standards</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4 className="font-semibold">For All Users</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintain professional and respectful communication</li>
                <li>Provide accurate and truthful information</li>
                <li>Honor commitments and agreements made through the platform</li>
                <li>Report inappropriate behavior or policy violations</li>
                <li>Protect confidential information shared during projects</li>
              </ul>

              <h4 className="font-semibold mt-4">For Professionals/Vendors</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintain valid licenses and certifications</li>
                <li>Provide accurate quotes and project timelines</li>
                <li>Deliver work that meets professional standards</li>
                <li>Communicate promptly about project issues or delays</li>
                <li>Honor quoted prices and agreed-upon terms</li>
              </ul>

              <h4 className="font-semibold mt-4">For Clients</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide clear and accurate project requirements</li>
                <li>Make payments as agreed upon</li>
                <li>Allow reasonable access for professionals to complete work</li>
                <li>Communicate changes or concerns promptly</li>
                <li>Provide fair and honest reviews</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Content Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4 className="font-semibold">Project Descriptions</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Be clear, detailed, and accurate in project descriptions</li>
                <li>Include relevant safety considerations or special requirements</li>
                <li>Avoid misleading or incomplete information</li>
                <li>Update project details if requirements change</li>
              </ul>

              <h4 className="font-semibold mt-4">Communications</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Keep communications relevant to the project or platform</li>
                <li>Avoid sharing personal contact information publicly</li>
                <li>Use appropriate language and tone</li>
                <li>Respect others' time and respond promptly to important messages</li>
              </ul>

              <h4 className="font-semibold mt-4">Reviews and Feedback</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Base reviews on actual project experiences</li>
                <li>Be honest and constructive in feedback</li>
                <li>Avoid personal attacks or inappropriate language</li>
                <li>Focus on work quality and professional conduct</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Security and Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>Users must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Keep account credentials secure and confidential</li>
                <li>Report suspected security breaches immediately</li>
                <li>Not attempt to access other users' accounts or data</li>
                <li>Use our platform's secure communication channels</li>
                <li>Respect the privacy of other users</li>
                <li>Not share login credentials with others</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Enforcement and Consequences</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Violations of this Acceptable Use Policy may result in:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Warning:</strong> Formal notice of policy violation</li>
                <li><strong>Content Removal:</strong> Removal of offending posts or content</li>
                <li><strong>Account Restriction:</strong> Temporary limitations on account features</li>
                <li><strong>Account Suspension:</strong> Temporary suspension of account access</li>
                <li><strong>Account Termination:</strong> Permanent removal from the platform</li>
                <li><strong>Legal Action:</strong> Referral to law enforcement when appropriate</li>
              </ul>

              <p>
                The severity of consequences depends on the nature and frequency of violations. 
                We reserve the right to take immediate action for serious violations that threaten 
                user safety or platform integrity.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Reporting Violations</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                If you encounter behavior that violates this policy, please report it immediately:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the "Report" function within the platform</li>
                <li>Email our support team at support@buildeasy.com</li>
                <li>For urgent safety concerns, contact law enforcement</li>
                <li>Provide specific details and evidence when possible</li>
              </ul>

              <p>
                All reports are taken seriously and investigated promptly. We protect the 
                confidentiality of reporters to the extent possible.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Appeals Process</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                If you believe your account has been restricted or terminated in error:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact our appeals team at appeals@buildeasy.com</li>
                <li>Provide your account information and reason for appeal</li>
                <li>Include any relevant evidence or context</li>
                <li>Appeals are reviewed within 5-7 business days</li>
                <li>Decisions on appeals are final</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Updates to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We may update this Acceptable Use Policy to address new situations or improve 
                clarity. Users will be notified of significant changes through email or platform 
                notifications. Continued use of our platform constitutes acceptance of updated terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                For questions about this Acceptable Use Policy, contact us at:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p><strong>General Questions:</strong> support@buildeasy.com</p>
                <p><strong>Policy Violations:</strong> violations@buildeasy.com</p>
                <p><strong>Appeals:</strong> appeals@buildeasy.com</p>
                <p><strong>Address:</strong> 123 Build Street, Construction City, BC 12345</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AcceptableUse;