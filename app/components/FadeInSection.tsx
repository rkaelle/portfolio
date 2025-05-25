'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: string;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = '0ms' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: parseInt(delay) / 1000,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection; 