import {actionTypes} from '../../utils/constant';

export const getMemberDetails = payload => {
  console.log('===== @DH get member count =====', payload);
  return {
    type: actionTypes.getMemberDetails,
    data: payload,
  };
};
export const postMemberDetails = payload => {
  console.log('===== @DH add member =====', payload);
  return {
    type: actionTypes.postMemberDetails,
    data: payload,
  };
};
export const postCompanyDetails = payload => {
  console.log('===== @DH chng company =====', payload);
  return {
    type: actionTypes.postCompanyDetails,
    data: payload,
  };
};
// export const postSaleDetails = payload => {
//     console.log('===== @DH update sale details action =====', payload);
//     return {
//       type: actionTypes.postSaleDetails,
//       data: payload,
//     };
//   };
  