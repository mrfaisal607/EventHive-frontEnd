import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";

// Animation Variants
const faqVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: index * 0.1 },
  }),
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // FAQ Data
  const faqs = [
    {
      question: "How do I book a venue?",
      answer:
        "Booking a venue is simple! Browse our selection, choose your desired location, and follow the checkout process.",
    },
    {
      question: "What payment options are available?",
      answer:
        "We accept all major credit/debit cards, UPI payments, and online bank transfers.",
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer:
        "Yes, cancellations and rescheduling are available under certain conditions. Please refer to our cancellation policy for details.",
    },
    {
      question: "Are there any additional charges?",
      answer:
        "There are no hidden fees. However, additional services such as catering or decorations may come at an extra cost.",
    },
  ];

  return (
    <div className="w-full bg-white py-12 px-4 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Left Section */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-[6vw] sm:text-[4vw] md:text-[3vw] font-bold text-black leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Have questions? We’ve got answers! Check out the most frequently
            asked questions to help plan your perfect event.
          </p>
          <Link
            to="/contact"
            className="bg-[#ED5374] text-white font-semibold w-[60%] sm:w-[40%] md:w-[30%] flex items-center justify-center mt-6 py-2 px-4 rounded-lg hover:bg-[#E72E77] transition"
          >
            Contact Us
          </Link>
        </div>

        {/* Right Section (FAQ List) */}
        <div className="md:w-1/2">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4 border-b border-gray-300 pb-4 cursor-pointer"
              variants={faqVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <div
                className="flex justify-between items-center text-lg font-medium text-gray-800 hover:text-[#ED5374] transition-all duration-300"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="text-xl">
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </div>
              {openIndex === index && (
                <motion.p
                  className="mt-2 text-gray-600 text-md transition-all duration-300"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
