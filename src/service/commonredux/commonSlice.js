import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: {},
  postMessage:''
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setMemberDetailsLoading: state => {
      state.loading = true;
    },
    setMemberDetailsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    setMemberDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPostMemberDetailsSucess : (state,action)=>{
      state.loading = false,
      state.error = null,
      state.postMessage = action.payload
    },
    setPostCompanyDetailsSucess : (state,action)=>{
      state.loading = false,
      state.error = null,
      state.postMessage = action.payload
    }
  },
});

export const {
  setMemberDetailsLoading,
  setMemberDetailsSuccess,
  setMemberDetailsFailure,
  setPostMemberDetailsSucess,
  setPostCompanyDetailsSucess
} = commonSlice.actions;

export default commonSlice.reducer;
