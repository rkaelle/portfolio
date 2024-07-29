import React, { useState, useEffect } from 'react';
import Gallery from 'react-photo-gallery';
import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';
import { storage } from '../components/firebase'; 
import "../styles/Gallery.css";
import "../styles/Global.css";

const GalleryPage = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                // Create a reference to the photos folder
                const storageRef = ref(storage, 'photos/');
                const listResult = await listAll(storageRef);

                // Log the list result for debugging
                console.log('listResult:', listResult);

                const photoDataPromises = listResult.items.map(async item => {
                    const url = await getDownloadURL(item);
                    const metadata = await getMetadata(item);

                    // Log each URL and metadata for debugging
                    console.log('URL:', url);
                    console.log('Metadata:', metadata);

                    return {
                        src: url,
                        width: metadata.width || 4,
                        height: metadata.height || 3
                    };
                });

                const photoData = await Promise.all(photoDataPromises);

                // Log photo data for debugging
                console.log('photoData:', photoData);

                setPhotos(photoData);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <div id="gallery-page">
            <div className="gallery-container">
                {photos.length > 0 ? (
                    <Gallery photos={photos} direction={"row"} />
                ) : (
                    <p>No photos available</p>
                )}
            </div>
        </div>
    );
};

export default GalleryPage;