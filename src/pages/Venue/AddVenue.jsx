import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addVenue } from "../../redux/slices/venueSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ChevronLeft, ImagePlus, Loader2, X } from "lucide-react";

// ✅ Cloudinary Configuration
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;

// 🎨 Framer Motion Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// ✅ Form Validation Schema
const schema = yup.object().shape({
  name: yup.string().min(3, "Venue name must be at least 3 characters").required("Venue name is required"),
  description: yup.string().min(20, "Description must be at least 20 characters").required("Description is required"),
  address: yup.string().min(5, "Address is required").required("Address is required"),
  city: yup.string().min(2, "City is required").required("City is required"),
  state: yup.string().min(2, "State is required").required("State is required"),
  postalCode: yup.string().min(5, "Postal code is required").required("Postal Code is required"),
  country: yup.string().min(2, "Country is required").required("Country is required"),
  venueType: yup.string().required("Venue type is required"),
  price: yup.number().min(100, "Price must be at least $100").required("Price is required"),
  capacity: yup.number().min(10, "Capacity must be at least 10").required("Capacity is required"),
  amenities: yup.array().of(yup.string()).optional(),
  images: yup
    .array()
    .of(yup.object({ url: yup.string().required(), public_id: yup.string().required() }))
    .min(1, "At least one image is required"),
});

// Amenities options
const amenitiesOptions = [
  { id: "parking", label: "Parking" },
  { id: "wifi", label: "WiFi" },
  { id: "catering", label: "Catering" },
  { id: "audioVisual", label: "Audio/Visual Equipment" },
  { id: "stage", label: "Stage" },
  { id: "bar", label: "Bar Service" },
  { id: "kitchen", label: "Kitchen Access" },
  { id: "outdoorSpace", label: "Outdoor Space" },
  { id: "wheelchair", label: "Wheelchair Accessible" },
  { id: "security", label: "Security" },
];

// Venue types
const venueTypes = [
  "Ballroom",
  "Garden",
  "Beach",
  "Hotel",
  "Restaurant",
  "Banquet Hall",
  "Loft",
  "Barn",
  "Rooftop",
  "Estate",
  "Winery",
  "Museum",
  "Theater",
  "Yacht",
  "Castle",
  "Other",
];

const AddVenue = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Safe Redux State Access
  const venueState = useSelector((state) => state.venue) || {};
  const loading = venueState?.loading || false;
  const error = venueState?.error || null;

  const [uploading, setUploading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  // ✅ React Hook Form Setup
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      venueType: "",
      price: 0,
      capacity: 0,
      amenities: [],
      images: [],
    },
  });

  // ✅ Handle Image Upload (Cloudinary)
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);

    try {
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
          const res = await axios.post(CLOUDINARY_URL, formData);
          return { url: res.data.secure_url, public_id: res.data.public_id };
        })
      );

      // ✅ Update images in state and form
      const newImages = [...getValues("images"), ...uploadedImages];
      setValue("images", newImages);
      setImagePreviews(newImages);
      toast.success("Images uploaded successfully!");
    } catch (err) {
      toast.error("Image upload failed, please try again!");
    }
    setUploading(false);
  };

  // ✅ Remove Image
  const handleRemoveImage = (public_id) => {
    const updatedImages = getValues("images").filter((img) => img.public_id !== public_id);
    setValue("images", updatedImages);
    setImagePreviews(updatedImages);
  };

  // ✅ Handle Form Submission
  const onSubmit = async (data) => {
    try {
      await schema.validate(data, { abortEarly: false });

      if (data.images.length === 0) {
        toast.error("At least one image is required!");
        return;
      }

      const formattedData = {
        ...data,
        location: {
          address: data.address,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
        },
      };

      dispatch(addVenue(formattedData))
        .unwrap()
        .then(() => {
          toast.success("Venue added successfully!");
          navigate("/profile/venues");
        })
        .catch((err) => toast.error(err || "Failed to add venue"));
    } catch (err) {
      err.inner.forEach((error) => {
        toast.error(error.message);
      });
    }
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
        <h1 className="text-3xl font-bold ml-4 text-black">Add New Venue</h1>
      </div>

      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-black">Basic Information</h2>
            <div className="space-y-6">
              {/* Venue Name */}
              <div>
                <label className="block text-sm font-medium text-black">Venue Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ED7E96]"
                />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-black">Description</label>
                <textarea
                  {...register("description")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ED7E96]"
                  rows={4}
                />
                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
              </div>

              {/* Venue Type */}
              <div>
                <label className="block text-sm font-medium text-black">Venue Type</label>
                <select
                  {...register("venueType")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ED7E96]"
                >
                  <option value="">Select Venue Type</option>
                  {venueTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.venueType && <p className="text-sm text-red-500 mt-1">{errors.venueType.message}</p>}
              </div>

              {/* Price and Capacity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black">Price ($)</label>
                  <input
                    type="number"
                    {...register("price")}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ED7E96]"
                  />
                  {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-black">Capacity</label>
                  <input
                    type="number"
                    {...register("capacity")}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ED7E96]"
                  />
                  {errors.capacity && <p className="text-sm text-red-500 mt-1">{errors.capacity.message}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-black">Location</h2>
            <div className="space-y-6">
              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-black">Street Address</label>
                <input
                  type="text"
                  {...register("address")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ED7E96]"
                />
                {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>}
              </div>

              {/* City, State */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black">City</label>
                  <input
                    type="text"
                    {...register("city")}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ED7E96]"
                  />
                  {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-black">State/Province</label>
                  <input
                    type="text"
                    {...register("state")}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ED7E96]"
                  />
                  {errors.state && <p className="text-sm text-red-500 mt-1">{errors.state.message}</p>}
                </div>
              </div>

              {/* Postal Code, Country */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black">Postal Code</label>
                  <input
                    type="text"
                    {...register("postalCode")}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ED7E96]"
                  />
                  {errors.postalCode && <p className="text-sm text-red-500 mt-1">{errors.postalCode.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-black">Country</label>
                  <input
                    type="text"
                    {...register("country")}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ED7E96]"
                  />
                  {errors.country && <p className="text-sm text-red-500 mt-1">{errors.country.message}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Amenities Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-black">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amenitiesOptions.map((amenity) => (
                <label key={amenity.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={amenity.id}
                    {...register("amenities")}
                    className="w-4 h-4 text-[#ED7E96] border-gray-300 rounded focus:ring-[#ED7E96]"
                  />
                  <span className="text-sm text-black">{amenity.label}</span>
                </label>
              ))}
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
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {imagePreviews.map((img, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden group">
                        <img
                          src={img.url}
                          alt="Uploaded"
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
              {loading ? "Creating Venue..." : "Create Venue"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddVenue;