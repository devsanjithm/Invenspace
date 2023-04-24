import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: {},
  loginData: {},
  registerData: {},
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
      state.loginData = action.payload;
    },
    setRegisterSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.registerData = action.payload;
    },
    setAuthDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUserData: (state, action) => {
      state.loginData = action.payload;
    },
    setNotifyFalse: (state, action) => {
      state.registerData = {};
    }
  },
});

export const {
  setAuthDetailsLoading,
  setAuthDetailsSuccess,
  setAuthDetailsFailure,
  setUserData,
  setRegisterSuccess,
  setNotifyFalse
} = authSlice.actions;

export default authSlice.reducer;
