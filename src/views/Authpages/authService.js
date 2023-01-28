import apiInstance from '../../service/axios/index';

const LoginAPIs = {
  login: async payload => {
    try {
      const res = await apiInstance.post('/user/login', payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },

  register: async payload => {
    try {
      const res = await apiInstance.post('/user/registration', payload);
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
};
export default LoginAPIs;
