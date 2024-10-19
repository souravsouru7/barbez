import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'http://16.171.150.97:5000'; // Replace with your backend URL

// Thunk for registering shopkeeper
export const registerShopkeeper = createAsyncThunk(
  'shopkeeper/registerShopkeeper',
  async (shopkeeperData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/shopkeepers/register', shopkeeperData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for logging in shopkeeper
export const loginShopkeeper = createAsyncThunk(
  'shopkeeper/loginShopkeeper',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/shopkeepers/login', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for fetching shopkeeper profile
export const fetchShopkeeperProfile = createAsyncThunk(
  'shopkeeper/fetchShopkeeperProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { shopkeeper, token } = getState().shopkeeper;
      const shopkeeperId = shopkeeper?.id || JSON.parse(localStorage.getItem('shopkeeper'))?.id;
      const storedToken = token || localStorage.getItem('token');

      if (!shopkeeperId) {
        throw new Error('Shopkeeper ID not found.');
      }

      const response = await axios.get(`/api/shopkeepers/${shopkeeperId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      return response.data.shopkeeper;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : { message: error.message });
    }
  }
);
export const updateShopkeeper = createAsyncThunk(
  'shopkeeper/updateShopkeeper',
  async ({ id, formData }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().shopkeeper;
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`/api/shopkeepers/${id}`, formData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Load shopkeeper data from localStorage
const shopkeeperFromStorage = localStorage.getItem('shopkeeper')
  ? JSON.parse(localStorage.getItem('shopkeeper'))
  : null;

const initialState = {
  shopkeeper: shopkeeperFromStorage,
  loading: false,
  success: false,
  error: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
};

const shopkeeperSlice = createSlice({
  name: 'shopkeeper',
  initialState,
  reducers: {
    logout: (state) => {
      state.shopkeeper = null;
      state.token = null;
      state.isAuthenticated = false;
      state.success = false;
      state.error = null;
      localStorage.removeItem('shopkeeper');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerShopkeeper.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerShopkeeper.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.shopkeeper = action.payload.shopkeeper;
      })
      .addCase(registerShopkeeper.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(loginShopkeeper.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginShopkeeper.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.shopkeeper = action.payload.shopkeeper;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem('shopkeeper', JSON.stringify(action.payload.shopkeeper));
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginShopkeeper.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.isAuthenticated = false;
      })
      .addCase(fetchShopkeeperProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopkeeperProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.shopkeeper = action.payload;
        state.success = true;
      })
      .addCase(fetchShopkeeperProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateShopkeeper.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShopkeeper.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.shopkeeper = action.payload.shopkeeper;
        localStorage.setItem('shopkeeper', JSON.stringify(action.payload.shopkeeper));
      })
      .addCase(updateShopkeeper.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout } = shopkeeperSlice.actions;
export default shopkeeperSlice.reducer;
