'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  loomLink: string;
}

const initialData: ApplicationData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  loomLink: '',
};

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ApplicationData>(initialData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1 && data.firstName && data.lastName) setStep(2);
    else if (step === 2 && data.email && data.phone) setStep(3);
    else if (step === 3 && data.loomLink) {
      setIsSubmitted(true);
      // Mock submission
      console.log('Application submitted:', data);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="quiz-card text-center p-12 bg-white rounded-3xl shadow-xl border border-gray-100"
      >
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl">✅</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Received!</h2>
        <p className="text-gray-600 text-lg">Thank you for applying to Zeducate. Our team will review your Loom video and get back to you soon.</p>
      </motion.div>
    );
  }

  return (
    <div className="quiz-card p-8 md:p-12 bg-white rounded-3xl shadow-xl border border-gray-100">
      <div className="mb-8">
        <div className="flex gap-2 justify-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i === step ? 'bg-primary-600' : 'bg-gray-200'}`} />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Let's start with your name</h2>
            <div className="space-y-4">
              <input type="text" name="firstName" placeholder="First Name" value={data.firstName} onChange={handleInputChange} className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 focus:border-primary-500 outline-none text-lg" />
              <input type="text" name="lastName" placeholder="Last Name" value={data.lastName} onChange={handleInputChange} className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 focus:border-primary-500 outline-none text-lg" />
            </div>
            <button onClick={handleNext} disabled={!data.firstName || !data.lastName} className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50">Continue</button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Contact Information</h2>
            <div className="space-y-4">
              <input type="email" name="email" placeholder="Email Address" value={data.email} onChange={handleInputChange} className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 focus:border-primary-500 outline-none text-lg" />
              <input type="tel" name="phone" placeholder="Phone Number" value={data.phone} onChange={handleInputChange} className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 focus:border-primary-500 outline-none text-lg" />
            </div>
            <button onClick={handleNext} disabled={!data.email || !data.phone} className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50">Continue</button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Introduce Yourself</h2>
            <p className="text-gray-600 text-center mb-4">Please share a Loom link of you describing why you'd be a great fit for Zeducate.</p>
            <input type="url" name="loomLink" placeholder="https://www.loom.com/share/..." value={data.loomLink} onChange={handleInputChange} className="w-full px-6 py-4 rounded-xl border-2 border-gray-100 focus:border-primary-500 outline-none text-lg" />
            <button onClick={handleNext} disabled={!data.loomLink} className="w-full bg-primary-600 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50">Submit Application</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
