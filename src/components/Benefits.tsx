'use client';

import { motion } from 'framer-motion';
import { AcademicCapIcon, BeakerIcon, ClockIcon } from '@heroicons/react/24/outline';

const benefits = [
  {
    icon: AcademicCapIcon,
    title: 'Expert Tutors',
    description: 'Learn from qualified teachers with years of experience',
  },
  {
    icon: BeakerIcon,
    title: 'Proven Methods',
    description: 'Research-based teaching techniques that get results',
  },
  {
    icon: ClockIcon,
    title: 'Flexible Schedule',
    description: 'Choose times that work best for your family',
  },
];

export default function Benefits() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md"
            >
              <benefit.icon className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 