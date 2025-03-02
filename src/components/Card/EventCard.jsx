import React from "react";
import { motion } from "framer-motion";

const EventCard = ({ event, deleteEvent, startEdit }) => {
  return (
    <motion.div
      className="bg-white p-4 shadow-lg rounded-lg flex flex-col items-start"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={event.image || "https://source.unsplash.com/400x300/?event"} alt={event.name} className="w-full h-40 object-cover rounded-lg mb-4" />
      <h2 className="text-xl font-bold">{event.name}</h2>
      <p className="text-gray-600">{event.category}</p>
      <p className="text-gray-800 font-semibold">Date: {event.date}</p>
      <p className="text-gray-800 font-semibold">Price: ₹{event.price}</p>
      <p className={`font-bold mt-2 ${event.status === "Active" ? "text-green-600" : "text-yellow-500"}`}>
        {event.status}
      </p>
      <div className="flex gap-2 mt-4">
        <button onClick={() => startEdit(event)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
        <button onClick={() => deleteEvent(event.id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
      </div>
    </motion.div>
  );
};

export default EventCard;
