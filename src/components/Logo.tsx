'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 60 }: LogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/logo.png"
        alt="Zeducate Logo"
        width={size}
        height={size}
        className="w-full h-full object-contain"
        priority
      />
    </motion.div>
  );
} 