import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProjectData {
  id?: string;
  description: string;
  formData?: any;
  serviceGroups?: string[];
}

interface QuoteFormContextType {
  projectData: ProjectData;
  setProjectData: (data: ProjectData) => void;
  selectedTickets: any[];
  setSelectedTickets: (tickets: any[]) => void;
  currentStep: 'initial' | 'questionnaire' | 'services';
  setCurrentStep: (step: 'initial' | 'questionnaire' | 'services') => void;
  wasRedirectedFromAuth: boolean;
  setWasRedirectedFromAuth: (value: boolean) => void;
  redirectPath: string | null;
  setRedirectPath: (path: string | null) => void;
  clearFormData: () => void;
}

const QuoteFormContext = createContext<QuoteFormContextType | undefined>(undefined);

export const QuoteFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projectData, setProjectData] = useState<ProjectData>({
    description: ''
  });
  const [selectedTickets, setSelectedTickets] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<'initial' | 'questionnaire' | 'services'>('initial');
  const [wasRedirectedFromAuth, setWasRedirectedFromAuth] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  const clearFormData = () => {
    setProjectData({ description: '' });
    setSelectedTickets([]);
    setCurrentStep('initial');
    setWasRedirectedFromAuth(false);
    setRedirectPath(null);
  };

  return (
    <QuoteFormContext.Provider value={{
      projectData,
      setProjectData,
      selectedTickets,
      setSelectedTickets,
      currentStep,
      setCurrentStep,
      wasRedirectedFromAuth,
      setWasRedirectedFromAuth,
      redirectPath,
      setRedirectPath,
      clearFormData
    }}>
      {children}
    </QuoteFormContext.Provider>
  );
};

export const useQuoteForm = () => {
  const context = useContext(QuoteFormContext);
  if (context === undefined) {
    throw new Error('useQuoteForm must be used within a QuoteFormProvider');
  }
  return context;
};