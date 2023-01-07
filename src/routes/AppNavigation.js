import React, {useContext, useEffect} from 'react';
import Authstack from './Authstack';
import Homestack from './Homestack';
import {UserContext} from '../service/context/context';
import NetInfo from '@react-native-community/netinfo';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export default function AppNavigation() {

  const {route,setisInternet} = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && state.isInternetReachable) {
        setisInternet(true);
        Toast.hide();
      } else {
        // Alert.alert("Network Disconnected")
        setisInternet(false);
        // StatusBar.setBackgroundColor('re')
        Toast.show({
          type: 'error',
          text1: 'No Internet',
          visibilityTime:5000
        });
      }
    });
    return () => {
      // Unsubscribe to network state updates
      unsubscribe();
    };
  }, []);

  return <>{route? <Homestack /> : <Authstack />}</>;
}
