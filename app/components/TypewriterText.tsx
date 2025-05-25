'use client';

import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  prefix?: string;
  suffix?: string;
}

export default function TypewriterText({ text, prefix = '', suffix = '' }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [currentIndex, setCurrentIndex] = useState(text.length);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      setDisplayText('');
      setCurrentIndex(0);
    }
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, mounted]);

  return <span className="whitespace-nowrap -ml-2">{prefix}{displayText}{suffix}</span>;
} 