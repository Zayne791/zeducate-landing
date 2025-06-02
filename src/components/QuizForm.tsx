'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface QuizData {
  schoolLevel: 'primary' | 'high' | '';
  yearLevel: string;
  subjects: string[];
  hasPreviousTutoring: boolean | null;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  country: string;
}

const initialQuizData: QuizData = {
  schoolLevel: '',
  yearLevel: '',
  subjects: [],
  hasPreviousTutoring: null,
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  city: '',
  state: '',
  country: '',
};

const primaryYears = ['Kindergarten', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'];
const highSchoolYears = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'];
const subjects = ['Mathematics', 'English', 'Other'];

export default function QuizForm() {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>(initialQuizData);
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuizData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSchoolLevel = (level: 'primary' | 'high') => {
    setQuizData((prev) => ({ ...prev, schoolLevel: level, yearLevel: '' }));
    setStep(2);
  };

  const handleYearLevel = (year: string) => {
    setQuizData((prev) => ({ ...prev, yearLevel: year }));
    setStep(3);
  };

  const handleSubjectToggle = (subject: string) => {
    setQuizData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const handlePreviousTutoring = (value: boolean) => {
    setQuizData((prev) => ({ ...prev, hasPreviousTutoring: value }));
    setStep(5);
    setIsChecking(true);
    // Simulate eligibility check
    setTimeout(() => {
      setIsChecking(false);
      setStep(6);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Track form submission event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead');
      }

      // Send data to webhook
      await fetch('https://hook.eu2.make.com/hksm69png5z13emr9gmhrrac40jj5b9t', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      // You might want to show an error message to the user here
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="quiz-card text-center"
      >
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
            <CheckCircleIcon className="w-12 h-12 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Thank You!</h2>
          <p className="text-lg text-gray-600 max-w-md">
            One of our expert team members will be in touch shortly to schedule your free trial lesson.
            We're excited to help your child succeed!
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="quiz-card">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="quiz-progress">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === step
                    ? 'bg-primary-600 scale-125'
                    : i < step
                    ? 'bg-primary-200'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">What level of school is your child in?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleSchoolLevel('primary')}
                  className="select-button text-lg"
                >
                  <span className="text-2xl mb-1">🏫</span>
                  Primary School
                </button>
                <button
                  type="button"
                  onClick={() => handleSchoolLevel('high')}
                  className="select-button text-lg"
                >
                  <span className="text-2xl mb-1">🎓</span>
                  High School
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">What year is your child in?</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(quizData.schoolLevel === 'primary' ? primaryYears : highSchoolYears).map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => handleYearLevel(year)}
                    className="select-button"
                  >
                    <span className="text-lg">{year}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Which subject(s) need improvement?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => handleSubjectToggle(subject)}
                    className={`select-button ${
                      quizData.subjects.includes(subject) ? 'active' : ''
                    }`}
                  >
                    <span className="text-2xl mb-1">
                      {subject === 'Mathematics' ? '📐' : subject === 'English' ? '📚' : '🎯'}
                    </span>
                    <span>{subject}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="btn-primary w-full"
                disabled={quizData.subjects.length === 0}
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Has your child done private tutoring before?</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handlePreviousTutoring(true)}
                  className="select-button"
                >
                  <span className="text-2xl mb-1">✅</span>
                  <span className="text-lg">Yes</span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePreviousTutoring(false)}
                  className="select-button"
                >
                  <span className="text-2xl mb-1">❌</span>
                  <span className="text-lg">No</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-12 text-center"
            >
              <div className="flex flex-col items-center gap-8">
                <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
                <h2 className="text-2xl font-bold text-gray-900">Checking Eligibility...</h2>
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <CheckCircleIcon className="w-20 h-20 text-primary-600 mx-auto" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900">Congratulations!</h2>
                <p className="text-lg text-gray-600">
                  Your child qualifies for a free, no-obligation trial lesson.
                  Complete your details below to redeem your trial.
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={quizData.firstName}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={quizData.lastName}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={quizData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={quizData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={quizData.city}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                      placeholder="e.g., Sydney"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={quizData.state}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                      placeholder="e.g., NSW"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={quizData.country}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                      placeholder="e.g., Australia"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full">
                  Claim Your Free Trial Lesson
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
} 