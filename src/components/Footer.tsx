import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/lovable-uploads/569809aa-baff-4dfd-a37e-09697c885f6d.png" alt="Logo" className="w-[135px] h-[55px] object-contain" />
            </div>
            <p className="text-muted-foreground text-sm">
              Connecting dreams with the right professionals to build anything, anywhere.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>support@buildeasy.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">How It Works</h3>
            <ul className="space-y-2">
              <li><Link to="/faq#getting-started" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Getting Started</Link></li>
              <li><Link to="/faq#submitting-requests" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Submitting Requests</Link></li>
              <li><Link to="/faq#matching-process" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Matching Process</Link></li>
              <li><Link to="/faq#project-management" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Project Management</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/faq#account-types" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Account Types</Link></li>
              <li><Link to="/faq#payments" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Payment & Billing</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</Link></li>
              <li><Link to="/acceptable-use" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Acceptable Use</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2024 BuildEasy. All rights reserved.
          </div>
          
          {/* Sign Up Buttons */}
          <div className="flex gap-3">
            <Link to="/auth?type=client">
              <Button variant="outline" size="sm" className="bg-gradient-primary text-white border-0 hover:opacity-90">
                Signup as Client
              </Button>
            </Link>
            <Link to="/auth?type=vendor">
              <Button variant="outline" size="sm" className="bg-gradient-primary text-white border-0 hover:opacity-90">
                Signup as Vendor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};