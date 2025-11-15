import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Button, Input, Select, Card } from '../components/UIComponents';
import { Check, ChevronRight, ChevronLeft, UploadCloud, DollarSign, Book, Briefcase } from 'lucide-react';

const steps = [
  { id: 1, label: 'About' },
  { id: 2, label: 'Profile' },
  { id: 3, label: 'Photo' },
  { id: 4, label: 'Video' },
  { id: 5, label: 'Pricing' },
  { id: 6, label: 'Subjects' },
  { id: 7, label: 'Background' },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form State (Simplified for brevity but functional structure)
  const [formData, setFormData] = useState({
    country: '',
    languages: [{ language: 'English', proficiency: 'Native' }],
    headline: '',
    bio: '',
    pricing: { regular: 20, trial: 5 },
    subjects: [],
    education: [],
  });

  const handleNext = async () => {
    setLoading(true);
    // Simulate API save
    await api.instructor.onboarding.saveStep(currentStep, formData);
    setLoading(false);
    
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  // Render Step Content
  const renderStep = () => {
    switch (currentStep) {
      case 1: // About
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold">About You</h2>
            <p className="text-gray-500">Tell us where you're from and what languages you speak.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <Select 
                label="Country of Birth" 
                options={[{ value: '', label: 'Select Country' }, { value: 'US', label: 'United States' }, { value: 'UK', label: 'United Kingdom' }]}
                value={formData.country}
                onChange={e => setFormData({...formData, country: e.target.value})}
              />
              {/* In real app, dynamic language adder */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2">Languages Spoken</h4>
                <div className="flex gap-2">
                  <span className="bg-white px-3 py-1 rounded border text-sm">English (Native)</span>
                  <button className="text-primary-600 text-sm font-medium">+ Add</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 2: // Profile
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold">Profile Description</h2>
            <p className="text-gray-500">This is what students will see on your profile.</p>
            <Input 
              label="Headline" 
              placeholder="e.g. Certified Math Tutor with 5 years experience"
              value={formData.headline}
              onChange={e => setFormData({...formData, headline: e.target.value})}
            />
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bio</label>
              <textarea 
                className="block w-full rounded-lg border-gray-300 border px-3 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 h-48"
                placeholder="Introduce yourself to students..."
                value={formData.bio}
                onChange={e => setFormData({...formData, bio: e.target.value})}
              ></textarea>
              <p className="text-xs text-gray-500 mt-1 text-right">{formData.bio.length}/1000</p>
            </div>
          </div>
        );
      case 3: // Photo
      case 4: // Video
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold">{currentStep === 3 ? 'Profile Photo' : 'Introduction Video'}</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-gray-50">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <UploadCloud size={32} className="text-primary-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Feature Coming Soon</h3>
              <p className="text-gray-500 max-w-md">
                We are currently upgrading our media servers. You can skip this step for now and add your {currentStep === 3 ? 'photo' : 'video'} later from your dashboard.
              </p>
            </div>
          </div>
        );
      case 5: // Pricing
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold">Set your rates</h2>
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-100 text-green-600 rounded-lg"><DollarSign /></div>
                <div>
                  <h3 className="font-bold">Hourly Rate</h3>
                  <p className="text-sm text-gray-500">Your standard rate for a 60-minute lesson.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input 
                  type="range" min="5" max="100" step="1" 
                  value={formData.pricing.regular}
                  onChange={e => setFormData({...formData, pricing: { ...formData.pricing, regular: parseInt(e.target.value) }})}
                  className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <div className="w-24 text-center font-bold text-2xl text-primary-700 border border-primary-200 rounded-lg py-2 bg-primary-50">
                  ${formData.pricing.regular}
                </div>
              </div>
            </Card>
             <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><DollarSign /></div>
                <div>
                  <h3 className="font-bold">Trial Lesson</h3>
                  <p className="text-sm text-gray-500">Discounted rate for the first lesson (optional).</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input 
                  type="range" min="1" max="50" step="1" 
                  value={formData.pricing.trial}
                  onChange={e => setFormData({...formData, pricing: { ...formData.pricing, trial: parseInt(e.target.value) }})}
                  className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="w-24 text-center font-bold text-2xl text-blue-700 border border-blue-200 rounded-lg py-2 bg-blue-50">
                  ${formData.pricing.trial}
                </div>
              </div>
            </Card>
          </div>
        );
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Almost Done!</h2>
            <p className="text-gray-500">Click Finish to submit your profile for review.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-3xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4 relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded-full"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-primary-600 -z-10 -translate-y-1/2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>

            {steps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              return (
                <div key={step.id} className="flex flex-col items-center gap-2 bg-gray-50 px-2">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2 ${
                      isActive ? 'bg-primary-600 border-primary-600 text-white scale-110 shadow-lg shadow-primary-500/30' : 
                      isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                      'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {isCompleted ? <Check size={20} /> : step.id}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${isActive ? 'text-primary-700' : 'text-gray-500'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <Card className="p-8 md:p-12 min-h-[500px] flex flex-col">
          <div className="flex-grow">
            {renderStep()}
          </div>
          
          <div className="flex justify-between pt-8 border-t border-gray-100 mt-8">
            <Button 
              variant="ghost" 
              onClick={handleBack} 
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ChevronLeft size={20} /> Back
            </Button>
            <Button 
              onClick={handleNext} 
              isLoading={loading}
              className="gap-2 px-8"
            >
              {currentStep === steps.length ? 'Finish' : 'Next'} <ChevronRight size={20} />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;