import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useQuoteForm } from '@/contexts/QuoteFormContext';
import { toast } from 'sonner';

export const EmailConfirmationHandler = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { wasRedirectedFromAuth, setWasRedirectedFromAuth } = useQuoteForm();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');
      
      if (error) {
        toast.error('Email verification failed', {
          description: errorDescription || 'Please try again or contact support.'
        });
        return;
      }

      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const type = searchParams.get('type');

      if (accessToken && refreshToken && type === 'signup') {
        if (user) {
          toast.success('Successfully verified your account!', {
            description: wasRedirectedFromAuth 
              ? 'Your quote requests have been submitted and you will be redirected to the dashboard soon.'
              : 'Welcome to BuildEasy!'
          });

          if (wasRedirectedFromAuth) {
            // Show additional message about quote submission and stay on current page
            setTimeout(() => {
              setWasRedirectedFromAuth(false);
              // User stays on the current page (likely the quote page)
            }, 2500);
          } else {
            // For regular signups, user stays on current page
            // Dashboard access can be done via navigation
          }
        }
      }
    };

    handleEmailConfirmation();
  }, [searchParams, user, wasRedirectedFromAuth, setWasRedirectedFromAuth]);

  return null;
};