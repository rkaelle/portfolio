'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FolderIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import FadeInSection from './FadeInSection';
import ExternalLinks from './ExternalLinks';
import Image from 'next/image';

const spotlightProjects = {
  "AI chessboard": {
    title: "AI magnetic chessboard",
    desc: "The automated chess board is composed of an XY table with an electromagnet on the moving trolley.",
    techStack: "C#, Arduino, 3D Printing, Micro Max chess",
    link: "https://github.com/slakh96/no-mans-land",
    open: "",
    image: "/assets/chessboard.png"
  },
  "Smart Eink Photo Display": {
    title: "Smart e-Paper Photo Display",
    desc: "A Python-based smart photo frame for managing and displaying images and real-time clocks on an e-Paper display.",
    techStack: "Python, Firebase Firestore, Firebase Storage, 3D Printing, CAD",
    link: "https://github.com/rkaelle/einkphotoalbumn",
    open: "https://www.thingiverse.com/thing:6891829",
    image: "/assets/eink.JPG"
  },
  "Sentiment Analysis Bot": {
    title: "Sentiment Analysis Bot",
    desc: "Sentiment analysis on Reddit posts and comments to gauge public opinion on various stocks.",
    techStack: "Chips, Wiring",
    link: "",
    open: "https://github.com/rkaelle/sentiment-analysis-bot",
    image: "/assets/gauges.png"
  },
  "Ham radio station": {
    title: "Amateur Radio Station",
    desc: "G90 High Frequency Radio setup + Yaesu FT70 handheld. Able to reach 2500mi+ using dipole antenna.",
    techStack: "RF, soldering, wiring",
    link: "",
    open: "",
    image: "/assets/radio.jpg"
  },
  "FPV drone": {
    title: "FPV drone(s)",
    desc: "Two fpv racing drones capable of speeds up to 85mph. Built piece by piece.",
    techStack: "Soldering, wiring, Linux CLI",
    link: "",
    open: "",
    image: "/assets/drones.jpg"
  },
  "Chatroom": {
    title: "Secure Chatroom",
    desc: "Flask-based real-time secure messaging app.",
    techStack: "Flask, Socket-IO, Ngrok",
    link: "",
    open: "https://github.com/rkaelle/rk-chatroom",
    image: "/assets/chatroom–screenshot.png"
  },
  "Rocket Sensor": {
    title: "Rocket Sensor Development",
    desc: "Developed a sophisticated sensor system for a model rocket to investigate atmospheric conditions and flight dynamics.",
    techStack: "PCB, Sensors, Data Analysis",
    link: "",
    open: "",
    image: "/assets/rocket.jpeg"
  }
};

const projects = {
  "WiBit": {
    desc: "A decentralized Wi-Fi network that rewards users for reducing bandwidth during congestion periods using WiBit tokens. Users can monitor network usage and manage their Solana wallet directly from the platform.",
    techStack: "React.js, Python, Solana, Firestore, Three.js",
    link: "",
    open: "https://wibit.online"
  },
  "GreekLink": {
    desc: "A full-stack web application for enhancing fraternity and sorority news. Features real-time search, secure Firebase Firestore backend, authentication, and scraped forum data with 35,000+ posts.",
    techStack: "Next.js, React, TypeScript, Firebase Firestore, Python",
    link: "https://github.com/rkaelle/greeklink",
    open: "https://greeklink.xyz"
  },
  "Sentiment Analysis Bot": {
    desc: "A Python-based tool that analyzes sentiment from Reddit posts and comments to gauge public opinion on various stocks. It leverages Natural Language Processing (NLP) techniques for sentiment scoring and visualizes insights using interactive gauges created with Plotly.",
    techStack: "Python, NLP, PRAW, NLTK, Matplotlib, Plotly",
    link: "https://github.com/rkaelle/sentiment-analysis-bot",
    open: ""
  },
  "Pipelined Assembly Datapath Simulator": {
    desc: "A C-based simulator for a 5-stage assembly code pipeline, integrating data forwarding, branch prediction, and hazard resolution. Simulates all pipeline stages and optimizes control and memory operations.",
    techStack: "C, Assembly, Branch Prediction, Pipeline Simulation",
    link: "https://github.com/rkaelle/assembly-pipeline-simulator",
    open: ""
  },
  "RyansDailyNews": {
    desc: "A Python script that fetches the latest events, reflections, skills, and science facts to send personalized daily emails to subscribers.",
    techStack: "Python, API, SMTP, Firebase",
    link: "https://github.com/rkaelle/ryansdailynews",
    open: "https://rkaelle.com/manage"
  },
  "View Full Portfolio": {
    desc: "",
    techStack: "",
    link: "",
    open: "/projects"
  }
};

const Projects = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const totalSlides = Object.keys(spotlightProjects).length;

  // Auto-rotate slides
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [totalSlides]);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="space-y-16">
      {/* Spotlight Projects Carousel */}
      <div className="relative h-[600px] w-full overflow-hidden rounded-lg border border-neon-blue/20 group">
        {Object.entries(spotlightProjects).map(([key, project], index) => (
          <motion.div
            key={key}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-full w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-2xl font-cyber text-neon-blue mb-2">{project.title}</h3>
                <p className="text-cyber-white/80 mb-4">{project.desc}</p>
                <p className="text-matrix-green font-tech text-sm mb-4">{project.techStack}</p>
                <ExternalLinks githubLink={project.link} openLink={project.open} />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Navigation Buttons */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          {currentSlide > 0 && (
            <motion.button
              onClick={goToPrevSlide}
              className="p-2 bg-cyber-black/50 backdrop-blur-sm border border-neon-blue/20 rounded-r-sm text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity ml-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </motion.button>
          )}
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          {currentSlide < totalSlides - 1 && (
            <motion.button
              onClick={goToNextSlide}
              className="p-2 bg-cyber-black/50 backdrop-blur-sm border border-neon-blue/20 rounded-l-sm text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity mr-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </motion.button>
          )}
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {Object.keys(spotlightProjects).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-neon-blue' : 'bg-cyber-white/30'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(projects).map(([key, project], index) => (
          <FadeInSection key={key} delay={`${index * 100}ms`}>
            {key === "View Full Portfolio" ? (
              <motion.a
                href={project.open}
                className="block p-6 border border-neon-blue/20 hover:border-neon-blue bg-cyber-black/50 backdrop-blur-sm transition-colors h-[280px] flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between text-neon-blue w-full">
                  <span className="font-cyber">View Full Portfolio</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </div>
              </motion.a>
            ) : (
              <motion.div
                className="p-6 border border-cyber-white/20 hover:border-neon-blue bg-cyber-black/50 backdrop-blur-sm transition-colors h-[320px] flex flex-col"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <FolderIcon className="w-8 h-8 text-matrix-green" />
                  <ExternalLinks githubLink={project.link} openLink={project.open} />
                </div>
                <h3 className="text-xl font-cyber text-neon-blue mb-2">{key}</h3>
                <p className="text-cyber-white/70 mb-4 text-sm line-clamp-4 flex-grow">{project.desc}</p>
                <p className="text-matrix-green font-tech text-xs mt-auto">{project.techStack}</p>
              </motion.div>
            )}
          </FadeInSection>
        ))}
      </div>
    </div>
  );
};

export default Projects; 