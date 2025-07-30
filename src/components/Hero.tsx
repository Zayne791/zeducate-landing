'use client';

import { motion } from 'framer-motion';
import { ArrowDownIcon, StarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';

export default function Hero() {
  const scrollToForm = () => {
    const formSection = document.getElementById('quiz-section');
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
          
                     {/* Optimized countdown */}
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
             className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full font-bold text-lg mb-8 shadow-lg"
           >
             <motion.div
               animate={{ scale: [1, 1.1, 1] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
               className="w-3 h-3 bg-white rounded-full will-change-transform"
             />
             <span>🔥 Only 7 Spots Left This Week!</span>
             <motion.div
               animate={{ scale: [1, 1.1, 1] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
               className="w-3 h-3 bg-white rounded-full will-change-transform"
             />
           </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Transform Your Child's{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600">
              Academic Future
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Join thousands of parents who've unlocked their child's potential with our proven tutoring system.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl md:text-2xl font-semibold text-primary-600 mb-8"
          >
            95% of students improve within 4 weeks!
          </motion.p>

          {/* Social proof badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-4 mb-10"
          >
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
              <StarIcon className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-semibold text-gray-700">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-gray-700">1,000+ Students</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
              <span className="text-2xl">🏆</span>
              <span className="font-semibold text-gray-700">Award Winning</span>
            </div>
          </motion.div>

          {/* Quick CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-8"
          >
            <motion.button
              onClick={scrollToForm}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-bold text-xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Check My Eligibility</span>
              <ArrowDownIcon className="w-6 h-6 animate-bounce" />
            </motion.button>
          </motion.div>

          {/* Benefits grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized Learning</h3>
              <p className="text-gray-600">Tailored to your child's unique learning style and pace</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Proven Results</h3>
              <p className="text-gray-600">95% of students see improvement within just 4 weeks</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">👨‍🏫</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Tutors</h3>
              <p className="text-gray-600">Qualified teachers with proven track records</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="space-y-4"
          >
            <motion.button
              onClick={scrollToForm}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-2xl font-bold text-xl hover:from-primary-700 hover:to-secondary-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Check My Child's Eligibility Now</span>
              <ArrowDownIcon className="w-6 h-6 animate-bounce" />
            </motion.button>
            
            <p className="text-sm text-gray-500">
              ⚡ Takes only 30 seconds • 🎁 100% Free • 📞 No commitment required
            </p>
          </motion.div>
        </motion.div>

                  {/* Optimized background decoration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 3, 0]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-primary-100 to-purple-100 rounded-full blur-3xl opacity-30 will-change-transform"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, -3, 0]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-secondary-100 to-blue-100 rounded-full blur-3xl opacity-30 will-change-transform"
            />
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full blur-3xl will-change-transform"
            />
          </div>
      </div>
    </section>
  );
} 