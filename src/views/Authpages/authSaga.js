import {takeLatest, put, all, fork, call} from 'redux-saga/effects';
import LoginAPIs from './authService';
import {
  setAuthDetailsFailure,
  setAuthDetailsLoading,
  setAuthDetailsSuccess,
} from './authSlice';

function* getAuthDetails(payload) {
  try {
    yield put(setAuthDetailsLoading());
    console.log('===== @DH login payload auth saga =====', payload);
    const data = yield call(LoginAPIs.login, payload.data);
    console.log('===== @DH login data auth saga =====', data);
    yield put(setAuthDetailsSuccess(data));
  } catch (error) {
    console.log('saga login error', error);
    yield put(setAuthDetailsFailure(error));
  }
}
function* postAuthDetails(payload) {
  try {
    yield put(setAuthDetailsLoading());
    console.log('===== @DH payload register saga =====', payload);
    const data = yield call(LoginAPIs.register, payload.data);
    console.log('===== @DH register saga =====', data);
    yield put(setAuthDetailsSuccess(data));
  } catch (error) {
    console.log('saga register error', error);
    yield put(setAuthDetailsFailure(error));
  }
}

function* watchOnGetAuthDetails() {
  yield takeLatest('getAuthDetails', getAuthDetails);
}

function* watchOnPostAuthDetails() {
  yield takeLatest('postAuthDetails', postAuthDetails);
}


export default function* authSaga() {
  yield all([fork(watchOnGetAuthDetails),fork(watchOnPostAuthDetails)]);
}

