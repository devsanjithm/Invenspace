import {actionTypes} from '../../utils/constant';

export const getCustomerDetails = payload => {
  console.log('===== @DH Customer details action =====', payload);
  return {
    type: actionTypes.getCustomerDetails,
    data: payload,
  };
};
export const postCustomerDetails = payload => {
    console.log('===== @DH update Customer details action =====', payload);
    return {
      type: actionTypes.postCustomerDetails,
      data: payload,
    };
  };
  