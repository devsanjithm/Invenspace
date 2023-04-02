import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: {},
  loginData:{}
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
      state.loginData = action.payload
    },
    setAuthDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUserData:(state,action)=>{
      state.loginData = action.payload
    }
  },
});

export const {
  setAuthDetailsLoading,
  setAuthDetailsSuccess,
  setAuthDetailsFailure,
  setUserData
} = authSlice.actions;

export default authSlice.reducer;
