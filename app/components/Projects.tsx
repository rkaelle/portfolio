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
   tech: string[];
   tag: ProjectTag;
   spotlight?: boolean;
   showOnHome?: boolean;
  highlight?: boolean;
   image?: string;
   links?: ProjectLinks;
 }
 
const BASE_TAGS: ProjectTag[] = ['Embedded', 'RF', 'Web3', 'Full Stack', 'Tools'];
const GRID_TAGS: ActiveTag[] = ['All', ...BASE_TAGS];
 
const projectsData: ProjectItem[] = [
  {
    id: 'smartwatch-pcb',
    title: 'Wearable Smartwatch with Custom PCB',
    summary: 'STM32 wrist‑worn device with HR sensor, IMU, LCD, BLE, and haptics; bare‑metal C with web companion.',
    tech: ['C', 'STM32', 'SPI/I2C', 'Bluetooth', 'PCB', 'Web App'],
    tag: 'Embedded',
    showOnHome: true,
    spotlight: false,
    highlight: true,
    image: '/assets/smartwatch.png',
    links: { code: 'https://github.com/wolvwatch/wolv', demo: 'https://wolv.watch/' }
  },
   {
     id: 'wibit',
     title: 'WiBit',
     summary: 'Decentralized Wi-Fi that rewards reduced bandwidth during congestion; Solana wallet UI.',
     tech: ['React', 'Python', 'Solana', 'Firestore', 'Three.js'],
     tag: 'Web3',
     spotlight: false,
     highlight: true,
     image: '/assets/wibit.png',
     links: { demo: 'https://wibit.online' }
   },
   {
    id: 'pipeline-sim',
    title: 'Pipelined Assembly Datapath Simulator',
    summary: '5-stage pipeline simulator with forwarding, branch prediction, and hazard handling.',
    tech: ['C', 'Assembly', 'Branch Prediction'],
    tag: 'Embedded',
    spotlight: false,
    highlight: true,
    image: '/assets/pipelined_processor.png',
    links: { code: 'https://github.com/rkaelle/assembly-pipeline-simulator' }
  },
   {
     id: 'greeklink',
     title: 'GreekLink',
     summary: 'Full-stack app for Greek life news. Real-time search, auth, Firestore backend, 35k+ posts scraped.',
     tech: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Python'],
     tag: 'Full Stack',
     spotlight: false,
     image: '/assets/greeklink.png',
     links: { code: 'https://github.com/rkaelle/greeklink', demo: 'https://greeklink.xyz' }
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
    tech: ['Verilog', 'FSM', 'Booth’s Algorithm', 'Simulation'],
    tag: 'Embedded',
    highlight: true,
    showOnHome: true,
    spotlight: false,
    image: '/assets/calculator.png'
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
    tech: ['C', 'UDP', 'CRC-32', 'Sliding Window', 'ARQ'],
    tag: 'Embedded',
    highlight: true,
    showOnHome: true,
    image: '/assets/udp.png'
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
    tech: ['C++', 'NLP', 'Naive Bayes', 'CSV', 'Tokenization'],
    tag: 'Tools',
    highlight: true,
    showOnHome: true,
    spotlight: false,
    image: '/assets/text_classifier.png'
  },
  {
    id: 'stock-trading-sim',
    title: 'Stock Trading Simulator',
    summary: 'C++ multi‑stock exchange simulator with order matching, median pricing, and profit maximization.',
    tech: ['C++', 'Algorithms', 'Priority Queues', 'Hash Maps', 'BST'],
    tag: 'Tools',
    showOnHome: true,
    image: '/assets/stock_trading.png'
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
             className={`px-3 py-1 text-sm rounded-sm border font-tech ${
               viewMode === 'grid'
                 ? 'border-neon-blue text-neon-blue bg-tech-gray/40'
                 : 'border-neon-blue/20 text-cyber-white/70 hover:border-neon-blue/50'
             }`}
           >
             Grid View
           </button>
           <button
             onClick={() => setViewMode('terminal')}
             className={`px-3 py-1 text-sm rounded-sm border font-tech ${
               viewMode === 'terminal'
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
               className={`w-2 h-2 rounded-full transition-colors ${
                 index === currentSlide ? 'bg-neon-blue' : 'bg-cyber-white/30'
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
             className={`px-3 py-1 text-sm rounded-sm border transition-colors font-tech ${
               activeTag === tag
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
              <FadeInSection key={project.id} delay={`${index * 100}ms`}>
                <motion.div
                  className="cursor-pointer border border-cyber-white/20 hover:border-neon-blue bg-cyber-black/50 backdrop-blur-sm transition-colors h-[420px] flex flex-col rounded"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedProjectId(project.id)}
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
            <FadeInSection delay={`${filteredProjects.length * 100}ms`}>
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
                       className={`w-full text-left px-2 py-1 rounded transition-colors flex items-center gap-2 ${
                         activeTag === tag ? 'bg-tech-gray/50 text-neon-blue' : 'hover:bg-tech-gray/30 text-cyber-white/80'
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
                             className={`w-full text-left px-2 py-1 rounded transition-colors ${
                               selectedProjectId === p.id ? 'bg-tech-gray/40 text-neon-blue' : 'hover:bg-tech-gray/20 text-cyber-white/80'
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
           <div className="md:col-span-2 border border-neon-blue/20 rounded bg-cyber-black/50 backdrop-blur-sm p-3">
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
                   </div>
                   <div className="p-4">
                     <div className="flex items-start justify-between">
                       <h3 className="text-2xl font-cyber text-neon-blue">{project.title}</h3>
                       <LinkRow links={project.links} />
                     </div>
                     <p className="text-cyber-white/80 mt-2">{project.summary}</p>
                     <div className="mt-4 flex flex-wrap gap-2">
                       {project.tech.map((t) => (
                         <span key={t} className="px-2 py-0.5 text-[11px] rounded border border-neon-blue/30 text-cyber-white/80 font-tech">
                           {t}
                         </span>
                       ))}
                     </div>
                   </div>
                 </div>
               );
             })()}
           </div>
         </div>
       )}
     </div>
   );
 };
 
 export default Projects; 
