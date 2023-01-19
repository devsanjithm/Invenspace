import {takeLatest, put, all, fork, call} from 'redux-saga/effects';
import CustomerAPIs from './customerService';
import {
  setCustomerDetailsFailure,
  setCustomerDetailsLoading,
  setCustomerDetailsSuccess,
  setPostCustomerDetailsSucess
} from './customerSlice';

function* getCustomerDetails(payload) {
  try {
    yield put(setCustomerDetailsLoading());
    console.log('===== @DH payload Customer saga =====', payload);
    const data = yield call(CustomerAPIs.getCustomer, payload.data);
    console.log('===== @DH data Customer saga =====', data);
    yield put(setCustomerDetailsSuccess(data));
  } catch (error) {
    console.log('saga error', error);
    yield put(setCustomerDetailsFailure(error));
  }
}

function* postCustomerDetails(payload) {
  try {
    yield put(setCustomerDetailsLoading());
    console.log('===== @DH payload Customer saga =====', payload);
    const data = yield call(CustomerAPIs.setCustomer, payload.data);
    console.log('===== @DH data Customer saga =====', data);
    yield put(setPostCustomerDetailsSucess(data));
  } catch (error) {
    console.log('saga error', error);
    yield put(setCustomerDetailsFailure(error));
  }
}

function* watchOnGetCustomerDetails() {
  yield takeLatest('getCustomerDetails', getCustomerDetails);
}


function* watchOnPostCustomerDetails() {
  yield takeLatest('postCustomerDetails', postCustomerDetails);
}


export default function* customerSaga() {
  yield all([fork(watchOnGetCustomerDetails),fork(watchOnPostCustomerDetails)]);
}
