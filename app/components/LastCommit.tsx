'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LastCommit = () => {
  const [commitInfo, setCommitInfo] = useState<{ repo: string; repoUrl: string; time: string; date: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastCommit = async () => {
      try {
        const response = await fetch('https://api.github.com/users/rkaelle/events');
        const events = await response.json();
        
        // Find the most recent PushEvent
        const lastPush = events.find((event: any) => event.type === 'PushEvent');
        
        if (lastPush) {
          const repo = lastPush.repo.name.split('/')[1];
          const repoUrl = `https://github.com/${lastPush.repo.name}`;
          const dateObj = new Date(lastPush.created_at);
          
          const time = dateObj.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          });

          const date = dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          });
          
          setCommitInfo({ repo, repoUrl, time, date });
        }
      } catch (error) {
        console.error('Error fetching commit info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLastCommit();
  }, []);

  if (loading) {
    return (
      <div className="text-cyber-white/40 font-tech text-sm">
        <span className="animate-pulse">Fetching latest commit...</span>
      </div>
    );
  }

  if (!commitInfo) {
    return null;
  }

  return (
    <motion.div 
      className="text-cyber-white/40 font-tech text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      Last commit → <a 
        href={commitInfo.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-matrix-green hover:text-matrix-green/80 transition-colors"
      >{commitInfo.repo}</a> @ <span className="text-neon-blue">{commitInfo.time}</span> <span className="text-cyber-white/40">on</span> <span className="text-matrix-green">{commitInfo.date}</span>
    </motion.div>
  );
};

export default LastCommit; 