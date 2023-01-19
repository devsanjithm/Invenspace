import {actionTypes} from '../../utils/constant';

export const getStockDetails = payload => {
  console.log('===== @DH get stock details action =====', payload);
  return {
    type: actionTypes.getStockDetails,
    data: payload,
  };
};
export const postStockDetails = payload => {
    console.log('===== @DH update stock details action =====', payload);
    return {
      type: actionTypes.postStockDetails,
      data: payload,
    };
  };
  