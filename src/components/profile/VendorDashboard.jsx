import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorVenues, deleteVenue } from "../../redux/slices/venueSlice";
import { fetchVendorEvents, deleteEvent } from "../../redux/slices/eventSlice";
import { fetchVendorBookings } from "../../redux/slices/bookingSlice";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaPlus, FaMoneyBillWave, FaCalendarAlt, FaBriefcase } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const VendorDashboard = () => {
  const dispatch = useDispatch();
  const { venues = [], loading: venuesLoading, error: venuesError } = useSelector((state) => state.venue || {});
  const { events = [], loading: eventsLoading, error: eventsError } = useSelector((state) => state.event || {});
  const { bookings = [], loading: bookingsLoading, error: bookingsError } = useSelector((state) => state.booking || {});

  // Dark mode support
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  // Fetch Data on Component Mount
  useEffect(() => {
    dispatch(fetchVendorVenues());
    dispatch(fetchVendorEvents());
    dispatch(fetchVendorBookings());
  }, [dispatch]);

  // Handle Delete Operations
  const handleDeleteVenue = (venueId) => {
    dispatch(deleteVenue(venueId));
    toast.success("Venue deleted successfully!");
  };

  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEvent(eventId));
    toast.success("Event deleted successfully!");
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="mt-6 bg-white p-6 rounded-lg shadow-xl border-2 border-[#ED7E96]"
    >
      {/* ✅ Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-black">Vendor Dashboard</h2>
      </div>

      {/* ✅ Error Handling */}
      {venuesError && <p className="text-red-500">Error loading venues: {venuesError}</p>}
      {eventsError && <p className="text-red-500">Error loading events: {eventsError}</p>}
      {bookingsError && <p className="text-red-500">Error loading bookings: {bookingsError}</p>}

      {/* ✅ VENUES MANAGEMENT */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">My Venues</h2>
        <Link to="/profile/add-venue" className="flex items-center gap-2 px-5 py-3 bg-[#ED7E96] text-white rounded-xl shadow-md hover:bg-[#E72E77] transition">
          <FaPlus /> Add Venue
        </Link>
      </div>

      {venuesLoading ? (
        <p className="text-gray-500 text-lg animate-pulse">Loading venues...</p>
      ) : venues.length === 0 ? (
        <div className="text-center py-10">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-5746220-4800304.png"
            alt="No Data"
            className="w-60 mx-auto"
          />
          <p className="text-gray-500 text-lg italic mt-4">No venues added yet. Start by adding a new venue!</p>
          <Link to="/profile/add-venue" className="mt-4 inline-block px-6 py-3 bg-[#ED7E96] text-white font-semibold rounded-lg shadow-md hover:bg-[#E72E77] transition">
            Add Venue Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <motion.div
              key={venue._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="p-5 border-2 border-[#ED7E96] rounded-lg shadow-lg bg-white transform hover:scale-105 transition duration-300"
            >
              <img src={venue.image || "https://via.placeholder.com/300"} alt={venue.name} className="w-full h-40 object-cover rounded-lg shadow-md" />
              <h3 className="mt-4 text-lg font-semibold text-black">{venue.name}</h3>
              <p className="text-gray-600">{venue.location || "No location provided"}</p>
              <div className="flex justify-between items-center mt-4">
                <Link to={`/profile/edit-venue/${venue._id}`} className="text-[#ED7E96] font-bold flex items-center gap-2 hover:underline">
                  <FaEdit /> Edit
                </Link>
                <button onClick={() => handleDeleteVenue(venue._id)} className="text-red-600 font-bold flex items-center gap-2 hover:underline">
                  <FaTrash /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ✅ EVENTS MANAGEMENT */}
      <div className="flex justify-between items-center mt-12 mb-6">
        <h2 className="text-2xl font-bold text-black">My Services/Events</h2>
        <Link to="/profile/add-event" className="flex items-center gap-2 px-5 py-3 bg-[#ED7E96] text-white rounded-xl shadow-md hover:bg-[#E72E77] transition">
          <FaPlus /> Add Service
        </Link>
      </div>

      {eventsLoading ? (
        <p className="text-gray-500 text-lg animate-pulse">Loading events...</p>
      ) : events.length === 0 ? (
        <div className="text-center py-10">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-5746220-4800304.png"
            alt="No Data"
            className="w-60 mx-auto"
          />
          <p className="text-gray-500 text-lg italic mt-4">No events added yet. Start by adding a new service!</p>
          <Link to="/profile/add-event" className="mt-4 inline-block px-6 py-3 bg-[#ED7E96] text-white font-semibold rounded-lg shadow-md hover:bg-[#E72E77] transition">
            Add Service Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="p-5 border-2 border-[#ED7E96] rounded-lg shadow-lg bg-white transform hover:scale-105 transition duration-300"
            >
              <img src={event.images[0] || "https://via.placeholder.com/300"} alt={event.name} className="w-full h-40 object-cover rounded-lg shadow-md" />
              <h3 className="mt-4 text-lg font-semibold text-black">{event.name}</h3>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default VendorDashboard;
