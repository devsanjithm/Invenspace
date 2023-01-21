import {takeLatest, put, all, fork, call} from 'redux-saga/effects';
import SaleAPIs from './saleService';
import {
  setSaleDetailsFailure,
  setSaleDetailsLoading,
  setSaleDetailsSuccess,
  setPostSaleDetailsSucess
} from './saleSlice';

function* getSaleDetails(payload) {
  try {
    yield put(setSaleDetailsLoading());
    console.log('===== @DH payload Sale saga =====', payload);
    const data = yield call(SaleAPIs.getSale, payload.data);
    console.log('===== @DH data Sale saga =====', data);
    yield put(setSaleDetailsSuccess(data));
  } catch (error) {
    console.log('saga error', error);
    yield put(setSaleDetailsFailure(error));
  }
}

function* postSaleDetails(payload) {
  try {
    yield put(setSaleDetailsLoading());
    console.log('===== @DH payload Sale saga =====', payload);
    const data = yield call(SaleAPIs.setSale, payload.data);
    console.log('===== @DH data Sale saga =====', data);
    yield put(setPostSaleDetailsSucess(data));
  } catch (error) {
    console.log('saga error', error);
    yield put(setSaleDetailsFailure(error));
  }
}

function* watchOnGetSaleDetails() {
  yield takeLatest('getSaleDetails', getSaleDetails);
}


function* watchOnPostSaleDetails() {
  yield takeLatest('postSaleDetails', postSaleDetails);
}


export default function* saleSaga() {
  yield all([fork(watchOnGetSaleDetails),fork(watchOnPostSaleDetails)]);
}
