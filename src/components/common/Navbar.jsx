

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const navRef = useRef(null);
  const navigate = useNavigate();
  let timeoutId = useRef(null);

  // Get logged-in user from Redux state
  const { user } = useSelector((state) => state.auth);

  // GSAP Navbar Animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  // Dropdown handlers
  const handleMouseEnter = (menu) => {
    clearTimeout(timeoutId.current);
    setDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      setDropdown(null);
    }, 300);
  };

  return (
    <nav
      ref={navRef}
      className="bg-transparent fixed top-0 w-full text-[#F75590] z-[9999] backdrop-blur-md "
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-[#ED5374]">
              EventHive
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-5">
            <Link
              to="/"
              className="font-semibold uppercase hover:text-[#ED5374] transition"
            >
              Home
            </Link>
            {/* Venues Dropdown */}
     <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("venues")}
              onMouseLeave={handleMouseLeave}
            >
              
              <Link to="/venues" className="font-semibold uppercase hover:text-[#ED5374] transition">
                Venues
              </Link>
              <AnimatePresence>
                {dropdown === "venues" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-4 w-[30vw] bg-white shadow-lg rounded-lg p-4 grid grid-cols-2 gap-4 text-sm"
                  >
                    <div>
                      <h3 className="text-gray-900 text-lg font-bold mb-2">
                        By Occasion
                      </h3>
                      {[
                        "Wedding Venues",
                        "Engagement Venues",
                        "Birthday Party",
                        "Corporate Events",
                      ].map((item, index) => (
                        <Link
                          key={index}
                          to="/venues"
                          className="block py-1 text-gray-700 hover:bg-gray-100 rounded-md p-2"
                        >
                          {item}
                        </Link>
                      ))}
                      <Link
                        to="/venues"
                        className="block text-[#ED5374] font-bold mt-2"
                      >
                        View All Venues
                      </Link>
                    </div>
                    <div>
                      <h3 className="text-gray-900 text-lg font-bold mb-2">
                        By Venue Type
                      </h3>
                      {[
                        "Banquet Halls",
                        "Hotels",
                        "Restaurants",
                        "Resorts",
                      ].map((item, index) => (
                        <Link
                          key={index}
                          to="/venues"
                          className="block py-1 text-gray-700 hover:bg-gray-100 rounded-md p-2"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

             {/* Services Dropdown */}
              <div
               className="relative"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/events" className="font-semibold uppercase hover:text-[#ED5374] transition">
                 Events
              </Link>
              <AnimatePresence>
                {dropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-4 w-[30vw] bg-white shadow-lg rounded-lg p-4 grid grid-cols-2 gap-4 text-sm"
                  >
                    <div>
                      {[
                        "Photographers",
                        "Makeup Artists",
                        "Mehndi Artists",
                        "Caterers",
                      ].map((item, index) => (
                        <Link
                          key={index}
                          to="/services"
                          className="block py-1 text-gray-700 hover:bg-gray-100 rounded-md p-2"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                     <div>
                       {["Jewellers", "Event Planners", "Magicians"].map(
                         (item, index) => (
                           <Link
                             key={index}
                             to="/services"
                             className="block py-1 text-gray-700 hover:bg-gray-100 rounded-md p-2"
                           >
                             {item}
                           </Link>
                         )
                       )}
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div> 
            <Link
              to="/contact"
              className="font-semibold uppercase hover:text-[#ED5374] transition"
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className="font-semibold uppercase hover:text-[#ED5374] transition"
            >
              About Us
            </Link>
            <Link
              to="/faq"
              className="font-semibold uppercase hover:text-[#ED5374] transition"
            >
              FAQ
            </Link>

            {/* 🔹 Authenticated User (Show Profile Picture & Redirect to Dashboard) */}
            {user ? (
              <div
                className="flex items-center cursor-pointer"
                onClick={() =>navigate("/profile")}
              >
                <img
                  src={user.avatar || "https://i.pravatar.cc/40"} // Default Avatar
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-[#ED5374] hover:opacity-80 transition"
                />
              </div>
            ) : (
              // 🔹 Not Logged In (Show Log In, Sign Up, Vendor Link)
              <>
                <Link
                  to="/register/vendor"
                  className="bg-[#ED5374] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#E72E77] transition"
                >
                  ARE YOU A VENDOR?
                </Link>
                <Link
                  to="/login"
                  className="bg-[#ED5374] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#E72E77] transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register/customer"
                  className="bg-[#ED5374] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#E72E77] transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden mr-2">
            <button onClick={() => setIsOpen(!isOpen)} className="text-black">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden p-2 bg-white shadow-md text-center"
          >
            <Link to="/" className="block py-2 px-4 hover:bg-gray-100">
              Home
            </Link>
            <Link to="/venues" className="block py-2 px-4 hover:bg-gray-100">
              Venues
            </Link>
            <Link to="/events" className="block py-2 px-4 hover:bg-gray-100">
              Events
            </Link>
            <Link to="/contact" className="block py-2 px-4 hover:bg-gray-100">
              Contact Us
            </Link>
            <Link to="/about" className="block py-2 px-4 hover:bg-gray-100">
              About Us
            </Link>
            <Link to="/faq" className="block py-2 px-4 hover:bg-gray-100">
              FAQ
            </Link>

            {/* 🔹 Check if User is Logged In */}
            {user ? (
              <div
                className="flex justify-center items-center py-2 cursor-pointer"
                onClick={() => {
                  if (user.role === "customer") navigate("/profile");
                  if (user.role === "vendor") navigate("/profile");
                  if (user.role === "admin") navigate("/profile");
                }}
              >
                <img
                  src={user.avatar || "https://i.pravatar.cc/40"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-[#ED5374] hover:opacity-80 transition"
                />
              </div>
            ) : (
              // 🔹 If NOT Logged In → Show "ARE YOU A VENDOR?", "Log In", "Sign Up"
              <>
                <Link
                  to="/register/vendor"
                  className="block py-2 px-4 rounded-lg bg-[#ED7E96] text-white hover:bg-[#ED5374]"
                >
                  ARE YOU A VENDOR?
                </Link>
                <Link
                  to="/login"
                  className="block py-2 px-4 rounded-lg bg-[#ED7E96] text-white hover:bg-[#ED5374]"
                >
                  Log In
                </Link>
                <Link
                  to="/register/customer"
                  className="block py-2 px-4 rounded-lg bg-[#ED7E96] text-white hover:bg-[#ED5374]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
