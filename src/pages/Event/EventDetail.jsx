"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { MapPin, Star, Calendar, Send, ImageIcon } from "lucide-react"
// import ImageSlider from "./image-slider"
import ImageSlider from "../../components/common/ImageSlider";


// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Dummy data fallback
const dummyService = {
  id: "1",
  name: "Pro Click Studios",
  category: "Photographers",
  description:
    "Expert event photography with 10+ years of experience. Our team specializes in capturing the perfect moments for weddings, corporate events, and special occasions. We use professional equipment and provide high-quality edited photos within a quick turnaround time.",
  price: 15000,
  location: { city: "Mumbai", state: "Maharashtra", country: "India" },
  images: [
    { url: "https://source.unsplash.com/900x500/?photography,wedding", public_id: "img1" },
    { url: "https://source.unsplash.com/900x500/?event,photography", public_id: "img2" },
    { url: "https://source.unsplash.com/900x500/?photography,portrait", public_id: "img3" },
    { url: "https://source.unsplash.com/900x500/?camera,lens", public_id: "img4" },
  ],
  availableDates: ["2025-03-10", "2025-03-20", "2025-04-05"],
  avgRating: 4.8,
  reviews: [
    {
      user: "Priya Sharma",
      rating: 5,
      comment: "Absolutely amazing photography! They captured our wedding beautifully.",
    },
    {
      user: "Rahul Mehta",
      rating: 4.5,
      comment: "Professional service and great quality photos for our corporate event.",
    },
  ],
}

const EventDetail = () => {
  const { serviceId } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showGallery, setShowGallery] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [newReview, setNewReview] = useState({ user: "", rating: "", comment: "" })
  const [reviews, setReviews] = useState([])

  // Fetch service data
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/services/${serviceId}`)
        setService(res.data || dummyService)
        setReviews(res.data?.reviews || dummyService.reviews)
      } catch (err) {
        console.error("Error fetching service:", err)
        setError("Failed to load service details. Showing default data.")
        setService(dummyService)
        setReviews(dummyService.reviews)
      } finally {
        setLoading(false)
      }
    }

    fetchServiceDetails()
  }, [serviceId])

  // Open gallery with specific image
  const openGallery = (index = 0) => {
    setSelectedImageIndex(index)
    setShowGallery(true)
  }

  // Handle new review submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!newReview.user || !newReview.rating || !newReview.comment) {
      alert("Please fill out all fields!")
      return
    }

    // Simulate API call (Replace with actual API call)
    const updatedReviews = [...reviews, { ...newReview, rating: Number.parseFloat(newReview.rating) }]
    setReviews(updatedReviews)
    setNewReview({ user: "", rating: "", comment: "" })
  }

  // Convert images for react-image-gallery
  const galleryImages =
    service?.images?.map((img) => ({
      original: img.url,
      thumbnail: img.url,
    })) || []

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-t-4 border-[#ED7E96] border-solid rounded-full"></div>
      </div>
    )
  }

  // If service not found
  if (!service) {
    return (
      <div className="text-center text-gray-600 min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">Service Not Found</h2>
      </div>
    )
  }

  return (
    <div className="w-full pt-20 min-h-screen bg-white py-12 px-6 md:px-[6vw] relative">
      {/* Main Image */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="relative">
        <img
          src={service.images[0]?.url || "/placeholder.svg"}
          alt={service.name}
          className="w-full h-[50vh] object-cover rounded-lg shadow-md cursor-pointer"
          onClick={() => openGallery(0)}
        />

        {/* Image Gallery Button */}
        <button
          onClick={() => openGallery(0)}
          className="absolute bottom-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all"
        >
          <ImageIcon size={20} />
          <span>View All Photos ({service.images.length})</span>
        </button>

        {/* Thumbnail Preview */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full">
          {service.images.slice(0, 5).map((image, index) => (
            <img
              key={image.public_id}
              src={image.url || "/placeholder.svg"}
              alt={`${service.name} thumbnail ${index + 1}`}
              className="h-20 w-20 object-cover rounded-md shadow-md cursor-pointer border-2 border-white hover:border-[#ED7E96] transition-all"
              onClick={() => openGallery(index)}
            />
          ))}
          {service.images.length > 5 && (
            <div
              className="h-20 w-20 bg-black bg-opacity-70 rounded-md shadow-md flex items-center justify-center text-white cursor-pointer"
              onClick={() => openGallery(5)}
            >
              +{service.images.length - 5}
            </div>
          )}
        </div>
      </motion.div>

      {/* Service Details */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mt-16 max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-[32px] md:text-[42px] font-bold text-gray-800">{service.name}</h1>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
            {service.category}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600">
          <p className="flex items-center gap-2">
            <Star className="text-yellow-500" size={20} /> {service.avgRating}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={20} /> {service.location.city}, {service.location.state}
          </p>
        </div>

        <p className="text-2xl font-bold text-[#ED7E96] mt-4">Starting from ₹{service.price.toLocaleString()}</p>

        <p className="text-gray-700 text-lg mt-6">{service.description}</p>
      </motion.div>

      {/* Availability Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="mt-12 max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Available Dates</h2>
        <p className="text-gray-600 mt-2">This service is available on the following dates:</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {service.availableDates.map((date, index) => (
            <div key={index} className="flex items-center gap-1 bg-white border border-gray-200 px-3 py-2 rounded-md">
              <Calendar size={16} className="text-[#ED7E96]" />
              <span>{date}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            className="px-6 py-3 bg-[#ED7E96] hover:bg-[#E72E77] text-white font-semibold rounded-lg shadow transition-colors"
            onClick={() => (window.location.href = `/booking/${serviceId}`)}
          >
            Book This Service
          </button>
        </div>
      </motion.div>

      {/* Reviews Section */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800">Customer Reviews</h2>
        <div className="flex items-center gap-2 mt-2">
          <Star className="text-yellow-500" size={24} />
          <span className="text-xl font-semibold">{service.avgRating}</span>
          <span className="text-gray-500">({reviews.length} reviews)</span>
        </div>

        {/* Existing Reviews */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mt-6 space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <motion.div key={index} variants={fadeInUp} className="bg-gray-50 p-4 rounded-lg shadow-sm">
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
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
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
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
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Your Review
              </label>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ImageSlider images={galleryImages} onClose={() => setShowGallery(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EventDetail

