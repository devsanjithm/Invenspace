import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: {},
  postMessage:''
};

export const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setStockDetailsLoading: state => {
      state.loading = true;
    },
    setStockDetailsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    setStockDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPostStockDetailsSucess : (state,action)=>{
      state.loading = false,
      state.error = null,
      state.postMessage = action.payload
    }
  },
});

export const {
  setStockDetailsLoading,
  setStockDetailsSuccess,
  setStockDetailsFailure,
  setPostStockDetailsSucess
} = stockSlice.actions;

export default stockSlice.reducer;
