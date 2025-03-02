import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

// 🎨 Framer Motion Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// 📌 **Fallback Dummy Vendors**
const dummyVendors = [
  {
    _id: "1",
    name: "Elite Photography",
    images: ["https://source.unsplash.com/400x300/?photography"],
    avgRating: 4.8,
    price: "₹15,000",
    location: "Mumbai, India",
  },
  {
    _id: "2",
    name: "Glamour Makeup Studio",
    images: ["https://source.unsplash.com/400x300/?makeup"],
    avgRating: 4.5,
    price: "₹10,000",
    location: "Delhi, India",
  },
  {
    _id: "3",
    name: "Royal Catering Services",
    images: ["https://source.unsplash.com/400x300/?catering"],
    avgRating: 4.7,
    price: "₹25,000",
    location: "Bangalore, India",
  },
  {
    _id: "4",
    name: "Elegant Decorators",
    images: ["https://source.unsplash.com/400x300/?decoration"],
    avgRating: 4.9,
    price: "₹30,000",
    location: "Hyderabad, India",
  },
];

const EventVendorList = () => {
  const { serviceName } = useParams(); // Get selected service from URL
  const formattedService = serviceName.toLowerCase().replace(/\s+/g, "-"); // Ensure consistency

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Fetch Vendors Based on Category
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/category/${formattedService}`);
        setVendors(res.data);
      } catch (err) {
        console.error("Failed to fetch vendors:", err);
        setError("Failed to load vendors. Showing default data.");
        setVendors(dummyVendors); // Use Dummy Data if API Fails
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [formattedService]);

  return (
    <div className="w-full min-h-screen bg-white pt-20 py-12 px-6 md:px-[6vw]">
      {/* ✅ Header */}
      <motion.h1
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-[32px] md:text-[48px] capitalize font-semibold text-center text-gray-800"
      >
        {serviceName.replace("-", " ")} Vendors
      </motion.h1>

      {/* ✅ Loader */}
      {loading && <p className="text-center text-gray-600 mt-5">Loading vendors...</p>}

      {/* ✅ Error Handling */}
      {error && <p className="text-center text-red-500 mt-5">{error}</p>}

      {/* ✅ Vendors List */}
      {!loading && vendors.length === 0 ? (
        <p className="text-center text-gray-600 mt-5">
          No vendors available for {serviceName.replace("-", " ")}.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {vendors.map((vendor, index) => (
            <motion.div
              key={vendor._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <Link to={`/events/${serviceName}/${vendor._id}`}>
                <img
                  src={vendor.images[0] || "https://via.placeholder.com/300"}
                  alt={vendor.name}
                  className="w-full h-56 object-center object-cover"
                />
                <div className="p-5 text-center">
                  <h2 className="text-xl font-bold text-gray-800">
                    {vendor.name}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    ⭐ {vendor.avgRating || "N/A"} &nbsp; | &nbsp; 💰 {vendor.price}{" "}
                    &nbsp; | &nbsp; 📍 {vendor.location || "Unknown"}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventVendorList;
