import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice"; // ✅ Redux action
import { motion } from "framer-motion";
import { Eye, EyeOff, UserPlus, Loader } from "lucide-react"; // Added Loader for loading state
import { Link } from "react-router-dom";

// ✅ Password Validation Regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#_])[A-Za-z\d@#_]{8,}$/;

// ✅ Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const RegisterCustomer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth); // ✅ Redux state

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      if (passwordRegex.test(value)) {
        setPasswordStrength("strong");
      } else if (value.length >= 6) {
        setPasswordStrength("medium");
      } else {
        setPasswordStrength("weak");
      }
    }

    setFormError("");
  };

  // ✅ Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Validate Input Fields
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setFormError("⚠️ All fields are required!");
      return;
    }

    // 🔹 Validate Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError("⚠️ Invalid email format!");
      return;
    }

    // 🔹 Validate Password Strength
    if (!passwordRegex.test(formData.password)) {
      setFormError("⚠️ Password must be 8+ characters, include uppercase, lowercase, number, and a special character (@, #, _).");
      return;
    }

    // 🔹 Check Password Confirmation
    if (formData.password !== formData.confirmPassword) {
      setFormError("⚠️ Passwords do not match!");
      return;
    }

    // ✅ Dispatch Redux Action for Registration
    try {
      const res = await dispatch(
        registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "customer", // ✅ Ensure correct role
        })
      );

      if (res.payload) {
        navigate("/login"); // ✅ Redirect on success
      }
    } catch (err) {
      setFormError("⚠️ Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center pt-[10vh] pb-[10vh] justify-center min-h-screen bg-gradient-to-r from-pink-50 to-purple-50 px-4">
      <motion.div
        variants={fadeIn}
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
          Register as Customer
        </motion.h2>

        {/* 🔹 Show Error Messages */}
        {formError && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm mb-4"
          >
            {formError}
          </motion.p>
        )}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm mb-4"
          >
            {error}
          </motion.p>
        )}

        {/* 🔹 Registration Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {/* Full Name */}
          <motion.div whileFocus={{ scale: 1.02 }} className="relative w-full">
            <label className="text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED7E96] focus:border-transparent transition"
              placeholder="Enter your full name"
            />
          </motion.div>

          {/* Email Address */}
          <motion.div whileFocus={{ scale: 1.02 }} className="relative w-full">
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
          <motion.div whileFocus={{ scale: 1.02 }} className="relative w-full">
            <label className="text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED7E96] focus:border-transparent pr-12 transition"
                placeholder="Create a password"
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
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2 text-sm">
                Password Strength:{" "}
                <span
                  className={`font-semibold ${
                    passwordStrength === "weak"
                      ? "text-red-500"
                      : passwordStrength === "medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {passwordStrength}
                </span>
              </div>
            )}
          </motion.div>

          {/* Confirm Password */}
          <motion.div whileFocus={{ scale: 1.02 }} className="relative w-full">
            <label className="text-gray-700 font-medium">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED7E96] focus:border-transparent pr-12 transition"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </motion.div>

          {/* Register Button */}
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
                Register <UserPlus size={20} />
              </>
            )}
          </motion.button>
        </form>

        {/* Already have an account? */}
        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#ED7E96] hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterCustomer;