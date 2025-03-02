import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 API Base URL
const API_URL = "http://localhost:5000/api/vendor";

/**
 * ✅ Fetch Vendor Profile
 */
export const fetchVendorProfile = createAsyncThunk(
  "vendor/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/profile`, { withCredentials: true });

      if (res.data) {
        return res.data;
      }

      throw new Error("Invalid vendor data received");
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch vendor profile");
    }
  }
);

/**
 * ✅ Update Vendor Profile
 */
export const updateVendorProfile = createAsyncThunk(
  "vendor/updateProfile",
  async (updatedData, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/profile`, updatedData, { withCredentials: true });

      if (res.data) {
        return res.data;
      }

      throw new Error("Profile update failed");
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to update profile");
    }
  }
);

/**
 * 🔹 Redux Slice for Vendor
 */
const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    vendor: null,
    loading: false,
    error: null,
  },
  reducers: {}, // No additional reducers needed
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Vendor Profile
      .addCase(fetchVendorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor = action.payload;
      })
      .addCase(fetchVendorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update Vendor Profile
      .addCase(updateVendorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVendorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor = action.payload;
      })
      .addCase(updateVendorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export Reducer
export default vendorSlice.reducer;
