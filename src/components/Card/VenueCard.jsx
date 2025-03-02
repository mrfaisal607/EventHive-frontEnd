import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const VenueCard = ({ venue, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img src={venue.images[0]?.url || "https://via.placeholder.com/300"} alt={venue.name} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{venue.name}</h3>
      <p className="text-gray-600">{venue.location}</p>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => navigate(`/dashboard/vendor/venues/edit/${venue._id}`)}
          className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
        >
          <FiEdit /> Edit
        </button>
        <button
          onClick={() => onDelete(venue._id)}
          className="text-red-500 hover:text-red-700 flex items-center gap-2"
        >
          <FiTrash2 /> Delete
        </button>
      </div>
    </div>
  );
};

export default VenueCard;
