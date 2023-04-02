import {takeLatest, put, all, fork, call} from 'redux-saga/effects';
import LoginAPIs from '../../views/Authpages/authService';
import { setUserData } from '../../views/Authpages/authSlice';
import CommonAPIs from './commonService';
import {
  setMemberDetailsFailure,
  setMemberDetailsLoading,
  setMemberDetailsSuccess,
  setPostMemberDetailsSucess,
  setPostCompanyDetailsSucess,
  setMemberDetailsLoadingFalse
} from './commonSlice';

function* getMemberDetails(payload) {
  try {
    yield put(setMemberDetailsLoading());
    console.log('===== @DH payload Sale saga =====', payload);
    const data = yield call(CommonAPIs.getMember,payload.data);
    console.log('===== @DH data Sale saga =====', data);
    yield put(setMemberDetailsSuccess(data));
  } catch (error) {
    console.log('saga error', error);
    yield put(setMemberDetailsFailure(error));
  }
}

function* postMemberDetails(payload) {
  try {
    yield put(setMemberDetailsLoading());
    console.log('===== @DH payload Sale saga =====', payload);
    const data = yield call(CommonAPIs.setMember, payload.data);
    console.log('===== @DH data Sale saga =====', data);
    yield put(setPostMemberDetailsSucess(data));
  } catch (error) {
    console.log('saga error', error);
    yield put(setMemberDetailsFailure(error));
  }
}
function* postCompanyDetails(payload) {
  try {
    yield put(setMemberDetailsLoading());
    console.log('===== @DH payload Sale saga =====', payload);
    const data = yield call(CommonAPIs.setCompany, payload.data);
    console.log('===== @DH data Sale saga =====', data);
    yield put(setMemberDetailsLoadingFalse())
    const userData = yield call(LoginAPIs.getSpecificUser)
    console.log('=== user data after update company ===');
    yield put(setUserData(userData));
  } catch (error) {
    console.log('saga error', error);
    yield put(setMemberDetailsFailure(error));
  }
}

function* watchOnPostMemberDetails() {
  yield takeLatest('postMemberDetails', postMemberDetails);
}
function* watchOnPostCompanyDetails() {
  yield takeLatest('postCompanyDetails', postCompanyDetails);
}


function* watchOnGetMemberDetails() {
  yield takeLatest('getMemberDetails', getMemberDetails);
}


export default function* commonSaga() {
  yield all([fork(watchOnGetMemberDetails),fork(watchOnPostMemberDetails),fork(watchOnPostCompanyDetails)]);
}
