import apiInstance from '../../service/axios/index';

const ProductAPIs = {
  getProduct: async payload => {
    try {
      const res = await apiInstance.get(`/products/getAll?user_id=${payload}`);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
  setProduct: async payload => {
    try {
      const res = await apiInstance.post('/products/add', payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
  updateProduct:async payload =>{
    try {
      const res = await apiInstance.put('/products/update', payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
      
    }
  }
};
export default ProductAPIs;
