import AsyncStorage from '@react-native-community/async-storage';

export async function setLocalStorageItem(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(
      'ERROR OCCURED WHILE SETTING LOCAL STORAGE ITEM',
      'KEY',
      key,
      'VALUE',
      value,
      e,
    );
  }
}

export function removeLocalStorageItem(key) {
  try {
    AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(
      'ERROR OCCURED WHILE REMOVING LOCAL STORAGE ITEM',
      'KEY',
      key,
      e,
    );
  }
}

export async function getLocalStorageItem(key) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error(
      'ERROR OCCURED WHILE GETTING LOCAL STORAGE ITEM',
      'KEY',
      key,
      e,
    );
    return null;
  }
}

export function clearAll() {
  AsyncStorage.clear();
}
