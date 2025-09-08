import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import DualRangeSlider from './DualRangeSlider';
import DeliveryTimeSlider from './DeliveryTimeSlider';
import { ChevronRight, Upload, CheckCircle } from 'lucide-react';

interface FormData {
  projectType: 'house' | 'renovation' | 'complex';
  hasLand: boolean;
  hasBuildPermit: boolean;
  hasArchDrawings: boolean;
  drawingsFile?: File;
  inspirationFiles?: File[];
  
  // House specific
  totalSqm?: number;
  bedroomSizes: { [key: number]: number };
  bathroomSizes: { [key: number]: number };
  poolSize?: number;
  gardenSize?: number;
  balconySize?: number;
  showerOrBath: 'shower' | 'bath' | 'both';
  
  // Renovation specific
  renovationRooms: string[];
  roomSizes: { [key: string]: number };
  
  // Complex specific
  numberOfUnits?: number;
  numberOfFloors?: number;
  plotSize?: number;
  parkingSpaces?: number;
  undergroundParking: boolean;
  unitTypes: Array<{ bedrooms: number; bathrooms: number; sqm: number; quantity: number }>;
  
  budget: [number, number];
  deliveryTime: number;
}

interface EnhancedQuestionnaireFormProps {
  projectDescription: string;
  onComplete: (data: FormData & { serviceGroups: string[] }) => void;
}

const EnhancedQuestionnaireForm: React.FC<EnhancedQuestionnaireFormProps> = ({ projectDescription, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    projectType: 'house',
    hasLand: false,
    hasBuildPermit: false,
    hasArchDrawings: false,
    bedroomSizes: {},
    bathroomSizes: {},
    renovationRooms: [],
    roomSizes: {},
    undergroundParking: false,
    unitTypes: [{ bedrooms: 2, bathrooms: 1, sqm: 80, quantity: 1 }],
    showerOrBath: 'both',
    budget: [10000, 500000],
    deliveryTime: 12,
    inspirationFiles: []
  });

  // Determine project type from description
  React.useEffect(() => {
    const desc = projectDescription.toLowerCase();
    if (desc.includes('renovat') || desc.includes('remodel') || desc.includes('upgrade')) {
      setFormData(prev => ({ ...prev, projectType: 'renovation' }));
    } else if (desc.includes('complex') || desc.includes('apartment') || desc.includes('units')) {
      setFormData(prev => ({ ...prev, projectType: 'complex' }));
    } else {
      setFormData(prev => ({ ...prev, projectType: 'house' }));
    }
  }, [projectDescription]);

  const generateServiceGroups = (): string[] => {
    const groups = ['Architecture Firm', 'Construction', 'Electrical', 'Mechanical'];
    
    if (!formData.hasLand) groups.push('Real Estate');
    if (!formData.hasBuildPermit) groups.push('Lawyer');
    if (projectDescription.toLowerCase().includes('pool')) groups.push('Pool Construction');
    if (projectDescription.toLowerCase().includes('garden')) groups.push('Landscaping');
    
    groups.push('Furniture', 'Lighting and Fixtures');
    
    return groups;
  };

  const roomOptions = [
    'Kitchen', 'Living Room', 'Dining Room', 'Master Bedroom', 'Bedroom', 
    'Bathroom', 'Guest Bathroom', 'Office', 'Basement', 'Attic', 'Garage', 
    'Laundry Room', 'Walk-in Closet', 'Balcony', 'Terrace'
  ];

  const handleRoomSelection = (room: string) => {
    const newRooms = formData.renovationRooms.includes(room)
      ? formData.renovationRooms.filter(r => r !== room)
      : [...formData.renovationRooms, room];
    
    setFormData({ ...formData, renovationRooms: newRooms });
  };

  const handleInspirationFiles = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files).slice(0, 10);
      const totalSize = fileArray.reduce((sum, file) => sum + file.size, 0);
      
      if (totalSize > 35 * 1024 * 1024) { // 35MB limit
        alert('Total file size cannot exceed 35MB');
        return;
      }
      
      setFormData({ ...formData, inspirationFiles: fileArray });
    }
  };

  const addUnitType = () => {
    setFormData({
      ...formData,
      unitTypes: [...formData.unitTypes, { bedrooms: 1, bathrooms: 1, sqm: 60, quantity: 1 }]
    });
  };

  const updateUnitType = (index: number, field: string, value: number) => {
    const newUnitTypes = [...formData.unitTypes];
    newUnitTypes[index] = { ...newUnitTypes[index], [field]: value };
    setFormData({ ...formData, unitTypes: newUnitTypes });
  };

  const getSteps = () => {
    const baseSteps = [
      {
        title: "Project Type",
        content: (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">What type of project is this?</Label>
              <RadioGroup 
                value={formData.projectType} 
                onValueChange={(value: 'house' | 'renovation' | 'complex') => 
                  setFormData({...formData, projectType: value})
                }
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="house" id="house" />
                  <Label htmlFor="house" className="font-normal">New House Construction</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="renovation" id="renovation" />
                  <Label htmlFor="renovation" className="font-normal">Renovation/Remodeling</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="complex" id="complex" />
                  <Label htmlFor="complex" className="font-normal">Apartment Complex/Multi-Unit</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )
      },
      {
        title: "Property & Permits",
        content: (
          <div className="space-y-6">
            {formData.projectType !== 'renovation' && (
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
            )}
            
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
              </div>
            )}

            {/* Inspiration Pictures Upload */}
            <div className="space-y-2">
              <Label htmlFor="inspiration" className="text-sm font-medium">Inspiration Pictures/Examples (Optional)</Label>
              <div 
                className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer"
                onClick={() => document.getElementById('inspiration')?.click()}
              >
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                {formData.inspirationFiles && formData.inspirationFiles.length > 0 ? (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-primary">{formData.inspirationFiles.length} files selected</p>
                    <p className="text-xs text-muted-foreground">
                      {(formData.inspirationFiles.reduce((sum, f) => sum + f.size, 0) / 1024 / 1024).toFixed(2)} MB total
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Upload inspiration images (up to 10 files)</p>
                    <p className="text-xs text-muted-foreground">
                      PDF, images - Max 35MB total
                    </p>
                  </div>
                )}
                <Input
                  id="inspiration"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.gif,.bmp,.tiff,.webp,.svg"
                  multiple
                  className="hidden"
                  onChange={(e) => handleInspirationFiles(e.target.files)}
                />
              </div>
            </div>
          </div>
        )
      }
    ];

    // Add project-specific steps
    if (formData.projectType === 'house') {
      baseSteps.push({
        title: "House Details",
        content: (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="totalSqm" className="text-base font-medium">Total square meters</Label>
              <Input
                id="totalSqm"
                type="number"
                placeholder="e.g., 250"
                value={formData.totalSqm || ''}
                onChange={(e) => setFormData({...formData, totalSqm: parseInt(e.target.value) || undefined})}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Bedroom Sizes (sqm)</h3>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <Label htmlFor={`bedroom-${i}`}>Bedroom {i} (optional)</Label>
                  <Input
                    id={`bedroom-${i}`}
                    type="number"
                    placeholder="e.g., 15"
                    value={formData.bedroomSizes[i] || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      bedroomSizes: {...formData.bedroomSizes, [i]: parseInt(e.target.value) || 0}
                    })}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Bathroom preference</Label>
              <RadioGroup 
                value={formData.showerOrBath} 
                onValueChange={(value: 'shower' | 'bath' | 'both') => 
                  setFormData({...formData, showerOrBath: value})
                }
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="shower" id="shower" />
                  <Label htmlFor="shower">Shower</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bath" id="bath" />
                  <Label htmlFor="bath">Bath</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both">Both</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )
      });
    } else if (formData.projectType === 'renovation') {
      baseSteps.push({
        title: "Renovation Details",
        content: (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">Select rooms to renovate:</Label>
              <div className="grid grid-cols-2 gap-2">
                {roomOptions.map((room) => (
                  <Button
                    key={room}
                    type="button"
                    variant={formData.renovationRooms.includes(room) ? "default" : "outline"}
                    onClick={() => handleRoomSelection(room)}
                    className={formData.renovationRooms.includes(room) ? "bg-gradient-primary border-0" : ""}
                    size="sm"
                  >
                    {room}
                  </Button>
                ))}
              </div>
            </div>

            {formData.renovationRooms.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Room Sizes (sqm)</h3>
                {formData.renovationRooms.map((room) => (
                  <div key={room} className="space-y-2">
                    <Label htmlFor={`room-${room}`}>{room}</Label>
                    <Input
                      id={`room-${room}`}
                      type="number"
                      placeholder="e.g., 20"
                      value={formData.roomSizes[room] || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        roomSizes: {...formData.roomSizes, [room]: parseInt(e.target.value) || 0}
                      })}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      });
    } else if (formData.projectType === 'complex') {
      baseSteps.push({
        title: "Complex Details",
        content: (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numberOfUnits">Number of Units</Label>
                <Input
                  id="numberOfUnits"
                  type="number"
                  placeholder="e.g., 20"
                  value={formData.numberOfUnits || ''}
                  onChange={(e) => setFormData({...formData, numberOfUnits: parseInt(e.target.value) || undefined})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="numberOfFloors">Number of Floors</Label>
                <Input
                  id="numberOfFloors"
                  type="number"
                  placeholder="e.g., 5"
                  value={formData.numberOfFloors || ''}
                  onChange={(e) => setFormData({...formData, numberOfFloors: parseInt(e.target.value) || undefined})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="plotSize">Plot Size (sqm)</Label>
                <Input
                  id="plotSize"
                  type="number"
                  placeholder="e.g., 2000"
                  value={formData.plotSize || ''}
                  onChange={(e) => setFormData({...formData, plotSize: parseInt(e.target.value) || undefined})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="parkingSpaces">Parking Spaces</Label>
                <Input
                  id="parkingSpaces"
                  type="number"
                  placeholder="e.g., 30"
                  value={formData.parkingSpaces || ''}
                  onChange={(e) => setFormData({...formData, parkingSpaces: parseInt(e.target.value) || undefined})}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Underground parking?</Label>
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant={formData.undergroundParking ? "default" : "outline"}
                  onClick={() => setFormData({...formData, undergroundParking: true})}
                  className={formData.undergroundParking ? "bg-gradient-primary border-0" : ""}
                >
                  Yes
                </Button>
                <Button
                  type="button"
                  variant={!formData.undergroundParking ? "default" : "outline"}
                  onClick={() => setFormData({...formData, undergroundParking: false})}
                  className={!formData.undergroundParking ? "bg-gradient-primary border-0" : ""}
                >
                  No
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Unit Types</h3>
                <Button type="button" onClick={addUnitType} variant="outline" size="sm">
                  Add Unit Type
                </Button>
              </div>
              
              {formData.unitTypes.map((unitType, index) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-4 gap-3">
                    <div>
                      <Label>Bedrooms</Label>
                      <Input
                        type="number"
                        value={unitType.bedrooms}
                        onChange={(e) => updateUnitType(index, 'bedrooms', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label>Bathrooms</Label>
                      <Input
                        type="number"
                        value={unitType.bathrooms}
                        onChange={(e) => updateUnitType(index, 'bathrooms', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label>Size (sqm)</Label>
                      <Input
                        type="number"
                        value={unitType.sqm}
                        onChange={(e) => updateUnitType(index, 'sqm', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        value={unitType.quantity}
                        onChange={(e) => updateUnitType(index, 'quantity', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )
      });
    }

    // Add budget step
    baseSteps.push({
      title: "Budget & Timeline",
      content: (
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-4 block">Budget range</Label>
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
            <Label className="text-base font-medium mb-4 block">Expected delivery time</Label>
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
              Based on your requirements, we'll match you with relevant service providers.
            </p>
          </div>
        </div>
      )
    });

    return baseSteps;
  };

  const steps = getSteps();

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

export default EnhancedQuestionnaireForm;