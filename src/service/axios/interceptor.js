import {getLocalStorageItem} from '../localstorage';

export const requestInterceptor = async config => {
  try {
    let STORAGE_KEY = 'AUTH_TOKEN';
    let token = await getLocalStorageItem(STORAGE_KEY);
    if (token) {
      config.headers.common.Authorization = token;
    }
    return config;
  } catch (error) {
    return config;
  }
};

export const responseInterceptor = response => {
  return response.data;
};
