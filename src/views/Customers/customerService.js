import apiInstance from '../../service/axios/index';

const CustomerAPIs = {
  getCustomer: async payload => {
    try {
      const res = await apiInstance.post('/api/getAllCustomer');
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
  setCustomer: async payload => {
    try {
      const res = await apiInstance.post('/api/addCustomer', payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
  updateCustomer:async payload =>{
    try {
      const res = await apiInstance.put('/api/updateCustomer', payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
      
    }
  },
  CustomerCount:async () =>{
    try {
      const res = await apiInstance.get('/api/getcustomercount');
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
      
    }
  }
};
export default CustomerAPIs;
