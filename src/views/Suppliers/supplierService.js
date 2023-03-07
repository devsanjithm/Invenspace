import apiInstance from '../../service/axios/index';

const SupplierAPIs = {
  getSupplier: async payload => {
    try {
      const res = await apiInstance.post('/api/getAllSuppiler');
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
  setSupplier: async payload => {
    try {
      const res = await apiInstance.post('/api/addSuppiler', payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
  updateProduct:async payload =>{
    try {
      const res = await apiInstance.put('/api/updateSuppiler', payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
      
    }
  },
  ProductCount:async () =>{
    try {
      const res = await apiInstance.get('/api/getsuppilercount');
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
      
    }
  }
};
export default SupplierAPIs;
