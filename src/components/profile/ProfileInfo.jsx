import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../redux/slices/authSlice";
import { motion } from "framer-motion";
import { FaEdit, FaCloudUploadAlt, FaSave, FaTimes, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/YOUR_CLOUDINARY_NAME/upload";
const CLOUDINARY_PRESET = "YOUR_UPLOAD_PRESET";

const ProfileInfo = ({ user }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    avatar: user.avatar || "https://via.placeholder.com/100",
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Image Upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", CLOUDINARY_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_URL, imageData);
      setFormData({ ...formData, avatar: res.data.secure_url });
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Profile Update
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
    setEditMode(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white p-6 rounded-xl w-full shadow-md border border-[#ED7E96] max-w-lg mx-auto"
    >
      {/* Profile Image Upload */}
      <div className="relative w-28 h-28 mx-auto">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src={formData.avatar}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-[#ED7E96] shadow-lg"
        />
        {editMode && (
          <label className="absolute bottom-1 right-1 bg-[#ED7E96] p-2 rounded-full cursor-pointer shadow-md">
            <FaCloudUploadAlt className="text-white text-lg" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        )}
      </div>

      {/* Profile Info */}
      {!editMode ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-4"
        >
          <h2 className="text-2xl font-semibold text-black">{formData.name}</h2>
          <p className="text-gray-700">{formData.email}</p>
          <div className="flex items-center justify-center gap-2 text-gray-700 mt-2">
            <FaPhone className="text-[#ED7E96]" />
            <p>{formData.phone || "No phone number added"}</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-700 mt-2">
            <FaMapMarkerAlt className="text-[#ED7E96]" />
            <p>{formData.address || "No address added"}</p>
          </div>
          <span className="inline-block mt-2 px-4 py-1 rounded-full text-sm font-medium bg-[#ED7E96] text-white shadow-md">
            {user.role.toUpperCase()}
          </span>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-5 flex flex-col gap-4 items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-3/4 p-2 border-2 text-black border-[#ED7E96] rounded-lg text-center focus:ring-2 focus:ring-[#ED7E96]"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-3/4 p-2 border-2 text-black border-[#ED7E96] rounded-lg text-center focus:ring-2 focus:ring-[#ED7E96]"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-3/4 p-2 border-2 text-black border-[#ED7E96] rounded-lg text-center focus:ring-2 focus:ring-[#ED7E96]"
          />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Your Address"
            rows="2"
            className="w-3/4 p-2 border-2 text-black border-[#ED7E96] rounded-lg text-center focus:ring-2 focus:ring-[#ED7E96]"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-[#ED7E96] text-white rounded-lg hover:bg-[#E72E77] transition shadow-md"
            >
              <FaSave /> {loading ? "Updating..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition shadow-md"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        </motion.form>
      )}

      {/* Edit Profile Button */}
      {!editMode && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setEditMode(true)}
          className="mt-5 flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-[#ED7E96] hover:text-black transition shadow-md mx-auto"
        >
          <FaEdit /> Edit Profile
        </motion.button>
      )}
    </motion.div>
  );
};

export default ProfileInfo;
