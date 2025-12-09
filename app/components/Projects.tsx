'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FolderIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayCircleIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import FadeInSection from './FadeInSection';
import Image from 'next/image';
import ProjectModal from './ProjectModal';

type ProjectTag = 'Embedded' | 'RF' | 'Web3' | 'Full Stack' | 'Tools';
type ActiveTag = 'All' | 'Highlights' | ProjectTag;

interface ProjectLinks {
  code?: string;
  demo?: string;
  thread?: string;
}

interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  description?: string;
  tech: string[];
  tag: ProjectTag;
  spotlight?: boolean;
  showOnHome?: boolean;
  highlight?: boolean;
  image?: string;
  links?: ProjectLinks;
  features?: string[];
  challenges?: string;
  outcome?: string;
  year?: string;
}

const BASE_TAGS: ProjectTag[] = ['Embedded', 'RF', 'Web3', 'Full Stack', 'Tools'];
const GRID_TAGS: ActiveTag[] = ['All', ...BASE_TAGS];

const projectsData: ProjectItem[] = [
  {
    id: 'smart-glasses',
    title: 'AR Navigation Glasses for Athletes',
    summary: 'ESP32-based heads-up display glasses with turn-by-turn navigation, custom route uploading, and GPS/IMU fusion.',
    description: 'Lightweight athletic smart glasses providing real-time turn-by-turn GPS navigation through a micro-OLED heads-up display. Features sensor fusion with Extended Kalman Filter for accurate positioning, custom optics system, BLE connectivity for route management, and a web application for route planning and activity tracking. Complete hardware-software integration including custom PCB, battery management system, and 3D-printed frame.',
    tech: ['C', 'C++', 'FreeRTOS', 'PCB Design'],
    tag: 'Embedded',
    showOnHome: true,
    spotlight: false,
    highlight: true,
    image: '/assets/smartglasses.jpeg',
    links: { code: 'https://github.com/stridelens/stride-lens', demo: 'https://stridelens.fit/' },
    features: [
      'Custom PCB with ESP32-S3, GPS (PA1616D), 9-axis IMU (BNO055), and battery management',
      'Optical system: micro-OLED display with prism assembly for non-intrusive HUD',
      'Extended Kalman Filter fusing GPS/IMU data for accurate real-time localization',
      'FreeRTOS-based firmware with layered architecture (HAL, Service Layer, Application FSM)',
      'Turn-by-turn navigation with waypoint tracking and "lost mode" recovery',
      'BLE GATT file transfer for route upload/download from web app',
      'Django web application with Mapbox integration for route creation and GPX parsing',
      '4+ hour battery life with dual 800mAh LiPo batteries'
    ],
    challenges: 'End-to-end system integration across hardware, firmware, and software layers required extensive debugging of inter-component communication. Traced issues from PCB-level signal integrity (I2C/SPI/UART) through FreeRTOS task synchronization to web-BLE data transfer. Debugged sensor fusion pipeline where GPS NMEA parsing, IMU quaternion conversion, and EKF state updates had to coordinate reliably. Resolved timing issues between display rendering, navigation logic, and file system operations competing for SPI bus access.',
    outcome: 'Successfully demoed at UMich CoE Design Expo with full end-to-end navigation in real-world testing. Achieved all milestone deliverables on schedule and under budget ($826 vs $1,500 allocated). System provides reliable turn-by-turn guidance with position accuracy suitable for outdoor athletics.',
    year: '2025'
  },
  {
    id: 'smartwatch-pcb',
    title: 'Wearable Smartwatch with Custom PCB',
    summary: 'STM32 wrist‑worn device with HR sensor, IMU, LCD, BLE, and haptics; bare‑metal C with web companion.',
    description: 'A fully custom smartwatch built from scratch featuring an STM32 microcontroller, heart rate monitoring, inertial measurement unit, color LCD display, Bluetooth Low Energy connectivity, and haptic feedback. The firmware is written in bare-metal C with custom drivers for all peripherals. Includes a companion web app for data visualization and settings management.',
    tech: ['C', 'STM32', 'SPI/I2C', 'Bluetooth', 'PCB', 'Web App'],
    tag: 'Embedded',
    showOnHome: true,
    spotlight: false,
    highlight: true,
    image: '/assets/smartwatch.png',
    links: { code: 'https://github.com/wolvwatch/wolv', demo: 'https://wolv.watch/' },
    features: [
      'Custom PCB design with STM32 microcontroller',
      'Heart rate monitoring with MAX30102 sensor',
      '6-axis IMU for activity tracking',
      'Color LCD display with custom graphics driver',
      'Bluetooth Low Energy for smartphone connectivity',
      'Haptic motor for notifications',
      'Rechargeable battery with power management'
    ],
    challenges: 'Implementing reliable I2C communication with multiple sensors, optimizing power consumption for extended battery life, and developing a robust real-time operating system for task scheduling.',
    outcome: 'Successfully created a functional wearable device with multi-day battery life and reliable sensor readings. The web companion app enables users to view historical data and customize watch settings.',
    year: '2024'
  },
  {
    id: 'aegis-vaults',
    title: 'Aegis',
    summary: 'Programmable security vaults for AI agents on Solana; spending limits, whitelists, and Blink-based human overrides.',
    description: 'A smart contract protocol enabling AI agents to transact with cryptocurrency safely. Separates custody from control through on-chain policy enforcement—agents propose transactions but Aegis vaults execute them only if spending limits and whitelist rules pass. Includes human-in-the-loop override system via Solana Blinks, comprehensive TypeScript SDK for AI frameworks, and real-time monitoring dashboard.',
    tech: ['Rust', 'Anchor', 'Solana', 'PostgreSQL', 'Redis', 'Helius'],
    tag: 'Web3',
    showOnHome: true,
    spotlight: false,
    highlight: false,
    image: '/assets/aegis.png',
    links: {
      demo: 'https://aegis-vaults.xyz/',
      code: 'https://github.com/aegis-vaults/aegis-protocol',
    },
    features: [
      'Anchor-based smart contract with PDA vault architecture for agent custody separation',
      'On-chain spending limits and address whitelisting enforced at program level',
      'Human-in-the-loop override system using Solana Actions (Blinks)',
      'TypeScript SDK with LangChain, OpenAI, and Anthropic integrations (355+ downloads)',
      'Guardian backend with Helius event indexing and PostgreSQL/Redis state management',
      'Nonce-based vault creation supporting unlimited vaults per wallet',
      'Real-time transaction monitoring dashboard with policy violation alerts'
    ],
    challenges: 'Architected cross-layer security requiring coordination between on-chain program logic, off-chain event monitoring, and agent SDK. Designed PDA derivation for scalable vault creation while maintaining authority model. Implemented event-driven architecture using Helius webhooks to capture policy violations and trigger Blink generation, requiring state sync between Solana accounts and PostgreSQL.',
    outcome: 'Deployed to Solana Devnet with functional policy enforcement and override workflows. SDK achieved 355 npm downloads in first week. Demonstrated at University Blockchain Conference with live AI agent executing whitelisted transactions while blocking unauthorized attempts. Provides critical security infrastructure for AI agents handling real cryptocurrency.',
    year: '2024'
  },
  {
    id: 'sora-memes',
    title: 'Sora Memes',
    summary: 'Meme-token launchpad on Solana; social-to-token deployment, buyback mechanics, and viral growth to $2.8M volume.',
    description: 'A viral meme-token ecosystem and utility platform enabling users to deploy Solana tokens directly from social media trends. Solo-built full-stack application handling token creation, trading, and community engagement. Features automated Twitter bot for trend detection, buyback-and-burn tokenomics engine, and real-time analytics dashboard. Scaled to support nearly 200 user-generated tokens with robust infrastructure surviving 35,000 weekly users.',
    tech: ['Next.js', 'Solana Web3.js', 'Firebase', 'TypeScript', 'Twitter API', 'Token-2022'],
    tag: 'Web3',
    showOnHome: true,
    spotlight: false,
    highlight: false,
    image: '/assets/soramemes.png',
    links: {
      demo: 'https://soramemes.fun',
    },
    features: [
      'One-click token deployment from social media trends to Solana mainnet',
      'Scalable deployment architecture handling 35,000 weekly users with zero downtime',
      'Automated Twitter bot for trend scanning and community engagement',
      'Buyback-and-burn mechanism with on-chain execution for sustainable tokenomics',
      'Real-time trading interface with Firebase-backed analytics and leaderboards',
      'Token creation wizard with metadata management and liquidity pool setup',
      'Community dashboard tracking holder metrics and transaction volume',
    ],
    challenges: 'Solo-engineered entire platform including smart contract deployment pipeline, real-time database scaling under viral load spikes, and automated social media integration. Designed Firebase schema to handle exponential growth from 0 to 189 tokens in 18 days while maintaining sub-second query performance. Implemented buyback-and-burn logic requiring coordination between price monitoring, treasury management, and on-chain token burning.',
    outcome: 'Achieved viral growth to 35,000 weekly users and $2.8M in on-chain trading volume within launch month. Platform supported 189 user-generated tokens with 2,800 total holders, demonstrating strong product-market fit. Twitter community scaled to 5,400 followers through automated engagement and buyback announcements. Infrastructure survived 280,000%+ database load increases with zero downtime, validating architecture resilience.',
    year: '2025'
  },
  {
    id: 'wibit',
    title: 'WiBit',
    summary: 'Decentralized Wi-Fi that rewards reduced bandwidth during congestion; Solana wallet UI.',
    description: 'A blockchain-based incentive system for decentralized Wi-Fi networks. Users are rewarded with tokens for voluntarily reducing bandwidth usage during network congestion. Built on Solana for fast, low-cost transactions with an intuitive React-based wallet interface and 3D network visualizations.',
    tech: ['React', 'Python', 'Solana', 'Firestore', 'Three.js'],
    tag: 'Web3',
    spotlight: false,
    highlight: true,
    image: '/assets/wibit.png',
    links: { demo: 'https://wibit.online' },
    features: [
      'Real-time network congestion detection',
      'Solana-based token rewards system',
      'Interactive 3D network topology visualization',
      'Smart contract for automated reward distribution',
      'Firebase backend for user data and analytics',
      'Mobile-responsive wallet interface'
    ],
    challenges: 'Integrating blockchain transactions with real-time network monitoring, designing fair reward algorithms, and creating an intuitive UX for crypto-unfamiliar users.',
    outcome: 'Demonstrated a viable model for incentivizing cooperative network behavior. The platform successfully reduced peak congestion by 30% in testing environments.',
    year: '2024'
  },
  {
    id: 'pipeline-sim',
    title: 'Pipelined Assembly Datapath Simulator',
    summary: '5-stage pipeline simulator with forwarding, branch prediction, and hazard handling.',
    description: 'A comprehensive CPU pipeline simulator that models a 5-stage RISC architecture with realistic hazard detection, data forwarding, and branch prediction. Executes assembly programs and provides detailed cycle-by-cycle analysis of pipeline behavior, stalls, and performance metrics.',
    tech: ['C', 'Assembly', 'Branch Prediction'],
    tag: 'Embedded',
    spotlight: false,
    highlight: true,
    image: '/assets/pipelined_processor.png',
    links: { code: 'https://github.com/rkaelle/assembly-pipeline-simulator' },
    features: [
      '5-stage pipeline: Fetch, Decode, Execute, Memory, Writeback',
      'Data forwarding to minimize stalls',
      'Branch prediction with taken/not-taken heuristics',
      'Hazard detection and resolution',
      'Cycle-accurate simulation',
      'Performance metrics and statistics output'
    ],
    challenges: 'Correctly implementing data forwarding paths, handling all edge cases for hazards, and ensuring the simulator matched expected behavior for complex instruction sequences.',
    outcome: 'Created a teaching tool that helps students visualize pipeline operations. Achieved 85% accuracy in branch prediction on benchmark programs.',
    year: '2023'
  },
  {
    id: 'greeklink',
    title: 'GreekLink',
    summary: 'Full-stack app for Greek life news. Real-time search, auth, Firestore backend, 35k+ posts scraped.',
    description: 'A comprehensive platform aggregating news and updates from Greek life organizations across universities. Features real-time search, user authentication, and a Python-based web scraper that automatically collects and indexes content from 35,000+ posts. Built with Next.js for optimal performance and SEO.',
    tech: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Python'],
    tag: 'Full Stack',
    spotlight: false,
    image: '/assets/greeklink.png',
    links: { code: 'https://github.com/rkaelle/greeklink', demo: 'https://greeklink.xyz' },
    features: [
      'Real-time full-text search across 35k+ posts',
      'User authentication with Firebase Auth',
      'Automated content scraping and indexing',
      'Responsive design for mobile and desktop',
      'Firestore database with optimized queries',
      'Server-side rendering for SEO'
    ],
    challenges: 'Scaling the search functionality for thousands of posts while maintaining sub-second query times, and implementing efficient web scraping that respects rate limits.',
    outcome: 'Successfully deployed platform serving hundreds of users with 99.9% uptime. Average search query completes in under 200ms.',
    year: '2023'
  },
  {
    id: 'sentiment-bot',
    title: 'Sentiment Analysis Bot',
    summary: 'Analyze Reddit posts/comments to measure stock sentiment; visualized with Plotly gauges.',
    tech: ['Python', 'NLP', 'PRAW', 'NLTK', 'Plotly'],
    tag: 'Full Stack',
    spotlight: false,
    image: '/assets/gauges.png',
    links: { code: 'https://github.com/rkaelle/sentiment-analysis-bot' }
  },
  {
    id: 'eink-frame',
    title: 'Smart e‑Paper Photo Display',
    summary: 'Python photo frame with Firestore + Storage; RTC and remote image management on e‑Paper.',
    tech: ['Python', 'Firebase', 'Firestore', 'e‑Paper', '3D Printing'],
    tag: 'Full Stack',
    spotlight: false,
    image: '/assets/eink.JPG',
    links: { code: 'https://github.com/rkaelle/einkphotoalbumn', demo: 'https://www.thingiverse.com/thing:6891829' }
  },
  {
    id: 'ham-radio',
    title: 'Amateur Radio Station',
    summary: 'G90 HF + FT70 handheld; 2500mi+ contacts using dipole antenna.',
    tech: ['HF', 'Antennas', 'Propagation'],
    tag: 'RF',
    spotlight: false,
    image: '/assets/radio.jpg'
  },
  {
    id: 'fpv-drones',
    title: 'FPV Drones',
    summary: 'Racing drones up to 85mph; custom build and tuning.',
    tech: ['Soldering', 'Betaflight', 'Linux CLI'],
    tag: 'Embedded',
    spotlight: false,
    image: '/assets/drones.jpg'
  },
  {
    id: 'verilog-calculator',
    title: 'Four-Function Calculator in Verilog',
    summary: 'FSM + datapath implementing add/sub/mul/div with Booth’s algorithm, overflow detection, ModelSim verification.',
    description: 'A hardware calculator implemented in Verilog HDL featuring a finite state machine controller and arithmetic datapath. Supports addition, subtraction, multiplication (using Booth\'s algorithm), and division. Includes overflow detection and was verified using ModelSim simulation.',
    tech: ['Verilog', 'FSM', 'Booth’s Algorithm', 'Simulation'],
    tag: 'Embedded',
    highlight: true,
    showOnHome: true,
    spotlight: false,
    image: '/assets/calculator.png',
    features: [
      'Four arithmetic operations: +, -, ×, ÷',
      'Booth\'s algorithm for efficient multiplication',
      'Overflow and underflow detection',
      'FSM-based control logic',
      'Synthesizable design for FPGA deployment',
      'Comprehensive testbench verification'
    ],
    challenges: 'Implementing Booth\'s algorithm in hardware with correct sign handling, minimizing logic depth for timing closure, and creating exhaustive test cases.',
    outcome: 'Successfully synthesized design meets timing at 50MHz target frequency. All arithmetic operations verified correct across 10,000+ random test vectors.',
    year: '2023'
  },
  {
    id: 'chatroom',
    title: 'Secure Chatroom',
    summary: 'Flask-based real-time secure messaging app.',
    tech: ['Flask', 'Socket.IO', 'Ngrok'],
    tag: 'Full Stack',
    spotlight: false,
    image: '/assets/chatroom–screenshot.png',
    links: { code: 'https://github.com/rkaelle/rk-chatroom' }
  },
  {
    id: 'reliable-udp',
    title: 'Reliable Transport Protocol Over UDP',
    summary: 'TCP‑like reliability on UDP: sliding‑window ARQ, cumulative/selective ACKs, per‑packet timers, CRC‑32.',
    description: 'A custom reliable transport protocol built on top of UDP, implementing TCP-like reliability features including sliding window flow control, automatic repeat request (ARQ), both cumulative and selective acknowledgments, per-packet timeout timers, and CRC-32 checksums for error detection. Written in C for high performance.',
    tech: ['C', 'UDP', 'CRC-32', 'Sliding Window', 'ARQ'],
    tag: 'Embedded',
    highlight: true,
    showOnHome: true,
    image: '/assets/udp.png',
    features: [
      'Sliding window flow control',
      'Selective and cumulative acknowledgments',
      'Per-packet timeout and retransmission',
      'CRC-32 error detection',
      'Out-of-order packet handling',
      'Congestion avoidance mechanisms'
    ],
    challenges: 'Managing complex timer states for multiple in-flight packets, implementing efficient packet reordering, and achieving comparable performance to TCP while maintaining reliability.',
    outcome: 'Achieved 99.99% reliability on lossy networks with 5% packet loss. Throughput within 10% of TCP on high-latency connections.',
    year: '2023'
  },
  {
    id: 'ryansdailynews',
    title: 'RyansDailyNews',
    summary: 'Daily emails with events, reflections, skills, and science facts.',
    tech: ['Python', 'API', 'SMTP', 'Firebase'],
    tag: 'Full Stack',
    image: '/assets/ryans_daily_news.png',
    links: { code: 'https://github.com/rkaelle/ryansdailynews', demo: 'https://rkaelle.com/manage' }
  },

  {
    id: 'ml-text-classifier',
    title: 'Machine Learning Text Classifier',
    summary: 'C++ Naive Bayes classifier for forum posts with CSV parsing, tokenization, and log‑likelihood scoring.',
    description: 'A high-performance text classification system using Naive Bayes algorithm to categorize forum posts. Features custom CSV parsing, advanced tokenization with stemming, log-likelihood scoring to prevent numerical underflow, and efficient data structures for fast training and prediction.',
    tech: ['C++', 'NLP', 'Naive Bayes', 'CSV', 'Tokenization'],
    tag: 'Tools',
    highlight: true,
    showOnHome: true,
    spotlight: false,
    image: '/assets/text_classifier.png',
    features: [
      'Naive Bayes classification algorithm',
      'Efficient CSV parsing and data loading',
      'Advanced text tokenization and preprocessing',
      'Log-likelihood scoring for numerical stability',
      'Multi-class classification support',
      'High-speed prediction (<1ms per document)'
    ],
    challenges: 'Handling numerical precision issues with probabilistic calculations, optimizing memory usage for large vocabularies, and achieving competitive accuracy with simple Naive Bayes.',
    outcome: 'Achieved 87% classification accuracy on test dataset with 20 categories. Processes 10,000 documents per second on commodity hardware.',
    year: '2022'
  },
  {
    id: 'stock-trading-sim',
    title: 'Stock Trading Simulator',
    summary: 'C++ multi‑stock exchange simulator with order matching, median pricing, and profit maximization.',
    description: 'A sophisticated stock market simulator implementing realistic order matching logic, median price tracking, and algorithmic profit maximization strategies. Uses advanced data structures including priority queues for order books, hash maps for fast lookups, and balanced BSTs for median calculation.',
    tech: ['C++', 'Algorithms', 'Priority Queues', 'Hash Maps', 'BST'],
    tag: 'Tools',
    showOnHome: true,
    image: '/assets/stock_trading.png',
    features: [
      'Realistic order book with bid/ask matching',
      'Real-time median price tracking',
      'Profit maximization algorithms',
      'Support for limit and market orders',
      'Multi-stock portfolio management',
      'Transaction history and analytics'
    ],
    challenges: 'Maintaining O(log n) median updates on large datasets, ensuring fair order matching, and optimizing data structure selection for various operations.',
    outcome: 'Simulator handles 1M+ orders with sub-millisecond latency per operation. Algorithmic trading strategy achieved 23% returns in backtesting.',
    year: '2022'
  },
  {
    id: 'rocket-sensor',
    title: 'Rocket Sensor Development',
    summary: 'Sensor suite for model rocket to study atmospheric conditions and flight dynamics.',
    tech: ['PCB', 'Sensors', 'Data Analysis'],
    tag: 'Embedded',
    spotlight: false,
    image: '/assets/rocket.jpeg'
  }
];

const Projects: React.FC<{ showPortfolioLink?: boolean; homeMode?: boolean }> = ({ showPortfolioLink = true, homeMode = false }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [activeTag, setActiveTag] = React.useState<ActiveTag>('All');
  const [viewMode, setViewMode] = React.useState<'grid' | 'terminal'>('grid');
  const [selectedProjectId, setSelectedProjectId] = React.useState<string | null>(null);
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  const [selectedProject, setSelectedProject] = React.useState<ProjectItem | null>(null);

  const spotlightList = React.useMemo(() => projectsData.filter(p => p.spotlight && p.image), []);
  const totalSlides = spotlightList.length;

  React.useEffect(() => {
    if (totalSlides === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const goToNextSlide = () => {
    if (totalSlides === 0) return;
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const goToPrevSlide = () => {
    if (totalSlides === 0) return;
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const baseList = React.useMemo(() => (homeMode ? projectsData.filter(p => p.showOnHome !== false) : projectsData), [homeMode]);
  const filteredProjects = React.useMemo(() => {
    if (activeTag === 'All') return baseList;
    if (activeTag === 'Highlights') return baseList.filter(p => p.highlight);
    return baseList.filter(p => p.tag === activeTag);
  }, [activeTag, baseList]);

  const LinkRow: React.FC<{ links?: ProjectLinks }> = ({ links }) => {
    if (!links) return null;
    const { demo, code, thread } = links;
    return (
      <div className="flex gap-3 text-cyber-white/60">
        {demo && (
          <motion.a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neon-blue transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Demo"
          >
            <PlayCircleIcon className="w-5 h-5" />
          </motion.a>
        )}
        {code && (
          <motion.a
            href={code}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neon-blue transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Code"
          >
            <CodeBracketIcon className="w-5 h-5" />
          </motion.a>
        )}
        {thread && (
          <motion.a
            href={thread}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-matrix-green transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Thread"
          >
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
          </motion.a>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-16">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="font-tech text-neon-blue/80 text-xs mb-1">/ projects</div>
          <h2 className="font-cyber text-xl text-cyber-white">Click on a project to learn more.</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 text-sm rounded-sm border font-tech ${viewMode === 'grid'
              ? 'border-neon-blue text-neon-blue bg-tech-gray/40'
              : 'border-neon-blue/20 text-cyber-white/70 hover:border-neon-blue/50'
              }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode('terminal')}
            className={`px-3 py-1 text-sm rounded-sm border font-tech ${viewMode === 'terminal'
              ? 'border-neon-blue text-neon-blue bg-tech-gray/40'
              : 'border-neon-blue/20 text-cyber-white/70 hover:border-neon-blue/50'
              }`}
          >
            Terminal View
          </button>
        </div>
      </div>
      {totalSlides > 0 && (
        <div className="relative h-[600px] w-full overflow-hidden rounded-lg border border-neon-blue/20 group">
          {spotlightList.map((project, index) => (
            <motion.div
              key={project.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-full w-full">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-cyber text-neon-blue mb-2">{project.title}</h3>
                  <p className="text-cyber-white/80 mb-4">{project.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[11px] rounded border border-neon-blue/30 text-cyber-white/80 font-tech">
                        {t}
                      </span>
                    ))}
                  </div>
                  <LinkRow links={project.links} />
                </div>
              </div>
            </motion.div>
          ))}

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

          <div className="absolute bottom-4 right-4 flex gap-2">
            {spotlightList.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-neon-blue' : 'bg-cyber-white/30'
                  }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {GRID_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1 text-sm rounded-sm border transition-colors font-tech ${activeTag === tag
              ? 'border-neon-blue text-neon-blue bg-tech-gray/40'
              : 'border-neon-blue/20 text-cyber-white/70 hover:border-neon-blue/50'
              }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const techPreview = project.tech.slice(0, 3);
            const remaining = Math.max(0, project.tech.length - techPreview.length);
            return (
              <FadeInSection key={project.id} delay={`${index * 100} ms`}>
                <motion.div
                  className="cursor-pointer border border-cyber-white/20 hover:border-neon-blue bg-cyber-black/50 backdrop-blur-sm transition-colors h-[420px] flex flex-col rounded"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-40 w-full overflow-hidden rounded-t">
                    {project.image && (
                      <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/80 via-cyber-black/20 to-transparent" />
                    <span className="absolute top-2 left-2 text-[11px] font-tech rounded px-2 py-0.5 border border-neon-blue/40 text-neon-blue bg-tech-gray/40">
                      {project.tag}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-cyber text-neon-blue">{project.title}</h3>
                      <LinkRow links={project.links} />
                    </div>
                    <p className="text-cyber-white/70 mb-4 text-sm line-clamp-3 flex-grow">{project.summary}</p>
                    <div className="mt-auto flex items-center gap-2 flex-wrap">
                      {techPreview.map((t) => (
                        <span key={t} className="px-2 py-0.5 text-[11px] rounded border border-neon-blue/30 text-cyber-white/80 font-tech">
                          {t}
                        </span>
                      ))}
                      {remaining > 0 && (
                        <span className="px-2 py-0.5 text-[11px] rounded border border-neon-blue/30 text-cyber-white/60 font-tech">+{remaining}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </FadeInSection>
            );
          })}

          {showPortfolioLink && (
            <FadeInSection delay={`${filteredProjects.length * 100} ms`}>
              <motion.a
                href="/projects"
                className="block p-6 border border-neon-blue/20 hover:border-neon-blue bg-cyber-black/50 backdrop-blur-sm transition-colors h-[280px] flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between text-neon-blue w-full">
                  <span className="font-cyber">View Full Portfolio</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </div>
              </motion.a>
            </FadeInSection>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 border border-neon-blue/20 rounded bg-cyber-black/50 backdrop-blur-sm p-3 font-tech text-sm max-h-[520px] overflow-auto">
            <div className="mb-2 text-neon-blue/80">navigator</div>
            <div className="space-y-1">
              {(['Highlights', ...BASE_TAGS] as Array<'Highlights' | ProjectTag>).map((tag) => {
                const key = `tag-${tag}`;
                const isExpanded = expanded[key] ?? (tag === 'Highlights');
                const toggle = () => setExpanded(prev => ({ ...prev, [key]: !isExpanded }));
                const children = tag === 'Highlights' ? baseList.filter(p => p.highlight) : baseList.filter(p => p.tag === tag);
                return (
                  <div key={key} className="">
                    <button
                      onClick={() => { setActiveTag(tag as any); toggle(); }}
                      className={`w-full text-left px-2 py-1 rounded transition-colors flex items-center gap-2 ${activeTag === tag ? 'bg-tech-gray/50 text-neon-blue' : 'hover:bg-tech-gray/30 text-cyber-white/80'
                        }`}
                    >
                      <FolderIcon className="w-4 h-4" /> {tag}
                    </button>
                    {isExpanded && (
                      <div className="ml-4 mt-1 space-y-1">
                        {children.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => setSelectedProjectId(p.id)}
                            className={`w-full text-left px-2 py-1 rounded transition-colors ${selectedProjectId === p.id ? 'bg-tech-gray/40 text-neon-blue' : 'hover:bg-tech-gray/20 text-cyber-white/80'
                              }`}
                          >
                            {p.title}
                          </button>
                        ))}
                        {children.length === 0 && (
                          <div className="px-2 py-1 text-cyber-white/60">No projects.</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="md:col-span-2 border border-neon-blue/20 rounded bg-cyber-black/50 backdrop-blur-sm p-3 max-h-[520px] overflow-auto">
            <div className="mb-2 text-neon-blue/80 flex items-center gap-2"><DocumentTextIcon className="w-4 h-4" /> {activeTag} projects</div>
            {(() => {
              const project = selectedProjectId ? baseList.find(p => p.id === selectedProjectId) : null;
              if (!project) {
                return <div className="py-10 text-center text-cyber-white/60 font-tech">Select a project from the navigator.</div>;
              }
              return (
                <div className="border border-cyber-white/20 bg-cyber-black/40 rounded overflow-hidden">
                  <div className="relative h-48 w-full">
                    {project.image && (
                      <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/90 via-transparent to-transparent" />
                    <span className="absolute top-2 left-2 text-[11px] font-tech rounded px-2 py-0.5 border border-neon-blue/40 text-neon-blue bg-tech-gray/40">
                      {project.tag}
                    </span>
                    {project.year && (
                      <span className="absolute top-2 right-2 text-[11px] font-tech rounded px-2 py-0.5 border border-cyber-white/30 text-cyber-white/70 bg-cyber-black/60">
                        {project.year}
                      </span>
                    )}
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-2xl font-cyber text-neon-blue">{project.title}</h3>
                      <LinkRow links={project.links} />
                    </div>
                    <p className="text-cyber-white/80">{project.summary}</p>

                    {/* Description */}
                    {project.description && (
                      <div>
                        <h4 className="text-lg font-cyber text-matrix-green mb-2">Overview</h4>
                        <p className="text-cyber-white/80 text-sm leading-relaxed">{project.description}</p>
                      </div>
                    )}

                    {/* Features */}
                    {project.features && project.features.length > 0 && (
                      <div>
                        <h4 className="text-lg font-cyber text-matrix-green mb-2">Key Features</h4>
                        <ul className="space-y-1.5">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-cyber-white/80 text-sm">
                              <span className="text-neon-blue mt-1">▸</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Challenges */}
                    {project.challenges && (
                      <div>
                        <h4 className="text-lg font-cyber text-matrix-green mb-2">Technical Challenges</h4>
                        <p className="text-cyber-white/80 text-sm leading-relaxed">{project.challenges}</p>
                      </div>
                    )}

                    {/* Outcome */}
                    {project.outcome && (
                      <div>
                        <h4 className="text-lg font-cyber text-matrix-green mb-2">Outcome</h4>
                        <p className="text-cyber-white/80 text-sm leading-relaxed">{project.outcome}</p>
                      </div>
                    )}

                    {/* Technologies */}
                    <div>
                      <h4 className="text-lg font-cyber text-matrix-green mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span key={t} className="px-2 py-0.5 text-[11px] rounded border border-neon-blue/30 text-cyber-white/80 font-tech">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Project Modal - Single Instance */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};

export default Projects; 
