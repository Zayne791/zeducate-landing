'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, VideoCameraIcon, UserIcon, ClockIcon, AcademicCapIcon, BoltIcon } from '@heroicons/react/24/outline';

interface ApplicationData {
  mathsEnglishYear12: string;
  strongestSubjects: string[];
  otherSubjects: string;
  yearLevels: string[];
  background: string[];
  commit20Hours: string;
  availability: string[];
  difficultSituation: string;
  zoomComfort: string;
  videoLink: string;
  fullName: string;
  email: string;
  phone: string;
  postcode: string;
}

const initialData: ApplicationData = {
  mathsEnglishYear12: '',
  strongestSubjects: [],
  otherSubjects: '',
  yearLevels: [],
  background: [],
  commit20Hours: '',
  availability: [],
  difficultSituation: '',
  zoomComfort: '',
  videoLink: '',
  fullName: '',
  email: '',
  phone: '',
  postcode: '',
};

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ApplicationData>(initialData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDisqualified, setIsDisqualified] = useState(false);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const updateData = (field: keyof ApplicationData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: keyof ApplicationData, item: string) => {
    const current = data[field] as string[];
    if (current.includes(item)) {
      updateData(field, current.filter(i => i !== item));
    } else {
      updateData(field, [...current, item]);
    }
  };

  if (isDisqualified) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="quiz-card p-12 text-center bg-white rounded-3xl shadow-xl border-2 border-red-100">
        <XCircleIcon className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Status</h2>
        <p className="text-gray-600 text-lg">Thank you for your interest. Based on your requirements, we are unable to proceed with your application at this time as we require specific availability and subject proficiency.</p>
        <button onClick={() => window.location.reload()} className="mt-8 text-primary-600 font-semibold hover:underline">Start Over</button>
      </motion.div>
    );
  }

  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="quiz-card p-12 text-center bg-white rounded-3xl shadow-xl border-2 border-green-100">
        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
        <p className="text-gray-600 text-lg">Amazing! We've received your application and video. Our team will review your profile and get in touch within 48 hours.</p>
      </motion.div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="text-center mb-8">
              <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Step 1 of 10</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Subject Proficiency</h2>
              <p className="text-gray-600 mt-2">Can you confidently teach both Maths and English up to Year 12 level (or are you willing to learn)?</p>
            </div>
            <div className="grid gap-4">
              {['Yes', "I'm willing to learn", 'No'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    if (opt === 'No') setIsDisqualified(true);
                    else {
                      updateData('mathsEnglishYear12', opt);
                      handleNext();
                    }
                  }}
                  className="w-full p-5 text-left rounded-2xl border-2 border-gray-100 hover:border-primary-500 hover:bg-primary-50 transition-all font-semibold text-lg flex items-center justify-between group"
                >
                  {opt}
                  <BoltIcon className="w-6 h-6 text-primary-200 group-hover:text-primary-500" />
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="text-center mb-8">
              <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Step 2 of 10</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Current Strengths</h2>
              <p className="text-gray-600 mt-2">Which subjects are you strongest in right now?</p>
            </div>
            <div className="grid gap-3">
              {['Maths', 'English', 'Both equally'].map((opt) => (
                <label key={opt} className="flex items-center p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={data.strongestSubjects.includes(opt)}
                    onChange={() => toggleArrayItem('strongestSubjects', opt)}
                    className="w-5 h-5 text-primary-600 rounded"
                  />
                  <span className="ml-3 text-lg font-medium">{opt}</span>
                </label>
              ))}
              <input
                type="text"
                placeholder="Other subjects (please specify)"
                value={data.otherSubjects}
                onChange={(e) => updateData('otherSubjects', e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-primary-500 outline-none"
              />
            </div>
            <button onClick={handleNext} className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg">Continue</button>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="text-center mb-8">
              <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Step 3 of 10</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Teaching Comfort</h2>
              <p className="text-gray-600 mt-2">What year levels are you most comfortable teaching?</p>
            </div>
            <div className="grid gap-3">
              {['Primary (Years K-6)', 'Lower Secondary (Years 7-8)', 'Senior Secondary (Years 9-10)', 'VCE/HSC/QCE (Years 11-12)'].map((opt) => (
                <label key={opt} className="flex items-center p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={data.yearLevels.includes(opt)}
                    onChange={() => toggleArrayItem('yearLevels', opt)}
                    className="w-5 h-5 text-primary-600 rounded"
                  />
                  <span className="ml-3 text-lg font-medium">{opt}</span>
                </label>
              ))}
            </div>
            <button onClick={handleNext} className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg">Continue</button>
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="text-center mb-8">
              <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Step 4 of 10</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Your Background</h2>
              <p className="text-gray-600 mt-2">What's your background in Maths and English?</p>
            </div>
            <div className="grid gap-3">
              {['Currently studying them', 'Degree/qualification', 'Professional experience', 'Strong personal foundation', 'Previous tutoring/teaching'].map((opt) => (
                <label key={opt} className="flex items-center p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={data.background.includes(opt)}
                    onChange={() => toggleArrayItem('background', opt)}
                    className="w-5 h-5 text-primary-600 rounded"
                  />
                  <span className="ml-3 text-lg font-medium">{opt}</span>
                </label>
              ))}
            </div>
            <button onClick={handleNext} className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg">Continue</button>
          </motion.div>
        );
      case 5:
        return (
          <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="text-center mb-8">
              <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Step 5 of 10</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Commitment</h2>
              <p className="text-gray-600 mt-2">Can you commit to at least 20 hours per week for tutoring?</p>
            </div>
            <div className="grid gap-4">
              {['Yes', 'No'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    if (opt === 'No') setIsDisqualified(true);
                    else {
                      updateData('commit20Hours', opt);
                      handleNext();
                    }
                  }}
                  className="w-full p-5 text-left rounded-2xl border-2 border-gray-100 hover:border-primary-500 hover:bg-primary-50 transition-all font-semibold text-lg flex items-center justify-between group"
                >
                  {opt}
                  <ClockIcon className="w-6 h-6 text-primary-200 group-hover:text-primary-500" />
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 6:
        return (
          <motion.div key="s6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="text-center mb-8">
              <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Step 6 of 10</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Availability</h2>
              <p className="text-gray-600 mt-2">What times are you available for tutoring sessions?</p>
            </div>
            <div className="grid gap-3">
              {['Weekday mornings', 'Weekday afternoons', 'Weekday evenings', 'Weekends'].map((opt) => (
                <label key={opt} className="flex items-center p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={data.availability.includes(opt)}
                    onChange={() => toggleArrayItem('availability', opt)}
                    className="w-5 h-5 text-primary-600 rounded"
                  />
                  <span className="ml-3 text-lg font-medium">{opt}</span>
                </label>
              ))}
            </div>
            <button onClick={handleNext} className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg">Continue</button>
          </motion.div>
        );
      case 7:
        return (
          <motion.div key="s7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="text-center mb-8">
              <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Step 7 of 10</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Teaching Approach</h2>
              <p className="text-gray-600 mt-2">Tell us about a time you helped someone understand something difficult. What approach did you take?</p>
            </div>
            <textarea
              value={data.difficultSituation}
              onChange={(e) => updateData('difficultSituation', e.target.value)}
              placeholder="Your story..."
              className="w-full h-40 p-5 rounded-2xl border-2 border-gray-100 focus:border-primary-500 outline-none text-lg resize-none"
            />
            <button onClick={handleNext} disabled={!data.difficultSituation} className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50">Continue</button>
          </motion.div>
        );
      case 8:
        return (
          <motion.div key="s8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="text-center mb-8">
              <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Step 8 of 10</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Zoom Comfort</h2>
              <p className="text-gray-600 mt-2">Are you comfortable using Zoom for online tutoring?</p>
            </div>
            <div className="grid gap-4">
              {['Yes', 'No', 'Willing to learn'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    updateData('zoomComfort', opt);
                    handleNext();
                  }}
                  className="w-full p-5 text-left rounded-2xl border-2 border-gray-100 hover:border-primary-500 hover:bg-primary-50 transition-all font-semibold text-lg flex items-center justify-between group"
                >
                  {opt}
                  <VideoCameraIcon className="w-6 h-6 text-primary-200 group-hover:text-primary-500" />
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 9:
        return (
          <motion.div key="s9" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="text-center mb-8">
              <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Step 9 of 10</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Video Introduction</h2>
              <p className="text-gray-600 mt-2">Show us your personality and teaching style! Share a 60-90 second video.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-6">
              <p className="text-blue-800 text-sm font-medium">✨ Share a Loom, Google Drive, or unlisted YouTube/Vimeo link so we can get to know you!</p>
            </div>
            <input
              type="url"
              placeholder="Paste your video link here..."
              value={data.videoLink}
              onChange={(e) => updateData('videoLink', e.target.value)}
              className="w-full p-5 rounded-2xl border-2 border-gray-100 focus:border-primary-500 outline-none text-lg"
            />
            <button onClick={handleNext} disabled={!data.videoLink} className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50">Continue</button>
          </motion.div>
        );
      case 10:
        return (
          <motion.div key="s10" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="text-center mb-8">
              <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Final Step</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Contact Details</h2>
              <p className="text-gray-600 mt-2">Almost done! We'll use these to get in touch.</p>
            </div>
            <div className="grid gap-4">
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Full Name" value={data.fullName} onChange={(e) => updateData('fullName', e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 focus:border-primary-500 outline-none" />
              </div>
              <input type="email" placeholder="Email Address" value={data.email} onChange={(e) => updateData('email', e.target.value)} className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-primary-500 outline-none" />
              <input type="tel" placeholder="Mobile Number" value={data.phone} onChange={(e) => updateData('phone', e.target.value)} className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-primary-500 outline-none" />
              <input type="text" placeholder="Postcode" value={data.postcode} onChange={(e) => updateData('postcode', e.target.value)} className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-primary-500 outline-none" />
            </div>
            <button 
              onClick={async () => {
                try {
                  // Track application submission event
                  if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('trackSingle', '2210000349532472', 'Lead');
                  }

                  // Send data to webhook
                  await fetch('https://hook.eu2.make.com/2mq868lpqooqlv12xw3cmz3fdcvd6wz2', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                  });
                  
                  setIsSubmitted(true);
                } catch (error) {
                  console.error('Error submitting application:', error);
                  // Still show success to user but log error
                  setIsSubmitted(true);
                }
              }} 
              disabled={!data.fullName || !data.email || !data.phone || !data.postcode}
              className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-5 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all"
            >
              Submit Application
            </button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8 flex justify-between items-center px-4">
        {step > 1 && (
          <button onClick={handleBack} className="text-gray-500 font-medium hover:text-primary-600 transition-colors">← Back</button>
        )}
        <div className="flex gap-1.5 ml-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-primary-600' : i < step ? 'w-4 bg-primary-200' : 'w-2 bg-gray-200'}`} />
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  );
}
