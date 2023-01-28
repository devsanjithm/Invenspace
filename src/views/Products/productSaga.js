import {takeLatest, put, all, fork, call} from 'redux-saga/effects';
import ProductAPIs from './productService';
import {
  setProductDetailsFailure,
  setProductDetailsLoading,
  setProductDetailsSuccess,
  setPostProductDetailsSucess,
  setUpdateProductDetailsSucess
} from './productSlice';

function* getProductDetails(payload) {
  try {
    yield put(setProductDetailsLoading());
    console.log('===== @DH payload Product saga =====', payload);
    const data = yield call(ProductAPIs.getProduct, payload.data);
    console.log('===== @DH data Product saga =====', data);
    yield put(setProductDetailsSuccess(data));
  } catch (error) {
    console.log('saga error', error);
    yield put(setProductDetailsFailure(error));
  }
}

function* postProductDetails(payload) {
  try {
    yield put(setProductDetailsLoading());
    console.log('===== @DH payload Product saga =====', payload);
    const data = yield call(ProductAPIs.setProduct, payload.data);
    console.log('===== @DH data Product saga =====', data);
    yield put(setPostProductDetailsSucess(data));
  } catch (error) {
    console.log('saga error', error);
    yield put(setProductDetailsFailure(error));
  }
}

function* updateProductDetails(payload) {
  try {
    yield put(setProductDetailsLoading());
    console.log('===== @DH payload Product saga =====', payload);
    const data = yield call(ProductAPIs.updateProduct, payload.data);
    console.log('===== @DH data Product saga =====', data);
    yield put(setUpdateProductDetailsSucess(data));
  } catch (error) {
    console.log('saga error', error);
    yield put(setProductDetailsFailure(error));
  }
}

function* watchOnUpdateProductDetails() {
  yield takeLatest('updateProductDetails', updateProductDetails);
}

function* watchOnGetProductDetails() {
  yield takeLatest('getProductDetails', getProductDetails);
}

function* watchOnPostProductDetails() {
  yield takeLatest('postProductDetails', postProductDetails);
}

export default function* productSaga() {
  yield all([
    fork(watchOnGetProductDetails),
    fork(watchOnPostProductDetails),
    fork(watchOnUpdateProductDetails),
  ]);
}
