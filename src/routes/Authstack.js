import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../views/Authpages/login';
import Register from '../views/Authpages/Register';
import Forgot from '../views/Authpages/Forgot';
import Change from '../views/Authpages/change';
import Verification from '../views/Authpages/Verification';
import {AppHeaders} from '../components/AppHeaders';

export default function Authstack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{animation: 'slide_from_right'}}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{
          header: props => <AppHeaders title={'Verification'} {...props} />,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Forgot password"
        component={Forgot}
        options={{
          header: props => <AppHeaders title={'Forgot Password'} {...props} />,
        }}
      />
      <Stack.Screen
        name="Change password"
        component={Change}
        options={{
          header: props => <AppHeaders title={'Change password'} {...props} />,
        }}
      />
      
    </Stack.Navigator>
  );
}
