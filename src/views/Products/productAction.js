import {actionTypes} from '../../utils/constant';

export const getProductDetails = () => {
  console.log('===== @DH get auth details action =====');
  return {
    type: actionTypes.getProductDetails
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
