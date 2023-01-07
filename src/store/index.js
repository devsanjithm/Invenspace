import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga';
import rootReducer from './rootReducer';

const SagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({thunk: false}).prepend(SagaMiddleware);
  },
});

SagaMiddleware.run(rootSaga);
