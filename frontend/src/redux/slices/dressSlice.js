import { createSlice } from '@reduxjs/toolkit';

// Mock initial data with verified working image URLs from multiple sources
const mockDresses = [
  {
    _id: '1',
    name: 'Elegant Black Dress',
    type: 'formal',
    color: 'Black',
    size: 'L',
    occasion: 'gala',
    price: 299.99,
    inStock: true,
    image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
    description: 'Sophisticated black dress for formal events'
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
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
    description: 'Beautiful white wedding gown with elegant design'
  },
  {
    _id: '3',
    name: 'Red Evening Dress',
    type: 'party',
    color: 'Red',
    size: 'S',
    occasion: 'cocktail party',
    price: 199.99,
    inStock: true,
    image: 'https://images.pexels.com/photos/1972117/pexels-photo-1972117.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
    description: 'Stunning red dress perfect for evening parties'
  },
  {
    _id: '4',
    name: 'Casual Summer Dress',
    type: 'casual',
    color: 'Blue',
    size: 'M',
    occasion: 'day out',
    price: 79.99,
    inStock: true,
    image: 'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
    description: 'Comfortable and stylish casual summer dress'
  },
  {
    _id: '5',
    name: 'Professional Business Dress',
    type: 'business',
    color: 'Gray',
    size: 'L',
    occasion: 'office',
    price: 129.99,
    inStock: true,
    image: 'https://images.pexels.com/photos/3738364/pexels-photo-3738364.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop',
    description: 'Professional attire for business meetings'
  },
  {
    _id: '6',
    name: 'Floral Print Dress',
    type: 'casual',
    color: 'Multi-color',
    size: 'XS',
    occasion: 'garden party',
    price: 89.99,
    inStock: true,
    image: 'https://cdn.pixabay.com/photo/2016/06/29/04/34/woman-1485827_640.jpg',
    description: 'Beautiful floral print dress for summer occasions'
  }
];

// Create a copy that we can modify
let currentDresses = [...mockDresses];

const dressSlice = createSlice({
  name: 'dresses',
  initialState: {
    items: currentDresses,
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
      // Update the currentDresses array to maintain consistency
      currentDresses = [...state.items];
    },
    updateDress: (state, action) => {
      const { id, dressData } = action.payload;
      const index = state.items.findIndex(dress => dress._id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...dressData };
        // Update the currentDresses array
        currentDresses = [...state.items];
      }
    },
    deleteDress: (state, action) => {
      state.items = state.items.filter(dress => dress._id !== action.payload);
      // Update the currentDresses array
      currentDresses = [...state.items];
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDresses: (state, action) => {
      state.items = action.payload;
    },
    // New reducer to reset to original data
    resetDresses: (state) => {
      state.items = [...mockDresses];
      currentDresses = [...mockDresses];
    }
  }
});

// Mock async thunks that work without backend
export const fetchDresses = (filters = {}) => (dispatch) => {
  dispatch(dressSlice.actions.setLoading(true));
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let filteredDresses = [...currentDresses]; // Use currentDresses instead of mockDresses
        
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

export const resetDresses = () => (dispatch) => {
  dispatch(dressSlice.actions.resetDresses());
};

export const { clearError } = dressSlice.actions;
export default dressSlice.reducer;