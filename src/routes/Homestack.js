import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {AppHeaders} from '../components/AppHeaders';
import Dashboard from '../views/Authpages/Dashboard';
import Product from '../views/Authpages/Product';
import AddProducts from '../views/Authpages/AddProducts';
import Stock from '../views/Authpages/Stock';
import AddStock from '../views/Authpages/AddStock';
import Customer from '../views/Authpages/Customer';
import AddCustomer from '../views/Authpages/AddCustomer';
import Purchase from '../views/Authpages/Purchase';
import AddPurchase from '../views/Authpages/AddPurchase';
import Sale from '../views/Authpages/Sale';
import AddSale from '../views/Authpages/AddSale';
import Supplier from '../views/Authpages/Supplier';
import AddSupplier from '../views/Authpages/AddSupplier';

export default function Homestack(){

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
        initialRouteName="Product"
      screenOptions={{animation: 'slide_from_right'}}>
            
            <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          header: props => (
            <AppHeaders
              title={'Inventory Dashboard'}
              color={'#87CEEB'}
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="AddProducts"
        component={AddProducts}
        options={{
          header: props => (
            <AppHeaders
              title={'Inventory Dashboard'}
              color={'#87CEEB'}
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Stock"
        component={Stock}
        options={{
          header: props => (
            <AppHeaders
              title={'Inventory Dashboard'}
              color={'#87CEEB'}
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="AddStock"
        component={AddStock}
        options={{
          header: props => (
            <AppHeaders
              title={'Inventory Dashboard'}
              color={'#87CEEB'}
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Customer"
        component={Customer}
        options={{
          header: props => (
            <AppHeaders
              title={'Inventory Dashboard'}
              color={'#87CEEB'}
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="AddCustomer"
        component={AddCustomer}
        options={{
          header: props => (
            <AppHeaders
              title={'Inventory Dashboard'}
              color={'#87CEEB'}
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Purchase"
        component={Purchase}
        options={{
          header: props => (
            <AppHeaders
              title={'Inventory Dashboard'}
              color={'#87CEEB'}
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="AddPurchase"
        component={AddPurchase}
        options={{
          header: props => (
            <AppHeaders
              title={'Inventory Dashboard'}
              color={'#87CEEB'}
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Sale"
        component={Sale}
        options={{
          header: props => (
            <AppHeaders
              title={'Inventory Dashboard'}
              color={'#87CEEB'}
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="AddSale"
        component={AddSale}
        options={{
          header: props => (
            <AppHeaders
              title={'Inventory Dashboard'}
              color={'#87CEEB'}
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Supplier"
        component={Supplier}
        options={{
          header: props => (
            <AppHeaders
              title={'Inventory Dashboard'}
              color={'#87CEEB'}
              {...props}
            />
          ),
        }}
      />
      <Stack.Screen
        name="AddSupplier"
        component={AddSupplier}
        options={{
          header: props => (
            <AppHeaders
              title={'Inventory Dashboard'}
              color={'#87CEEB'}
              {...props}
            />
          ),
        }}
      />
            
        </Stack.Navigator>
    )
}