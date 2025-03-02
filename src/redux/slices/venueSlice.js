import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Axios Instance
const API = axios.create({
  baseURL: "http://localhost:5000/api/venues", // ✅ Ensure this matches backend
  withCredentials: true, // ✅ Sends authentication token
});

// ✅ Centralized API Error Handling
const handleApiError = (error) => {
  console.error("❌ API Error:", error.response?.data || error.message);
  return error.response?.data?.error || error.message || "Something went wrong";
};

/**
 * ✅ Fetch All Venues (Public)
 */
export const fetchVenues = createAsyncThunk("venue/fetchVenues", async (_, { rejectWithValue }) => {
  try {
    const res = await API.get("/");
    return res.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

/**
 * ✅ Fetch Vendor-Specific Venues (Vendor Only)
 */
export const fetchVendorVenues = createAsyncThunk("venue/fetchVendorVenues", async (_, { rejectWithValue }) => {
  try {
    console.log("📡 Fetching vendor venues..."); // ✅ Debugging log
    const res = await API.get("/vendor"); // ✅ Ensure this matches backend route
    console.log("✅ Vendor Venues:", res.data); // ✅ Debugging log
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching vendor venues:", error); // ✅ Log full error
    return rejectWithValue(handleApiError(error));
  }
});

/**
 * ✅ Fetch Venue Details
 */
export const fetchVenueDetails = createAsyncThunk("venue/fetchVenueDetails", async (venueId, { rejectWithValue }) => {
  try {
    const res = await API.get(`/${venueId}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

/**
 * ✅ Add a New Venue (Vendor Only)
 */
export const addVenue = createAsyncThunk("venue/addVenue", async (venueData, { rejectWithValue }) => {
  try {
    console.log("🚀 Sending Venue Data:", venueData); // ✅ Debugging request data
    const res = await API.post("/", venueData);
    console.log("✅ Venue Added:", res.data); // ✅ Debugging response
    return res.data;
  } catch (error) {
    console.error("❌ Error adding venue:", error); // ✅ Log full error
    return rejectWithValue(handleApiError(error));
  }
});

/**
 * ✅ Update a Venue (Vendor Only)
 */
export const updateVenue = createAsyncThunk("venue/updateVenue", async ({ venueId, venueData }, { rejectWithValue }) => {
  try {
    const res = await API.put(`/${venueId}`, venueData);
    return res.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

/**
 * ✅ Delete a Venue (Vendor Only)
 */
export const deleteVenue = createAsyncThunk("venue/deleteVenue", async (venueId, { rejectWithValue }) => {
  try {
    await API.delete(`/${venueId}`);
    return venueId;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

/**
 * ✅ Fetch Pending Venues (Admin Only)
 */
export const fetchPendingVenues = createAsyncThunk("venue/fetchPendingVenues", async (_, { rejectWithValue }) => {
  try {
    const res = await API.get("/pending");
    return res.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

/**
 * ✅ Approve Venue (Admin Only)
 */
export const approveVenue = createAsyncThunk("venue/approveVenue", async (venueId, { rejectWithValue }) => {
  try {
    const res = await API.put(`/${venueId}/approve`);
    return res.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

/**
 * ✅ Reject Venue (Admin Only)
 */
export const rejectVenue = createAsyncThunk("venue/rejectVenue", async (venueId, { rejectWithValue }) => {
  try {
    await API.delete(`/${venueId}/reject`);
    return venueId;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

// 🔹 Initial State
const initialState = {
  venues: [],
  vendorVenues: [],
  pendingVenues: [],
  venueDetails: null,
  loading: false,
  error: null,
};

// 🔹 Venue Slice
const venueSlice = createSlice({
  name: "venue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch All Venues
      .addCase(fetchVenues.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVenues.fulfilled, (state, action) => {
        state.loading = false;
        state.venues = action.payload;
      })
      .addCase(fetchVenues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Vendor Venues
      .addCase(fetchVendorVenues.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVendorVenues.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorVenues = action.payload;
      })
      .addCase(fetchVendorVenues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Venue Details
      .addCase(fetchVenueDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVenueDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.venueDetails = action.payload;
      })
      .addCase(fetchVenueDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Add Venue
      .addCase(addVenue.pending, (state) => {
        state.loading = true;
      })
      .addCase(addVenue.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorVenues.push(action.payload);
        state.venues.push(action.payload);
      })
      .addCase(addVenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Delete Venue
      .addCase(deleteVenue.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVenue.fulfilled, (state, action) => {
        state.loading = false;
        state.venues = state.venues.filter((venue) => venue._id !== action.payload);
        state.vendorVenues = state.vendorVenues.filter((venue) => venue._id !== action.payload);
      })
      .addCase(deleteVenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default venueSlice.reducer;
