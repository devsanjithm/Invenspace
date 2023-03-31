import apiInstance from '../../service/axios/index';

const HomeAPIs = {
  getDashboardCount: async () => {
    try {
      const res = await apiInstance.get('/api/getdashboardcount');
      return res;
    } catch (error) {
      console.log('=======', error);
      throw error;
    }
  },
};
export default HomeAPIs;
