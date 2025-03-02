import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    // GSAP Animations for Text and Search Bar
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
    );

    gsap.fromTo(
      searchRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.8 }
    );

    // Parallax Background Effect
    gsap.to(bgRef.current, {
      scale: 1.1,
      scrollTrigger: {
        trigger: bgRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  const handleSearch = () => {
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    
    <div
      className="relative w-full h-screen flex  flex-col items-center justify-center text-center overflow-hidden"
      data-scroll
      data-scroll-section
      data-scroll-speed="-0.3"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1601482441062-b9f13131f33a?q=80&w=2070&auto=format&fit=crop')`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Hero Content */}
      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center px-6 md:px-12"
      >
        <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 md:p-10 rounded-2xl shadow-lg max-w-2xl w-full">
          <h1 className="text-3xl md:text-5xl font-['ivymode-regular']   font-bold text-white">
            Find the Perfect Venue
          </h1>
          <p className="mt-4 text-base md:text-lg text-white">
            Discover and book the best venues for your special events with ease.
          </p>

          {/* Search Bar */}
          <div
            ref={searchRef}
            className="mt-6 flex items-center bg-white bg-opacity-20 backdrop-blur-lg rounded-full shadow-lg overflow-hidden w-full p-2"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-gray-800 bg-transparent outline-none placeholder-white"
              placeholder="Search for venues..."
            />
            <button
              onClick={handleSearch}
              className="px-4 md:px-6 py-2 md:py-3 bg-[#ED5374] hover:bg-[#E72E77] transition-all duration-300 text-white font-semibold rounded-full"
              onMouseEnter={(e) =>
                gsap.to(e.target, { scale: 1.1, duration: 0.2, ease: "power1.out" })
              }
              onMouseLeave={(e) =>
                gsap.to(e.target, { scale: 1, duration: 0.2 })
              }
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
