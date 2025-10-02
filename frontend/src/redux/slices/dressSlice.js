import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Async thunks for API calls
export const fetchDresses = createAsyncThunk(
  'dresses/fetchDresses',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/dresses`, { params: filters });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dresses');
    }
  }
);

export const fetchDressById = createAsyncThunk(
  'dresses/fetchDressById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/dresses/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dress');
    }
  }
);

export const createDress = createAsyncThunk(
  'dresses/createDress',
  async (dressData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/dresses`, dressData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create dress');
    }
  }
);

export const updateDress = createAsyncThunk(
  'dresses/updateDress',
  async ({ id, dressData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/dresses/${id}`, dressData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update dress');
    }
  }
);

export const deleteDress = createAsyncThunk(
  'dresses/deleteDress',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/dresses/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete dress');
    }
  }
);

const dressSlice = createSlice({
  name: 'dresses',
  initialState: {
    items: [],
    loading: false,
    error: null,
    currentDress: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentDress: (state) => {
      state.currentDress = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch dresses
      .addCase(fetchDresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDresses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch dress by ID
      .addCase(fetchDressById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDressById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDress = action.payload;
      })
      .addCase(fetchDressById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create dress
      .addCase(createDress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDress.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createDress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update dress
      .addCase(updateDress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDress.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(dress => dress._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateDress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete dress
      .addCase(deleteDress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDress.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(dress => dress._id !== action.payload);
      })
      .addCase(deleteDress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearCurrentDress } = dressSlice.actions;
export default dressSlice.reducer;