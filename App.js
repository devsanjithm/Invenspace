import React from 'react';
import {ContextProvider} from './src/service/context/context';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from "./src/store/index"
import Toast from 'react-native-toast-message';
import AppNavigation from './src/routes/AppNavigation';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <ContextProvider>
          <NavigationContainer>
            <AppNavigation />
            <Toast />
          </NavigationContainer>
        </ContextProvider>
      </Provider>
    </>
  );
}
