import {takeLatest, put, all, fork, call} from 'redux-saga/effects';
import { setAddTransactionSuccess, setGetAllTransactionSucess, setGetTransactionSuccess, setTransactionDetailsFailure, setTransactionDetailsLoading } from './transactionSlice';
import transactionsService from './transactionsService';

function* getAllTransaction(payload) {
  try {
    yield put(setTransactionDetailsLoading());
    console.log('===== @DH payload transaction saga =====', payload);
    const data = yield call(transactionsService.getAllTransaction, payload.data);
    console.log('===== @DH data transaction saga =====', data);
    yield put(setGetAllTransactionSucess(data));
  } catch (error) {
    console.log('saga error', error);
    yield put(setTransactionDetailsFailure(error));
  }
}

function* getTransaction(payload) {
  try {
    yield put(setTransactionDetailsLoading());
    console.log('===== @DH payload transaction saga =====', payload);
    const data = yield call(transactionsService.getTransaction, payload.data);
    console.log('===== @DH data transaction saga =====', data);
    yield put(setGetTransactionSuccess(data));
  } catch (error) {
    console.log('saga error', error);
    yield put(setTransactionDetailsFailure(error));
  }
}

function* addTransaction(payload) {
  try {
    yield put(setTransactionDetailsLoading());
    console.log('===== @DH payload transaction saga =====', payload);
    const data = yield call(transactionsService.addTransaction, payload.data);
    console.log('===== @DH data transaction saga =====', data);
    yield put(setAddTransactionSuccess(data));
  } catch (error) {
    console.log('saga error', error);
    yield put(setTransactionDetailsFailure(error));
  }
}

function* watchOngetAllTransaction() {
  yield takeLatest('getAllTransaction', getAllTransaction);
}

function* watchOngetTransaction() {
  yield takeLatest('getTransaction', getTransaction);
}


function* watchOnaddTransaction() {
  yield takeLatest('addTransaction', addTransaction);
}


export default function* transactionSaga() {
  yield all([fork(watchOngetTransaction),fork(watchOnaddTransaction),fork(watchOngetAllTransaction)]);
}
