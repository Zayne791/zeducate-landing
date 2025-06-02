'use client';

import { motion } from 'framer-motion';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-white overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10 py-8 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Logo className="mx-auto mb-12" size={160} />
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Check Your Eligibility For A{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              Free Trial Lesson
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Answer our 30 second quiz to find out if your child qualifies for a free, no-obligation trial lesson!
          </p>
          <motion.a
            href="#quiz-section"
            className="inline-flex items-center gap-2 btn-primary group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Now
            <ArrowDownIcon className="w-5 h-5 animate-bounce" />
          </motion.a>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary-100 rounded-full blur-3xl opacity-30" />
        </div>
      </div>
    </section>
  );
} 