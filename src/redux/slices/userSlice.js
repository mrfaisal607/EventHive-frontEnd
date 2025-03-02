import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch All Users (Admin Only)
export const fetchUsers = createAsyncThunk("user/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("/api/users");
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || "Failed to fetch users");
  }
});

// Delete User (Admin Only)
export const deleteUser = createAsyncThunk("user/deleteUser", async (userId, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/users/${userId}`);
    return userId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || "Failed to delete user");
  }
});

// Update User Role (Admin Only)
export const updateUserRole = createAsyncThunk("user/updateUserRole", async ({ userId, role }, { rejectWithValue }) => {
  try {
    const res = await axios.put(`/api/users/${userId}/role`, { role });
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || "Failed to update user role");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update User Role
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user._id === action.payload._id);
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
