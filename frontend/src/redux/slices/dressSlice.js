import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL

// Async thunks
export const fetchDress = createAsyncThunk(
  'dresses/fetchDress',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/dresses`, { params: filters })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dresses')
    }
  }
)

export const fetchDressById = createAsyncThunk(
  'dresses/fetchDressById',
  async (dressId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/dresses/${dressId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dress')
    }
  }
)

export const createDress = createAsyncThunk(
  'dresses/createDress',
  async (dressData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/dresses`, dressData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create dress')
    }
  }
)

export const updateDress = createAsyncThunk(
  'dresses/updateDress',
  async ({ id, ...dressData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/dresses/${id}`, dressData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update dress')
    }
  }
)

export const deleteDress = createAsyncThunk(
  'dresses/deleteDress',
  async (dressId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/dresses/${dressId}`)
      return dressId
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete dress')
    }
  }
)

const dressSlice = createSlice({
  name: 'dresses',
  initialState: {
    items: [],
    currentDress: null,
    loading: false,
    error: null
  },
  reducers: {
    clearCurrentDress: (state) => {
      state.currentDress = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch dresses
      .addCase(fetchDress.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDress.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchDress.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch single dress
      .addCase(fetchDressById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDressById.fulfilled, (state, action) => {
        state.loading = false
        state.currentDress = action.payload
      })
      .addCase(fetchDressById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Create dress
      .addCase(createDress.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(createDress.rejected, (state, action) => {
        state.error = action.payload
      })
      // Update dress
      .addCase(updateDress.fulfilled, (state, action) => {
        const index = state.items.findIndex(dress => dress._id === action.payload._id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
        state.currentDress = action.payload
      })
      .addCase(updateDress.rejected, (state, action) => {
        state.error = action.payload
      })
      // Delete dress
      .addCase(deleteDress.fulfilled, (state, action) => {
        state.items = state.items.filter(dress => dress._id !== action.payload)
      })
      .addCase(deleteDress.rejected, (state, action) => {
        state.error = action.payload
      })
  }
})

export const { clearCurrentDress, clearError } = dressSlice.actions
export default dressSlice.reducer