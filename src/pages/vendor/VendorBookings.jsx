import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorBookings, updateBookingStatus } from "../../redux/slices/bookingSlice";
import { FaCheck, FaTimes, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// ✅ Animation Variants
const pageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const VendorBookings = () => {
  const dispatch = useDispatch();
  const { vendorBookings = [], loading, error } = useSelector((state) => state.booking || {});
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch vendor bookings on mount
  useEffect(() => {
    dispatch(fetchVendorBookings());
  }, [dispatch]);

  // ✅ Handle Status Change
  const handleStatusUpdate = async (id, status) => {
    try {
      await dispatch(updateBookingStatus({ bookingId: id, status })).unwrap();
      toast.success(`Booking ${status} successfully!`);
    } catch (error) {
      toast.error("Failed to update booking status.");
    }
  };

  // ✅ Filter Bookings Safely
  const filteredBookings = Array.isArray(vendorBookings)
    ? vendorBookings.filter((booking) =>
        booking.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="p-6 bg-white min-h-screen"
    >
      {/* ✅ Header */}
      <div className="flex justify-between items-center mb-6">
      <button  className="flex items-center gap-2 bg-[#ED7E96] text-white px-4 py-2 rounded-lg hover:bg-[#d76b82] transition shadow-lg" onClick={() => navigate(-1)}>Go Back</button>
        <h1 className="text-3xl font-bold text-black">Vendor Bookings</h1>
      </div>

      {/* ✅ Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search bookings..."
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
        <p className="text-center text-black text-lg">Loading bookings...</p>
      ) : filteredBookings.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredBookings.map((booking) => (
            <motion.div
              key={booking._id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-lg shadow-md p-5 border border-[#ED7E96] transition"
            >
              {/* ✅ Booking Details */}
              <h2 className="text-xl font-semibold text-black">{booking.customerName}</h2>
              <p className="text-gray-600">Venue: {booking.venueName}</p>
              <p className="text-gray-600">Date: {booking.date}</p>
              <p className="mt-2 text-black">{booking.notes}</p>

              {/* ✅ Action Buttons */}
              <div className="flex justify-between mt-4">
                {booking.status === "pending" && (
                  <>
                    <button onClick={() => handleStatusUpdate(booking._id, "accepted")} className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-700">
                      <FaCheck /> Accept
                    </button>
                    <button onClick={() => handleStatusUpdate(booking._id, "declined")} className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-700">
                      <FaTimes /> Decline
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-black text-lg">No bookings available.</p>
      )}
    </motion.div>
  );
};

export default VendorBookings;
