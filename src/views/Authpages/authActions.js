import {actionTypes} from '../../utils/constant';

export const getAuthDetails = payload => {
  console.log('===== @DH get auth details action =====', payload);
  return {
    type: actionTypes.getAuthDetails,
    data: payload,

  };
};

export const postAuthDetails = payload => {
  console.log('===== @DH post auth details action =====', payload);
  return {
    type: actionTypes.postAuthDetails,
    data: payload,
  };
};

