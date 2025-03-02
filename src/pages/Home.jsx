import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import LocomotiveScroll from "locomotive-scroll";
import { FaArrowRightLong } from "react-icons/fa6";
import Card from "../components/Card";
import WhyChooseUs from "../components/common/WhyChooseUs";
import Testimonials from "../components/common/Testimonials ";
import { Link } from "react-router-dom";
import HeroSection from "../components/sections/HeroSection";
import ServicesMarquee from "../components/sections/ServicesMarquee";
import FamousVenues from "../components/sections/FamousVenues";
import FAQSection from "../components/sections/FAQSection";
import ClickSpark from "../components/common/ClickSpark";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const scrollRef = useRef(null); // ✅ Correctly initializing useRef

  useEffect(() => {
    if (!scrollRef.current) return; // Prevent errors if ref is null

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.1, // Adjust scrolling speed
      multiplier: 0.9, // Adjust the intensity of the smooth effect
    });

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  const searchRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // Text animation
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
    );

    // Search bar animation
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

    // Marquee Animation
  }, []);

  const servicesData = [
    {
      image:
        "https://www.venuelook.com/_next/image?url=https%3A%2F%2Fcdn.venuelook.com%2Fimages%2Fnew-home-images%2Foptimized%2Fvendor%2Fphotographer.jpg&w=256&q=75",
      name: "Photographers",
    },
    {
      image:
        "https://www.venuelook.com/_next/image?url=https%3A%2F%2Fcdn.venuelook.com%2Fimages%2Fnew-home-images%2Foptimized%2Fvendor%2Fmakeup.jpg&w=256&q=75",
      name: "Makeup Artists",
    },
    {
      image:
        "https://www.venuelook.com/_next/image?url=https%3A%2F%2Fcdn.venuelook.com%2Fimages%2Fnew-home-images%2Foptimized%2Fvendor%2Fmehandi.jpg&w=256&q=75",
      name: "Mehndi Artists",
    },
    {
      image:
        "https://www.venuelook.com/_next/image?url=https%3A%2F%2Fcdn.venuelook.com%2Fimages%2Fnew-home-images%2Foptimized%2Fvendor%2Fcaterer.jpg&w=256&q=75",
      name: "Caterers",
    },
    {
      image:
        "https://www.venuelook.com/_next/image?url=https%3A%2F%2Fcdn.venuelook.com%2Fimages%2Fnew-home-images%2Foptimized%2Fvendor%2Fdecorators.jpg&w=256&q=75",
      name: "Decorators",
    },
    {
      image:
        "https://images.unsplash.com/photo-1461784180009-21121b2f204c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "DJ",
    },
  ];

  //   for famousVenues
  const venuesData = [
    {
      name: "Renaissance",
      image:
        "https://cache.marriott.com/content/dam/marriott-renditions/AMDBR/amdbr-facade-6080-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*",
      rating: 4.8,
      description:
        "A luxurious venue with top-tier amenities and exquisite design.",
      link: "https://renaissance-ahmedabad.com",
    },
    {
      name: "Hyatt",
      image:
        "https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2024/03/05/0105/AMDHY-P0141-Facade.jpg/AMDHY-P0141-Facade.16x9.jpg?imwidth=480",
      rating: 4.7,
      description: "Elegant and modern, perfect for grand celebrations.",
      link: "https://hyatt-ahmedabad.com",
    },
    {
      name: "Courtyard by Marriott",
      image:
        "https://cache.marriott.com/content/dam/marriott-renditions/AMDCY/amdcy-exterior-0050-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*",
      rating: 4.6,
      description:
        "Ideal for weddings and corporate events with state-of-the-art facilities.",
      link: "https://courtyard-marriott-ahmedabad.com",
    },
  ];
  return (
    <ClickSpark
    sparkColor='#ED7E96'
    sparkSize={10}
    sparkRadius={15}
    sparkCount={8}
    duration={400}
  >

    <div ref={scrollRef} data-scroll-container className="w-full bg-white">
      <HeroSection />
      <ServicesMarquee data={servicesData} />
      <FamousVenues venues={venuesData} />
      <WhyChooseUs />
      <Testimonials />
      <FAQSection />
    </div>
  </ClickSpark>
  );
}

export default Home;
