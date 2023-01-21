import apiInstance from '../../service/axios/index';

const SaleAPIs = {
  getSale: async payload => {
    try {
      const res = await apiInstance.get(`sales/getAll?user_id=${payload}`);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
  setSale: async payload => {
    try {
      const res = await apiInstance.post('/sales/add', payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
};
export default SaleAPIs;
