import {takeLatest, put, all, fork, call} from 'redux-saga/effects';
import StockAPIs from './stockService';
import {
  setStockDetailsFailure,
  setStockDetailsLoading,
  setStockDetailsSuccess,
  setPostStockDetailsSucess
} from './stockSlice';

function* getStockDetails(payload) {
  try {
    yield put(setStockDetailsLoading());
    console.log('===== @DH payload Stock saga =====', payload);
    const data = yield call(StockAPIs.getStock, payload.data);
    console.log('===== @DH data Stock saga =====', data);
    yield put(setStockDetailsSuccess(data));
  } catch (error) {
    console.log('saga error', error);
    yield put(setStockDetailsFailure(error));
  }
}

function* postStockDetails(payload) {
  try {
    yield put(setStockDetailsLoading());
    console.log('===== @DH payload Stock saga =====', payload);
    const data = yield call(StockAPIs.setStock, payload.data);
    console.log('===== @DH data Stock saga =====', data);
    yield put(setPostStockDetailsSucess(data));
  } catch (error) {
    console.log('saga error', error);
    yield put(setStockDetailsFailure(error));
  }
}

function* watchOnGetStockDetails() {
  yield takeLatest('getStockDetails', getStockDetails);
}


function* watchOnPostStockDetails() {
  yield takeLatest('postStockDetails', postStockDetails);
}


export default function* stockSaga() {
  yield all([fork(watchOnGetStockDetails),fork(watchOnPostStockDetails)]);
}
