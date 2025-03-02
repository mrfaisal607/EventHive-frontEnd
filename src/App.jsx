import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// ✅ Layout Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";

// ✅ Public Pages
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";
import Login from "./pages/Auth/Login";
import RegisterCustomer from "./pages/Auth/RegisterCustomer";
import RegisterVendor from "./pages/Auth/RegisterVendor";

// ✅ Event Pages
import Events from "./pages/Event/Events";
import EventVendorList from "./pages/Event/EventVendorList";
import EventDetail from "./pages/Event/EventDetail";
import AddEvent from "./pages/Event/AddEvent";
import EditEvent from "./pages/Event/EditEvent";

// ✅ Venue Pages
import Venues from "./pages/Venue/Venues";
import VenueDetail from "./pages/Venue/VenueDetail";
import AddVenue from "./pages/Venue/AddVenue";
import EditVenue from "./pages/Venue/EditVenue";

// ✅ Booking & Profile Pages
import Booking from "./pages/Booking";  // New Booking Page
import Profile from "./pages/Profile";
// import AdminDashboard from "./pages/Admin/AdminDashboard"; // Admin Dashboard
import ImageSlider from "./components/common/ImageSlider"
import ManageVenues from "./pages/Venue/ManageVenues";
import ManageEvents from "./pages/Event/ManageEvents";
import VendorBookings from "./pages/vendor/VendorBookings";
import AdminPanel from "./pages/adminPanel";
// import Earnings from "./pages/vendor/Earnings";
function App() {
  const { user } = useSelector((state) => state.auth); // Get user from Redux

  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes with Shared Layout (Navbar & Footer) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/register/customer" element={<RegisterCustomer />} />
          <Route path="/register/vendor" element={<RegisterVendor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<Events />} />
          
          <Route path="/events/:serviceName" element={<EventVendorList />} />
    {/* ✅ Nested Route for Event Detail */}
        <Route path="/events/:serviceName/:serviceId" element={<EventDetail />}>
          <Route path="images" element={<ImageSlider />} />
        </Route>

      

          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/:venueId" element={<VenueDetail />} />
          <Route path="/booking/:venueId" element={<Booking />} /> {/* ✅ New Booking Page */}
        </Route>

        {/* ✅ Vendor Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["vendor"]} />}>
          <Route path="/profile/add-venue" element={<AddVenue />} />
          <Route path="/profile/edit-venue/:venueId" element={<EditVenue />} />
          <Route path="/profile/add-event" element={<AddEvent />} />
          <Route path="/profile/edit-event/:eventId" element={<EditEvent />} />
          <Route path="/profile/venues" element={<ManageVenues/>} />
          <Route path="/profile/events" element={<ManageEvents/>} />
          <Route path="/profile/vendor-bookings" element={<VendorBookings/>} />
          {/* <Route path="profile/earnings" element={<Earnings/>} /> */}
        </Route>

        {/* ✅ Customer & Vendor Protected Profile Route */}
        <Route element={<ProtectedRoute allowedRoles={["customer", "vendor", "admin"]} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* ✅ Admin Protected Routes */}
        {/* <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route> */}

        {/* 🔄 Redirect unknown routes to Home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

/* ✅ Shared Layout for Public Pages */
const PublicLayout = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/register/customer" element={<RegisterCustomer />} />
      <Route path="/register/vendor" element={<RegisterVendor />} />
      <Route path="/login" element={<Login />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:serviceName" element={<EventVendorList />} />
      <Route path="/events/:serviceName/:vendorId" element={<EventDetail />} />
      <Route path="/venues" element={<Venues />} />
      <Route path="/venues/:venueId" element={<VenueDetail />} />
      <Route path="/booking/:venueId" element={<Booking />} />
    
    </Routes>
    <Footer />
  </>
);
