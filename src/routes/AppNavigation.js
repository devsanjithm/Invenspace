import React from 'react';
import {Text} from 'react-native';
import Authstack from './Authstack';
import Homestack from './Homestack';
export default function AppNavigation() {
  const user = true;
  return <>{user === true ? <Homestack /> : <Authstack />}</>;
}
