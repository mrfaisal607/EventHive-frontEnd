import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import ScrollFloat from "./ScrollFloat";

const testimonials = [
  {
    id: 1,
    name: "Aarav Mehta",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
    rating: 5,
    review:
      "Booking a venue through this platform was seamless! The service was outstanding, and the venue was exactly as described.",
  },
  {
    id: 2,
    name: "Simran Kaur",
    image: "https://randomuser.me/api/portraits/women/20.jpg",
    rating: 4,
    review:
      "Great experience! Found the perfect venue at the best price. The customer support was very responsive and helpful.",
  },
  {
    id: 3,
    name: "Rahul Sharma",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    rating: 5,
    review:
      "The hassle-free booking process made my event planning stress-free. Highly recommend this platform for weddings and parties!",
  },
  {
    id: 4,
    name: "Pooja Patel",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    rating: 5,
    review:
      "I was able to book a venue in minutes! The website is easy to use, and the variety of venues available is amazing.",
  },
  {
    id: 5,
    name: "Vikram Rajput",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    rating: 4,
    review:
      "Had a wonderful experience booking a banquet hall for my sister’s wedding. The venue was just perfect!",
  },
  {
    id: 6,
    name: "Khansaab",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    rating: 4,
    review:
      "The hassle-free booking process made my event planning stress-free. Highly recommend this platform for weddings and parties!",
  },
];

const Testimonials = () => {
  return (
    <div className="w-full py-16 px-6 text-center bg-gray-50 text-black">
      {/* Heading */}
      {/* <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center text-4xl font-bold mb-8 tracking-tight"
      >
        What Our Customers Say
      </motion.h2> */}
       <ScrollFloat 
  animationDuration={1}
  ease='back.inOut(2.1)'
  scrollStart='center bottom+=50%'
  scrollEnd='bottom bottom-=40%'
  stagger={0.02}
>
What Our Customers Say
</ScrollFloat>
      {/* Testimonials Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="p-6 bg-white rounded-2xl shadow-lg text-center hover:shadow-xl transition-all"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 mx-auto rounded-full border-2 border-[#ED7E96] mb-4"
            />
            <h3 className="text-xl font-semibold">{testimonial.name}</h3>
            <div className="flex justify-center mt-2">
              {[...Array(testimonial.rating)].map((_, index) => (
                <Star key={index} size={20} className="text-yellow-500" fill="currentColor" />
              ))}
            </div>
            <p className="text-gray-600 mt-4 text-sm">{testimonial.review}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
