import {actionTypes} from '../../utils/constant';

export const getAllTransaction = payload => {
  console.log('===== @DH get all Transaction details action =====', payload);
  return {
    type: actionTypes.getAllTransaction,
    data: payload,
  };
};
export const getTransaction = payload => {
  console.log('===== @DH get Transaction details action =====', payload);
  return {
    type: actionTypes.getTransaction,
    data: payload,
  };
};
export const addTransaction = payload => {
  console.log('===== @DH get Transaction details action =====', payload);
  return {
    type: actionTypes.addTransaction,
    data: payload,
  };
};
