import {actionTypes} from '../../utils/constant';

export const getSupplierDetails = payload => {
  console.log('===== @DH get Supplier details action =====', payload);
  return {
    type: actionTypes.getSupplierDetails,
    data: payload,
  };
};
export const postSupplierDetails = payload => {
    console.log('===== @DH update Supplier details action =====', payload);
    return {
      type: actionTypes.postSupplierDetails,
      data: payload,
    };
  };
  
  export const updateSupplierDetails = payload => {
    console.log('===== @DH update profile details action =====', payload);
    return {
      type: actionTypes.updateSupplierDetails,
      data: payload,
    };
  };