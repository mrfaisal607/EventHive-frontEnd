import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
      {/* Animation Wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full"
      >
        {/* Icon */}
        <div className="text-red-500 text-6xl mb-4">🚫</div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Access Denied
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          You do not have the required permissions to access this page.
        </p>

        {/* Back to Home Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)} // Go back to the last visited page
          className="bg-[#E72E77] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#D9206A] transition"
        >
          🔙 Go Back
        </motion.button>

        {/* Or navigate to the homepage */}
        <div className="mt-4">
          <Link
            to="/"
            className="text-[#E72E77] font-semibold hover:underline"
          >
            Go to Homepage
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotAuthorized;
