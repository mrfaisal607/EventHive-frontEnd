import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";      // ✅ Authentication (Login, Register, Profile)
import vendorReducer from "./slices/vendorSlice";  // ✅ Vendor Management
import venueReducer from "./slices/venueSlice";    // ✅ Venues Management
import bookingReducer from "./slices/bookingSlice"; // ✅ Bookings Management (Customer & Vendor)
import userReducer from "./slices/userSlice";      // ✅ User Management (Admin)
import eventReducer from "./slices/eventSlice";    // ✅ Event Management (If applicable)
// import earningsReducer from "./slices/earningsSlice";

/**
 * 🔹 Redux Store Configuration
 * - `auth`: Manages authentication state (login, register, logout, user data)
 * - `vendor`: Manages vendor-related state (profile, venues)
 * - `venues`: Handles venue management (CRUD operations, approvals)
 * - `booking`: Manages booking-related data (customer/vendor/admin)
 * - `user`: Handles admin functions (view/delete/update users)
 * - `event`: Manages events (if your platform supports event listings)
 */
const store = configureStore({
  reducer: {
    auth: authReducer,       // Handles user authentication
    vendor: vendorReducer,   // Handles vendor profile & venues
    venues: venueReducer,    // Handles venue listings & admin approvals
    booking: bookingReducer, // Handles booking system for customers & vendors
    user: userReducer,       // Handles admin user management
    event: eventReducer,     // Handles events (optional)
    // earnings: earningsReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

export default store;
