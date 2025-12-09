
'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';
import { ArrowRightIcon, CodeBracketIcon, CircleStackIcon, CommandLineIcon, EnvelopeIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
const JobList = dynamic(() => import('./components/JobList'), { ssr: false });
const Projects = dynamic(() => import('./components/Projects'), { ssr: false });
const LastCommit = dynamic(() => import('./components/LastCommit'), { ssr: false });
import CypherText from './components/CypherText';
import Footer from './components/Footer';
import HeroTypewriter from './components/HeroTypewriter';
import Navbar from './components/Navbar';
// LastCommit is loaded dynamically above

const techStack = [
  "Embedded Systems",
  "RF & Wireless",
  "Robotics, Drones & Autonomous Systems",
  "Hardware Design",
  "Distributed Systems & Backend Infra",
  "On-Chain Systems",
  "3D Printing"
];

const languageStack = [
  "C/C++",
  "Python",
  "Altium Designer",
  "Rust",
  "React + Next.js",
  "Verilog/VHDL",
  "Solidity",
];

const TypewriterText = ({ text, delay = 100 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span className="font-tech">
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse">▊</span>
      )}
    </span>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-neon-blue z-[100]"
      style={{ scaleX, transformOrigin: "0%" }}
    />
  );
};

const SideNav = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // Triggers when section is in middle of viewport
        threshold: 0
      }
    );

    // Observe all sections except contact
    ['home', 'about', 'experience', 'projects'].forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const sections = [
    { id: 'home', href: '#home' },
    { id: 'about', href: '#about' },
    { id: 'experience', href: '#experience' },
    { id: 'projects', href: '#projects' },
    { id: 'newsletter', href: '#newsletter', label: "Subscribe to Ryan's Daily News" }
  ];

  return (
    <motion.div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-8"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      {sections.map((section) => (
        <motion.a
          key={section.id}
          href={section.href}
          className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${activeSection === section.id
            ? 'bg-neon-blue border-neon-blue shadow-[0_0_10px_rgba(0,128,255,0.5)]'
            : 'border-cyber-white/30 hover:border-neon-blue'
            }`}
          whileHover={{ scale: 1.2 }}
          onClick={(e) => {
            e.preventDefault();
            if (section.id === 'newsletter') {
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
              });
            } else {
              document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          title={section.label}
        />
      ))}
    </motion.div>
  );
};

const Home = () => {
  const [showArrow, setShowArrow] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 50 && !fadingOut) {
        setFadingOut(true);
        setTimeout(() => {
          setShowArrow(false);
        }, 300);
      } else if (window.scrollY <= 50 && fadingOut) {
        setFadingOut(false);
        setShowArrow(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fadingOut]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-[#111319] text-cyber-white overflow-hidden relative">
      {/* Cyberpunk Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(76,86,106,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(76,86,106,0.15)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
      {isMounted && <ScrollProgress />}

      <Navbar />

      {isMounted && <SideNav />}

      {/* Rest of the content with adjusted padding for the terminal header */}
      <div className="pt-12 md:pt-24">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative px-4 md:px-8">
          <div className="max-w-4xl w-full mt-[-10vh] sm:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 md:space-y-8"
            >
              <div className="space-y-2">
                <motion.p
                  className="text-matrix-green font-tech text-xs md:text-sm tracking-[0.2em] uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  &lt; rk.system.init() /&gt;
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <HeroTypewriter />
                </motion.div>
                <motion.div
                  className="flex items-center gap-1 text-xs md:text-sm font-tech"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-cyber-white/40">&lt;</span>
                  <span className="text-neon-blue">id</span>
                  <span className="text-cyber-white/40">=</span>
                  <span className="text-matrix-green">"rk-001"</span>
                  <span className="text-cyber-white/40">/</span>
                  <span className="text-cyber-white/40">&gt;</span>
                </motion.div>
              </div>

              <motion.div
                className="pl-4 border-l-2 border-matrix-green/30 space-y-3 md:space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-lg md:text-xl text-cyber-white/80 font-tech">
                  Always learning, both in and out of school
                </p>
                <p className="text-cyber-white/60 max-w-2xl font-tech text-xs md:text-sm leading-relaxed">
                  From drones and blockchain to AI and RF devices, I dive headfirst into new tech.
                  This site is my digital lab — documenting my journey across hardware, software, and everything between.
                  Whether it's 3D-printing prototypes, crafting trading algorithms, or testing swarm robotics,
                  I'm driven by curiosity and a love for building what doesn't yet exist.
                </p>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
                  <motion.div
                    className="flex flex-col md:flex-row gap-2 md:gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="text-matrix-green font-tech text-xs md:text-sm">
                      <span className="text-cyber-white/40">status:</span> online
                    </div>
                    <div className="text-neon-blue font-tech text-xs md:text-sm">
                      <span className="text-cyber-white/40">location:</span> michigan
                    </div>
                    <div className="text-cyber-white/60 font-tech text-xs md:text-sm">
                      <span className="text-cyber-white/40">alias:</span> RK
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <LastCommit />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-1/4 right-8 mt-[-10vh] sm:mt-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <CypherText />
          </motion.div>

          {/* Scroll Indicator */}
          {showArrow && (
            <motion.div
              className={`scroll-indicator ${fadingOut ? 'fade-out' : ''}`}
              onClick={() => scrollToSection('about')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <div className="arrow" />
            </motion.div>
          )}
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center relative px-8 py-20">
          <div className="max-w-4xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-cyber text-matrix-green">/ about me</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-cyber-white/80">
                    Hey, I'm <span className="text-neon-blue">Ryan</span> — a incoming Junior at the University of Michigan who can't decide whether
                    I love solder fumes or compiler errors more. Most days you'll find me swapping chips on a PCB, teaching swarm robots new tricks, or writing Solidity that (hopefully) doesn't
                    set fire to a testnet.
                  </p>

                  <p className="text-cyber-white/80">
                    I hang out with the <span className="text-neon-blue">Michigan Blockchain</span> crew,
                    tinker on a hydrogen-electric plane at Helios, and riff on side projects like&nbsp;
                    <em>WiBit</em> (Decentralized Wi-Fi), <em>Validata</em> (token-gated AI data),
                    and a from-scratch STM32 smartwatch that boots reliably.
                    Basically, if it blends hardware, code, and sometimes a bit of crypto chaos, I'm in.
                  </p>

                  <p className="text-cyber-white/80">
                    When the laptop lid closes, I'm buzzing my fpv drones through the trees, riding single-track on my MTB,
                    or hunting down the next sneaker drop. There's always a book half-read, a podcast half-played,
                    and a branch called "/experiments". Got a wild idea? Let's build it.
                  </p>
                </div>
                <div className="space-y-8">
                  {/* Profile Photo - minimal glassy 4:5 card with caption */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="self-start"
                  >
                    <figure className="md:mt-[0.75em] w-48 md:w-56 max-w-full rounded-md ring-1 ring-white/10 bg-white/[0.04] backdrop-blur-md shadow-lg shadow-black/30 overflow-hidden">
                      <div className="relative w-full aspect-[4/5]">
                        <Image
                          src="/assets/ryan_hiking.jpeg"
                          alt="Ryan Kaelle"
                          fill
                          sizes="(max-width: 768px) 12rem, 14rem"
                          className="object-cover object-top"
                          priority={false}
                        />
                      </div>
                      <figcaption className="px-2 py-1 text-[10px] leading-tight text-cyber-white/50 tracking-wide">
                        Ryan Kaelle
                      </figcaption>
                    </figure>
                  </motion.div>

                  <div>
                    <h3 className="text-xl font-tech text-matrix-green mb-4">Technologies</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-neon-blue mb-2">Focus Areas</h4>
                        <ul className="space-y-2">
                          {techStack.map((tech, i) => (
                            <motion.li
                              key={tech}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-2 text-cyber-white/70"
                            >
                              <CircleStackIcon className="w-4 h-4 flex-shrink-0 text-matrix-green" />
                              {tech}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-neon-blue mb-2">Languages</h4>
                        <ul className="space-y-2">
                          {languageStack.map((lang, i) => (
                            <motion.li
                              key={lang}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-2 text-cyber-white/70"
                            >
                              <CodeBracketIcon className="w-4 h-4 flex-shrink-0 text-matrix-green" />
                              {lang}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-screen flex items-center relative px-8 py-20">
          <div className="max-w-4xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-cyber text-matrix-green">/ experience</h2>
              <JobList />
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center relative px-8 py-20">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-cyber text-matrix-green">/ projects</h2>
              <Projects homeMode />
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />

      {/* Credits */}
      <footer className="py-8 text-center text-cyber-white/60 font-tech text-sm relative z-[60]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto px-4"
        >
          <div className="border border-neon-blue/20 bg-cyber-black/50 backdrop-blur-sm py-3 px-6 rounded-sm">
            Built and designed by Ryan Kaelle.{' '}
            <a
              href="https://github.com/rkaelle/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-blue hover:underline"
            >
              View on Github
            </a>
          </div>
        </motion.div>
      </footer>

      {/* Contact Button */}
      <motion.div
        className="fixed bottom-8 right-8 hidden md:block w-fit h-fit z-[100]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <motion.a
          href="/socials"
          className="py-3 px-6 bg-neon-blue/10 border border-neon-blue/30 rounded-sm text-neon-blue font-tech items-center gap-3 hover:bg-neon-blue/20 transition-colors flex"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <EnvelopeIcon className="w-5 h-5" />
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
          </div>
          <span className="ml-2">Get in Touch →</span>
        </motion.a>
      </motion.div>
    </main>
  );
};

export default Home; 