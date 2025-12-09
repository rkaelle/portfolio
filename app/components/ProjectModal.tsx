'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    XMarkIcon,
    PlayCircleIcon,
    CodeBracketIcon,
    ChatBubbleLeftRightIcon,
    CalendarIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

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
    tag: string;
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

interface ProjectModalProps {
    project: ProjectItem | null;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (project) {
            document.addEventListener('keydown', handleEsc);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [project, onClose]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {project && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-cyber-black/90 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl max-h-[90vh] bg-cyber-black border border-neon-blue/30 rounded-lg shadow-[0_0_30px_rgba(0,128,255,0.2)] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-tech-gray/95 backdrop-blur-sm border-b border-neon-blue/20">
                            <div className="flex items-center gap-3">
                                <span className="px-2 py-1 text-xs font-tech rounded border border-neon-blue/40 text-neon-blue bg-tech-gray/40">
                                    {project.tag}
                                </span>
                                {project.year && (
                                    <div className="flex items-center gap-1 text-cyber-white/60 text-xs font-tech">
                                        <CalendarIcon className="w-4 h-4" />
                                        {project.year}
                                    </div>
                                )}
                            </div>
                            <motion.button
                                onClick={onClose}
                                className="p-2 text-cyber-white/70 hover:text-neon-blue transition-colors rounded-sm hover:bg-cyber-white/5"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </motion.button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="overflow-y-auto max-h-[calc(90vh-80px)] scrollbar-thin scrollbar-thumb-neon-blue/30 scrollbar-track-transparent">
                            {/* Hero Image */}
                            {project.image && (
                                <div className="relative h-72 w-full">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 896px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/60 to-transparent" />
                                    <div className="absolute bottom-0 left-0 p-6 w-full">
                                        <h2 className="text-3xl md:text-4xl font-cyber text-neon-blue mb-2">
                                            {project.title}
                                        </h2>
                                        <p className="text-cyber-white/80 text-lg">{project.summary}</p>
                                    </div>
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Links Section */}
                                {project.links && (Object.keys(project.links).length > 0) && (
                                    <div className="flex flex-wrap gap-3">
                                        {project.links.demo && (
                                            <motion.a
                                                href={project.links.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-neon-blue/10 border border-neon-blue/30 rounded-sm text-neon-blue font-tech text-sm hover:bg-neon-blue/20 transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <PlayCircleIcon className="w-5 h-5" />
                                                View Demo
                                            </motion.a>
                                        )}
                                        {project.links.code && (
                                            <motion.a
                                                href={project.links.code}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-cyber-white/5 border border-cyber-white/20 rounded-sm text-cyber-white/80 font-tech text-sm hover:bg-cyber-white/10 transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <CodeBracketIcon className="w-5 h-5" />
                                                View Code
                                            </motion.a>
                                        )}
                                        {project.links.thread && (
                                            <motion.a
                                                href={project.links.thread}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-matrix-green/10 border border-matrix-green/30 rounded-sm text-matrix-green font-tech text-sm hover:bg-matrix-green/20 transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                                                Discussion
                                            </motion.a>
                                        )}
                                    </div>
                                )}

                                {/* Description */}
                                {project.description && (
                                    <div>
                                        <h3 className="text-xl font-cyber text-matrix-green mb-3">Overview</h3>
                                        <p className="text-cyber-white/80 leading-relaxed whitespace-pre-line">
                                            {project.description}
                                        </p>
                                    </div>
                                )}

                                {/* Features */}
                                {project.features && project.features.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-cyber text-matrix-green mb-3">Key Features</h3>
                                        <ul className="space-y-2">
                                            {project.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-cyber-white/80">
                                                    <CheckCircleIcon className="w-5 h-5 text-neon-blue flex-shrink-0 mt-0.5" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Challenges */}
                                {project.challenges && (
                                    <div>
                                        <h3 className="text-xl font-cyber text-matrix-green mb-3">Technical Challenges</h3>
                                        <p className="text-cyber-white/80 leading-relaxed whitespace-pre-line">
                                            {project.challenges}
                                        </p>
                                    </div>
                                )}

                                {/* Outcome */}
                                {project.outcome && (
                                    <div>
                                        <h3 className="text-xl font-cyber text-matrix-green mb-3">Outcome</h3>
                                        <p className="text-cyber-white/80 leading-relaxed whitespace-pre-line">
                                            {project.outcome}
                                        </p>
                                    </div>
                                )}

                                {/* Technologies */}
                                <div>
                                    <h3 className="text-xl font-cyber text-matrix-green mb-3">Technologies Used</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1.5 text-sm rounded border border-neon-blue/30 text-cyber-white/80 font-tech bg-cyber-black/40"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
