import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Axios Instance with Authentication
const API = axios.create({
  baseURL: "http://localhost:5000/api/events",
  withCredentials: true, // Ensures authentication token is sent
});

// ✅ Centralized API Error Handler
const handleApiError = (error) => {
  return error.response?.data?.error || error.message || "Something went wrong";
};

/**
 * ✅ Fetch All Events (Public)
 */
export const fetchEvents = createAsyncThunk(
  "event/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/");
      return res.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

/**
 * ✅ Fetch Event Details
 */
export const fetchEventDetails = createAsyncThunk(
  "event/fetchEventDetails",
  async (eventId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/${eventId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

/**
 * ✅ Fetch Vendor's Events (Vendor Only)
 * Uses `condition()` to prevent duplicate API calls
 */
export const fetchVendorEvents = createAsyncThunk(
  "event/fetchVendorEvents",
  async (_, { rejectWithValue, getState }) => {
    const { event } = getState();
    if (event.vendorEvents.length > 0) return; // Prevents duplicate fetch

    try {
      const res = await API.get("/vendor");
      return res.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

/**
 * ✅ Add New Event (Vendor Only)
 */
export const addEvent = createAsyncThunk(
  "event/addEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const res = await API.post("/", eventData);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

/**
 * ✅ Update Event (Vendor Only)
 */
export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async ({ eventId, eventData }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/${eventId}`, eventData);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

/**
 * ✅ Delete Event (Vendor Only)
 */
export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      await API.delete(`/${eventId}`);
      return eventId;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

/**
 * ✅ Fetch Pending Events (Admin Only)
 */
export const fetchPendingEvents = createAsyncThunk(
  "event/fetchPendingEvents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/pending");
      return res.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

/**
 * ✅ Approve Event (Admin Only)
 */
export const approveEvent = createAsyncThunk(
  "event/approveEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const res = await API.put(`/${eventId}/approve`);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

/**
 * ✅ Reject Event (Admin Only)
 */
export const rejectEvent = createAsyncThunk(
  "event/rejectEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      await API.delete(`/${eventId}/reject`);
      return eventId;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: [],
    vendorEvents: [],
    pendingEvents: [],
    eventDetails: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch All Events
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Event Details
      .addCase(fetchEventDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.eventDetails = action.payload;
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Vendor's Events
      .addCase(fetchVendorEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVendorEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorEvents = action.payload;
      })
      .addCase(fetchVendorEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Add Event (Also update `vendorEvents`)
      .addCase(addEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
        state.vendorEvents.push(action.payload); // Ensures vendors see their own event
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ✅ Update Event
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex((event) => event._id === action.payload._id);
        if (index !== -1) state.events[index] = action.payload;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ✅ Delete Event
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((event) => event._id !== action.payload);
        state.vendorEvents = state.vendorEvents.filter((event) => event._id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ✅ Fetch Pending Events (Admin)
      .addCase(fetchPendingEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendingEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingEvents = action.payload;
      })
      .addCase(fetchPendingEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Approve Event (Admin)
      .addCase(approveEvent.fulfilled, (state, action) => {
        state.pendingEvents = state.pendingEvents.filter((event) => event._id !== action.payload._id);
        state.events.unshift(action.payload);
      })
      .addCase(approveEvent.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ✅ Reject Event (Admin)
      .addCase(rejectEvent.fulfilled, (state, action) => {
        state.pendingEvents = state.pendingEvents.filter((event) => event._id !== action.payload);
      })
      .addCase(rejectEvent.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
