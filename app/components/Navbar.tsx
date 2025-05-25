'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CommandLineIcon } from '@heroicons/react/24/outline';
import TypewriterText from './TypewriterText';
import Link from 'next/link';

const Navbar = () => {
  const navItems = [
    { label: 'ABOUT', href: '#about' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONTACT', href: '/socials' }
  ];

  return (
    <>
      {/* Terminal Header */}
      <div className="fixed top-0 left-0 w-full h-12 bg-tech-gray/80 backdrop-blur-sm border-b border-neon-blue/20 flex items-center px-4 font-tech z-50">
        <div className="flex items-center gap-2 text-neon-blue">
          <CommandLineIcon className="w-4 h-4" />
          <span className="text-matrix-green">~</span>
          <span>/</span>
          <TypewriterText text="cd rkaelle/portfolio" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full py-6 px-8 flex justify-between items-center z-40 bg-cyber-black/50 backdrop-blur-sm" style={{ top: '3rem' }}>
        <motion.div 
          className="text-2xl font-cyber tracking-wider hidden md:block"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-neon-blue">RK</span>
          <span className="text-matrix-green/50">/</span>
          <span className="text-cyber-white/30">sys</span>
        </motion.div>
        <div className="flex gap-8 text-sm tracking-widest font-tech">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="hover:text-neon-blue transition-colors"
              whileHover={{ y: -2 }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar; 