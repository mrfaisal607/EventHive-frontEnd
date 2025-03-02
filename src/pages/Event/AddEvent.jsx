import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../../redux/slices/eventSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ChevronLeft, ImagePlus, Loader2, X } from "lucide-react";

// 🔹 Cloudinary Upload Config
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/YOUR_CLOUDINARY_NAME/upload";
const CLOUDINARY_PRESET = "YOUR_UPLOAD_PRESET";

// 🔹 Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Event categories
const eventCategories = [
  "Photographers",
  "Makeup Artists",
  "Mehndi Artists",
  "Caterers",
  "Decorators",
  "Wedding Planners",
  "DJ Services",
  "Florists",
  "Videographers",
  "Transportation",
  "Entertainment",
  "Cake Designers",
  "Invitation Designers",
  "Officiants",
  "Other",
];

const AddEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.event);

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

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Image Upload to Cloudinary
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);

    try {
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", CLOUDINARY_PRESET);
          const res = await axios.post(CLOUDINARY_URL, formData);
          return { url: res.data.secure_url, public_id: res.data.public_id };
        })
      );

      setEventData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedImages],
      }));
      toast.success("Images uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Remove Image from Event
  const handleRemoveImage = (public_id) => {
    setEventData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.public_id !== public_id),
    }));
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !eventData.name ||
      !eventData.category ||
      !eventData.description ||
      !eventData.price ||
      !eventData.location ||
      eventData.images.length === 0
    ) {
      toast.error("Please fill all required fields and upload at least one image.");
      return;
    }

    dispatch(addEvent(eventData))
      .unwrap()
      .then(() => {
        toast.success("Event added successfully!");
        navigate("/profile/events");
      })
      .catch((error) => toast.error(error || "Failed to add event"));
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#FBF5FE" }}>
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#ED7E96] rounded-lg hover:bg-[#d76b82] transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-3xl font-bold ml-4 text-black">Add New Event/Service</h1>
      </div>

      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-black">Basic Information</h2>
            <div className="space-y-6">
              {/* Service Name */}
              <div>
                <label className="block text-sm font-medium text-black">Service Name</label>
                <input
                  type="text"
                  name="name"
                  value={eventData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ED7E96]"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-black">Category</label>
                <select
                  name="category"
                  value={eventData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ED7E96]"
                  required
                >
                  <option value="">Select Category</option>
                  {eventCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-black">Description</label>
                <textarea
                  name="description"
                  value={eventData.description}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ED7E96]"
                  required
                />
              </div>

              {/* Price & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={eventData.price}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ED7E96]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={eventData.location}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ED7E96]"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Images Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-black">Images</h2>
            <div className="space-y-6">
              {/* Image Upload */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
                  <label htmlFor="image-upload" className="flex flex-col items-center gap-2 cursor-pointer">
                    <ImagePlus className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500">Click to upload images</span>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                </div>

                {uploading && (
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading images...</span>
                  </div>
                )}

                {/* Image Previews */}
                {eventData.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {eventData.images.map((img, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden group">
                        <img
                          src={img.url}
                          alt="Event"
                          className="object-cover w-full h-full"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(img.public_id)}
                          className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm font-medium text-white bg-[#ED7E96] rounded-lg hover:bg-[#d76b82] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || loading}
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Creating Event..." : "Create Event"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddEvent;