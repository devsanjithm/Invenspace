import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: {},
  postMessage:''
};

export const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    setSaleDetailsLoading: state => {
      state.loading = true;
    },
    setSaleDetailsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    setSaleDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPostSaleDetailsSucess : (state,action)=>{
      state.loading = false,
      state.error = null,
      state.postMessage = action.payload
    }
  },
});

export const {
  setSaleDetailsLoading,
  setSaleDetailsSuccess,
  setSaleDetailsFailure,
  setPostSaleDetailsSucess
} = saleSlice.actions;

export default saleSlice.reducer;
