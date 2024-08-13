import React, { useState, useEffect } from 'react';
import Gallery from 'react-photo-gallery';
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';
import { storage } from '../components/firebase'; 
import "../styles/Gallery.css";
import "../styles/Global.css";

const GalleryPage = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhotos = async () => {
            setLoading(true);
            setError(null);
            try {
                const storageRef = ref(storage, 'photos/');
                const listResult = await listAll(storageRef);
    
                console.log('listResult:', listResult);
    
                const photoDataPromises = listResult.items.map(async (item) => {
                    try {
                        const url = await getDownloadURL(item);
                        const metadata = await getMetadata(item);
    
                        // Only include items that have a content type starting with 'image/'
                        if (metadata.contentType && metadata.contentType.startsWith('image/')) {
                            return {
                                src: url,
                                width: metadata.width || 4,  // Provide default width if not available
                                height: metadata.height || 3 // Provide default height if not available
                            };
                        } else {
                            // Skip non-image files
                            return null;
                        }
                    } catch (itemError) {
                        console.error('Error fetching item data:', itemError);
                        return null;
                    }
                });
    
                const photoData = await Promise.all(photoDataPromises);
    
                // Filter out any null values
                const validPhotoData = photoData.filter(photo => photo !== null);
    
                console.log('photoData:', validPhotoData);
    
                setPhotos(validPhotoData);
            } catch (fetchError) {
                console.error('Error fetching photos:', fetchError);
                setError(`Failed to fetch photos: ${fetchError.message}`);
            } finally {
                setLoading(false);
            }
        };
    
        fetchPhotos();
    }, []);

    return (
        <div id="gallery-page">
            <div className="gallery-container">
                {loading ? (
                    <p>Loading photos...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : photos.length > 0 ? (
                    <Gallery photos={photos} direction={"row"} />
                ) : (
                    <p>No photos available</p>
                )}
            </div>
        </div>
    );
};

export default GalleryPage;