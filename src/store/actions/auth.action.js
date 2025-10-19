import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const loginAuth = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/register/`,
        credentials
      );
      // return the response data so reducer receives plain payload
      return response.data;
    } catch (error) {
      // surface backend error payload when available
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
