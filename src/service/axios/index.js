import axios from 'axios';
import {API_BASE_URL} from '../config/index';
import {requestInterceptor, responseInterceptor} from './interceptor';
import _ from 'lodash';

const apiInstance = axios.create({
  baseURL: API_BASE_URL,
});
apiInstance.interceptors.request.use(requestInterceptor);
apiInstance.interceptors.response.use(
  response => responseInterceptor(response),
  error => {
    const parsedError = JSON.parse(error?.response?.request?._response || '{}');
    if (error?.response?.request?._response === 'TOKEN_EXPIRED') {
      console.log('401 error');
    }
    throw _.isEmpty(parsedError)? error : parsedError;
  },
);
export default apiInstance;
