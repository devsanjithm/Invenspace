import {all, fork} from 'redux-saga/effects';
import authSaga from '../views/Authpages/authSaga';

export default function* rootSaga() {
  yield all([
   fork(authSaga)
  ]);
}
