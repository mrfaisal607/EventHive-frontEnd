import React, { useEffect, useState } from "react";
import socket from "../api/socket";

const LiveBookingStatus = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    socket.on("booking_status_updated", (data) => {
      setUpdates((prev) => [...prev, data]);
    });

    return () => {
      socket.off("booking_status_updated");
    };
  }, []);

  return (
    <div>
      <h2>Live Booking Updates</h2>
      <ul>
        {updates.map((update, index) => (
          <li key={index}>Booking {update.bookingId} is now {update.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default LiveBookingStatus;
