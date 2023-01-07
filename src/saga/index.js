import {all, fork} from 'redux-saga/effects';
import authSaga from '../views/Authpages/authSaga';
import productSaga from '../views/Products/productSaga';
export default function* rootSaga() {
  yield all([
   fork(authSaga),
   fork(productSaga)
  ]);
}
