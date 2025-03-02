import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const Card = ({ name, image, description, rating, link }) => {
  // Function to generate star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400 text-[1.2vw] sm:text-[1.5vw]" />);
    }
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-[1.2vw] sm:text-[1.5vw]" />);
    }
    while (stars.length < 5) {
      stars.push(<FaRegStar key={`empty-${stars.length}`} className="text-gray-400 text-[1.2vw] sm:text-[1.5vw]" />);
    }
    return stars;
  };

  return (
    <div 
      
      className="w-[280px] sm:w-[300px] bg-white shadow-xl rounded-xl overflow-hidden transform transition-all duration-300 relative"
    >
      {/* Image */}
      <img src={image} className="w-full h-48 object-cover" alt={name} />

      {/* Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <div className="flex items-center mt-1">{renderStars(rating)}</div>
        <p className="text-sm text-gray-600 mt-2">{description}</p>

        {/* View More Button */}
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-4 inline-block w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold text-sm py-2 text-center rounded-lg transition-all duration-300 hover:from-red-500 hover:to-pink-500"
        >
          View More
        </a>
      </div>
    </div>
  );
};

export default Card;
