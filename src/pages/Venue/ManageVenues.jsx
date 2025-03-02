import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchVenues, deleteVenue } from "../../redux/slices/venueSlice";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// ✅ Animation Variants
const pageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ManageVenues = () => {
  const dispatch = useDispatch();
  const { venues, loading, error } = useSelector((state) => state.venues);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch venues on component mount
  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  // Debugging log
  console.log("Venues:", venues);

  // ✅ Delete Venue
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      try {
        await dispatch(deleteVenue(id)).unwrap();
        toast.success("Venue deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete venue.");
      }
    }
  };

  // ✅ Filter Venues Based on Search Query
  const filteredVenues = Array.isArray(venues) ? venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="p-6 bg-white min-h-screen"
    >
      {/* ✅ Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="flex items-center gap-2 bg-[#ED7E96] text-white px-4 py-2 rounded-lg hover:bg-[#d76b82] transition shadow-lg"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
        <h1 className="text-3xl font-bold text-black">Manage Venues</h1>
        <Link
          to="/profile/add-venue"
          className="flex items-center gap-2 bg-[#ED7E96] text-white px-4 py-2 rounded-lg hover:bg-[#d76b82] transition shadow-lg"
        >
          <FaPlus /> Add Venue
        </Link>
      </div>

      {/* ✅ Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search venues..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 pl-10 border-2 border-[#ED7E96] rounded-lg focus:ring-2 focus:ring-[#ED7E96]"
        />
        <FaSearch className="absolute left-3 top-3 text-[#ED7E96]" />
      </div>

      {/* ✅ Error Handling */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* ✅ Loading State */}
      {loading ? (
        <p className="text-center text-black text-lg">Loading venues...</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredVenues.map((venue) => (
            <motion.div
              key={venue._id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-lg shadow-md p-5 border border-[#ED7E96] transition"
            >
              {/* ✅ Venue Image */}
              <img
                src={venue.images.length ? venue.images[0].url : "https://via.placeholder.com/300"}
                alt={venue.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              {/* ✅ Venue Details */}
              <h2 className="text-xl font-semibold text-black">{venue.name}</h2>
              <p className="text-gray-600">{venue.location.city}, {venue.location.state}</p>
              <p className="mt-2 text-black">{venue.description.substring(0, 80)}...</p>

              {/* ✅ Action Buttons */}
              <div className="flex justify-between mt-4">
                <Link
                  to={`/profile/venues/edit/${venue._id}`}
                  className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  <FaEdit /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(venue._id)}
                  className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ManageVenues;