import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventDetails, updateEvent } from "../../redux/slices/eventSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

// 🔹 Cloudinary Upload Config
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/YOUR_CLOUDINARY_NAME/upload";
const CLOUDINARY_PRESET = "YOUR_UPLOAD_PRESET";

// 🔹 Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const EditEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { eventDetails, loading, error } = useSelector((state) => state.event);

  // ✅ Event Form State
  const [eventData, setEventData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    location: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  // ✅ Fetch Event Details on Load
  useEffect(() => {
    dispatch(fetchEventDetails(eventId));
  }, [dispatch, eventId]);

  // ✅ Populate Form Data when Event Details Load
  useEffect(() => {
    if (eventDetails) {
      setEventData({
        name: eventDetails.name || "",
        category: eventDetails.category || "",
        description: eventDetails.description || "",
        price: eventDetails.price || "",
        location: eventDetails.location || "",
        images: eventDetails.images || [],
      });
    }
  }, [eventDetails]);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Image Upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_URL, formData);
      setEventData((prev) => ({
        ...prev,
        images: [...prev.images, res.data.secure_url],
      }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Remove Image from Event
  const handleRemoveImage = (index) => {
    setEventData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventData.name || !eventData.category || !eventData.description || !eventData.price || !eventData.location || eventData.images.length === 0) {
      toast.error("Please fill all required fields and upload at least one image.");
      return;
    }

    dispatch(updateEvent({ eventId, eventData }))
      .unwrap()
      .then(() => {
        toast.success("Event updated successfully!");
        navigate("/profile/events");
      })
      .catch((error) => toast.error(error || "Failed to update event"));
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl border-2 border-[#ED7E96]"
    >
      <h2 className="text-3xl font-bold text-black mb-6 text-center">Edit Event/Service</h2>

      {loading ? (
        <p className="text-gray-500 text-lg text-center">Loading event details...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold">Service Name:</label>
            <input
              type="text"
              name="name"
              value={eventData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ED7E96]"
              required
            />
          </div>

          {/* ✅ Category Selection */}
          <div>
            <label className="block font-semibold">Category:</label>
            <select
              name="category"
              value={eventData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">Select Category</option>
              <option value="Photographers">Photographers</option>
              <option value="Makeup Artists">Makeup Artists</option>
              <option value="Mehndi Artists">Mehndi Artists</option>
              <option value="Caterers">Caterers</option>
              <option value="Decorators">Decorators</option>
              <option value="Wedding Planners">Wedding Planners</option>
              <option value="DJ Services">DJ Services</option>
              <option value="Florists">Florists</option>
            </select>
          </div>

          {/* ✅ Description */}
          <div>
            <label className="block font-semibold">Description:</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* ✅ Price & Location */}
          <div className="grid grid-cols-2 gap-4">
            <input type="number" name="price" value={eventData.price} onChange={handleChange} placeholder="Price" className="p-2 border rounded-lg" required />
            <input type="text" name="location" value={eventData.location} onChange={handleChange} placeholder="Location" className="p-2 border rounded-lg" required />
          </div>

          {/* ✅ Image Upload & Display */}
          <div>
            <label className="block font-semibold">Upload Images:</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded-lg" />
            {uploading && <p className="text-gray-500">Uploading...</p>}
            <div className="flex gap-2 mt-2">
              {eventData.images.map((img, index) => (
                <div key={index} className="relative">
                  <img src={img} alt="Event" className="w-20 h-20 rounded-md object-cover" />
                  <button onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full">
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Submit Button */}
          <button type="submit" className="w-full py-3 bg-[#ED7E96] text-white font-bold rounded-lg hover:bg-[#E72E77] transition">
            {loading ? "Updating..." : "Update Event"}
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      )}
    </motion.div>
  );
};

export default EditEvent;
