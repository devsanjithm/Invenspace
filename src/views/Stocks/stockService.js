import apiInstance from '../../service/axios/index';

const StockAPIs = {
  getStock: async payload => {
    try {
      const res = await apiInstance.get(`stocks/getAll?user_id=${payload}`);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
  setStock: async payload => {
    try {
      const res = await apiInstance.post('/stocks/add', payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
};
export default StockAPIs;
