'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CommandLineIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import TypewriterText from '@/app/components/TypewriterText';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cyber-black text-cyber-white">
      {/* Terminal Header */}
      <div className="fixed top-0 left-0 w-full h-12 bg-tech-gray/80 backdrop-blur-sm border-b border-neon-blue/20 flex items-center px-4 font-tech z-50">
        <div className="flex items-center gap-2 text-neon-blue -ml-1">
          <CommandLineIcon className="w-4 h-4" />
          <span className="text-matrix-green">~</span>
          <span>/</span>
          <span>cd rkaelle/portfolio/</span>
          <TypewriterText text="404" prefix="" />
        </div>
      </div>

      {/* Return Home Button */}
      <Link 
        href="/"
        className="fixed top-16 left-8 py-2 px-4 bg-nord-polar-2/80 border border-neon-blue/30 rounded-sm text-neon-blue font-tech flex items-center gap-2 hover:bg-neon-blue/20 transition-colors z-50"
      >
        <ArrowLeftIcon className="w-4 h-4" /> Return Home
      </Link>

      <main className="min-h-screen flex items-center justify-center relative px-4 md:px-8">
        {/* Background Grid */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(76,86,106,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(76,86,106,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_60%,transparent_100%)]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8 max-w-2xl mx-auto"
        >
          <motion.h1 
            className="text-8xl font-cyber text-neon-blue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            404
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <p className="text-2xl font-cyber text-cyber-white/80">
              Page Not Found
            </p>
            <p className="text-cyber-white/60 font-tech">
              Sorry, I haven't made this page yet.
            </p>
            <p className="text-cyber-white/60 font-tech">
              But don't worry, you can find plenty of other things on my homepage.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {/* <Link 
              href="/"
              className="inline-block py-3 px-8 bg-neon-blue/10 border border-neon-blue/30 rounded-sm text-neon-blue font-tech hover:bg-neon-blue/20 transition-colors"
            >
              &lt;&lt; Back to homepage
            </Link> */}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
} 