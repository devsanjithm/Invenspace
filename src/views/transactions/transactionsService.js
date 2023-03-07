import apiInstance from '../../service/axios/index';

const transactionsService = {
  getAllTransaction: async payload => {
      return await apiInstance.post('/api/getAllTransaction',payload);
  },
  getTransaction: async payload => {
      return await apiInstance.get(`/api/getTransaction/${payload?.id}`);
  }
};
export default transactionsService;
