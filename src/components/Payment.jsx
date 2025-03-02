"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Calendar, User, Lock, CheckCircle, Loader2, AlertCircle, QrCode } from "lucide-react"
// import { QRCode } from "qrcode.react" // Correct import for QRCode

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const Payment = ({ amount, bookingId, onSuccess }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState("idle")
  const [paymentMethod, setPaymentMethod] = useState("card") // Default payment method
  const [upiId, setUpiId] = useState("") // UPI ID for QR code generation

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format expiry date (MM/YY)
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "cardNumber") {
      setCardDetails({
        ...cardDetails,
        [name]: formatCardNumber(value),
      })
    } else if (name === "expiryDate") {
      setCardDetails({
        ...cardDetails,
        [name]: formatExpiryDate(value),
      })
    } else {
      setCardDetails({
        ...cardDetails,
        [name]: value,
      })
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  // Validate card form
  const validateCardForm = () => {
    const newErrors = {}

    // Card number validation (16 digits)
    if (!cardDetails.cardNumber.replace(/\s/g, "").match(/^[0-9]{16}$/)) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number"
    }

    // Card name validation
    if (!cardDetails.cardName.trim()) {
      newErrors.cardName = "Please enter the name on card"
    }

    // Expiry date validation (MM/YY format)
    if (!cardDetails.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiryDate = "Please enter a valid expiry date (MM/YY)"
    } else {
      // Check if card is expired
      const [month, year] = cardDetails.expiryDate.split("/")
      const expiryDate = new Date(2000 + Number.parseInt(year), Number.parseInt(month) - 1, 1)
      const today = new Date()

      if (expiryDate < today) {
        newErrors.expiryDate = "Card has expired"
      }
    }

    // CVV validation (3 or 4 digits)
    if (!cardDetails.cvv.match(/^[0-9]{3,4}$/)) {
      newErrors.cvv = "Please enter a valid CVV (3 or 4 digits)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle payment submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (paymentMethod === "card" && !validateCardForm()) {
      return
    }

    setIsProcessing(true)
    setPaymentStatus("processing")

    // Simulate payment processing
    setTimeout(() => {
      // 90% chance of success
      const isSuccess = Math.random() < 0.9

      if (isSuccess) {
        setPaymentStatus("success")
        // Call onSuccess after a brief delay to show the success message
        setTimeout(() => {
          onSuccess()
        }, 1500)
      } else {
        setPaymentStatus("error")
        setIsProcessing(false)
      }
    }, 2000)
  }

  // Retry payment
  const handleRetry = () => {
    setPaymentStatus("idle")
    setIsProcessing(false)
  }

  // Generate UPI payment link
  const generateUpiLink = () => {
    const upiId = "your-upi-id@bank" // Replace with your UPI ID
    const amount = venue.price
    const note = `Booking ID: ${bookingId}`
    return `upi://pay?pa=${upiId}&pn=YourBusinessName&am=${amount}&tn=${note}`
  }

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="bg-white p-8 rounded-lg shadow-md border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Payment Details</h2>

      {paymentStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <div>
            <p className="text-red-600 font-medium">Payment Failed</p>
            <p className="text-sm text-red-500">
              Your payment could not be processed. Please check your details and try again.
            </p>
          </div>
        </div>
      )}

      {paymentStatus === "success" ? (
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Payment Successful!</h3>
          <p className="text-gray-600">Your payment of ₹{amount.toLocaleString()} has been processed successfully.</p>
          <p className="text-sm text-gray-500 mt-2">Redirecting to confirmation page...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Payment Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`px-4 py-2 rounded-lg ${
                  paymentMethod === "card"
                    ? "bg-[#ED7E96] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`px-4 py-2 rounded-lg ${
                  paymentMethod === "upi"
                    ? "bg-[#ED7E96] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                UPI
              </button>
            </div>
          </div>

          {paymentMethod === "card" ? (
            <>
              {/* Card Payment Form */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <div className="flex gap-2">
                    <img src="/placeholder.svg?height=24&width=36" alt="Visa" className="h-6" />
                    <img src="/placeholder.svg?height=24&width=36" alt="Mastercard" className="h-6" />
                  </div>
                </div>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className={`w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:outline-none ${
                      errors.cardNumber ? "border-red-300 focus:ring-red-200" : "focus:ring-[#ED7E96]"
                    }`}
                    disabled={isProcessing}
                  />
                </div>
                {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                  Name on Card
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={cardDetails.cardName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:outline-none ${
                      errors.cardName ? "border-red-300 focus:ring-red-200" : "focus:ring-[#ED7E96]"
                    }`}
                    disabled={isProcessing}
                  />
                </div>
                {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={`w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:outline-none ${
                        errors.expiryDate ? "border-red-300 focus:ring-red-200" : "focus:ring-[#ED7E96]"
                      }`}
                      disabled={isProcessing}
                    />
                  </div>
                  {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
                </div>

                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="password"
                      id="cvv"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={4}
                      className={`w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:outline-none ${
                        errors.cvv ? "border-red-300 focus:ring-red-200" : "focus:ring-[#ED7E96]"
                      }`}
                      disabled={isProcessing}
                    />
                  </div>
                  {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* UPI Payment Form */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Scan QR Code to Pay</label>
                <div className="flex justify-center">
                  {/* <QRCode value={generateUpiLink()} size={200} /> */}
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Scan the QR code using any UPI app to complete your payment.
                </p>
              </div>
            </>
          )}

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Booking ID:</span>
              <span className="font-medium">{bookingId}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">₹{amount.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span className="text-[#ED7E96]">₹{amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-[#ED7E96] hover:bg-[#E72E77] text-white font-semibold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
            disabled={isProcessing}
          >
            {paymentStatus === "processing" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                Pay ₹{amount.toLocaleString()} <CreditCard size={20} />
              </>
            )}
          </motion.button>

          <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center">
            <Lock size={14} className="mr-1" />
            Your payment information is secure and encrypted
          </p>
        </form>
      )}
    </motion.div>
  )
}

export default Payment