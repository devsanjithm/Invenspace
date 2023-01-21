import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: {},
  postMessage:''
};

export const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    setSupplierDetailsLoading: state => {
      state.loading = true;
    },
    setSupplierDetailsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    setSupplierDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPostSupplierDetailsSucess : (state,action)=>{
      state.loading = false,
      state.error = null,
      state.postMessage = action.payload
    }
  },
});

export const {
  setSupplierDetailsLoading,
  setSupplierDetailsSuccess,
  setSupplierDetailsFailure,
  setPostSupplierDetailsSucess
} = supplierSlice.actions;

export default supplierSlice.reducer;
