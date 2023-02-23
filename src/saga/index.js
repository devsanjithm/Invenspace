import {all, fork} from 'redux-saga/effects';
import authSaga from '../views/Authpages/authSaga';
import productSaga from '../views/Products/productSaga';
import purchaseSaga from '../views/Purchases/purchaseSaga';
import customerSaga from '../views/Customers/customerSaga';
import saleSaga from '../views/Sales/saleSaga';
import supplierSaga from '../views/Suppliers/supplierSaga';

export default function* rootSaga() {
  yield all([
   fork(authSaga),
   fork(productSaga),
   fork(purchaseSaga),
   fork(customerSaga),
   fork(saleSaga),
   fork(supplierSaga),

  ]);
}
