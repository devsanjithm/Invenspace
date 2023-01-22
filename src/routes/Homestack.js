import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppHeaders} from '../components/AppHeaders';
import Dashboard from '../views/Dashboard';
import Product from '../views/Products/Product';
import AddProducts from '../views/Products/AddProducts';
import Stock from '../views/Stocks/Stock';
import AddStock from '../views/Stocks/AddStock';
import Customer from '../views/Customers/Customer';
import AddCustomer from '../views/Customers/AddCustomer';
import Purchase from '../views/Purchases/Purchase';
import AddPurchase from '../views/Purchases/AddPurchase';
import Sale from '../views/Sales/Sale';
import AddSale from '../views/Sales/AddSale';
import Supplier from '../views/Suppliers/Supplier';
import AddSupplier from '../views/Suppliers/AddSupplier';
import SideNavPage from '../views/sideNavbarPage';
export default function Homestack() {
  const Stack = createNativeStackNavigator();

  function ProductStack(){
    const productStack = createNativeStackNavigator();
    return(
      <productStack.Navigator>
        <productStack.Screen
         name="Product1"
         component={Product}
         options={{
           headerShown:false
         }}
        />
        <productStack.Screen
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
      </productStack.Navigator>
    )
  }

  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
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
        component={ProductStack}
        options={{
          headerShown:false
        }}
        // options={{
        //   header: props => (
        //     <AppHeaders
        //       title={'Products'}
        //       color={'#87CEEB'}
        //       main={true}
        //       {...props}
        //     />
        //   ),
        // }}
      />
      {/* <Stack.Screen
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
      /> */}
      <Stack.Screen
        name="Stock"
        component={Stock}
        options={{
          header: props => (
            <AppHeaders
              title={'Inventory Dashboard'}
              color={'#87CEEB'}
              main={true}
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
              main={true}
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
              main={true}
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
              main={true}
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
              main={true}
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
      <Stack.Screen
        name="SideBarPage"
        component={SideNavPage}
        options={{
          animation:'slide_from_left',
          headerShown:false
        }}
      />
    </Stack.Navigator>
  );
}
