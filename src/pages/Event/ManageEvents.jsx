import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, deleteEvent } from "../../redux/slices/eventSlice";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// ✅ Animation Variants
const pageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ManageEvents = () => {
  const dispatch = useDispatch();
  const { events = [], loading, error } = useSelector((state) => state.events || {}); // ✅ Fix: Default empty array
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch events on component mount
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // ✅ Delete Event
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await dispatch(deleteEvent(id)).unwrap();
        toast.success("Event deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete event.");
      }
    }
  };

  // ✅ Filter Events Based on Search Query
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <h1 className="text-3xl font-bold text-black">Manage Events</h1>
        <Link
          to="/profile/add-event"
          className="flex items-center gap-2 bg-[#ED7E96] text-white px-4 py-2 rounded-lg hover:bg-[#d76b82] transition shadow-lg"
        >
          <FaPlus /> Add Event
        </Link>
      </div>

      {/* ✅ Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search events..."
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
        <p className="text-center text-black text-lg">Loading events...</p>
      ) : filteredEvents.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredEvents.map((event) => (
            <motion.div
              key={event._id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-lg shadow-md p-5 border border-[#ED7E96] transition"
            >
              {/* ✅ Event Image */}
              <img
                src={event.images.length ? event.images[0].url : "https://via.placeholder.com/300"}
                alt={event.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              {/* ✅ Event Details */}
              <h2 className="text-xl font-semibold text-black">{event.name}</h2>
              <p className="text-gray-600">{event.date}</p>
              <p className="mt-2 text-black">
                {event.description.substring(0, 80)}...
              </p>

              {/* ✅ Action Buttons */}
              <div className="flex justify-between mt-4">
                <Link
                  to={`/profile/events/edit/${event._id}`}
                  className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  <FaEdit /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-black text-lg">No events found.</p>
      )}
    </motion.div>
  );
};

export default ManageEvents;
