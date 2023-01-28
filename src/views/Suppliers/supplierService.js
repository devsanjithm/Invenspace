import apiInstance from '../../service/axios/index';

const SupplierAPIs = {
  getSupplier: async payload => {
    try {
      const res = await apiInstance.get(`suppliers/getAll?user_id=${payload}`);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
  setSupplier: async payload => {
    try {
      const res = await apiInstance.post('/suppliers/add', payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
};
export default SupplierAPIs;
