import {actionTypes} from '../../utils/constant';

export const getSaleDetails = payload => {
  console.log('===== @DH get sale details action =====', payload);
  return {
    type: actionTypes.getSaleDetails,
    data: payload,
  };
};
export const postSaleDetails = payload => {
    console.log('===== @DH update sale details action =====', payload);
    return {
      type: actionTypes.postSaleDetails,
      data: payload,
    };
  };
  