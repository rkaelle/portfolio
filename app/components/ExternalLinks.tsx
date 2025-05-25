'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

interface ExternalLinksProps {
  githubLink?: string;
  openLink?: string;
}

const ExternalLinks: React.FC<ExternalLinksProps> = ({ githubLink, openLink }) => {
  return (
    <div className="flex gap-3">
      {githubLink && (
        <motion.a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyber-white/60 hover:text-neon-blue transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <CodeBracketIcon className="w-5 h-5" />
        </motion.a>
      )}
      {openLink && (
        <motion.a
          href={openLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyber-white/60 hover:text-matrix-green transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
        </motion.a>
      )}
    </div>
  );
};

export default ExternalLinks; 