import {takeLatest, put, all, fork, call} from 'redux-saga/effects';
import PurchaseAPIs from './purchaseService';
import {
  setPurchaseDetailsFailure,
  setPurchaseDetailsLoading,
  setPurchaseDetailsSuccess,
  setPostPurchaseDetailsSucess
} from './purchaseSlice';

function* getPurchaseDetails(payload) {
  try {
    yield put(setPurchaseDetailsLoading());
    console.log('===== @DH payload Purchase saga =====', payload);
    const data = yield call(PurchaseAPIs.getPurchase, payload.data);
    console.log('===== @DH data Purchase saga =====', data);
    yield put(setPurchaseDetailsSuccess(data));
  } catch (error) {
    console.log('saga error', error);
    yield put(setPurchaseDetailsFailure(error));
  }
}

function* postPurchaseDetails(payload) {
  try {
    yield put(setPurchaseDetailsLoading());
    console.log('===== @DH payload Purchase saga =====', payload);
    const data = yield call(PurchaseAPIs.setPurchase, payload.data);
    console.log('===== @DH data Purchase saga =====', data);
    yield put(setPostPurchaseDetailsSucess(data));
  } catch (error) {
    console.log('saga error', error);
    yield put(setPurchaseDetailsFailure(error));
  }
}

function* watchOnGetPurchaseDetails() {
  yield takeLatest('getPurchaseDetails', getPurchaseDetails);
}


function* watchOnPostPurchaseDetails() {
  yield takeLatest('postPurchaseDetails', postPurchaseDetails);
}


export default function* purchaseSaga() {
  yield all([fork(watchOnGetPurchaseDetails),fork(watchOnPostPurchaseDetails)]);
}
