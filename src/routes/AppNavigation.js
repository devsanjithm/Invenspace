import React from 'react';
import {Text} from 'react-native';
import Login from '../views/Authpages/login';
import Register from '../views/Authpages/Register';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Forgot from '../views/Authpages/Forgot';
import Change from '../views/Authpages/change';
import Verification from '../views/Authpages/Verification';
const AuthStack = createNativeStackNavigator();
export default function AppNavigation() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Verification" component={Verification} />
        <AuthStack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="Forgot password" component={Forgot} />
      <AuthStack.Screen name="Change password" component={Change} />
      
    </AuthStack.Navigator>
  );
}
