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
    "Zipline": {
      jobTitle: "Avionics EE Intern",
      duration: "May 2025 - August 2025",
      desc: [
        "Combined LTE and ADS-B/UAT antennas (4 → 2 per aircraft), removing 2 harnesses and 1 manufacturing step; saved 15 g and $10 per aircraft with no loss in LTE throughput or ADS-B/UAT sensitivity.",
        "Shipped RF receiver toolkit: ADS-B (1090) & UAT (978) decoders + lightweight UAT front end; automated sensitivity/coexistence sweeps; validated link budgets and ~5 km coverage.",
        "Built antenna gain visualization tool; automated turntable and generated 3D antenna gain plots; drove final antenna placement."
      ],
    },
    "MERO": {
      jobTitle: "Avionics Lead",
      duration: "September 2025 - Present",
      desc: [
        "Lead cross-functional avionics team of 10 students designing integrated flight control, telemetry, and power systems for high-powered rocket competing in Spaceport America Cup.",
        "Architected layered avionics stack: sensor drivers (IMU/GNSS/altimeter/thermocouples) → state estimation & data fusion (attitude/altitude estimators) → flight control (GNC) → actuator interfaces (linear actuators, stepper motors, EDF roll control, solenoids).",
        "Designed 4 custom PCBs in Altium: flight computer (Teensy 4.1-based), sensor board (LSM6DSO32TR IMU, LIS3MDL mag, MS5607 altimeter, u-blox NEO M9 GNSS), actuator driver board (DRV8876 H-bridges, stepper drivers, ESCs), and telemetry board (LoRa RFM95W for uplink/downlink + microSD logging at 50k samples/sec).",
        "Implemented real-time sensor fusion and flight data logging; integrated LoRa telemetry with ground station for live mission monitoring and external data analysis."
      ],
    },
    "Z Lab": {
      jobTitle: "Swarm Intelligence Robotics Chassis Team Lead",
      duration: "January 2024 - Present",
      desc: [
        "Lead chassis team in integrating LiDAR, depth camera, and IMU for SLAM and real-time navigation using ROS.",
        "Developed sensor fusion algorithms in Python, optimizing environmental awareness and autonomous decision-making.",
        "Designed power distribution and control systems, ensuring stable operation of high-power motors and embedded systems.",
        "Managed sensor calibration, data acquisition, and cross-tean collaboration for to deliver standardized components."
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
    "Michigan Blockchain Club": {
      jobTitle: "Executive Board Member & Investment Team Member",
      duration: "August 2023 - Present",
      desc: [
        "Lead recruitment initiatives, increasing active membership to over 100 students.",
        "Manage a 35 ETH investment portfolio, overseeing strategic positions.",
        "Organize the Midwest Blockchain Conference — sourced speakers, sponsors, and coordinated with 35+ student organizations and 16 companies; achieved over 1,000 signups, making it one of the largest student-run events nationwide.",
        "Source developer projects, hackathons, and events to enhance club offerings and member engagement."
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
            className={`px-4 py-2 font-tech text-sm border ${selectedCategory === category
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
              className={`${isMobile
                ? 'px-2 py-1 min-w-[60px]'
                : 'px-4 py-2 min-w-[200px]'
                } text-left font-tech text-sm border ${selectedJob === job
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