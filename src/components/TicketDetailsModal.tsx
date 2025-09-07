import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, MapPin, DollarSign, Clock, Image, FileText } from 'lucide-react';

interface TicketDetailsModalProps {
  ticket: any;
  isOpen: boolean;
  onClose: () => void;
}

const TicketDetailsModal = ({ ticket, isOpen, onClose }: TicketDetailsModalProps) => {
  if (!ticket) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Request Details - {ticket.vendor.name}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Request Information */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Request Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <p className="font-medium">{ticket.createdAt.toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Service Type:</span>
                  <Badge variant="outline" className="ml-2">{ticket.groupName}</Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className="ml-2" variant={ticket.status === 'pending' ? 'secondary' : 'default'}>
                    {ticket.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Vendor Information */}
            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Vendor Details</h3>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {ticket.vendor.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{ticket.vendor.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{ticket.vendor.specialty}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {ticket.vendor.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {ticket.vendor.avgPrice}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {ticket.vendor.deliveryTime}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Description */}
            <div>
              <h3 className="font-semibold mb-3">Project Description</h3>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">{ticket.projectDescription}</p>
              </div>
            </div>

            {/* Form Data */}
            {ticket.formData && (
              <div>
                <h3 className="font-semibold mb-3">Original Request Details</h3>
                <div className="space-y-3">
                  {Object.entries(ticket.formData).map(([key, value]) => (
                    <div key={key} className="bg-card border rounded p-3">
                      <span className="text-sm text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <p className="font-medium mt-1">{String(value)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Uploaded Files/Drawings */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Image className="w-4 h-4" />
                Uploaded Files
              </h3>
              <div className="bg-muted/30 p-4 rounded-lg text-center">
                <Image className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  No files uploaded with this request
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Future uploads will appear here
                </p>
              </div>
            </div>

            {/* Quote Information */}
            {ticket.quotedAmount && (
              <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg">
                <h3 className="font-semibold text-accent mb-2">Quote Received</h3>
                <p className="text-2xl font-bold text-accent">{ticket.quotedAmount}</p>
                {ticket.notes && (
                  <div className="mt-3">
                    <span className="text-sm text-muted-foreground">Vendor Notes:</span>
                    <p className="text-sm mt-1">{ticket.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {ticket.status === 'quoted' && ticket.quotedAmount && (
            <Button className="bg-gradient-primary">
              Accept Quote
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDetailsModal;