import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { MapPin, Star, Users, Calendar, CheckCircle, XCircle, Send, ImageIcon, ArrowRight } from 'lucide-react';
import ImageSlider from "../../components/common/ImageSlider";

// Animation variants
const fadeInUp = { 
  hidden: { opacity: 0, y: 50 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } 
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Dummy data fallback
const dummyVenue = {
  id: "1",
  name: "Luxury Banquet Hall",
  images: [
    { url: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", public_id: "img1" },
    { url: "https://images.unsplash.com/photo-1560332218-4d266ab9793a?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", public_id: "img2" },
    { url: "https://images.unsplash.com/photo-1542665952-14513db15293?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", public_id: "img3" },
    { url: "https://images.unsplash.com/photo-1568530873454-e4103a0b3c71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", public_id: "img3" },
    { url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", public_id: "img3" },
  ],
  rating: 4.7,
  price: 55000,
  location: { address: "Ahmedabad", city: "Ahmedabad", state: "Gujarat", country: "India" },
  capacity: 500,
  amenities: ["WiFi", "Parking", "Catering", "Stage", "Music System", "Air Conditioning", "Decoration"],
  description:
    "A premium banquet hall offering luxurious facilities, perfect for weddings, corporate events, and special occasions. Our venue features elegant interiors, state-of-the-art sound systems, and professional staff to ensure your event is memorable.",
  availableDates: ["2025-03-15", "2025-03-27", "2025-04-15", "2025-05-05"],
  reviews: [
    { user: "John Doe", rating: 5, comment: "Amazing venue with excellent service! The staff was very helpful and accommodating." },
    { user: "Jane Smith", rating: 4.5, comment: "Had a fantastic wedding here! The venue looked stunning and our guests loved it." },
    { user: "Raj Patel", rating: 4.8, comment: "Perfect location for our corporate event. Great amenities and professional management." },
  ],
};

const VenueDetail = () => {
  const { venueId } = useParams();
  const [venue, setVenue] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ user: "", rating: "", comment: "" });
  const [reviews, setReviews] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/venues/${venueId}`);
        setVenue(res.data || dummyVenue);
        setReviews(res.data?.reviews || dummyVenue.reviews);
      } catch (error) {
        console.error("Error fetching venue details:", error);
        setVenue(dummyVenue);
        setReviews(dummyVenue.reviews);
      } finally {
        setLoading(false);
      }
    };

    fetchVenueDetails();
  }, [venueId]);

  // Check availability
  const checkAvailability = () => {
    if (!selectedDate) {
      setAvailabilityMessage("❌ Please select a date.");
      return;
    }

    if (venue.availableDates.includes(selectedDate)) {
      setAvailabilityMessage(`✅ Venue is available on ${selectedDate}!`);
    } else {
      setAvailabilityMessage(`❌ Venue is not available on ${selectedDate}. Try another date.`);
    }
  };

  // Handle new review submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.user || !newReview.rating || !newReview.comment) {
      alert("Please fill out all fields!");
      return;
    }

    // Simulate API call (Replace with actual API call)
    const updatedReviews = [...reviews, { ...newReview, rating: parseFloat(newReview.rating) }];
    setReviews(updatedReviews);
    setNewReview({ user: "", rating: "", comment: "" });
  };

  // Open gallery with specific image
  const openGallery = (index = 0) => {
    setSelectedImageIndex(index);
    setShowGallery(true);
  };

  // Calculate average rating
  const avgRating =
    reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : "No reviews yet";

  // Convert images for react-image-gallery
  const galleryImages = venue?.images?.map((img) => ({
    original: img.url,
    thumbnail: img.url,
  })) || [];

  // Show skeleton loader while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-t-4 border-[#ED7E96] border-solid rounded-full"></div>
      </div>
    );
  }

  // If venue not found
  if (!venue) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700">
        <h2 className="text-2xl font-semibold">Venue Not Found</h2>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-20 bg-white py-12 px-6 md:px-[6vw]">
      {/* Main Image with Gallery Thumbnails */}
      <motion.div 
        variants={fadeInUp} 
        initial="hidden" 
        animate="visible"
        className="relative"
      >
        <img
          src={venue.images[0]?.url || "/placeholder.svg"}
          alt={venue.name}
          className="w-full h-[55vh] object-cover rounded-lg shadow-lg cursor-pointer"
          onClick={() => openGallery(0)}
        />
        
        {/* Image Gallery Button */}
        <button 
          onClick={() => openGallery(0)}
          className="absolute bottom-4  right-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all"
        >
          <ImageIcon size={20} />
          <span>View All Photos ({venue.images.length})</span>
        </button>
        
        {/* Thumbnail Preview */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full">
          {venue.images.slice(0, 5).map((image, index) => (
            <img
              key={image.public_id}
              src={image.url || "/placeholder.svg"}
              alt={`${venue.name} thumbnail ${index + 1}`}
              className="h-20 w-20 object-cover rounded-md shadow-md cursor-pointer border-2 border-white hover:border-[#ED7E96] transition-all"
              onClick={() => openGallery(index)}
            />
          ))}
          {venue.images.length > 5 && (
            <div 
              className="h-20 w-20 bg-black bg-opacity-70 rounded-md shadow-md flex items-center justify-center text-white cursor-pointer"
              onClick={() => openGallery(5)}
            >
              +{venue.images.length - 5}
            </div>
          )}
        </div>
      </motion.div>

      {/* Venue Details */}
      <motion.div 
        variants={fadeInUp} 
        initial="hidden" 
        animate="visible" 
        className="mt-16 max-w-4xl mx-auto"
      >
        <h1 className="text-[36px] md:text-[48px] font-bold text-gray-800">{venue.name}</h1>
        <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600">
          <p className="flex items-center gap-2">
            <Star className="text-yellow-500" size={20} /> {avgRating}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={20} /> {venue.location.address}, {venue.location.city}
          </p>
          <p className="flex items-center gap-2">
            <Users size={20} /> Capacity: {venue.capacity} People
          </p>
        </div>

        <p className="text-2xl font-bold text-[#ED7E96] mt-4">
          Starting from ₹{venue.price.toLocaleString()}
        </p>

        <p className="text-gray-700 text-lg mt-6">{venue.description}</p>
      </motion.div>

      {/* Amenities Section */}
      <motion.div 
        variants={fadeInUp} 
        initial="hidden" 
        animate="visible" 
        className="mt-12 max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Amenities & Features</h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {venue.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-500" />
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Availability Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="mt-12 max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Check Availability</h2>
        <p className="text-gray-600 mt-2">Select a date to check if the venue is available.</p>

        <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-auto">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="date"
              className="pl-10 p-3 w-full sm:w-auto border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED7E96]"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setAvailabilityMessage(""); // Reset message when changing date
              }}
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-6 py-3 bg-[#ED7E96] hover:bg-[#E72E77] text-white font-semibold rounded-lg shadow transition-colors"
            onClick={checkAvailability}
          >
            Check Availability
          </motion.button>
        </div>

        {/* Show Availability Message */}
        {availabilityMessage && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 text-lg font-semibold ${availabilityMessage.includes("❌") ? "text-red-500" : "text-green-500"}`}
          >
            {availabilityMessage}
          </motion.p>
        )}

        {/* Show "Book Now" Button Only When Venue is Available */}
        {availabilityMessage.includes("✅") && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Link 
              to={`/booking/${venueId}?date=${selectedDate}`}
              className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-colors"
            >
              Book Now <ArrowRight size={20} />
            </Link>
          </motion.div>
        )}
      </motion.div>

      {/* Reviews Section */}
      <motion.div 
        variants={fadeInUp} 
        initial="hidden" 
        animate="visible" 
        className="mt-12 max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Customer Reviews</h2>
        <div className="flex items-center gap-2 mt-2">
          <Star className="text-yellow-500" size={24} />
          <span className="text-xl font-semibold">{avgRating}</span>
          <span className="text-gray-500">({reviews.length} reviews)</span>
        </div>

        {/* Existing Reviews */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-6 space-y-4"
        >
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <p className="font-semibold">{review.user}</p>
                <div className="flex items-center gap-1 text-yellow-500 my-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < Math.floor(review.rating) ? "currentColor" : "none"} 
                      className={i < Math.floor(review.rating) ? "text-yellow-500" : "text-gray-300"} 
                    />
                  ))}
                  <span className="ml-2 text-gray-700">{review.rating}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          )}
        </motion.div>

        {/* Add Review Form */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">Leave a Review</h3>
          <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4 mt-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input 
                id="name"
                type="text" 
                placeholder="Enter your name" 
                value={newReview.user} 
                onChange={(e) => setNewReview({ ...newReview, user: e.target.value })} 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#ED7E96] focus:outline-none" 
                required 
              />
            </div>
            
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <select
                id="rating"
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#ED7E96] focus:outline-none"
                required
              >
                <option value="">Select Rating</option>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
              <textarea 
                id="comment"
                placeholder="Share your experience" 
                value={newReview.comment} 
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#ED7E96] focus:outline-none min-h-[100px]" 
                required
              ></textarea>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-[#ED7E96] text-white p-3 rounded-lg hover:bg-[#E72E77] transition flex items-center justify-center gap-2"
            >
              Submit Review <Send size={20} />
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ImageSlider 
              images={galleryImages} 
              onClose={() => setShowGallery(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VenueDetail;
