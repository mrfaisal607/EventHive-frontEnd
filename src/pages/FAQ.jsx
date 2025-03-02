import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SplitText from "../components/common/SplitText";

const faqs = [
  {
    question: "How do I book a venue on EventHive?",
    answer:
      "Browse venues, check availability, and complete your booking with secure payments.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes! Cancellation and rescheduling depend on the venue’s policy. Review terms before booking.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept credit/debit cards, UPI, net banking, and other secure payment options.",
  },
  {
    question: "Do I need to create an account to book?",
    answer:
      "Yes, an account lets you track bookings, receive updates, and manage events efficiently.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "Our support team is available 24/7 via email or live chat for assistance.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check user theme preference
    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className={`relative w-full min-h-screen py-16 pt-[15vh] px-6 md:px-[6vw] transition ${
        isDarkMode ? "bg-white text-black" : "bg-gray-50 text-black"
      }`}
    >
      {/* Background Gradient & Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 w-[500px] h-[500px] bg-gradient-to-r from-[#ED7E96] to-[#E72E77] opacity-20 blur-[150px]"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-r  from-[#E72E77] to-[#ED7E96] opacity-20 blur-[150px]"></div>
      </div>

      {/* FAQ Header */}
      {/* <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-[40px] md:text-[60px] font-bold text-center mx-auto leading-[50px] md:leading-[75px] w-[90%] md:w-[75%]"
      >
        
      </motion.h1> */}
      <div className="text-center">

      <SplitText
  text=" Frequently   Asked    Questions "
  className="font-semibold text-center "
  delay={160}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
  easing="easeOutCubic"
  threshold={0.10}
  rootMargin="-50px"

/>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-[18px] md:text-[20px] font-medium mx-auto text-center w-[90%] md:w-[50%] mt-4"
      >
        Everything you need to know about venue bookings, payments, and policies.
      </motion.p>

      {/* FAQ Section */}
      <div className="mt-12 max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`mb-4 p-6 rounded-2xl shadow-md ${
              isDarkMode ? "bg-zinc-100" : "bg-white"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left text-[20px] md:text-[22px] font-semibold hover:text-[#E72E77] text-black transition"
            >
              {faq.question}
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl"
              >
                ▼
              </motion.span>
            </button>

            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={
                openIndex === index
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.3 }}
              className="text-[18px]  text-gray-500 mt-2 overflow-hidden"
            >
              {faq.answer}
            </motion.p>
          </motion.div>
        ))}
      </div>

      {/* Contact Support CTA */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="w-full h-[40vh] flex flex-col items-center mt-12 py-8 px-6 md:px-8 bg-[#ED7E96] text-white rounded-3xl text-center shadow-lg"
      >
        <h2 className="text-[24px] md:text-[30px] font-semibold">
          Still have questions?
        </h2>
        <p className="text-[18px] mt-3">
          Our support team is here to help you 24/7.
        </p>
        <Link to="/contact" className="mt-4 w-[100%] md:w-[15%] bg-black py-3 px-6 rounded-lg text-white font-semibold hover:bg-[#E72E77] transition">
          Contact Support
        </Link>
      </motion.div>
    </div>
  );
}

export default FAQ;
