import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// 🔹 Create an Axios Instance for API Calls (Centralized API Requests)
const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true, // Ensures cookies are sent with every request
});

// 🔹 Utility Function to Handle API Errors (Centralized Error Handling)
const handleApiError = (error) => {
  return error.response?.data?.error || error.message || "An error occurred";
};

/**
 * ✅ Register User (Handles Customer & Vendor Registration)
 */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const endpoint = userData.role === "vendor" ? "/register/vendor" : "/register/customer";
      const res = await API.post(endpoint, userData);

      if (res.data.user) {
        Cookies.set("user", JSON.stringify(res.data.user), { expires: 30 });
        return res.data.user;
      }
      throw new Error("User registration failed");
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

/**
 * ✅ Login User & Fetch Updated Profile Immediately
 */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const res = await API.post("/login", userData);

      if (res.data.user) {
        Cookies.set("user", JSON.stringify(res.data.user), { expires: 30 });

        // 🔹 Fetch Latest User Profile Immediately After Login
        dispatch(fetchUserProfile());

        return res.data.user;
      }
      throw new Error("Login failed");
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

/**
 * ✅ Logout User & Clear Cookies + Redux Store
 */
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await API.post("/logout");
      Cookies.remove("user");
      return null;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

/**
 * ✅ Fetch User Profile (Includes Role & Permissions)
 */
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/profile");

      if (res.data.user) {
        return res.data.user;
      }
      throw new Error("Failed to fetch user profile");
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

/**
 * ✅ Update User Profile & Refresh Data
 */
export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (updatedData, { rejectWithValue, dispatch }) => {
    try {
      const res = await API.put("/profile", updatedData);

      if (res.data.user) {
        Cookies.set("user", JSON.stringify(res.data.user), { expires: 30 });

        // 🔹 Fetch Latest User Profile Immediately After Update
        dispatch(fetchUserProfile());

        return res.data.user;
      }
      throw new Error("Profile update failed");
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

/**
 * 🔹 Redux Slice for Authentication (Includes Role Handling)
 */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
    role: Cookies.get("user") ? JSON.parse(Cookies.get("user")).role : null, // Store user role separately
    loading: false,
    error: null,
  },
  reducers: {
    // 🔹 Update User Role Manually (Useful for Role Switch Features)
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload.role; // Update role after registration
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload.role; // Update role after login
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.role = null; // Clear role on logout
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ✅ Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload.role; // Ensure role is updated
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload.role; // Ensure role is updated
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export Reducer & Actions
export const { setUserRole } = authSlice.actions;
export default authSlice.reducer;
