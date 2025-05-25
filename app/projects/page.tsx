'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderOpenIcon, ArrowLeftIcon, ArrowRightIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import TypewriterText from '@/app/components/TypewriterText';

interface SpotlightProject {
  title: string;
  desc: string;
  techStack: string;
  link: string;
  open: string;
  image: string;
}

interface Project {
  desc: string;
  techStack: string;
  link: string;
  open: string;
}

// Define spotlight projects
const spotlightProjects: Record<string, SpotlightProject> = {
  "Smart Eink Photo Display": {
    title: "Smart e-Paper Photo Display",
    desc: "A Python-based smart photo frame for managing and displaying images and real-time clocks on an e-Paper display.",
    techStack: "Python, Firebase Firestore, Firebase Storage, 3D Printing, CAD",
    link: "https://github.com/rkaelle/einkphotoalbumn",
    open: "https://www.thingiverse.com/thing:6891829",
    image: "/assets/eink.JPG"
  },
  "Rocket Sensor": {
    title: "Rocket Sensor Development",
    desc: "Developed a sophisticated sensor system for a model rocket to investigate atmospheric conditions and flight dynamics.",
    techStack: "PCB, Sensors, Data Analysis",
    link: "",
    open: "",
    image: "/assets/rocket.jpeg"
  },
  "Algorithmic Trading": {
    title: "Algorithmic Trading Portfolio",
    desc: "A series of programs built from YFinance Data, Quantconnect Lean Engine, and Pandas.",
    techStack: "Python, QuantConnect, Pandas, Numpy, Matplotlib",
    link: "https://github.com/rkaelle/algo-trading-strategies",
    open: "https://www.udemy.com/course/python-for-finance-and-algorithmic-trading-with-quantconnect/",
    image: "/assets/gauges.png"
  },
  "AI Chessboard": {
    title: "AI Magnetic Chessboard",
    desc: "The automated chess board is composed of an XY table with an electromagnet on the moving trolley.",
    techStack: "C#, Arduino, 3D Printing, Micro Max chess",
    link: "https://github.com/slakh96/no-mans-land",
    open: "",
    image: "/assets/chessboard.png"
  },
  "Sentiment Analysis Bot": {
    title: "Sentiment Analysis Bot",
    desc: "Performs sentiment analysis on Reddit posts and comments to gauge public opinion on various stocks.",
    techStack: "Python, NLP, Plotly",
    link: "https://github.com/rkaelle/sentiment-analysis-bot",
    open: "",
    image: "/assets/gauges.png"
  },
  "FPV Drone": {
    title: "FPV Drone(s)",
    desc: "Two FPV racing drones capable of speeds up to 85mph. Built piece by piece.",
    techStack: "Soldering, wiring, Linux CLI",
    link: "",
    open: "",
    image: "/assets/drones.jpg"
  },
  "Ham Radio Station": {
    title: "Amateur Radio Station",
    desc: "G90 High Frequency Radio setup + Yaesu FT70 handheld. Able to reach 2500mi+ using dipole antenna.",
    techStack: "RF, soldering, wiring",
    link: "",
    open: "",
    image: "/assets/radio.jpg"
  }
};

// Define all projects
const projects: Record<string, Project> = {
  "WiBit": {
    desc: "A decentralized Wi-Fi network that rewards users for reducing bandwidth during congestion periods using WiBit tokens. Users can monitor network usage and manage their Solana wallet directly from the platform.",
    techStack: "React.js, Python, Solana, Firestore, Three.js",
    link: "",
    open: "https://wibit.online"
  },
  "Clustered Raspberry Pi": {
    desc: "Includes NAS file storage, personal homelab, and micro supercomputer.",
    techStack: "Raspian, Clustering, Microcomputers",
    link: "",
    open: ""
  },
  "Smart Eink Photo Display": {
    desc: "A Python-based smart photo frame for managing and displaying images and real-time clocks on an e-Paper display.",
    techStack: "Python, Firebase Firestore, Firebase Storage, 3D Printing, CAD",
    link: "https://github.com/rkaelle/einkphotoalbumn",
    open: "https://www.thingiverse.com/thing:6891829",
  },
  "Stock Trading Simulator": {
    desc: "A C++ simulator for multi-stock trading and order matching, providing real-time statistics and optimized performance using priority queues, hash maps, and binary search trees.",
    techStack: "C++, Priority Queues, Hash Maps, Binary Search Trees, Algorithms",
    link: "https://github.com/rkaelle/stock-trading-simulator",
    open: "",
  },
  "ML Text Classifier": {
    desc: "A C++ program leveraging machine learning and NLP with a Naive Bayes algorithm to classify university forum posts. Includes CSV parsing, tokenization, log-likelihood computation, and scalable data structure optimizations.",
    techStack: "C++, Naive Bayes, Machine Learning, NLP",
    link: "",
    open: "https://github.com/rkaelle/machine-learning-text-classifier"
  },
  "Pipelined Assembly Datapath Simulator": {
    desc: "A C-based simulator for a 5-stage assembly code pipeline, integrating data forwarding, branch prediction, and hazard resolution. Simulates all pipeline stages and optimizes control and memory operations.",
    techStack: "C, Assembly, Branch Prediction, Pipeline Simulation",
    link: "https://github.com/rkaelle/assembly-pipeline-simulator",
    open: ""
  },
  "Verilog Four Function Calculator": {
    desc: "A Verilog-based calculator supporting addition, subtraction, multiplication, and division with a finite state machine and Booth's algorithm. Optimized with multiplexers and tested using ModelSim simulations.",
    techStack: "Verilog, FSM, Booth's Algorithm, ModelSim",
    link: "",
    open: "https://github.com/rkaelle/four-function-calculator"
  },
  "GreekLink": {
    desc: "A full-stack web application for enhancing fraternity and sorority news. Features real-time search, secure Firebase Firestore backend, authentication, and scraped forum data with 35,000+ posts.",
    techStack: "Next.js, React, TypeScript, Firebase Firestore, Python",
    link: "https://github.com/rkaelle/greeklink",
    open: "https://greeklink.xyz"
  },
  "RK Coin": {
    desc: "A cryptocurrency under my name, derived from Bitcoin and Litecoin.",
    techStack: "C++, Python, Solidity, Blockchain",
    link: "https://github.com/rkaelle/rk-coin",
    open: ""
  },
  "RyansDailyNews": {
    desc: "A Python script that fetches the latest events, reflections, skills, and science facts to send personalized daily emails to subscribers.",
    techStack: "Python, API, SMTP, Firebase",
    link: "https://github.com/rkaelle/ryansdailynews",
    open: "https://rkaelle.com/manage"
  },
  "Raspberry Pi Flight Tracker": {
    desc: "Using intercepted Software Defined Radio waves, tracks planes up to 200 miles away.",
    techStack: "RTL-SDR, Python",
    link: "",
    open: ""
  },
  "Skills Tracker": {
    desc: "React web application with Firebase firestore data hosting that allows users to log their skills and accomplishments.",
    techStack: "React, Firebase, Firestore",
    link: "https://github.com/rkaelle/skills-tracker",
    open: "https://stats-tracker-tau.vercel.app/"
  },
  "This site! (My Portfolio)": {
    desc: "Built using ReactJS. This site serves as a place to show off my current updates.",
    techStack: "ReactJS, MaterialUI, ThreeJs, Firebase",
    link: "https://github.com/rkaelle/portfolio",
    open: "https://rkaelle.com"
  },
  "RK chat": {
    desc: "A Python (Flask) based web app intended to be hosted on a laptop.",
    techStack: "Python, JavaScript, CSS, HTML",
    link: "https://github.com/rkaelle/rk-chatroom",
    open: ""
  },
  "Autonomous Quadcopter": {
    desc: "Able to respond accordingly given GPS input. Uses camera, gyroscope, and accelerometer to determine best route.",
    techStack: "ArduPilot, Drones, CLI",
    link: "",
    open: ""
  }
};

export default function ProjectsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const spotlightKeys = Object.keys(spotlightProjects);
  const projectKeys = Object.keys(projects);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % spotlightKeys.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + spotlightKeys.length) % spotlightKeys.length);
  };

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-white">
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

      <main className="min-h-screen bg-cyber-black text-cyber-white overflow-x-hidden relative">
        {/* Background Grid */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(76,86,106,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(76,86,106,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_60%,transparent_100%)]" />

        {/* Featured Projects Carousel */}
        <section className="relative w-full h-[70vh] overflow-hidden">
          <div 
            className="flex transition-transform duration-500 h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {spotlightKeys.map((key, i) => (
              <div key={key} className="w-full h-full flex-shrink-0 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/50 to-transparent z-10" />
                <Image
                  src={spotlightProjects[key].image}
                  alt={spotlightProjects[key].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-cyber mb-4">{spotlightProjects[key].title}</h2>
                    <p className="text-cyber-white/80 text-lg mb-4">{spotlightProjects[key].desc}</p>
                    <p className="text-neon-blue font-tech mb-6">{spotlightProjects[key].techStack}</p>
                    <div className="flex gap-4">
                      {spotlightProjects[key].link && (
                        <a 
                          href={spotlightProjects[key].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-4 bg-neon-blue/10 border border-neon-blue/30 rounded-sm text-neon-blue font-tech hover:bg-neon-blue/20 transition-colors"
                        >
                          View on GitHub
                        </a>
                      )}
                      {spotlightProjects[key].open && (
                        <a 
                          href={spotlightProjects[key].open}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-4 bg-matrix-green/10 border border-matrix-green/30 rounded-sm text-matrix-green font-tech hover:bg-matrix-green/20 transition-colors"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
            <button
              onClick={prevSlide}
              className="p-2 bg-cyber-black/50 border border-cyber-white/20 rounded-full hover:border-neon-blue transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {spotlightKeys.map((_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentSlide ? 'bg-neon-blue' : 'bg-cyber-white/30'
                  }`}
                  onClick={() => setCurrentSlide(i)}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="p-2 bg-cyber-black/50 border border-cyber-white/20 rounded-full hover:border-neon-blue transition-colors"
            >
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* All Projects Grid */}
        <section className="px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-cyber text-matrix-green mb-12">/ all projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectKeys.map((key) => (
                <motion.div
                  key={key}
                  className="bg-nord-polar-2/30 border border-neon-blue/10 rounded-sm p-6 hover:border-neon-blue/30 transition-colors"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <FolderOpenIcon className="w-8 h-8 text-matrix-green" />
                    <div className="flex gap-4">
                      {projects[key].link && (
                        <a 
                          href={projects[key].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neon-blue hover:text-neon-blue/80 px-2 py-1 cursor-pointer"
                        >
                          GitHub
                        </a>
                      )}
                      {projects[key].open && (
                        <a 
                          href={projects[key].open}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-matrix-green hover:text-matrix-green/80 px-2 py-1 cursor-pointer"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-cyber text-cyber-white mb-3">{key}</h3>
                  <p className="text-cyber-white/70 mb-4 text-sm leading-relaxed">{projects[key].desc}</p>
                  <p className="text-neon-blue/60 font-tech text-sm">{projects[key].techStack}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 