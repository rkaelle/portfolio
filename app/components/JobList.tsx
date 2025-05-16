'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FadeInSection from './FadeInSection';

interface Job {
  jobTitle: string;
  duration: string;
  desc: (string | JSX.Element)[];
}

interface JobCategory {
  [key: string]: Job;
}

interface JobCategories {
  [key: string]: JobCategory;
}

const experienceItems: JobCategories = {
  "Technical": {
    "Z Lab": {
      jobTitle: "Swarm Intelligence Robotics Research",
      duration: "January 2024 - Present",
      desc: [
        "Designed servo and control systems with analog-to-digital feedback for real-time reactions and enhanced stability.",
        "Engineered PCBs (Altium) and wiring harnesses for accelerometers, ADCs, infrared sensors, and power distribution.",
        "Developed Python mobility algorithms using ROSS on Raspberry Pi, enabling wireless control and autonomous navigation.",
        "Led the controls team, designing algorithms and coordinating multidisciplinary efforts to deliver standardized components."
      ],
    },
    "JoinMe": {
      jobTitle: "Intern SWE",
      duration: "June 2023 - Present",
      desc: [
        "Interned at social media app intended to facilitate event creation and participation",
        "Brainstormed and prototyped user experience (UX) layouts",
        "Implemented Biking activity into app, Deploying React Native, Go, and SQL",
        "Leveraged enterprise team coding practices (ex. Scrum board), created \"Help Center\", \"Settings\", and \"Messages\" pages"
      ],
    },
    "HELIOS": {
      jobTitle: "Co-Founder",
      duration: "November 2023 - Present",
      desc: [
        "Co-founded the company, securing $15k+ in funding; designed and maintained the company website; filed a provisional patent (63/547158) for aviation technology.",
        "Researched advanced energy storage and propulsion technologies, optimized aircraft performance, and integrated advanced components into prototypes.",
        "Identified target markets (commercial airlines, private jets, cargo airlines), delivered stakeholder presentations, and crafted technical documentation and code."
      ],
    },
    "Ace Hardware": {
      jobTitle: "Sales Associate",
      duration: "May 2024 - August 2024",
      desc: [
        "Assisted customers with problem-solving, product recommendations, and prototyping solutions to meet their needs.",
        "Managed inventory, ensuring accurate stock levels and proficiency in using various specialty tools.",
        "Contributed to a team-oriented environment, achieving store sales targets and high customer satisfaction."
      ],
    },
  },
  "Crypto": {
    "Michigan Blockchain": {
      jobTitle: "Investment Team & Conference Planning Team",
      duration: "May 2024 - Present",
      desc: [
        <span key="pitch">Pitched and scaled a $10k investment to $90k, with a focus on $POKT. Check out one of my pitches <a href="https://firebasestorage.googleapis.com/v0/b/ryansdailynews-7df9d.appspot.com/o/photos%2FTrojan%20Telegram%20Bot%20Pitch.pdf?alt=media&token=1a48a8c3-a1b7-4bd6-ad46-cd0a68256dd2" target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">here</a>.</span>,
        "Orchestrated conference planning, including media outlet engagement, content creation, and speaker outreach.",
        "Led physical setup coordination, collaborating with Michigan Business + Tech on stage design, photography, and budgeting.",
        "Represented UMich Blockchain at MTNDao, fostering industry connections.",
      ],
    },
    "Renaud Partners": {
      jobTitle: "Research Analyst",
      duration: "May 2024 - June 2024",
      desc: [
        "Engaged in venture capital outreach and project sourcing at a crypto go-to-market firm (G2M).",
        "Developed and maintained a comprehensive resource database.",
        "Communicated with clients and collaborated with industry expert Geoff Renaud."
      ],
    },
  }
};

const JobList = () => {
  const [selectedCategory, setSelectedCategory] = useState("Technical");
  const [selectedJob, setSelectedJob] = useState(Object.keys(experienceItems["Technical"])[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedJob(Object.keys(experienceItems[category])[0]);
  };

  return (
    <div className="relative">
      {/* Category Tabs */}
      <div className={`flex ${isMobile ? 'justify-center' : 'justify-start'} gap-4 mb-8`}>
        {Object.keys(experienceItems).map((category) => (
          <motion.button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 font-tech text-sm border ${
              selectedCategory === category
                ? 'border-neon-blue text-neon-blue bg-neon-blue/10'
                : 'border-cyber-white/20 text-cyber-white/60 hover:border-neon-blue/50'
            } transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-8`}>
        {/* Job Navigation */}
        <div className={`${isMobile ? 'flex flex-wrap justify-center gap-2' : 'flex flex-col gap-4'}`}>
          {Object.keys(experienceItems[selectedCategory]).map((job, index) => (
            <motion.button
              key={job}
              onClick={() => setSelectedJob(job)}
              className={`${
                isMobile 
                  ? 'px-2 py-1 min-w-[60px]' 
                  : 'px-4 py-2 min-w-[200px]'
              } text-left font-tech text-sm border ${
                selectedJob === job
                  ? 'border-matrix-green text-matrix-green bg-matrix-green/10'
                  : 'border-cyber-white/20 text-cyber-white/60 hover:border-matrix-green/50'
              } transition-colors`}
              whileHover={{ x: isMobile ? 0 : 4 }}
            >
              <span className="text-matrix-green/50 mr-1">{`0${index + 1}.`}</span>
              <span className="hidden md:inline">{job}</span>
            </motion.button>
          ))}
        </div>

        {/* Job Details */}
        <motion.div
          key={`${selectedCategory}-${selectedJob}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 space-y-4"
        >
          <div className="space-y-1">
            <h3 className="text-xl font-cyber text-neon-blue">
              {experienceItems[selectedCategory][selectedJob].jobTitle}
            </h3>
            <p className="text-matrix-green font-tech">@ {selectedJob}</p>
            <p className="text-cyber-white/60 font-tech text-sm">
              {experienceItems[selectedCategory][selectedJob].duration}
            </p>
          </div>

          <ul className="space-y-4">
            {experienceItems[selectedCategory][selectedJob].desc.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-cyber-white/80"
              >
                <span className="text-matrix-green mt-1.5">▹</span>
                <span className="flex-1">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default JobList; 