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
import {Display} from '../views/Products/productDisplay';
import {StockDisplay} from '../views/Stocks/stockDisplay';
import {CustomerDisplay} from '../views/Customers/customerDisplay';
import {PurchaseDisplay} from '../views/Purchases/purchaseDisplay';
import {SalesDisplay} from '../views/Sales/salesDisplay';
import {SupplierDisplay} from '../views/Suppliers/supplierDisplay';
export default function Homestack() {
  const Stack = createNativeStackNavigator();

  function ProductStack() {
    const productStack = createNativeStackNavigator();
    return (
      <productStack.Navigator
        initialRouteName="Product1"
        screenOptions={{
          animation: 'slide_from_right',
          animationDuration: 250,
          headerShown: false,
        }}>
        <productStack.Screen name="Product1" component={Product} />
        <productStack.Screen name="AddProducts" component={AddProducts} />
        <productStack.Screen name="productDisplay" component={Display} />
      </productStack.Navigator>
    );
  }

  function StockStack() {
    const stockStack = createNativeStackNavigator();
    return (
      <stockStack.Navigator>
        <stockStack.Screen
          name="Stock1"
          component={Stock}
          options={{
            headerShown: false,
          }}
        />
        <stockStack.Screen
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
        <stockStack.Screen
          name="stockDisplay"
          component={StockDisplay}
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
      </stockStack.Navigator>
    );
  }

  function CustomerStack() {
    const customerStack = createNativeStackNavigator();
    return (
      <customerStack.Navigator>
        <customerStack.Screen
          name="Customer1"
          component={Customer}
          options={{
            headerShown: false,
          }}
        />
        <customerStack.Screen
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
        <customerStack.Screen
          name="customerDisplay"
          component={CustomerDisplay}
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
      </customerStack.Navigator>
    );
  }

  function SaleStack() {
    const saleStack = createNativeStackNavigator();
    return (
      <saleStack.Navigator>
        <saleStack.Screen
          name="Sale1"
          component={Sale}
          options={{
            headerShown: false,
          }}
        />
        <saleStack.Screen
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
        <saleStack.Screen
          name="saleDisplay"
          component={SalesDisplay}
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
      </saleStack.Navigator>
    );
  }

  function PurchaseStack() {
    const purchaseStack = createNativeStackNavigator();
    return (
      <purchaseStack.Navigator>
        <purchaseStack.Screen
          name="Purchase1"
          component={Purchase}
          options={{
            headerShown: false,
          }}
        />
        <purchaseStack.Screen
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
        <purchaseStack.Screen
          name="purchaseDisplay"
          component={PurchaseDisplay}
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
      </purchaseStack.Navigator>
    );
  }

  function SupplierStack() {
    const supplierStack = createNativeStackNavigator();
    return (
      <supplierStack.Navigator>
        <supplierStack.Screen
          name="Supplier1"
          component={Supplier}
          options={{
            headerShown: false,
          }}
        />
        <supplierStack.Screen
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
        <supplierStack.Screen
          name="supplierDisplay"
          component={SupplierDisplay}
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
      </supplierStack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{animation: 'slide_from_right', headerShown: false}}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Product" component={ProductStack} />
      <Stack.Screen name="Stock" component={StockStack} />
      <Stack.Screen name="Customer" component={CustomerStack} />
      <Stack.Screen name="Purchase" component={PurchaseStack} />
      <Stack.Screen name="Sale" component={SaleStack} />
      <Stack.Screen name="Supplier" component={SupplierStack} />
      <Stack.Screen
        name="SideBarPage"
        component={SideNavPage}
        options={{
          animation: 'slide_from_left',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
