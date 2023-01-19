import apiInstance from '../../service/axios/index';

const PurchaseAPIs = {
  getPurchase: async payload => {
    try {
      const res = await apiInstance.get(`purchases/getAll?user_id=${payload}`);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
  setPurchase: async payload => {
    try {
      const res = await apiInstance.post('/purchases/add', payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
};
export default PurchaseAPIs;
