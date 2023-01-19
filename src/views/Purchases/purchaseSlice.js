import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: {},
  postMessage:''
};

export const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    setPurchaseDetailsLoading: state => {
      state.loading = true;
    },
    setPurchaseDetailsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    setPurchaseDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPostPurchaseDetailsSucess : (state,action)=>{
      state.loading = false,
      state.error = null,
      state.postMessage = action.payload
    }
  },
});

export const {
  setPurchaseDetailsLoading,
  setPurchaseDetailsSuccess,
  setPurchaseDetailsFailure,
  setPostPurchaseDetailsSucess
} = purchaseSlice.actions;

export default purchaseSlice.reducer;
