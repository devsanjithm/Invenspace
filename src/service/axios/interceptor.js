import { authTokenKey } from '../../utils/constant';
import {getLocalStorageItem} from '../localstorage';

export const requestInterceptor = async config => {
  try {
    let token = await getLocalStorageItem(authTokenKey);
    if (token) {
      config.headers.common.Authorization = token;
    }
    console.log(`--------------${config.method}----- ${config.baseURL}${config.url} ---------------------------`)
    return config;
  } catch (error) {
    return config;
  }
};

export const responseInterceptor = response => {
  return response.data;
};
