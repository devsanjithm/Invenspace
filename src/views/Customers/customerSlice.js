import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: {},
  postMessage:''
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomerDetailsLoading: state => {
      state.loading = true;
    },
    setCustomerDetailsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    setCustomerDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPostCustomerDetailsSucess : (state,action)=>{
      state.loading = false,
      state.error = null,
      state.postMessage = action.payload
    }
  },
});

export const {
  setCustomerDetailsLoading,
  setCustomerDetailsSuccess,
  setCustomerDetailsFailure,
  setPostCustomerDetailsSucess
} = customerSlice.actions;

export default customerSlice.reducer;
