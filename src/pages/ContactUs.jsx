import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, User, Loader } from "lucide-react";
import SplitText from "../components/common/SplitText";

// ✅ Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white px-6 py-12">
      {/* ✅ Heading Section */}
      <SplitText
        text="Contact Us"
        className="font-semibold text-center"
        delay={160}
        animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
        animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
        easing="easeOutCubic"
        threshold={0.1}
        rootMargin="-50px"
      />

      <motion.p
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="text-center text-gray-700 text-lg md:text-xl max-w-2xl mb-8"
      >
        Have questions? Our team is here to help. Reach out to us and we’ll get back to you as soon as possible.
      </motion.p>

      {/* ✅ Contact Form & Info */}
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* 📍 Contact Information */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="bg-[#ED7E96] p-8 rounded-2xl shadow-lg flex flex-col gap-6 border border-white/30"
        >
          <h3 className="text-white text-2xl font-bold mb-4">Our Office</h3>

          <div className="flex items-center gap-4">
            <MapPin size={24} className="text-white" />
            <p className="text-white text-lg">Ahmedabad, Gujarat, India</p>
          </div>
          <div className="flex items-center gap-4">
            <Phone size={24} className="text-white" />
            <p className="text-white text-lg">+91 87338 73314</p>
          </div>
          <div className="flex items-center gap-4">
            <Mail size={24} className="text-white" />
            <p className="text-white text-lg">support@eventHive.com</p>
          </div>

          {/* 🌍 Google Maps */}
          <div className="w-full h-56 rounded-lg overflow-hidden shadow-lg border-2 border-white">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              width="100%"
              height="300"
              src="https://www.openstreetmap.org/export/embed.html?bbox=72.5000,23.0000,72.7000,23.2000&layer=mapnik&marker=23.0300,72.5800"
              aria-label="Ahmedabad, Gujarat, India"
            ></iframe>
          </div>
        </motion.div>

        {/* 📩 Contact Form */}
        <motion.form
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6 border border-gray-200"
        >
          <h3 className="text-center text-2xl font-bold text-gray-800 mb-2">
            Send us a message
          </h3>

          {/* ✏ Name Field */}
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED7E96] transition"
            />
            <label className="absolute left-4 top-3 text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-[#ED7E96] peer-focus:text-sm">
              <User size={16} className="inline-block mr-2" /> Your Name
            </label>
          </div>

          {/* ✉ Email Field */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder=" "
              className="peer w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED7E96] transition"
            />
            <label className="absolute left-4 top-3 text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-[#ED7E96] peer-focus:text-sm">
              <Mail size={16} className="inline-block mr-2" /> Your Email
            </label>
          </div>

          {/* 📝 Message Field */}
          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              placeholder=" "
              className="peer w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED7E96] transition"
            ></textarea>
            <label className="absolute left-4 top-3 text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-[#ED7E96] peer-focus:text-sm">
              ✏ Type your message...
            </label>
          </div>

          {/* 🚀 Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#ED7E96] text-white py-3 rounded-lg font-semibold transition hover:bg-[#D9206A]"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader size={20} />
              </motion.div>
            ) : (
              <>
                Send Message <Send size={20} />
              </>
            )}
          </motion.button>

          {/* ✅ Success Message */}
          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-green-600 text-center font-semibold mt-2"
            >
              ✅ Your message has been sent!
            </motion.p>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default ContactUs;