import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ==================================================
✅ 1️⃣ Fetch Bookings 
================================================== */
// 🔹 Fetch Customer Bookings (My Bookings)
export const fetchCustomerBookings = createAsyncThunk(
  "booking/fetchCustomerBookings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/bookings/customer");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch customer bookings");
    }
  }
);

// 🔹 Fetch Vendor Bookings (Bookings for vendor's venues)
export const fetchVendorBookings = createAsyncThunk(
  "booking/fetchVendorBookings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/bookings/vendor");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch vendor bookings");
    }
  }
);

// 🔹 Fetch All Bookings (Admin Only)
export const fetchAllBookings = createAsyncThunk(
  "booking/fetchAllBookings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/bookings");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch all bookings");
    }
  }
);

/* ==================================================
✅ 2️⃣ Create, Cancel & Manage Bookings 
================================================== */
// 🔹 Create a New Booking (Customer)
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/bookings", bookingData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to create booking");
    }
  }
);

// 🔹 Cancel a Booking (Customer)
export const cancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}`);
      return bookingId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to cancel booking");
    }
  }
);

/* ==================================================
✅ 3️⃣ Vendor Actions: Approve, Reject, Update Booking 
================================================== */
// 🔹 Approve Booking (Vendor)
export const approveBooking = createAsyncThunk(
  "booking/approveBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/bookings/${bookingId}/approve`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to approve booking");
    }
  }
);

// 🔹 Reject Booking (Vendor)
export const rejectBooking = createAsyncThunk(
  "booking/rejectBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}/reject`);
      return bookingId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to reject booking");
    }
  }
);

// 🔹 Update Booking Status (Fixes your error!)
export const updateBookingStatus = createAsyncThunk(
  "booking/updateBookingStatus",
  async ({ bookingId, status }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/bookings/${bookingId}/status`, { status });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to update booking status");
    }
  }
);

/* ==================================================
✅ 4️⃣ Booking Slice: Handles State Management 
================================================== */
const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [], // Customer bookings
    vendorBookings: [], // Vendor's bookings
    allBookings: [], // Admin view of all bookings
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      /* ==================================================
      🔹 Fetch Customer Bookings
      ================================================== */
      .addCase(fetchCustomerBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomerBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchCustomerBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ==================================================
      🔹 Fetch Vendor Bookings
      ================================================== */
      .addCase(fetchVendorBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVendorBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorBookings = action.payload;
      })
      .addCase(fetchVendorBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ==================================================
      🔹 Fetch All Bookings (Admin)
      ================================================== */
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.allBookings = action.payload;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ==================================================
      🔹 Create, Cancel Bookings
      ================================================== */
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter((b) => b._id !== action.payload);
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* ==================================================
      🔹 Approve, Reject Bookings
      ================================================== */
      .addCase(approveBooking.fulfilled, (state, action) => {
        const index = state.vendorBookings.findIndex((b) => b._id === action.payload._id);
        if (index !== -1) state.vendorBookings[index] = action.payload;
      })
      .addCase(approveBooking.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(rejectBooking.fulfilled, (state, action) => {
        state.vendorBookings = state.vendorBookings.filter((b) => b._id !== action.payload);
      })
      .addCase(rejectBooking.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* ==================================================
      🔹 Update Booking Status (Fix for your error!)
      ================================================== */
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const index = state.vendorBookings.findIndex((b) => b._id === action.payload._id);
        if (index !== -1) state.vendorBookings[index] = action.payload;
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
