import React from 'react';
import Gallery from 'react-photo-gallery';
import { photos } from '../components/photos';

const GalleryPage = () => {
    return <Gallery photos={photos} direction={"column"} />;
};

export default GalleryPage;