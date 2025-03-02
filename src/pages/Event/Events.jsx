import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import SplitText from "../../components/common/SplitText";

// 🎨 Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// 📌 Fallback Dummy Data
const dummyCategories = [
  {
    name: "Photographers",
    image: "https://source.unsplash.com/300x200/?photographer",
    count: 120,
  },
  {
    name: "Makeup Artists",
    image: "https://source.unsplash.com/300x200/?makeup",
    count: 85,
  },
  {
    name: "Caterers",
    image: "https://source.unsplash.com/300x200/?catering",
    count: 150,
  },
  {
    name: "Decorators",
    image: "https://source.unsplash.com/300x200/?decoration",
    count: 90,
  },
  {
    name: "Wedding Planners",
    image: "https://source.unsplash.com/300x200/?wedding",
    count: 70,
  },
  {
    name: "DJ Services",
    image: "https://source.unsplash.com/300x200/?dj",
    count: 60,
  },
  {
    name: "Florists",
    image: "https://source.unsplash.com/300x200/?flowers",
    count: 100,
  },
  {
    name: "Event Hosts",
    image: "https://source.unsplash.com/300x200/?event",
    count: 50,
  },
];

const Events = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Fetch Categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events/categories");
        setCategories(res.data); // Expecting { name, image, count }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setError("Failed to load event categories. Showing default data.");
        setCategories(dummyCategories); // Use dummy data if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full min-h-screen text-center bg-white py-12 px-6 md:px-[6vw]">
      {/* Header Section */}
      {/* <motion.h1
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-[32px] md:text-[48px] font-semibold text-center text-gray-800"
      >
        Our Services 🎭
      </motion.h1> */}
      <SplitText
  text=" Our   Services  "
  className="font-semibold text-center"
  delay={160}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
  easing="easeOutCubic"
  threshold={0.10}
  rootMargin="-50px"

/>

      <motion.p
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="text-[18px] text-gray-600 text-center mt-2"
      >
        Choose from our wide range of services to make your event special.
      </motion.p>

      {/* Loading & Error Handling */}
      {loading && <p className="text-center text-gray-500 mt-4">Loading categories...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {/* Services Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {categories.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <Link to={`/events/${service.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <img src={service.image} alt={service.name} className="w-full h-56 object-cover" />
                <div className="p-5 text-center">
                  <h2 className="text-xl font-bold text-gray-800">{service.name}</h2>
                  <p className="text-sm text-gray-500">{service.count}+ Vendors Available</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
