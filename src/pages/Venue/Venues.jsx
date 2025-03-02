import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SplitText from "../../components/common/SplitText"
import ClickSpark from "../../components/common/ClickSpark";
// Dummy Data for Venues
const dummyVenues = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Venue ${i + 1}`,
  image: `https://source.unsplash.com/600x400/?hotel,resort,venue&random=${i + 1}`,
  rating: (4.2 + Math.random() * 0.8).toFixed(1),
  startingPrice: [40000, 50000, 60000, 70000, 80000][Math.floor(Math.random() * 5)],
  location: ["Mumbai", "Delhi", "Bangalore", "Jaipur", "Hyderabad", "Chennai", "Pune", "Goa"][Math.floor(Math.random() * 8)],
  capacity: [300, 500, 700, 1000, 1500][Math.floor(Math.random() * 5)],
  occasion: ["Wedding Venues", "Corporate Events", "Birthday Party", "Engagement Venues"][Math.floor(Math.random() * 4)],
  type: ["Banquet Halls", "Hotels", "Restaurants", "Resorts"][Math.floor(Math.random() * 4)],
}));

// Dropdown Filter Options
const filterOptions = {
  occasion: ["Select Occasion", "Wedding Venues", "Engagement Venues", "Birthday Party", "Corporate Events"],
  type: ["Select Venue Type", "Banquet Halls", "Hotels", "Restaurants", "Resorts"],
  location: ["Select Location", "Mumbai", "Delhi", "Bangalore", "Jaipur", "Hyderabad", "Chennai", "Pune", "Goa"],
  budget: ["Select Budget", "Below ₹50,000", "₹50,000 - ₹70,000", "Above ₹70,000"],
  capacity: ["Select Capacity", "Below 300", "300-700", "Above 700"],
  rating: ["Select Rating", "4.5 & Above", "4.8 & Above"],
};

const Venues = () => {
  const [venues, setVenues] = useState([]); // API or dummy data
  const [filters, setFilters] = useState({
    occasion: "Select Occasion",
    type: "Select Venue Type",
    location: "Select Location",
    budget: "Select Budget",
    capacity: "Select Capacity",
    rating: "Select Rating",
  });

  // Fetch Venues from API (or fallback to dummy data)
  useEffect(() => {
    // Simulating an API request with a delay
    setTimeout(() => {
      setVenues([]); // Simulating empty API response (fallback to dummy data)
    }, 1000);
  }, []);

  // Handle Filter Changes
  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  // Filter Logic
  const filteredVenues = (venues.length ? venues : dummyVenues).filter((venue) => {
    return (
      (filters.occasion === "Select Occasion" || venue.occasion === filters.occasion) &&
      (filters.type === "Select Venue Type" || venue.type === filters.type) &&
      (filters.location === "Select Location" || venue.location === filters.location) &&
      (filters.budget === "Select Budget" ||
        (filters.budget === "Below ₹50,000" && venue.startingPrice < 50000) ||
        (filters.budget === "₹50,000 - ₹70,000" && venue.startingPrice >= 50000 && venue.startingPrice <= 70000) ||
        (filters.budget === "Above ₹70,000" && venue.startingPrice > 70000)) &&
      (filters.capacity === "Select Capacity" ||
        (filters.capacity === "Below 300" && venue.capacity < 300) ||
        (filters.capacity === "300-700" && venue.capacity >= 300 && venue.capacity <= 700) ||
        (filters.capacity === "Above 700" && venue.capacity > 700)) &&
      (filters.rating === "Select Rating" ||
        (filters.rating === "4.5 & Above" && venue.rating >= 4.5) ||
        (filters.rating === "4.8 & Above" && venue.rating >= 4.8))
    );
  });

  return (
    <ClickSpark
  sparkColor='#ED7E96'
  sparkSize={10}
  sparkRadius={15}
  sparkCount={8}
  duration={400}
>
  
    <div className="w-full min-h-screen text-center bg-white py-12 px-6 md:px-[6vw] pt-20">
      {/* 🔹 Header */}
      {/* <motion.h1 className="text-[32px] md:text-[48px] font-semibold text-center text-gray-800">
        Discover Stunning Venues 
      </motion.h1> */}
      <SplitText
  text=" Discover    Stunning     Venues "
  className="font-semibold text-center"
  delay={160}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
  easing="easeOutCubic"
  threshold={0.10}
  rootMargin="-50px"

/>
      <motion.p className="text-[18px] text-gray-600 text-center mt-2">
        Find the perfect venue for your special event.
      </motion.p>

      {/* 🔹 Filters Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 w-full">
          {Object.keys(filterOptions).map((filterType, index) => (
            <select
              key={index}
              className="p-3 border rounded-lg w-full bg-[#ED7E96] text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#E72E77] cursor-pointer"
              value={filters[filterType]}
              onChange={(e) => handleFilterChange(filterType, e.target.value)}
            >
              {filterOptions[filterType].map((option, idx) => (
                <option key={idx} value={option} className="text-black">
                  {option}
                </option>
              ))}
            </select>
          ))}
        </div>

        {/* Reset Filters Button */}
        <button
          className="p-3 bg-[#ED7E96] text-white rounded-lg hover:bg-[#E72E77] transition"
          onClick={() =>
            setFilters({
              occasion: "Select Occasion",
              type: "Select Venue Type",
              location: "Select Location",
              budget: "Select Budget",
              capacity: "Select Capacity",
              rating: "Select Rating",
            })
          }
        >
          Reset Filters
        </button>
      </div>

      {/* 🔹 Venues Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <motion.div
              key={venue.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/venues/${venue.id}`} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <img src={venue.image} alt={venue.name} className="w-full h-56 object-cover rounded-t-lg" />
                <div className="p-5 text-center">
                  <h2 className="text-xl font-bold text-gray-800">{venue.name}</h2>
                  <p className="text-gray-600 mt-2">
                    ⭐ {venue.rating} &nbsp; | 💰 {venue.startingPrice} &nbsp; | 📍 {venue.location}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No venues match your filters.</p>
        )}
      </div>
    </div>
</ClickSpark>
  );
};

export default Venues;
