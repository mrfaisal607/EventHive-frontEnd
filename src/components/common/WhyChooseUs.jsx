import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, Headphones, BadgeCheck } from "lucide-react";
import ScrollFloat from "./ScrollFloat";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Verified Venues",
      description: "All our venues are verified and meet high-quality standards.",
      icon: <ShieldCheck size={40} className="text-[#ED7E96]" />,
    },
    {
      id: 2,
      title: "Best Price Guarantee",
      description: "Get the best deals with exclusive discounts on top venues.",
      icon: <BadgeCheck size={40} className="text-[#ED7E96]" />,
    },
    {
      id: 3,
      title: "24/7 Customer Support",
      description: "Our team is always available to assist you at any time.",
      icon: <Headphones size={40} className="text-[#ED7E96]" />,
    },
    {
      id: 4,
      title: "Hassle-Free Booking",
      description: "Book your perfect venue in just a few clicks with no stress.",
      icon: <CheckCircle size={40} className="text-[#ED7E96]" />,
    },
  ];

  return (
    <div className="w-full py-16 px-6 bg-gray-50 text-center text-black">
      {/* Heading */}
      {/* <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center text-4xl font-bold mb-8 tracking-tight"
      >
        Why Choose Us?
      </motion.h2> */}
      <ScrollFloat
  animationDuration={1}
  ease='back.inOut(2)'
  scrollStart='center bottom+=50%'
  scrollEnd='bottom bottom-=40%'
  stagger={0.03}
>
Why Choose Us? 
</ScrollFloat>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg text-center hover:shadow-xl transition-all"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
            <p className="text-gray-600 mt-2 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
