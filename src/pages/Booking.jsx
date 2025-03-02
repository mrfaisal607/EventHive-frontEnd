"use client"

import React, { useState, useEffect } from "react"
import { useParams, useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"
import { CalendarCheck, Users, ArrowRight, CheckCircle, Loader2, Building, Clock, Download } from "lucide-react"
import PaymentForm from "../components/Payment"
import { jsPDF } from "jspdf";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
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

// Default venue data (used if API fails)
const defaultVenue = {
  name: "Luxury Banquet Hall",
  image: "https://images.unsplash.com/photo-1568530873454-e4103a0b3c71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  capacity: 500,
  price: 50000,
  description:
    "A stunning banquet hall offering world-class services, perfect for weddings, corporate events, and special occasions.",
  location: { address: "123 Main St", city: "Mumbai", state: "Maharashtra" },
}

// Booking steps
const STEPS = {
  DETAILS: 0,
  PAYMENT: 1,
  CONFIRMATION: 2,
}

const Booking = () => {
  const { venueId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const selectedDate = searchParams.get("date") || ""

  const [venue, setVenue] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(STEPS.DETAILS)
  const [bookingId, setBookingId] = useState(null)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
    eventType: "wedding",
    specialRequests: "",
  })

  
  // Fetch venue details
  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/venues/${venueId}`)
        setVenue(res.data)
      } catch (error) {
        console.error("Error fetching venue:", error)
        setVenue(defaultVenue)
      } finally {
        setLoading(false)
      }
    }
    fetchVenueDetails()
  }, [venueId])

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Handle booking submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.name || !formData.email || !formData.phone || !formData.guests) {
      setError("Please fill in all required fields.")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.")
      return
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.")
      return
    }

    const bookingData = {
      venueId,
      date: selectedDate,
      ...formData,
      guests: Number.parseInt(formData.guests),
      totalAmount: venue.price,
    }

    try {
      setIsSubmitting(true)
      // Simulating API call with setTimeout
      setTimeout(() => {
        const mockResponse = {
          bookingId: "BK" + Math.floor(Math.random() * 10000000),
          status: "pending",
        }

        setBookingId(mockResponse.bookingId)
        setCurrentStep(STEPS.PAYMENT)
        setIsSubmitting(false)
      }, 1500)
    } catch (error) {
      console.error("Error submitting booking:", error)
      setError("Failed to book the venue. Please try again.")
      setIsSubmitting(false)
    }
  }

  // Handle payment success
  const handlePaymentSuccess = () => {
    setPaymentSuccess(true)
    setCurrentStep(STEPS.CONFIRMATION)
  }

  // Handle booking another venue
  const handleBookAnother = () => {
    navigate("/venues")
  }

  // Handle download invoice
  const handleDownloadInvoice = () => {
    const doc = new jsPDF();
  
    // Add a title
    doc.setFontSize(18);
    doc.text("Invoice", 10, 20);
  
    // Add a line
    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25);
  
    // Reset font size for content
    doc.setFontSize(12);
  
    // Add booking details
    doc.text(`Booking ID: ${bookingId}`, 10, 35);
    doc.text(`Venue: ${venue.name}`, 10, 45);
    doc.text(`Date: ${selectedDate}`, 10, 55);
    doc.text(`Guests: ${formData.guests}`, 10, 65);
    doc.text(`Total Amount: ₹${venue.price.toLocaleString()}`, 10, 75);
  
    // Save the PDF
    doc.save(`invoice_${bookingId}.pdf`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#ED7E96]" />
          <p className="mt-4 text-gray-600">Loading venue details...</p>
        </div>
      </div>
    )
  }

  // Render booking steps
  const renderStep = () => {
    switch (currentStep) {
      case STEPS.DETAILS:
        return (
          <motion.form
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="mt-8 max-w-3xl w-full bg-white p-8 rounded-lg shadow-md border border-gray-200"
          >
            <motion.h2 variants={fadeIn} className="text-2xl font-semibold text-gray-800 text-center mb-6">
              Complete Your Booking
            </motion.h2>

            {error && (
              <motion.div
                variants={fadeIn}
                className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.div variants={fadeIn} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#ED7E96] focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#ED7E96] focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="1234567890"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#ED7E96] focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
                    Number of Guests *
                  </label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    placeholder="100"
                    min="1"
                    max={venue.capacity}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#ED7E96] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">
                  Event Type *
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#ED7E96] focus:outline-none"
                >
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">
                  Special Requests (Optional)
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Any special arrangements or requirements..."
                  rows={3}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#ED7E96] focus:outline-none"
                ></textarea>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="mt-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Venue:</span>
                    <span className="font-medium">{venue.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Price:</span>
                    <span className="font-medium">₹{venue.price.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount:</span>
                      <span className="text-[#ED7E96]">₹{venue.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-[#ED7E96] hover:bg-[#E72E77] text-white font-semibold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Payment <ArrowRight size={20} />
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        )

      case STEPS.PAYMENT:
        return (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mt-8 max-w-3xl w-full">
            <PaymentForm amount={venue.price} bookingId={bookingId || ""} onSuccess={handlePaymentSuccess} />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentStep(STEPS.DETAILS)}
              className="w-full mt-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg shadow transition-colors"
            >
              Previous
            </motion.button>
          </motion.div>
        )

      case STEPS.CONFIRMATION:
        return (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="mt-8 max-w-3xl w-full bg-white p-8 rounded-lg shadow-md border border-gray-200 text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">Your booking has been successfully confirmed.</p>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 text-left">
              <h3 className="font-medium text-gray-800 mb-4">Booking Details</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Building className="h-5 w-5 text-[#ED7E96] mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">{venue.name}</p>
                    <p className="text-sm text-gray-600">
                      {venue.location.address}, {venue.location.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CalendarCheck className="h-5 w-5 text-[#ED7E96] mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-sm text-gray-600">{selectedDate}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="h-5 w-5 text-[#ED7E96] mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Guests</p>
                    <p className="text-sm text-gray-600">{formData.guests} people</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-[#ED7E96] mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Booking ID</p>
                    <p className="text-sm text-gray-600">{bookingId}</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              A confirmation email has been sent to {formData.email} with all the details.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBookAnother}
                className="px-6 py-3 bg-[#ED7E96] hover:bg-[#E72E77] text-white font-semibold rounded-lg shadow transition-colors"
              >
                Book Another Venue
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownloadInvoice}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Download Invoice
              </motion.button>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-full mt-[10vh] min-h-screen bg-gray-50 py-12 px-6 md:px-[6vw] flex flex-col items-center">
      {/* Progress Steps */}
      <div className="w-full max-w-3xl mb-6">
        <div className="flex justify-between">
          {Object.keys(STEPS).map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep ? "bg-[#ED7E96] text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <span className={`text-xs mt-1 ${index <= currentStep ? "text-gray-800" : "text-gray-500"}`}>
                {step.charAt(0) + step.slice(1).toLowerCase()}
              </span>
            </div>
          ))}
        </div>
        <div className="relative flex justify-between mt-2">
          <div className="absolute top-0 left-4 right-4 h-1 bg-gray-200">
            <div
              className="h-full bg-[#ED7E96]"
              style={{ width: `${(currentStep / (Object.keys(STEPS).length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Venue Summary Card */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-md border border-gray-200"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={venue.image || "/placeholder.svg"}
            alt={venue.name}
            className="w-full md:w-1/3 h-48 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-800">{venue.name}</h1>
            <div className="flex items-center text-gray-600 mt-2">
              <CalendarCheck className="h-5 w-5 mr-2" />
              <span>
                Booking for <span className="font-medium">{selectedDate}</span>
              </span>
            </div>
            <div className="flex items-center text-gray-600 mt-1">
              <Users className="h-5 w-5 mr-2" />
              <span>
                Capacity: <span className="font-medium">{venue.capacity} People</span>
              </span>
            </div>
            <div className="mt-3 text-lg font-semibold text-[#ED7E96]">₹{venue.price.toLocaleString()}</div>
            <p className="mt-2 text-gray-600 text-sm line-clamp-3">{venue.description}</p>
          </div>
        </div>
      </motion.div>

      {/* Current Step Content */}
      {renderStep()}
    </div>
  )
}

export default Booking