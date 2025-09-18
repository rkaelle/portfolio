'use client';

import React from 'react';
import { ArrowLeftIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import TypewriterText from '@/app/components/TypewriterText';
import Projects from '@/app/components/Projects';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#111319] text-cyber-white">
      {/* Terminal Header */}
      <div className="fixed top-0 left-0 w-full h-12 bg-tech-gray/80 backdrop-blur-sm border-b border-neon-blue/20 flex items-center px-4 font-tech z-50">
        <div className="flex items-center gap-2 text-neon-blue -ml-1">
          <CommandLineIcon className="w-4 h-4" />
          <span className="text-matrix-green">~</span>
          <span>/</span>
          <span>cd rkaelle/portfolio/</span>
          <TypewriterText text="projects" prefix="" />
        </div>
      </div>

      {/* Return Home Button */}
      <Link
        href="/"
        className="fixed top-16 left-8 py-2 px-4 bg-nord-polar-2/80 border border-neon-blue/30 rounded-sm text-neon-blue font-tech flex items-center gap-2 hover:bg-neon-blue/20 transition-colors z-50"
      >
        <ArrowLeftIcon className="w-4 h-4" /> Return Home
      </Link>

      <main className="min-h-screen bg-[#111319] text-cyber-white overflow-hidden relative">
        {/* Background Grid */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(76,86,106,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(76,86,106,0.15)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_60%,transparent_100%)]" />

        {/* Projects Section from Home with full functionality */}
        <section className="px-8 py-16 relative z-10">
          <div className="max-w-7xl mx-auto">
            <Projects showPortfolioLink={false} />
          </div>
        </section>
      </main>
    </div>
  );
}