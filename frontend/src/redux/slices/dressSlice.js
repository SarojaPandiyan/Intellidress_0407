import { createSlice } from '@reduxjs/toolkit';

// Mock initial data with real image URLs
const mockDresses = [
  {
    _id: '1',
    name: 'Summer Floral Dress',
    type: 'casual',
    color: 'Pink',
    size: 'M',
    occasion: 'beach',
    price: 49.99,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
    description: 'Light and comfortable summer dress with beautiful floral pattern'
  },
  {
    _id: '2',
    name: 'Black Evening Gown',
    type: 'formal',
    color: 'Black',
    size: 'L',
    occasion: 'wedding',
    price: 129.99,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=400&fit=crop',
    description: 'Elegant evening gown for special occasions and formal events'
  },
  {
    _id: '3',
    name: 'Business Suit',
    type: 'business',
    color: 'Navy Blue',
    size: 'M',
    occasion: 'office',
    price: 89.99,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1485231183945-fffde7cb39ef?w=400&h=400&fit=crop',
    description: 'Professional business attire for corporate settings'
  },
  {
    _id: '4',
    name: 'Party Cocktail Dress',
    type: 'party',
    color: 'Red',
    size: 'S',
    occasion: 'night out',
    price: 69.99,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1566479179816-d12dfb1c6f2c?w=400&h=400&fit=crop',
    description: 'Stylish cocktail dress perfect for parties and social events'
  },
  {
    _id: '5',
    name: 'Wedding Guest Dress',
    type: 'wedding',
    color: 'Lavender',
    size: 'M',
    occasion: 'wedding',
    price: 79.99,
    inStock: false,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
    description: 'Elegant lavender dress perfect for wedding ceremonies'
  },
  {
    _id: '6',
    name: 'Casual Summer Outfit',
    type: 'casual',
    color: 'White',
    size: 'XS',
    occasion: 'day out',
    price: 39.99,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1529903384028-929ae5dccdf1?w=400&h=400&fit=crop',
    description: 'Comfortable and stylish casual wear for everyday use'
  }
];

const dressSlice = createSlice({
  name: 'dresses',
  initialState: {
    items: [...mockDresses],
    loading: false,
    error: null,
    currentDress: null
  },
  reducers: {
    createDress: (state, action) => {
      const newDress = {
        ...action.payload,
        _id: Date.now().toString()
      };
      state.items.push(newDress);
    },
    updateDress: (state, action) => {
      const { id, dressData } = action.payload;
      const index = state.items.findIndex(dress => dress._id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...dressData };
      }
    },
    deleteDress: (state, action) => {
      state.items = state.items.filter(dress => dress._id !== action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

// Mock async thunks that work without backend
export const fetchDresses = (filters = {}) => (dispatch, getState) => {
  dispatch(dressSlice.actions.setLoading(true));
  
  setTimeout(() => {
    try {
      let filteredDresses = [...getState().dresses.items];
      
      // Apply filters
      if (filters.type) {
        filteredDresses = filteredDresses.filter(dress => 
          dress.type.toLowerCase().includes(filters.type.toLowerCase())
        );
      }
      
      if (filters.occasion) {
        filteredDresses = filteredDresses.filter(dress => 
          dress.occasion.toLowerCase().includes(filters.occasion.toLowerCase())
        );
      }
      
      if (filters.size) {
        filteredDresses = filteredDresses.filter(dress => 
          dress.size === filters.size
        );
      }
      
      if (filters.maxPrice) {
        filteredDresses = filteredDresses.filter(dress => 
          dress.price <= parseFloat(filters.maxPrice)
        );
      }
      
      // Simulate API response
      dispatch(dressSlice.actions.setLoading(false));
      return Promise.resolve(filteredDresses);
    } catch (error) {
      dispatch(dressSlice.actions.setLoading(false));
      return Promise.reject(error);
    }
  }, 500);
};

export const fetchDressById = (id) => (dispatch, getState) => {
  dispatch(dressSlice.actions.setLoading(true));
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const dress = getState().dresses.items.find(d => d._id === id);
        if (dress) {
          dispatch(dressSlice.actions.setLoading(false));
          resolve(dress);
        } else {
          dispatch(dressSlice.actions.setLoading(false));
          reject(new Error('Dress not found'));
        }
      } catch (error) {
        dispatch(dressSlice.actions.setLoading(false));
        reject(error);
      }
    }, 300);
  });
};

export const createDress = (dressData) => (dispatch) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        dispatch(dressSlice.actions.createDress(dressData));
        resolve(dressData);
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};

export const updateDress = ({ id, dressData }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        dispatch(dressSlice.actions.updateDress({ id, dressData }));
        resolve({ ...dressData, _id: id });
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};

export const deleteDress = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        dispatch(dressSlice.actions.deleteDress(id));
        resolve(id);
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};

export const { clearError } = dressSlice.actions;
export default dressSlice.reducer;