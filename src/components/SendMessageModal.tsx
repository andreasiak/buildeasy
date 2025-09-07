import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, MessageCircle, User, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  sender: 'user' | 'vendor';
  content: string;
  timestamp: Date;
}

interface SendMessageModalProps {
  ticket: any;
  isOpen: boolean;
  onClose: () => void;
}

const SendMessageModal = ({ ticket, isOpen, onClose }: SendMessageModalProps) => {
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'user',
      content: `Hi ${ticket?.vendor?.name || 'there'}, I've submitted a quote request for ${ticket?.groupName}. Please let me know if you need any additional information.`,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    
    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: message,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate sending message
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Message Sent",
        description: `Your message has been sent to ${ticket?.vendor.name}`,
      });
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSendMessage();
    }
  };

  if (!ticket) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Message {ticket.vendor.name}
          </DialogTitle>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline">{ticket.groupName}</Badge>
            <span className="text-sm text-muted-foreground">
              Ticket #{ticket.id.slice(0, 8)}
            </span>
          </div>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Message History */}
          <div className="flex-1 min-h-0">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-4 p-2">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`p-3 rounded-lg ${
                          msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {msg.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${msg.sender === 'user' ? 'order-1 bg-primary text-primary-foreground' : 'order-2 bg-muted'}`}>
                      {msg.sender === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        ticket.vendor.name.charAt(0)
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Message Input */}
          <div className="border-t pt-6 space-y-4">
            <div className="space-y-3">
              <Label htmlFor="message" className="text-base font-medium">Your Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here... (Ctrl+Enter to send)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="min-h-[140px] text-base resize-none border-2 focus:border-primary rounded-lg p-4 bg-background"
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                Press Ctrl+Enter to send quickly
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose} size="lg">
                  Close
                </Button>
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!message.trim() || isLoading}
                  className="bg-gradient-primary"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendMessageModal;