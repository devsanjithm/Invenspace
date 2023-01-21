import {actionTypes} from '../../utils/constant';

export const getPurchaseDetails = payload => {
  console.log('===== @DH get auth details action =====', payload);
  return {
    type: actionTypes.getPurchaseDetails,
    data: payload,
  };
};
export const postPurchaseDetails = payload => {
    console.log('===== @DH update profile details action =====', payload);
    return {
      type: actionTypes.postPurchaseDetails,
      data: payload,
    };
  };