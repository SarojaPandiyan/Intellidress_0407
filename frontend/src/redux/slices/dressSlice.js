import { createSlice } from '@reduxjs/toolkit';

// Mock initial data with real gown image URLs
const mockDresses = [
  {
    _id: '1',
    name: 'Black Evening Gown',
    type: 'formal',
    color: 'Black',
    size: 'L',
    occasion: 'gala',
    price: 299.99,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop',
    description: 'Elegant black evening gown with sequin details'
  },
  {
    _id: '2',
    name: 'White Wedding Gown',
    type: 'wedding',
    color: 'White',
    size: 'M',
    occasion: 'wedding',
    price: 599.99,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1519657337289-077c0b6a0224?w=400&h=500&fit=crop',
    description: 'Beautiful white wedding gown with lace detailing'
  },
  {
    _id: '3',
    name: 'Red Ball Gown',
    type: 'formal',
    color: 'Red',
    size: 'S',
    occasion: 'ball',
    price: 399.99,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
    description: 'Stunning red ball gown for special occasions'
  },
  {
    _id: '4',
    name: 'Sparkly Evening Gown',
    type: 'party',
    color: 'Silver',
    size: 'M',
    occasion: 'evening party',
    price: 349.99,
    inStock: false,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
    description: 'Glittering silver gown perfect for night events'
  },
  {
    _id: '5',
    name: 'Lace Wedding Gown',
    type: 'wedding',
    color: 'Ivory',
    size: 'L',
    occasion: 'wedding',
    price: 699.99,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1519225421984-5157df6e15e5?w=400&h=500&fit=crop',
    description: 'Elegant ivory wedding gown with intricate lace'
  },
  {
    _id: '6',
    name: 'Silk Evening Gown',
    type: 'formal',
    color: 'Navy Blue',
    size: 'XS',
    occasion: 'dinner party',
    price: 259.99,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1566479179816-d12dfb1c6f2c?w=400&h=500&fit=crop',
    description: 'Flowing silk gown in deep navy blue'
  },
  {
    _id: '7',
    name: 'Casual Summer Dress',
    type: 'casual',
    color: 'Yellow',
    size: 'M',
    occasion: 'beach',
    price: 49.99,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
    description: 'Light and breezy summer dress'
  },
  {
    _id: '8',
    name: 'Business Attire',
    type: 'business',
    color: 'Gray',
    size: 'L',
    occasion: 'office',
    price: 89.99,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1485231183945-fffde7cb39ef?w=400&h=500&fit=crop',
    description: 'Professional business dress'
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
    },
    setDresses: (state, action) => {
      state.items = action.payload;
    }
  }
});

// Mock async thunks that work without backend
export const fetchDresses = (filters = {}) => (dispatch, getState) => {
  dispatch(dressSlice.actions.setLoading(true));
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let filteredDresses = [...mockDresses]; // Start with all dresses
        
        // Apply filters - only filter if value is provided
        if (filters.type && filters.type !== '') {
          filteredDresses = filteredDresses.filter(dress => 
            dress.type.toLowerCase() === filters.type.toLowerCase()
          );
        }
        
        if (filters.occasion && filters.occasion !== '') {
          filteredDresses = filteredDresses.filter(dress => 
            dress.occasion.toLowerCase().includes(filters.occasion.toLowerCase())
          );
        }
        
        if (filters.size && filters.size !== '') {
          filteredDresses = filteredDresses.filter(dress => 
            dress.size === filters.size
          );
        }
        
        if (filters.maxPrice && filters.maxPrice !== '') {
          filteredDresses = filteredDresses.filter(dress => 
            dress.price <= parseFloat(filters.maxPrice)
          );
        }

        // Update the state with filtered dresses
        dispatch(dressSlice.actions.setDresses(filteredDresses));
        dispatch(dressSlice.actions.setLoading(false));
        resolve(filteredDresses);
      } catch (error) {
        dispatch(dressSlice.actions.setLoading(false));
        reject(error);
      }
    }, 300);
  });
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