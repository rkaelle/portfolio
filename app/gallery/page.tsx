'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';
import { storage } from '../components/firebase'; 
import { CommandLineIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import TypewriterText from '@/app/components/TypewriterText';
import "../styles/Gallery.css";
import "../globals.css";

// Dynamically import the Gallery component to ensure it only runs on the client
const Gallery = dynamic(() => import('react-photo-gallery'), {
    ssr: false
});

interface Photo {
    src: string;
    width: number;
    height: number;
}

const GalleryPage = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const fetchPhotos = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log('Starting to fetch photos...');
                
                if (!storage) {
                    throw new Error('Firebase storage is not initialized');
                }
                
                const storageRef = ref(storage, 'photos/');
                console.log('Storage reference created:', storageRef);
                
                const listResult = await listAll(storageRef);
                console.log('List result:', listResult);
                console.log('Number of items found:', listResult.items.length);
    
                if (listResult.items.length === 0) {
                    setError('No photos found in the storage bucket. Please upload some photos first.');
                    return;
                }
    
                const photoDataPromises = listResult.items.map(async (item) => {
                    try {
                        console.log('Processing item:', item.fullPath);
                        const url = await getDownloadURL(item);
                        const metadata = await getMetadata(item);
                        console.log('Item metadata:', metadata);
    
                        // Only include items that have a content type starting with 'image/'
                        if (metadata.contentType && metadata.contentType.startsWith('image/')) {
                            return new Promise<Photo>((resolve) => {
                            const img = new Image();
                                img.onload = () => {
                                    resolve({
                                src: url,
                                width: img.naturalWidth || 4,
                                height: img.naturalHeight || 3
                                    });
                            };
                                img.src = url;
                            });
                        } else {
                            console.log('Skipping non-image file:', item.fullPath);
                            return null;
                        }
                    } catch (itemError) {
                        console.error('Error processing item:', item.fullPath, itemError);
                        return null;
                    }
                });
    
                const photoData = await Promise.all(photoDataPromises);
                console.log('Processed photo data:', photoData);
    
                // Filter out any null values and cast to Photo[]
                const validPhotoData = photoData.filter((photo): photo is Photo => photo !== null);
                console.log('Valid photo data:', validPhotoData);
    
                if (validPhotoData.length === 0) {
                    setError('No valid photos found. Please check if your files are valid images.');
                    return;
                }
    
                setPhotos(validPhotoData);
            } catch (fetchError) {
                console.error('Error fetching photos:', fetchError);
                setError(`Failed to fetch photos: ${fetchError instanceof Error ? fetchError.message : 'Unknown error'}`);
            } finally {
                setLoading(false);
            }
        };
    
        fetchPhotos();
    }, [isClient]);

    if (!isClient) {
        return (
            <div className="min-h-screen bg-cyber-black text-cyber-white">
                {/* Terminal Header */}
                <div className="fixed top-0 left-0 w-full h-12 bg-tech-gray/80 backdrop-blur-sm border-b border-neon-blue/20 flex items-center px-4 font-tech z-50">
                    <div className="flex items-center gap-2 text-neon-blue -ml-1">
                        <CommandLineIcon className="w-4 h-4" />
                        <span className="text-matrix-green">~</span>
                        <span>/</span>
                        <span>cd rkaelle/portfolio/</span>
                        <TypewriterText text="gallery" prefix="" />
                    </div>
                </div>

                {/* Return Home Button */}
                <Link 
                    href="/"
                    className="fixed top-16 left-8 py-2 px-4 bg-nord-polar-2/80 border border-neon-blue/30 rounded-sm text-neon-blue font-tech flex items-center gap-2 hover:bg-neon-blue/20 transition-colors z-50"
                >
                    <ArrowLeftIcon className="w-4 h-4" /> Return Home
                </Link>

                <div id="gallery-page">
                    <div className="gallery-container">
                        <div className="loading-container">
                            <p>Initializing...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cyber-black text-cyber-white">
            {/* Terminal Header */}
            <div className="fixed top-0 left-0 w-full h-12 bg-tech-gray/80 backdrop-blur-sm border-b border-neon-blue/20 flex items-center px-4 font-tech z-50">
                <div className="flex items-center gap-2 text-neon-blue -ml-1">
                    <CommandLineIcon className="w-4 h-4" />
                    <span className="text-matrix-green">~</span>
                    <span>/</span>
                    <span>cd rkaelle/portfolio/</span>
                    <TypewriterText text="gallery" prefix="" />
                </div>
            </div>

            {/* Return Home Button */}
            <Link 
                href="/"
                className="fixed top-16 left-8 py-2 px-4 bg-nord-polar-2/80 border border-neon-blue/30 rounded-sm text-neon-blue font-tech flex items-center gap-2 hover:bg-neon-blue/20 transition-colors z-50"
            >
                <ArrowLeftIcon className="w-4 h-4" /> Return Home
            </Link>

        <div id="gallery-page">
            <div className="gallery-container">
                {loading ? (
                        <div className="loading-container">
                    <p>Loading photos...</p>
                            <p className="loading-subtext">Please wait while we fetch your photos</p>
                        </div>
                ) : error ? (
                        <div className="error-container">
                            <p className="error-message">{error}</p>
                            <p className="error-subtext">Please check your Firebase configuration and storage bucket</p>
                        </div>
                ) : photos.length > 0 ? (
                    <Gallery photos={photos} direction={"row"} />
                ) : (
                    <p>No photos available</p>
                )}
                </div>
            </div>
        </div>
    );
};

export default GalleryPage; 