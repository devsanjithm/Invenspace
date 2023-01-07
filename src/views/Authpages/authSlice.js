import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthDetailsLoading: state => {
      state.loading = true;
    },
    setAuthDetailsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    setAuthDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setAuthDetailsLoading,
  setAuthDetailsSuccess,
  setAuthDetailsFailure,
} = authSlice.actions;

export default authSlice.reducer;
