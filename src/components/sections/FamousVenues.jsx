import React from "react";
import { motion } from "framer-motion";
import ScrollFloat from "../common/ScrollFloat";

// Card Animation Variants
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (index) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: index * 0.2 },
  }),
};

const FamousVenues = ({ venues }) => {
  return (
    <div
      className="w-full min-h-screen bg-white flex flex-col items-center justify-center px-6 py-10"
      
    >
      {/* Section Title */}
      {/* <h1
        className="text-[8vw] sm:text-[5vw] md:text-[4vw] font-extrabold text-gray-800 text-center mb-10 "
        data-scroll
        data-scroll-speed="0.2"
      >
    
      </h1> */}
      <ScrollFloat
  animationDuration={1}
  ease='back.inOut(2)'
  scrollStart='center bottom+=50%'
  scrollEnd='bottom bottom-=40%'
  stagger={0.03}
>
Our Famous Venues
</ScrollFloat>

      {/* Venue Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {venues.map((venue, index) => (
          <motion.div
            key={venue.name}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:scale-105"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            {/* Venue Image */}
            <img
              src={venue.image}
              alt={venue.name}
              className="w-full h-56 object-cover"
              loading="lazy"
            />

            {/* Venue Info */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800">{venue.name}</h2>
              <p className="text-gray-600 mt-2">{venue.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-yellow-500 font-bold">{venue.rating} ⭐</span>
                <a
                  href={venue.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ED5374] font-semibold hover:text-[#E72E77] transition duration-300"
                >
                  View Venue →
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FamousVenues;
