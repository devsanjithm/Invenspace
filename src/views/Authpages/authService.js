import apiInstance from '../../service/axios/index';

const LoginAPIs = {
  login: async payload => {
    try {
      const res = await apiInstance.post('/api/login', payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },

  register: async payload => {
    try {
      const res = await apiInstance.post('/api/registration', payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
  getSpecificUser:async payload =>{
    try {
      const res = await apiInstance.get('/api/user');
      console.log(res);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  }
};
export default LoginAPIs;
