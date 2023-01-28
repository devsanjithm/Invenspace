import {actionTypes} from '../../utils/constant';

export const getProductDetails = payload => {
  console.log('===== @DH get auth details action =====', payload);
  return {
    type: actionTypes.getProductDetails,
    data: payload,
  };
};
export const postProductDetails = payload => {
  console.log('===== @DH update profile details action =====', payload);
  return {
    type: actionTypes.postProductDetails,
    data: payload,
  };
};

export const updateProductDetails = payload => {
  console.log('===== @DH update profile details action =====', payload);
  return {
    type: actionTypes.updateProductDetails,
    data: payload,
  };
};
