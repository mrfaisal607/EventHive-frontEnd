import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVenueDetails, updateVenue } from "../../redux/slices/venueSlice";
import { useParams, useNavigate } from "react-router-dom";
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

const EditVenue = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { venue, loading, error } = useSelector((state) => state.venue);

  // ✅ Venue Form State
  const [venueData, setVenueData] = useState({
    name: "",
    location: { address: "", city: "", state: "", country: "", coordinates: { lat: "", lng: "" } },
    description: "",
    price: "",
    capacity: "",
    amenities: [],
    occasionTypes: [],
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  // ✅ Fetch Venue Details on Page Load
  useEffect(() => {
    dispatch(fetchVenueDetails(id));
  }, [dispatch, id]);

  // ✅ Populate Form with Venue Data
  useEffect(() => {
    if (venue) {
      setVenueData(venue);
    }
  }, [venue]);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setVenueData({ ...venueData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Location Change
  const handleLocationChange = (e) => {
    setVenueData({
      ...venueData,
      location: { ...venueData.location, [e.target.name]: e.target.value },
    });
  };

  // ✅ Handle Checkbox Selections
  const handleCheckboxChange = (e, type) => {
    const value = e.target.value;
    setVenueData((prev) => ({
      ...prev,
      [type]: prev[type].includes(value) ? prev[type].filter((item) => item !== value) : [...prev[type], value],
    }));
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
      setVenueData((prev) => ({
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

  // ✅ Remove Image from Venue
  const handleRemoveImage = (index) => {
    setVenueData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!venueData.name || !venueData.description || !venueData.price || !venueData.capacity || venueData.images.length === 0) {
      toast.error("Please fill all required fields and upload at least one image.");
      return;
    }

    dispatch(updateVenue({ venueId: id, venueData }))
      .unwrap()
      .then(() => {
        toast.success("Venue updated successfully!");
        navigate("/profile/venues");
      })
      .catch((error) => toast.error(error || "Failed to update venue"));
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl border-2 border-[#ED7E96]"
    >
      <h2 className="text-3xl font-bold text-black mb-6 text-center">Edit Venue</h2>

      {/* ✅ Venue Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold">Venue Name:</label>
          <input
            type="text"
            name="name"
            value={venueData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#ED7E96]"
            required
          />
        </div>

        {/* ✅ Location Fields */}
        <div>
          <label className="block font-semibold">Location:</label>
          <input
            type="text"
            name="address"
            value={venueData.location.address}
            onChange={handleLocationChange}
            placeholder="Address"
            className="w-full p-2 border rounded-lg mb-2"
            required
          />
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              name="city"
              value={venueData.location.city}
              onChange={handleLocationChange}
              placeholder="City"
              className="p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="state"
              value={venueData.location.state}
              onChange={handleLocationChange}
              placeholder="State"
              className="p-2 border rounded-lg"
              required
            />
            <input
              type="text"
              name="country"
              value={venueData.location.country}
              onChange={handleLocationChange}
              placeholder="Country"
              className="p-2 border rounded-lg"
              required
            />
          </div>
        </div>

        {/* ✅ Price & Capacity */}
        <div className="grid grid-cols-2 gap-4">
          <input type="number" name="price" value={venueData.price} onChange={handleChange} placeholder="Price" className="p-2 border rounded-lg" required />
          <input type="number" name="capacity" value={venueData.capacity} onChange={handleChange} placeholder="Capacity" className="p-2 border rounded-lg" required />
        </div>

        {/* ✅ Image Upload & Display */}
        <div>
          <label className="block font-semibold">Upload Images:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded-lg" />
          {uploading && <p className="text-gray-500">Uploading...</p>}
          <div className="flex gap-2 mt-2">
            {venueData.images.map((img, index) => (
              <div key={index} className="relative">
                <img src={img} alt="Venue" className="w-20 h-20 rounded-md object-cover" />
                <button onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full">
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Submit Button */}
        <button type="submit" className="w-full py-3 bg-[#ED7E96] text-white font-bold rounded-lg hover:bg-[#E72E77] transition">
          {loading ? "Updating..." : "Update Venue"}
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </motion.div>
  );
};

export default EditVenue;
