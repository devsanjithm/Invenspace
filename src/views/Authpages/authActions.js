import {actionTypes} from '../../utils/constant';

export const getAuthDetails = payload => {
  console.log('===== @DH get auth details action =====', payload);
  return {
    type: actionTypes.getAuthDetails,
    data: payload,
  };
};
