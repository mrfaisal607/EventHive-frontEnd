import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Framer Motion Animation Variants
const fadeIn = (direction = "up", delay = 0) => {
  return {
    hidden: { opacity: 0, y: direction === "up" ? 50 : -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
  };
};

const AboutUs = () => {
  return (
    
    <div className="w-full bg-white pt-[10vh] py-10 px-6 md:px-[6vw]">
      {/* Header Section */}
      <motion.h1
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        animate="visible"
        className="text-[40px] md:text-[60px] font-light text-center leading-[50px] md:leading-[75px] max-w-4xl mx-auto font-['ivymode-regular']"
      >
        Browse our exquisite venues and let us help you plan the wedding of your dreams.
      </motion.h1>

      <motion.p
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        animate="visible"
        className="text-[18px] md:text-[20px] font-semibold text-center mt-4 max-w-2xl mx-auto"
      >
        Check out our short history and why we’ve decided to get into the EventHive business.
      </motion.p>

      {/* Hero Image Section */}
      <motion.div
        variants={fadeIn("up", 0.5)}
        initial="hidden"
        animate="visible"
        className="relative w-full h-[50vh] md:h-[70vh] bg-cover bg-center rounded-xl overflow-hidden mt-8"
        style={{
          backgroundImage:
            "url('https://cdn-fbhab.nitrocdn.com/uCuyTSBUCNXyXVzstxLARRgQRdrqgTQJ/assets/images/optimized/rev-871fec3/www.baliweddingprices.com/wp-content/uploads/2022/02/about-bali-wedding-scaled.jpg')",
        }}
      >
        <img
          className="w-[8vw] md:w-[3vw] absolute left-1/2 top-4 transform -translate-x-1/2 animate-bounce"
          src="https://cdn-fbhab.nitrocdn.com/uCuyTSBUCNXyXVzstxLARRgQRdrqgTQJ/assets/images/optimized/rev-871fec3/www.baliweddingprices.com/wp-content/uploads/2022/01/scroll-arrow.svg"
          alt="Scroll Down"
          loading="lazy"
        />
      </motion.div>

      {/* Vision & Mission */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full mt-12">
        {[
          {
            title: "Our Vision",
            text: "To be the all-in-one wedding planning solution, offering a comprehensive platform that connects couples with everything they need to create their perfect day.",
          },
          {
            title: "Our Mission",
            text: "To build a thriving community of couples and wedding vendors, facilitating collaboration and creating a supportive ecosystem for",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="w-full md:w-1/2 bg-[#FDF2F4] rounded-3xl py-6 px-6 md:px-[3vw] shadow-md transition-all duration-300"
          >
            <h1 className="text-[24px] md:text-[2vw] text-[#ED7E96] font-bold font-['ivymode-regular']">
              {item.title}
            </h1>
            <p className="text-[18px] md:text-[22px] mt-6 leading-[30px]">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* History Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full mt-12">
        <motion.div
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          animate="visible"
          className="w-full md:w-1/2"
        >
          <img
            src="https://cdn-fbhab.nitrocdn.com/uCuyTSBUCNXyXVzstxLARRgQRdrqgTQJ/assets/images/optimized/rev-871fec3/www.baliweddingprices.com/wp-content/uploads/2022/02/bali-wedding-history.jpg"
            className="object-cover object-center w-full rounded-xl shadow-lg"
            alt="History"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          variants={fadeIn("right", 0.5)}
          initial="hidden"
          animate="visible"
          className="w-full md:w-1/2"
        >
          <h1 className="text-[32px] md:text-[45px] font-semibold leading-[40px] md:leading-[52px]">
            A Slice of History & Quick Facts About EventHive
          </h1>
          <p className="text-[18px] mt-6 leading-[27px]">
            EventHive began in 2025 as a simple directory of local venues. We quickly realized the need for a more comprehensive platform that connected couples with all the essential elements of a wedding.
          </p>
          <p className="text-[18px] mt-6 leading-[27px]">
            We’ve slowly improved our business into a properly designed and functional site you see today, offering a collection of services you need for the best wedding experience.
          </p>
        </motion.div>
      </div>

      {/* Contact Section */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="w-full h-auto md:h-[40vh] rounded-3xl bg-[#ED7E96] flex flex-col md:flex-row items-center mt-12 justify-center gap-10 py-8 px-6 md:px-8 text-white"
      >
        <div className="w-full md:w-1/2">
          <h1 className="text-[24px] md:text-[35px] font-['ivymode-regular'] leading-[35px]">
            So, What's a Dream Wedding Like to You?
          </h1>
          <p className="text-[18px] mt-4 mb-10">
            Contact us now and we’ll get you the best wedding vendors to ensure your dream wedding comes true.
          </p>
          <Link
            to="/contact"
            className="bg-black mt-10 text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#E72E77] transition"
          >
            Contact Us
          </Link>
        </div>

        <div className="w-full md:w-1/2">
          <img
            className="w-full h-full object-cover rounded-3xl shadow-md"
            src="https://cdn-fbhab.nitrocdn.com/uCuyTSBUCNXyXVzstxLARRgQRdrqgTQJ/assets/images/optimized/rev-871fec3/www.baliweddingprices.com/wp-content/uploads/2022/01/having-a-wedding-in-bali.jpeg"
            alt="Dream Wedding"
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
