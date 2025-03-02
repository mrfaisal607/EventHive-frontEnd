import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollFloat from "../common/ScrollFloat";

const ServicesMarquee = ({ data }) => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    gsap.to(marqueeRef.current, {
      x: "-50%", // Adjusted for seamless looping
      duration: 10, // Speed of the scroll
      ease: "linear",
      repeat: -1,
    });
  }, []);

  return (
    <div
      className="w-full flex flex-col items-center justify-center bg-white pt-10 overflow-hidden"
      data-scroll
      data-scroll-section
      data-scroll-speed="0.2"
    >
      {/* Title */}
      {/* <h1 className="text-[8vw] sm:text-[5vw] md:text-[4vw] font-bold mb-10 text-center text-gray-900 tracking-tight">

      </h1> */}
      <ScrollFloat
  animationDuration={1}
  ease='back.inOut(2)'
  scrollStart='center bottom+=50%'
  scrollEnd='bottom bottom-=40%'
  stagger={0.03}
>
Our Services
</ScrollFloat>

      {/* Marquee Wrapper */}
      <div className="w-full overflow-hidden relative py-6">
        <motion.div
          ref={marqueeRef}
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex w-max gap-6 sm:gap-10 items-center"
        >
          {[...data, ...data].map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center p-4 rounded-xl shadow-md border border-gray-300 bg-white overflow-hidden w-[50vw] sm:w-[30vw] md:w-[20vw] lg:w-[15vw] h-[50vw] sm:h-[30vw] md:h-[20vw] lg:h-[15vw]"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[80%] object-cover rounded-lg"
                loading="lazy"
              />
              <p className="text-[3vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1.2vw] font-semibold text-gray-800 mt-2 text-center">
                {item.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesMarquee;
