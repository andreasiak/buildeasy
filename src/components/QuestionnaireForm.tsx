import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import DualRangeSlider from './DualRangeSlider';
import DeliveryTimeSlider from './DeliveryTimeSlider';
import { ChevronRight, Upload, CheckCircle } from 'lucide-react';

interface FormData {
  hasLand: boolean;
  hasBuildPermit: boolean;
  hasArchDrawings: boolean;
  drawingsFile?: File;
  totalSqm?: number;
  bedroomSizes: { [key: number]: number };
  bathroomSizes: { [key: number]: number };
  poolSize?: number;
  gardenSize?: number;
  balconySize?: number;
  showerOrBath: 'shower' | 'bath' | 'both';
  budget: [number, number];
  deliveryTime: number;
}

interface QuestionnaireFormProps {
  projectDescription: string;
  onComplete: (data: FormData & { serviceGroups: string[] }) => void;
}

const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({ projectDescription, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    hasLand: false,
    hasBuildPermit: false,
    hasArchDrawings: false,
    bedroomSizes: {},
    bathroomSizes: {},
    showerOrBath: 'both',
    budget: [10000, 500000],
    deliveryTime: 12
  });

  // Extract number of bedrooms and bathrooms from description
  const bedroomMatch = projectDescription.match(/(\d+)\s*bedroom/i);
  const bathroomMatch = projectDescription.match(/(\d+)\s*bath/i);
  const numBedrooms = bedroomMatch ? parseInt(bedroomMatch[1]) : 3;
  const numBathrooms = bathroomMatch ? parseInt(bathroomMatch[1]) : 2;
  const hasPool = projectDescription.toLowerCase().includes('pool');
  const hasGarden = projectDescription.toLowerCase().includes('garden');

  // Generate service groups based on project description
  const generateServiceGroups = (): string[] => {
    const groups = ['Architecture Firm', 'Construction', 'Electrical', 'Mechanical'];
    
    if (!formData.hasLand) groups.push('Real Estate');
    if (!formData.hasBuildPermit) groups.push('Lawyer');
    if (projectDescription.toLowerCase().includes('pool')) groups.push('Pool Construction');
    if (projectDescription.toLowerCase().includes('garden')) groups.push('Landscaping');
    
    groups.push('Furniture', 'Lighting and Fixtures');
    
    return groups;
  };

  const steps = [
    {
      title: "Property & Permits",
      content: (
        <div className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">Do you own buildable land?</Label>
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant={formData.hasLand ? "default" : "outline"}
                  onClick={() => setFormData({...formData, hasLand: true})}
                  className={formData.hasLand ? "bg-gradient-primary border-0" : ""}
                >
                  Yes
                </Button>
                <Button
                  type="button"
                  variant={!formData.hasLand ? "default" : "outline"}
                  onClick={() => setFormData({...formData, hasLand: false})}
                  className={!formData.hasLand ? "bg-gradient-primary border-0" : ""}
                >
                  No
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-base font-medium">Do you have a build permit?</Label>
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant={formData.hasBuildPermit ? "default" : "outline"}
                  onClick={() => setFormData({...formData, hasBuildPermit: true})}
                  className={formData.hasBuildPermit ? "bg-gradient-primary border-0" : ""}
                >
                  Yes
                </Button>
                <Button
                  type="button"
                  variant={!formData.hasBuildPermit ? "default" : "outline"}
                  onClick={() => setFormData({...formData, hasBuildPermit: false})}
                  className={!formData.hasBuildPermit ? "bg-gradient-primary border-0" : ""}
                >
                  No
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-base font-medium">Do you have architectural drawings?</Label>
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant={formData.hasArchDrawings ? "default" : "outline"}
                  onClick={() => setFormData({...formData, hasArchDrawings: true})}
                  className={formData.hasArchDrawings ? "bg-gradient-primary border-0" : ""}
                >
                  Yes
                </Button>
                <Button
                  type="button"
                  variant={!formData.hasArchDrawings ? "default" : "outline"}
                  onClick={() => setFormData({...formData, hasArchDrawings: false})}
                  className={!formData.hasArchDrawings ? "bg-gradient-primary border-0" : ""}
                >
                  No
                </Button>
              </div>
            </div>
          </div>
          
          {formData.hasArchDrawings && (
            <div className="space-y-2">
              <Label htmlFor="drawings" className="text-sm font-medium">Upload your architectural drawings</Label>
              <div 
                className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer"
                onClick={() => document.getElementById('drawings')?.click()}
              >
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                {formData.drawingsFile ? (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-primary">{formData.drawingsFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(formData.drawingsFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">
                      PDF, CAD, STL, 3D files, images, renderings supported
                    </p>
                  </div>
                )}
                <Input
                  id="drawings"
                  type="file"
                  accept=".pdf,.dwg,.dxf,.stl,.obj,.fbx,.3ds,.max,.blend,.skp,.ifc,.rvt,.jpg,.jpeg,.png,.gif,.bmp,.tiff,.webp,.svg,.ai,.psd,.eps"
                  className="hidden"
                  onChange={(e) => setFormData({...formData, drawingsFile: e.target.files?.[0]})}
                />
              </div>
              {formData.drawingsFile && (
                <p className="text-xs text-accent">✓ File uploaded successfully</p>
              )}
            </div>
          )}
        </div>
      )
    },
    {
      title: "Project Details",
      content: (
        <div className="space-y-6">
          {formData.hasArchDrawings ? (
            <div className="space-y-2">
              <Label htmlFor="totalSqm" className="text-base font-medium">Total square meters of the build</Label>
              <Input
                id="totalSqm"
                type="number"
                placeholder="e.g., 250"
                value={formData.totalSqm || ''}
                onChange={(e) => setFormData({...formData, totalSqm: parseInt(e.target.value) || undefined})}
                className="text-lg"
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Bedroom Sizes (sqm)</h3>
                {Array.from({length: numBedrooms}, (_, i) => (
                  <div key={i} className="space-y-2">
                    <Label htmlFor={`bedroom-${i+1}`} className="text-base">Bedroom {i + 1}</Label>
                    <Input
                      id={`bedroom-${i+1}`}
                      type="number"
                      placeholder="e.g., 15"
                      value={formData.bedroomSizes[i + 1] || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        bedroomSizes: {...formData.bedroomSizes, [i + 1]: parseInt(e.target.value) || 0}
                      })}
                    />
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Bathroom Sizes (sqm)</h3>
                {Array.from({length: numBathrooms}, (_, i) => (
                  <div key={i} className="space-y-2">
                    <Label htmlFor={`bathroom-${i+1}`} className="text-base">Bathroom {i + 1}</Label>
                    <Input
                      id={`bathroom-${i+1}`}
                      type="number"
                      placeholder="e.g., 8"
                      value={formData.bathroomSizes[i + 1] || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        bathroomSizes: {...formData.bathroomSizes, [i + 1]: parseInt(e.target.value) || 0}
                      })}
                    />
                  </div>
                ))}
              </div>
              
              {hasPool && (
                <div className="space-y-2">
                  <Label htmlFor="poolSize" className="text-base font-medium">Pool Size (sqm)</Label>
                  <Input
                    id="poolSize"
                    type="number"
                    placeholder="e.g., 40"
                    value={formData.poolSize || ''}
                    onChange={(e) => setFormData({...formData, poolSize: parseInt(e.target.value) || undefined})}
                  />
                </div>
              )}
              
              {hasGarden && (
                <div className="space-y-2">
                  <Label htmlFor="gardenSize" className="text-base font-medium">Garden Size (sqm)</Label>
                  <Input
                    id="gardenSize"
                    type="number"
                    placeholder="e.g., 100"
                    value={formData.gardenSize || ''}
                    onChange={(e) => setFormData({...formData, gardenSize: parseInt(e.target.value) || undefined})}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="balconySize" className="text-base font-medium">Balcony Size (sqm)</Label>
                <Input
                  id="balconySize"
                  type="number"
                  placeholder="e.g., 12"
                  value={formData.balconySize || ''}
                  onChange={(e) => setFormData({...formData, balconySize: parseInt(e.target.value) || undefined})}
                />
              </div>
              
              <div className="space-y-3">
                <Label className="text-base font-medium">Bathroom preference</Label>
                <div className="flex space-x-4">
                  {['shower', 'bath', 'both'].map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="showerOrBath"
                        value={option}
                        checked={formData.showerOrBath === option}
                        onChange={(e) => setFormData({...formData, showerOrBath: e.target.value as 'shower' | 'bath' | 'both'})}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="capitalize">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      title: "Budget Range",
      content: (
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-4 block">What's your budget range?</Label>
            <div className="px-4">
              <DualRangeSlider
                min={10000}
                max={1000000}
                step={5000}
                value={formData.budget}
                onChange={(budget) => setFormData({...formData, budget})}
                formatValue={(val) => val >= 1000000 ? '$1M+' : `$${(val / 1000)}K`}
              />
            </div>
          </div>
          
          <div>
            <Label className="text-base font-medium mb-4 block">Expected Delivery Time</Label>
            <div className="px-4">
              <DeliveryTimeSlider
                value={formData.deliveryTime}
                onChange={(deliveryTime) => setFormData({...formData, deliveryTime})}
              />
            </div>
          </div>
          
          <div className="bg-gradient-hero rounded-lg p-6 border">
            <h3 className="font-semibold mb-2 flex items-center">
              <CheckCircle className="w-5 h-5 text-primary mr-2" />
              Ready to connect with professionals
            </h3>
            <p className="text-sm text-muted-foreground">
              Based on your requirements, we'll match you with relevant service providers who can help bring your project to life.
            </p>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const serviceGroups = generateServiceGroups();
      onComplete({ ...formData, serviceGroups });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
          <span className="text-sm text-muted-foreground">
            {currentStep + 1} of {steps.length}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-secondary rounded-full h-2 mt-4">
          <div
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {steps[currentStep].content}
        
        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          <Button onClick={handleNext} className="bg-gradient-primary border-0">
            {currentStep === steps.length - 1 ? 'Generate Matches' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionnaireForm;