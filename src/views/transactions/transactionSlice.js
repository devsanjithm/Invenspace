import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: {},
  postMessage:''
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactionDetailsLoading: state => {
      state.loading = true;
    },
    setGetTransactionSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    setAddTransactionSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
      state.postMessage = action.payload
    },
    setTransactionDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setGetAllTransactionSucess : (state,action)=>{
      state.loading = false,
      state.error = null,
      state.postMessage = action.payload
    },
    setpostMessagefalse:(state,action)=>{
      state.postMessage = ''
    }
  },
});

export const {
  setTransactionDetailsLoading,
  setGetTransactionSuccess,
  setTransactionDetailsFailure,
  setAddTransactionSuccess,
  setGetAllTransactionSucess,
  setpostMessagefalse
} = transactionSlice.actions;

export default transactionSlice.reducer;
