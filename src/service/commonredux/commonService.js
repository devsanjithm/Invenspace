import apiInstance from '../../service/axios/index';

const CommonAPIs = {
   getMemberCount:async () =>{
    try {
      const res = await apiInstance.get('/api/member-count');
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
      
    }
  },
  getMember: async payload => {
    try {
      const res = await apiInstance.post('/api/list-member',payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
  setMember: async payload => {
    try {
      const res = await apiInstance.post('/api/create-member',payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
  setCompany: async payload => {
    try {
      const res = await apiInstance.post('/api/company-update',payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },

//   setSale: async payload => {
//     try {
//       const res = await apiInstance.post('/sales/add', payload);
//       return res;
//     } catch (error) {
//       console.log('=======', error);
//       throw error;
//     }
//   },
};
export default CommonAPIs;
