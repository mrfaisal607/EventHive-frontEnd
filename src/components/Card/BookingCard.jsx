import React from "react";
import { motion } from "framer-motion";

const BookingCard = ({ booking, acceptBooking, rejectBooking }) => {
  return (
    <motion.div
      className="bg-white p-4 shadow-lg rounded-lg flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold">{booking.event}</h2>
      <p className="text-gray-600">Customer: {booking.customer}</p>
      <p className="text-gray-800 font-semibold">Date: {booking.date}</p>
      <p className="text-gray-800 font-semibold">Price: ₹{booking.price}</p>
      <p
        className={`font-bold mt-2 ${
          booking.status === "Accepted"
            ? "text-green-600"
            : booking.status === "Rejected"
            ? "text-red-500"
            : "text-yellow-500"
        }`}
      >
        {booking.status}
      </p>

      {booking.status === "Pending" && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => acceptBooking(booking.id)}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Accept
          </button>
          <button
            onClick={() => rejectBooking(booking.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Reject
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default BookingCard;
