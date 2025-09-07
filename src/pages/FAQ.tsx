import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, HelpCircle, Users, CreditCard, Wrench, MessageSquare } from 'lucide-react';

const FAQ = () => {
  const faqSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <HelpCircle className="w-5 h-5" />,
      questions: [
        {
          question: 'How does BuildEasy work?',
          answer: 'BuildEasy connects you with qualified professionals for your construction and renovation projects. Simply describe your project, answer a few questions, and our AI matches you with the right contractors, architects, and specialists.'
        },
        {
          question: 'Do I need to create an account to get quotes?',
          answer: 'Yes, you need to create an account to receive and manage quotes. This ensures security and allows you to track your project progress and communicate with professionals.'
        },
        {
          question: 'How long does it take to get matched with professionals?',
          answer: 'After submitting your project details, you\'ll typically receive quotes from matched professionals within 24-48 hours.'
        },
        {
          question: 'What types of projects can I submit?',
          answer: 'We handle all types of construction and renovation projects, from small home repairs to large commercial builds, including residential houses, additions, renovations, landscaping, and more.'
        }
      ]
    },
    {
      id: 'account-types',
      title: 'Account Types & Differences',
      icon: <Users className="w-5 h-5" />,
      questions: [
        {
          question: 'What is the difference between Client and Vendor accounts?',
          answer: 'Client accounts are for project owners who need construction services. Vendor accounts are for professionals (contractors, architects, etc.) who provide these services. Each account type has different features and dashboards.'
        },
        {
          question: 'Can I have both Client and Vendor accounts?',
          answer: 'No, each email address can only be associated with one account type. If you need both, you\'ll need to use different email addresses for each account type.'
        },
        {
          question: 'How do I know if I should register as a Client or Vendor?',
          answer: 'Register as a Client if you have projects that need professional services. Register as a Vendor if you\'re a contractor, architect, engineer, or other construction professional looking to find new projects.'
        },
        {
          question: 'Can I change my account type after registration?',
          answer: 'Account types cannot be changed after registration. You would need to create a new account with a different email address for the other account type.'
        }
      ]
    },
    {
      id: 'submitting-requests',
      title: 'Submitting Quote Requests',
      icon: <MessageSquare className="w-5 h-5" />,
      questions: [
        {
          question: 'What information do I need to provide for a quote request?',
          answer: 'You\'ll need to provide a project description, answer questions about timeline, budget range, location, and specific requirements. The more detailed your information, the better matches you\'ll receive.'
        },
        {
          question: 'Can I submit multiple quote requests?',
          answer: 'Yes, you can submit as many quote requests as needed for different projects. Each request will be processed independently.'
        },
        {
          question: 'Can I edit my quote request after submission?',
          answer: 'Once submitted, quote requests cannot be edited. However, you can communicate with matched professionals to clarify or modify requirements.'
        },
        {
          question: 'What if I need to cancel a quote request?',
          answer: 'You can cancel quote requests from your dashboard before professionals respond. Once quotes are received, you can decline them individually.'
        }
      ]
    },
    {
      id: 'matching-process',
      title: 'Matching Process',
      icon: <Wrench className="w-5 h-5" />,
      questions: [
        {
          question: 'How are professionals matched to my project?',
          answer: 'Our AI analyzes your project requirements, location, timeline, and budget to match you with qualified professionals who have relevant experience and availability.'
        },
        {
          question: 'How many professionals will I be matched with?',
          answer: 'Typically, you\'ll receive 3-5 quotes from different professionals, though this may vary based on your location and project type.'
        },
        {
          question: 'Are all professionals vetted?',
          answer: 'Yes, all professionals on our platform are verified for licensing, insurance, and have been reviewed for quality of work and reliability.'
        },
        {
          question: 'What if I\'m not satisfied with the matches?',
          answer: 'You can provide feedback on why the matches weren\'t suitable, and we can adjust criteria to find better matches for future requests.'
        }
      ]
    },
    {
      id: 'payments',
      title: 'Payments & Billing',
      icon: <CreditCard className="w-5 h-5" />,
      questions: [
        {
          question: 'Is there a cost to use BuildEasy?',
          answer: 'Creating an account and submitting quote requests is free for clients. We only charge a small service fee when you hire a professional through our platform.'
        },
        {
          question: 'How do I pay professionals?',
          answer: 'Payments are processed securely through our platform. You can pay by credit card, bank transfer, or other supported payment methods. Funds are held in escrow until project milestones are completed.'
        },
        {
          question: 'What is your refund policy?',
          answer: 'Refunds are handled case-by-case based on our Terms of Service. If work is not completed as agreed, we work with both parties to resolve issues and may issue refunds when appropriate.'
        },
        {
          question: 'When do I pay?',
          answer: 'Payment terms are agreed upon with your chosen professional. Typically, payments are made in milestones throughout the project, with final payment upon completion.'
        }
      ]
    },
    {
      id: 'project-management',
      title: 'Project Management',
      icon: <Wrench className="w-5 h-5" />,
      questions: [
        {
          question: 'How do I communicate with professionals?',
          answer: 'All communication happens through our secure messaging system in your dashboard. This keeps all project discussions organized and accessible.'
        },
        {
          question: 'Can I track project progress?',
          answer: 'Yes, your dashboard shows project status, milestones, payments, and communication history. Professionals update progress as work is completed.'
        },
        {
          question: 'What if I have issues with a professional?',
          answer: 'Contact our support team immediately. We\'ll help mediate disputes and ensure projects are completed satisfactorily or help find alternative solutions.'
        },
        {
          question: 'Can I hire the same professional for future projects?',
          answer: 'Absolutely! You can directly invite professionals you\'ve worked with before to quote on new projects through your dashboard.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
                <p className="text-muted-foreground">Everything you need to know about BuildEasy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {faqSections.map((section) => (
              <Card key={section.id} id={section.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {section.icon}
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {section.questions.map((item, index) => (
                      <AccordionItem key={index} value={`${section.id}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Support */}
          <Card className="mt-12">
            <CardContent className="text-center py-8">
              <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <Link to="/contact">
                <Button>Contact Support</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;