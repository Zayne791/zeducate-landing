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
  postcode: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  showYearDropdown: boolean; // Added for custom dropdown
}

const initialQuizData: QuizData = {
  schoolLevel: '',
  yearLevel: '',
  subjects: [],
  hasPreviousTutoring: null,
  firstName: '',
  lastName: '',
  postcode: '',
  email: '',
  phone: '',
  city: '',
  state: '',
  country: '',
  showYearDropdown: false, // Added for custom dropdown
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
    setQuizData((prev) => ({ ...prev, subjects: [subject] })); // Only allow one subject
    setStep(4); // Auto-advance to next step
  };

  const handlePreviousTutoring = (value: boolean) => {
    setQuizData((prev) => ({ ...prev, hasPreviousTutoring: value }));
    // Start checking eligibility
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setStep(6); // Go to congratulations page
    }, 3500);
  };

  const handleClaimTrial = () => {
    setStep(7); // Start contact information steps
  };

  const handleFirstName = () => {
    if (quizData.firstName.trim()) {
      setStep(8);
    }
  };

  const handleLastName = () => {
    if (quizData.lastName.trim()) {
      setStep(9);
    }
  };

  const handlePostcode = () => {
    if (quizData.postcode.trim()) {
      setStep(10);
    }
  };

  const handleEmail = () => {
    if (quizData.email.trim()) {
      setStep(11);
    }
  };

  const handlePhone = () => {
    if (quizData.phone.trim()) {
      // Submit the form
      setIsSubmitted(true);
      
      // Send data to webhook
      setTimeout(async () => {
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
    } catch (error) {
      console.error('Error submitting form:', error);
        }
      }, 100);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="quiz-card text-center relative overflow-hidden"
      >
        <div className="flex flex-col items-center gap-8 relative z-10">
          {/* Animated success icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
            className="relative"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-4xl md:text-5xl">🎊</span>
              </motion.div>
          </div>
            
            {/* Animated rings */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 border-2 border-green-300 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 border-2 border-green-400 rounded-full"
            />
          </motion.div>

          {/* Main heading with animation */}
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              Congratulations! 🎉
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", duration: 0.8 }}
              className="text-lg md:text-xl text-gray-600 max-w-md mx-auto leading-relaxed"
            >
              Your free trial lesson has been successfully booked!
            </motion.p>
          </div>

          {/* Animated next steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, type: "spring", duration: 0.8 }}
            className="space-y-4 max-w-sm mx-auto"
          >
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center justify-center space-x-3 text-blue-600 font-medium"
            >
              <span className="text-xl">📞</span>
              <span>We'll call you within 24 hours</span>
            </motion.div>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="flex items-center justify-center space-x-3 text-blue-600 font-medium"
            >
              <span className="text-xl">📅</span>
              <span>Schedule your trial lesson</span>
            </motion.div>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="flex items-center justify-center space-x-3 text-blue-600 font-medium"
            >
              <span className="text-xl">🎯</span>
              <span>Start your child's success journey</span>
            </motion.div>
          </motion.div>

          {/* Success message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, type: "spring", duration: 0.8 }}
            className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6 max-w-md mx-auto"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-center"
            >
              <div className="text-2xl mb-3">🌟</div>
              <p className="text-green-700 font-semibold text-lg">
            We're excited to help your child succeed!
          </p>
              <p className="text-green-600 text-sm mt-2">
                Our expert team is ready to create a personalized learning experience
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Gradient background animation */}
        <motion.div
          animate={{ 
            background: [
              "linear-gradient(45deg, #f0fdf4, #dbeafe)",
              "linear-gradient(45deg, #dbeafe, #f0fdf4)",
              "linear-gradient(45deg, #f0fdf4, #dbeafe)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-2xl opacity-30 -z-10"
        />

        {/* Floating celebration elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 left-4 text-2xl opacity-60"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-8 right-8 text-xl opacity-60"
        >
          🎊
        </motion.div>
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-8 left-8 text-xl opacity-60"
        >
          🎉
        </motion.div>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-4 right-4 text-lg opacity-60"
        >
          ⭐
        </motion.div>
      </motion.div>
    );
  }

  if (isChecking) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="quiz-card text-center"
      >
        <div className="flex flex-col items-center gap-8">
          {/* Animated loading icon */}
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 md:w-24 md:h-24 border-4 border-primary-200 border-t-primary-600 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 border-2 border-primary-300 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute inset-2 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center"
            >
              <span className="text-2xl md:text-3xl">🎓</span>
            </motion.div>
          </div>

          {/* Main heading with animation */}
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-gray-900"
            >
              Checking Eligibility...
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-gray-600 max-w-md"
            >
              We're analyzing your child's learning profile to find the perfect match
            </motion.p>
          </div>

          {/* Animated progress dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
                className="w-3 h-3 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
              />
            ))}
          </div>

          {/* Animated status messages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-2"
          >
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="text-sm md:text-base text-primary-600 font-medium"
            >
              ✓ Verifying school level requirements
            </motion.div>
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 3 }}
              className="text-sm md:text-base text-primary-600 font-medium"
            >
              ✓ Checking subject availability
            </motion.div>
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 5 }}
              className="text-sm md:text-base text-primary-600 font-medium"
            >
              ✓ Finding qualified tutors
            </motion.div>
          </motion.div>

          {/* Gradient background animation */}
          <motion.div
            animate={{ 
              background: [
                "linear-gradient(45deg, #f0f9ff, #e0f2fe)",
                "linear-gradient(45deg, #e0f2fe, #f0f9ff)",
                "linear-gradient(45deg, #f0f9ff, #e0f2fe)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-2xl opacity-50 -z-10"
          />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="quiz-card">
      <form className="space-y-8">
        <div className="quiz-progress">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
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
              <div className="text-center space-y-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto"
                >
                  <span className="text-2xl md:text-4xl">🎓</span>
                </motion.div>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900">What level of school is your child in?</h2>
                <p className="text-base md:text-xl text-gray-600">Let's find the perfect learning path for your child!</p>
              </div>
              
              <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                <motion.button
                  type="button"
                  onClick={() => handleSchoolLevel('primary')}
                  className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-primary-300 hover:shadow-lg md:hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-300">
                      <span className="text-2xl md:text-4xl">🏫</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-primary-700 transition-colors duration-300 mb-1 md:mb-2">
                  Primary School
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 group-hover:text-primary-600 transition-colors duration-300">
                      Kindergarten to Year 6
                    </p>
                  </div>
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={() => handleSchoolLevel('high')}
                  className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-primary-300 hover:shadow-lg md:hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-300">
                      <span className="text-2xl md:text-4xl">🎓</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-primary-700 transition-colors duration-300 mb-1 md:mb-2">
                  High School
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 group-hover:text-primary-600 transition-colors duration-300">
                      Year 7 to Year 12
                    </p>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto"
                >
                  <span className="text-2xl md:text-3xl">🎓</span>
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What year is your child in?</h2>
                <p className="text-base md:text-lg text-gray-600">Let's find the perfect level for your child!</p>
              </div>
              
              <div className="max-w-md mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <motion.button
                    type="button"
                    onClick={() => setQuizData(prev => ({ ...prev, showYearDropdown: !prev.showYearDropdown }))}
                    className="w-full px-6 py-4 text-xl text-center bg-white border-2 border-gray-200 rounded-xl hover:border-primary-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center space-x-3">
                      {quizData.yearLevel ? (
                        <>
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full flex items-center justify-center">
                            <span className="text-lg font-bold text-primary-700">
                              {quizData.yearLevel.includes('Kindergarten') ? 'K' : quizData.yearLevel.split(' ')[1]}
                            </span>
                          </div>
                          <span className="text-lg font-semibold text-primary-700">
                            {quizData.yearLevel}
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-500">Select your child's year</span>
                      )}
                      <motion.div
                        animate={{ rotate: quizData.showYearDropdown ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-400 group-hover:text-primary-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.button>

                  {/* Custom dropdown menu */}
                                      <AnimatePresence>
                      {quizData.showYearDropdown && (
                        <>
                          {/* Mobile: Sexy modal-style dropdown */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden fixed inset-0 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setQuizData(prev => ({ ...prev, showYearDropdown: false }))}
                          >
                            <motion.div
                              initial={{ opacity: 0, scale: 0.7, y: 30 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.7, y: 30 }}
                              transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                              className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl w-full max-w-sm max-h-[85vh] overflow-hidden border border-gray-100"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {/* Sexy header */}
                              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 text-white relative overflow-hidden">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                  className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full"
                                />
                                <motion.div
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                  className="text-center"
                                >
                                  <div className="text-3xl mb-2">🎓</div>
                                  <h3 className="text-xl font-bold">Choose Your Year</h3>
                                  <p className="text-primary-100 text-sm mt-1">Select your child's current grade</p>
                                </motion.div>
                              </div>

                              {/* Sexy content */}
                              <div className="max-h-[70vh] overflow-y-auto p-2">
                                {(quizData.schoolLevel === 'primary' ? primaryYears : highSchoolYears).map((year, index) => (
                                  <motion.button
                    key={year}
                    type="button"
                                    onClick={() => {
                                      handleYearLevel(year);
                                      setQuizData(prev => ({ ...prev, showYearDropdown: false }));
                                    }}
                                    className="w-full p-4 text-left hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-all duration-300 flex items-center space-x-4 group rounded-2xl m-2 hover:shadow-lg hover:scale-[1.02] border border-transparent hover:border-primary-200"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.08, type: "spring", duration: 0.6 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <motion.div 
                                      className="w-14 h-14 bg-gradient-to-br from-primary-200 to-primary-300 rounded-2xl flex items-center justify-center group-hover:from-primary-300 group-hover:to-primary-400 transition-all duration-300 shadow-lg group-hover:shadow-xl"
                                      whileHover={{ rotate: 5, scale: 1.1 }}
                                    >
                                      <span className="text-xl font-bold text-primary-700 group-hover:text-primary-800">
                                        {year.includes('Kindergarten') ? 'K' : year.split(' ')[1]}
                                      </span>
                                    </motion.div>
                                    <div className="flex-1">
                                      <span className="text-lg font-semibold text-gray-800 group-hover:text-primary-700 transition-colors duration-300">
                                        {year}
                                      </span>
                                      <div className="text-sm text-gray-500 group-hover:text-primary-600 transition-colors duration-300">
                                        {quizData.schoolLevel === 'primary' ? (
                                          year.includes('Kindergarten') ? 'Early learning foundation' : 
                                          year.includes('Year 1') ? 'Beginning primary school' :
                                          year.includes('Year 2') ? 'Building foundational skills' :
                                          year.includes('Year 3') ? 'Developing core competencies' :
                                          year.includes('Year 4') ? 'Strengthening academic skills' :
                                          year.includes('Year 5') ? 'Preparing for upper primary' :
                                          year.includes('Year 6') ? 'Preparing for high school' : 'Primary school year'
                                        ) : (
                                          year.includes('Year 7') ? 'First year of high school' :
                                          year.includes('Year 8') ? 'Building high school foundation' :
                                          year.includes('Year 9') ? 'Developing study skills' :
                                          year.includes('Year 10') ? 'Preparing for senior years' :
                                          year.includes('Year 11') ? 'Senior high school year' :
                                          year.includes('Year 12') ? 'Final year of school' : 'High school year'
                                        )}
                                      </div>
                                    </div>
                                    <motion.div
                                      initial={{ opacity: 0, x: 10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.08 + 0.2 }}
                                      className="text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </motion.div>
                                  </motion.button>
                                ))}
                              </div>

                              {/* Sexy footer */}
                              <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
                                <p className="text-center text-sm text-gray-500">
                                  Tap outside to close
                                </p>
                              </div>
                            </motion.div>
                          </motion.div>

                          {/* Desktop: Traditional dropdown */}
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="hidden md:block absolute top-full left-0 right-0 mt-2 bg-white border-2 border-primary-200 rounded-xl shadow-xl z-50 overflow-hidden"
                          >
                            <div className="max-h-60 overflow-y-auto">
                              {(quizData.schoolLevel === 'primary' ? primaryYears : highSchoolYears).map((year, index) => (
                                <motion.button
                                  key={year}
                                  type="button"
                                  onClick={() => {
                                    handleYearLevel(year);
                                    setQuizData(prev => ({ ...prev, showYearDropdown: false }));
                                  }}
                                  className="w-full px-6 py-4 text-left hover:bg-primary-50 transition-all duration-200 flex items-center space-x-3 group"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  whileHover={{ backgroundColor: "#f0f9ff" }}
                                >
                                  <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-200">
                                    <span className="text-sm font-bold text-primary-700">
                                      {year.includes('Kindergarten') ? 'K' : year.split(' ')[1]}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <span className="text-lg font-medium text-gray-800 group-hover:text-primary-700 transition-colors duration-200">
                                      {year}
                                    </span>
                                    <div className="text-sm text-gray-500 group-hover:text-primary-600 transition-colors duration-200">
                                      {quizData.schoolLevel === 'primary' ? (
                                        year.includes('Kindergarten') ? 'Early learning foundation' : 
                                        year.includes('Year 1') ? 'Beginning primary school' :
                                        year.includes('Year 2') ? 'Building foundational skills' :
                                        year.includes('Year 3') ? 'Developing core competencies' :
                                        year.includes('Year 4') ? 'Strengthening academic skills' :
                                        year.includes('Year 5') ? 'Preparing for upper primary' :
                                        year.includes('Year 6') ? 'Preparing for high school' : 'Primary school year'
                                      ) : (
                                        year.includes('Year 7') ? 'First year of high school' :
                                        year.includes('Year 8') ? 'Building high school foundation' :
                                        year.includes('Year 9') ? 'Developing study skills' :
                                        year.includes('Year 10') ? 'Preparing for senior years' :
                                        year.includes('Year 11') ? 'Senior high school year' :
                                        year.includes('Year 12') ? 'Final year of school' : 'High school year'
                                      )}
                                    </div>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                </motion.div>
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
              <div className="text-center space-y-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto"
                >
                  <span className="text-2xl md:text-3xl">📚</span>
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Which subject needs improvement?</h2>
                <p className="text-base md:text-lg text-gray-600">Choose the subject your child needs the most help with</p>
              </div>
              
              <div className="md:hidden">
                {/* Mobile: Horizontal scrolling carousel */}
                <div className="relative">
                  <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4">
                    {subjects.map((subject, index) => (
                      <motion.div
                    key={subject}
                        className="flex-shrink-0 w-[280px] snap-center"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <motion.button
                    type="button"
                    onClick={() => handleSubjectToggle(subject)}
                          className={`group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border-2 rounded-xl p-6 hover:border-primary-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105 w-full h-[200px] flex flex-col items-center justify-center ${
                            quizData.subjects.includes(subject) 
                              ? 'border-primary-500 bg-primary-50 shadow-lg shadow-primary-500/20' 
                              : 'border-gray-200'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-300 ${
                            quizData.subjects.includes(subject)
                              ? 'from-primary-500/20 to-primary-600/20 opacity-100'
                              : 'from-primary-500/10 to-primary-600/10 opacity-0 group-hover:opacity-100'
                          }`}></div>
                          <div className="relative z-10 text-center">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                              quizData.subjects.includes(subject)
                                ? 'bg-gradient-to-br from-primary-200 to-primary-300 scale-110'
                                : 'bg-gradient-to-br from-primary-100 to-primary-200 group-hover:from-primary-200 group-hover:to-primary-300'
                            }`}>
                              <span className="text-3xl">
                      {subject === 'Mathematics' ? '📐' : subject === 'English' ? '📚' : '🎯'}
                    </span>
                            </div>
                            <h3 className={`text-xl font-bold transition-colors duration-300 mb-2 ${
                              quizData.subjects.includes(subject)
                                ? 'text-primary-700'
                                : 'text-gray-800 group-hover:text-primary-700'
                            }`}>
                              {subject}
                            </h3>
                            <p className={`text-sm transition-colors duration-300 ${
                              quizData.subjects.includes(subject)
                                ? 'text-primary-600'
                                : 'text-gray-600 group-hover:text-primary-600'
                            }`}>
                              {subject === 'Mathematics' ? 'Numbers, equations & problem solving' : 
                               subject === 'English' ? 'Reading, writing & communication' : 
                               'Science, history & other subjects'}
                            </p>
                          </div>
                          {quizData.subjects.includes(subject) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-3 right-3 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                            >
                              <span className="text-white text-sm">✓</span>
                            </motion.div>
                          )}
                        </motion.button>
                      </motion.div>
                ))}
              </div>
                  
                  {/* Scroll indicator */}
                  <div className="flex justify-center mt-4 space-x-2">
                    {subjects.map((_, index) => (
                      <div
                        key={index}
                        className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop: Original grid layout */}
              <div className="hidden md:grid md:grid-cols-3 md:gap-4">
                {subjects.map((subject, index) => (
                  <motion.button
                    key={subject}
                type="button"
                    onClick={() => handleSubjectToggle(subject)}
                    className={`group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border-2 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 w-full ${
                      quizData.subjects.includes(subject) 
                        ? 'border-primary-500 bg-primary-50 shadow-lg shadow-primary-500/20' 
                        : 'border-gray-200 hover:border-primary-300 hover:shadow-lg'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-300 ${
                      quizData.subjects.includes(subject)
                        ? 'from-primary-500/20 to-primary-600/20 opacity-100'
                        : 'from-primary-500/10 to-primary-600/10 opacity-0 group-hover:opacity-100'
                    }`}></div>
                    <div className="relative z-10 text-center">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${
                        quizData.subjects.includes(subject)
                          ? 'bg-gradient-to-br from-primary-200 to-primary-300 scale-110'
                          : 'bg-gradient-to-br from-primary-100 to-primary-200 group-hover:from-primary-200 group-hover:to-primary-300'
                      }`}>
                        <span className="text-3xl">
                      {subject === 'Mathematics' ? '📐' : subject === 'English' ? '📚' : '🎯'}
                    </span>
                      </div>
                      <h3 className={`text-xl font-bold transition-colors duration-300 mb-2 ${
                        quizData.subjects.includes(subject)
                          ? 'text-primary-700'
                          : 'text-gray-800 group-hover:text-primary-700'
                      }`}>
                        {subject}
                      </h3>
                      <p className={`text-base transition-colors duration-300 ${
                        quizData.subjects.includes(subject)
                          ? 'text-primary-600'
                          : 'text-gray-600 group-hover:text-primary-600'
                      }`}>
                        {subject === 'Mathematics' ? 'Numbers, equations & problem solving' : 
                         subject === 'English' ? 'Reading, writing & communication' : 
                         'Science, history & other subjects'}
                      </p>
                    </div>
                    {quizData.subjects.includes(subject) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                      >
                        <span className="text-white text-sm">✓</span>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
              
              {/* Continue button removed - auto-advances after selection */}
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
              <div className="text-center space-y-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto"
                >
                  <span className="text-2xl md:text-3xl">🎯</span>
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Has your child done private tutoring before?</h2>
                <p className="text-base md:text-lg text-gray-600">This helps us understand your child's learning journey</p>
              </div>
              
              <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                <motion.button
                  type="button"
                  onClick={() => handlePreviousTutoring(true)}
                  className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-primary-300 hover:shadow-lg md:hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-300">
                      <span className="text-2xl md:text-3xl">✅</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-primary-700 transition-colors duration-300 mb-1 md:mb-2">
                      Yes
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 group-hover:text-primary-600 transition-colors duration-300">
                      They've had tutoring experience
                    </p>
                  </div>
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={() => handlePreviousTutoring(false)}
                  className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-primary-300 hover:shadow-lg md:hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-300">
                      <span className="text-2xl md:text-3xl">❌</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-primary-700 transition-colors duration-300 mb-1 md:mb-2">
                      No
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 group-hover:text-primary-600 transition-colors duration-300">
                      This would be their first time
                    </p>
              </div>
                </motion.button>
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
              <div className="text-center space-y-6">
                {/* Animated success icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
                  className="relative"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="text-4xl md:text-5xl">🎉</span>
                    </motion.div>
              </div>
                  
                  {/* Animated rings */}
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 border-2 border-green-300 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 border-2 border-green-400 rounded-full"
                  />
                </motion.div>

                {/* Main heading with animation */}
                <div className="space-y-4">
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
                    className="text-3xl md:text-4xl font-bold text-gray-900"
                  >
                    Congratulations! 🎊
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, type: "spring", duration: 0.8 }}
                    className="text-lg md:text-xl text-gray-600 max-w-md mx-auto leading-relaxed"
                  >
                    Your child qualifies for a free, no-obligation trial lesson!
                  </motion.p>
                </div>

                {/* Animated benefits list */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, type: "spring", duration: 0.8 }}
                  className="space-y-3 max-w-sm mx-auto"
                >
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center justify-center space-x-3 text-green-600 font-medium"
                  >
                    <span className="text-xl">✨</span>
                    <span>Personalized learning plan</span>
                  </motion.div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="flex items-center justify-center space-x-3 text-green-600 font-medium"
                  >
                    <span className="text-xl">🎯</span>
                    <span>Expert qualified tutors</span>
                  </motion.div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="flex items-center justify-center space-x-3 text-green-600 font-medium"
                  >
                    <span className="text-xl">📈</span>
                    <span>Proven results</span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Enhanced CTA button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, type: "spring", duration: 0.8 }}
              >
                <motion.button
                  type="button"
                  onClick={handleClaimTrial}
                  className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg md:text-xl rounded-xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center space-x-2 md:space-x-3">
                    <span className="text-base md:text-xl">Claim My Free Trial Lesson</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🚀
                    </motion.span>
                  </div>
                </motion.button>
              </motion.div>

              {/* Gradient background animation */}
              <motion.div
                animate={{ 
                  background: [
                    "linear-gradient(45deg, #f0fdf4, #dcfce7)",
                    "linear-gradient(45deg, #dcfce7, #f0fdf4)",
                    "linear-gradient(45deg, #f0fdf4, #dcfce7)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-2xl opacity-30 -z-10"
              />
            </motion.div>
          )}

          {step === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto"
                >
                  <span className="text-3xl">👤</span>
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900">What's your first name?</h2>
                <p className="text-gray-600 text-lg">Let's get to know you better!</p>
              </div>
              <div className="space-y-6">
                <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      value={quizData.firstName}
                      onChange={handleInputChange}
                    className="w-full px-6 py-4 text-xl text-center bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 placeholder-gray-400"
                    placeholder="Enter your first name"
                      required
                    autoFocus
                    />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                <motion.button
                  type="button"
                  onClick={handleFirstName}
                  className="w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-lg rounded-xl hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={!quizData.firstName.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 8 && (
            <motion.div
              key="step8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto"
                >
                  <span className="text-3xl">👤</span>
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900">What's your last name?</h2>
                <p className="text-gray-600 text-lg">Almost there!</p>
                  </div>
              <div className="space-y-6">
                <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      value={quizData.lastName}
                      onChange={handleInputChange}
                    className="w-full px-6 py-4 text-xl text-center bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 placeholder-gray-400"
                    placeholder="Enter your last name"
                      required
                    autoFocus
                    />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                <motion.button
                  type="button"
                  onClick={handleLastName}
                  className="w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-lg rounded-xl hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={!quizData.lastName.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>
                </div>
            </motion.div>
          )}

          {step === 9 && (
            <motion.div
              key="step9"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto"
                >
                  <span className="text-3xl">📍</span>
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900">What's your postcode?</h2>
                <p className="text-gray-600 text-lg">We'll find tutors near you!</p>
              </div>
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    name="postcode"
                    value={quizData.postcode}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 text-xl text-center bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 placeholder-gray-400"
                    placeholder="Enter your postcode"
                    required
                    autoFocus
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <motion.button
                  type="button"
                  onClick={handlePostcode}
                  className="w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-lg rounded-xl hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={!quizData.postcode.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 10 && (
            <motion.div
              key="step10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto"
                >
                  <span className="text-3xl">📧</span>
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900">What's your email address?</h2>
                <p className="text-gray-600 text-lg">We'll send you important updates!</p>
              </div>
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={quizData.email}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 text-xl text-center bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 placeholder-gray-400"
                    placeholder="Enter your email"
                    required
                    autoFocus
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <motion.button
                  type="button"
                  onClick={handleEmail}
                  className="w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-lg rounded-xl hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={!quizData.email.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>
                  </div>
            </motion.div>
          )}

          {step === 11 && (
            <motion.div
              key="step11"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto"
                >
                  <span className="text-3xl">📞</span>
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900">What's your phone number?</h2>
                <p className="text-gray-600 text-lg">We'll call to schedule your trial!</p>
                  </div>
              <div className="space-y-6">
                <div className="relative">
                    <input
                    type="tel"
                    name="phone"
                    value={quizData.phone}
                      onChange={handleInputChange}
                    className="w-full px-6 py-4 text-xl text-center bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 placeholder-gray-400"
                    placeholder="Enter your phone number"
                      required
                    autoFocus
                    />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                <motion.button
                  type="button"
                  onClick={handlePhone}
                  className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg rounded-xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={!quizData.phone.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Complete My Trial Registration
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
} 