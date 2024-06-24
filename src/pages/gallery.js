import React, { useState } from 'react';
import Gallery from 'react-photo-gallery';
import { photos } from '../components/photos';
import "../styles/Gallery.css";

const GalleryPage = () => {

    return (
        <Gallery 
            photos={photos} 
            direction={"column"} 
            showFullscreenButton={true}
            showGalleryFullscreenButton={true}
            infinite={true}
            // Optional: Pass state values as props if the Gallery component uses them
        />
    );
};

export default GalleryPage;