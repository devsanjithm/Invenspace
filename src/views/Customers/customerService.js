import apiInstance from '../../service/axios/index';

const CustomerAPIs = {
  getCustomer: async payload => {
    try {
      const res = await apiInstance.get(`customers/getAll?user_id=${payload}`);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
  setCustomer: async payload => {
    try {
      const res = await apiInstance.post('/customers/add', payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
};
export default CustomerAPIs;
