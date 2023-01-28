import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: {},
  postMessage:'',
  updateData:{}
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductDetailsLoading: state => {
      state.loading = true;
    },
    setProductDetailsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    setProductDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPostProductDetailsSucess : (state,action)=>{
      state.loading = false,
      state.error = null,
      state.postMessage = action.payload
    },
    setUpdateProductDetailsSucess : (state,action)=>{
      state.loading = false,
      state.error = null,
      state.updateData = action.payload
    }
  },
});

export const {
  setProductDetailsLoading,
  setProductDetailsSuccess,
  setProductDetailsFailure,
  setPostProductDetailsSucess,
  setUpdateProductDetailsSucess
} = productSlice.actions;

export default productSlice.reducer;
