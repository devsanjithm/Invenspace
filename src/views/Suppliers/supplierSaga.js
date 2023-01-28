import {takeLatest, put, all, fork, call} from 'redux-saga/effects';
import SupplierAPIs from './supplierService';
import {
  setSupplierDetailsFailure,
  setSupplierDetailsLoading,
  setSupplierDetailsSuccess,
  setPostSupplierDetailsSucess
} from './supplierSlice';

function* getSupplierDetails(payload) {
  try {
    yield put(setSupplierDetailsLoading());
    console.log('===== @DH payload Supplier saga =====', payload);
    const data = yield call(SupplierAPIs.getSupplier, payload.data);
    console.log('===== @DH data Supplier saga =====', data);
    yield put(setSupplierDetailsSuccess(data));
  } catch (error) {
    console.log('saga error', error);
    yield put(setSupplierDetailsFailure(error));
  }
}

function* postSupplierDetails(payload) {
  try {
    yield put(setSupplierDetailsLoading());
    console.log('===== @DH payload Supplier saga =====', payload);
    const data = yield call(SupplierAPIs.setSupplier, payload.data);
    console.log('===== @DH data Supplier saga =====', data);
    yield put(setPostSupplierDetailsSucess(data));
  } catch (error) {
    console.log('saga error', error);
    yield put(setSupplierDetailsFailure(error));
  }
}

function* watchOnGetSupplierDetails() {
  yield takeLatest('getSupplierDetails', getSupplierDetails);
}


function* watchOnPostSupplierDetails() {
  yield takeLatest('postSupplierDetails', postSupplierDetails);
}


export default function* supplierSaga() {
  yield all([fork(watchOnGetSupplierDetails),fork(watchOnPostSupplierDetails)]);
}
