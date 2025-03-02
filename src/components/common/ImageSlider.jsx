import React from "react";
import { X } from "lucide-react";
import ImageGallery from "react-image-gallery";
import PropTypes from "prop-types"; // ✅ Import PropTypes for type validation
import "react-image-gallery/styles/css/image-gallery.css";

const ImageSlider = ({ images, onClose }) => {
  // ✅ Handle case when no images are available
  if (!images || images.length === 0) {
    return (
      <div className="fixed inset-0  flex flex-col items-center justify-center bg-black bg-opacity-90 text-white z-50">
        <p className="text-xl">No images available.</p>
        <button
          onClick={onClose}
          className="px-4 py-2 mt-[10vh] bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black  h-[100vh] bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative w-[90%]  md:w-[80%] max-w-5xl">
        {/* Close Button */}
        <button
          className="absolute  mt-[10vh] top-4 right-4 z-10 text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
          onClick={onClose}
          aria-label="Close gallery"
        >
          <X size={24} />
        </button>
        
        {/* Image Gallery */}
        <ImageGallery 
          items={images} 
          showFullscreenButton={false} 
          showPlayButton={false}
          showNav={true}
          showThumbnails={true}
          lazyLoad={true}
          slideDuration={300}
        />
      </div>
    </div>
  );
};

// ✅ Define PropTypes for Type Validation
ImageSlider.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      original: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageSlider;
