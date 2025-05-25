'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const generateRandomChar = () => {
  return chars[Math.floor(Math.random() * chars.length)];
};

const SpinningText = ({ finalText, index }: { finalText: string; index: number }) => {
  const [currentText, setCurrentText] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    setCurrentText(finalText);
    if (finalText !== currentText) {
      setIsSpinning(true);
      let spinCount = 0;
      const maxSpins = 15; // Number of spins before settling
      
      const interval = setInterval(() => {
        spinCount++;
        setCurrentText(prev => {
          const newText = 'RK_' + Array(4)
            .fill(0)
            .map(() => generateRandomChar())
            .join('');
          
          if (spinCount >= maxSpins) {
            clearInterval(interval);
            setIsSpinning(false);
            return finalText;
          }
          return newText;
        });
      }, 50); // Speed of character changes

      return () => clearInterval(interval);
    }
  }, [finalText]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`font-tech text-sm ${
        isSpinning 
          ? index % 3 === 0 
            ? 'text-nord-aurora-1' 
            : index % 3 === 1
            ? 'text-nord-aurora-3'
            : 'text-nord-aurora-2'
          : 'text-nord-polar-4/70'
      }`}
    >
      <span>{currentText}</span>
    </motion.div>
  );
};

const CypherText = () => {
  const [mounted, setMounted] = useState(false);
  const [texts, setTexts] = useState<string[]>([]);

  // Initialize texts after component mounts
  useEffect(() => {
    setMounted(true);
    setTexts([
      'RK_' + Array(4).fill(0).map(() => generateRandomChar()).join(''),
      'RK_' + Array(4).fill(0).map(() => generateRandomChar()).join(''),
      'RK_' + Array(4).fill(0).map(() => generateRandomChar()).join('')
    ]);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 3);
      setTexts(prev => {
        const newTexts = [...prev];
        newTexts[randomIndex] = 'RK_' + Array(4)
          .fill(0)
          .map(() => generateRandomChar())
          .join('');
        return newTexts;
      });
    }, 2000); // Change one text every 2 seconds

    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="space-y-2">
      {texts.map((text, index) => (
        <SpinningText key={index} finalText={text} index={index} />
      ))}
    </div>
  );
};

export default CypherText; 