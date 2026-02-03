'use client';

import { motion } from 'framer-motion';
import { ArrowDownIcon, StarIcon, CheckCircleIcon, UserGroupIcon, AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import Logo from '../components/Logo';

export default function ApplyHero() {
  const scrollToForm = () => {
    const formSection = document.getElementById('apply-section');
    if (formSection) {
      formSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };
  return (
    <section className="relative py-12 md:py-16 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10 py-8 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <Logo className="mx-auto mb-8" size={120} />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full font-bold text-lg mb-8 shadow-lg"
          >
            <span>✨ We're Hiring Expert Tutors!</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Join Our Team of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600">
              Elite Educators
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Empower the next generation and build a flexible, rewarding career with Zeducate.
          </motion.p>

          {/* VSL Video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="max-w-4xl mx-auto mb-12 aspect-video bg-gray-900 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white relative"
          >
            <iframe
              src="https://www.loom.com/embed/feaf6be047cd419181a9a7266d1bd9d0?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
              frameBorder="0"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </motion.div>

          {/* Perks badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-4 mb-10"
          >
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
              <BriefcaseIcon className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-gray-700">Flexible Hours</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
              <AcademicCapIcon className="w-5 h-5 text-purple-500" />
              <span className="font-semibold text-gray-700">Top Pay Rates</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
              <UserGroupIcon className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-gray-700">Great Community</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-8"
          >
            <motion.button
              onClick={scrollToForm}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:from-primary-700 hover:to-secondary-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Start Your Application</span>
              <ArrowDownIcon className="w-6 h-6 animate-bounce" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 3, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-primary-100 to-purple-100 rounded-full blur-3xl opacity-30"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, -3, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-secondary-100 to-blue-100 rounded-full blur-3xl opacity-30"
          />
        </div>
      </div>
    </section>
  );
}
