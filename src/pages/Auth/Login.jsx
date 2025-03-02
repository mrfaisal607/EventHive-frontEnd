import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, Loader } from "lucide-react"; // Added Loader for loading state
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";

// Framer Motion Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return;
    }

    dispatch(loginUser(formData)).then((res) => {
      if (res.payload) {
        navigate("/profile");
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-50 to-purple-50 px-4">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 flex flex-col items-center border border-gray-200"
      >
        {/* 🔹 Title */}
        <motion.h2
          variants={scaleUp}
          initial="hidden"
          animate="visible"
          className="text-3xl font-bold text-[#ED7E96] mb-6"
        >
          Login to Your Account
        </motion.h2>

        {/* 🔹 Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm mb-4"
          >
            {error}
          </motion.p>
        )}

        {/* 🔹 Login Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {/* Email */}
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="relative w-full"
          >
            <label className="text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED7E96] focus:border-transparent transition"
              placeholder="Enter your email"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="relative w-full"
          >
            <label className="text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 flex items-center justify-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED7E96] focus:border-transparent pr-12 transition"
                placeholder="Enter your password"
              />
              {/* Show/Hide Password */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </motion.div>

          {/* Forgot Password */}
          <div className="text-right text-sm text-[#ED7E96] hover:underline cursor-pointer">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          {/* 🔹 Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-[#ED7E96] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#E72E77] transition"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader size={20} />
              </motion.div>
            ) : (
              <>
                Login <LogIn size={20} />
              </>
            )}
          </motion.button>
        </form>

        {/* 🔹 OR Divider */}
        <div className="w-full flex items-center gap-2 my-4">
          <div className="h-[1px] bg-gray-300 w-full"></div>
          <span className="text-gray-500">OR</span>
          <div className="h-[1px] bg-gray-300 w-full"></div>
        </div>

        {/* 🔹 Register Links */}
        <p className="text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <Link to="/register/customer" className="text-[#ED7E96] hover:underline">
            Register as Customer
          </Link>{" "}
          or{" "}
          <Link to="/register/vendor" className="text-[#ED7E96] hover:underline">
            Register as Vendor
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;