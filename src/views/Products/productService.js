import apiInstance from '../../service/axios/index';

const ProductAPIs = {
  getProduct: async () => {
    try {
      const res = await apiInstance.post('/api/getallproduct');
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
  setProduct: async payload => {
    try {
      const res = await apiInstance.post('/api/addproduct', payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
  updateProduct:async payload =>{
    try {
      const res = await apiInstance.put('/api/updateproduct', payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
      
    }
  }
};
export default ProductAPIs;
