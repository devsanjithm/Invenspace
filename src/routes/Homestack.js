import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppHeaders} from '../components/AppHeaders';
import Dashboard from '../views/Dashboard';
import Product from '../views/Products/Product';
import AddProducts from '../views/Products/AddProducts';
import Customer from '../views/Customers/Customer';
import AddCustomer from '../views/Customers/AddCustomer';
import Purchase from '../views/Purchases/Purchase';
import AddPurchase from '../views/Purchases/AddPurchase';
import Sale from '../views/Sales/Sale';
import AddSale from '../views/Sales/AddSale';
import Supplier from '../views/Suppliers/Supplier';
import AddSupplier from '../views/Suppliers/AddSupplier';
import {Display} from '../views/Products/productDisplay';
import {CustomerDisplay} from '../views/Customers/customerDisplay';
import {PurchaseDisplay} from '../views/Purchases/purchaseDisplay';
import {SalesDisplay} from '../views/Sales/salesDisplay';
import {SupplierDisplay} from '../views/Suppliers/supplierDisplay';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useWindowDimensions } from 'react-native';
import Settings from '../views/Settings/settings';
import Home from '../views/home';
import Transactions from '../views/transactions';
import HistoryTransaction from '../views/transactions/historyTransaction';
import Stockin from '../views/transactions/stockin';
import ListSupplier from '../views/transactions/listsupplier';
import Listitem from '../views/transactions/listitems';
import StockOut from '../views/transactions/stockout';
import ListCustomer from '../views/transactions/listcustomer';
import Listitems from '../views/transactions/listitem2';
import Member from '../views/Settings/member';
import Addmember from '../views/Settings/addmember';
import Category from '../views/Settings/category';
function ProductStack() {
  const productStack = createNativeStackNavigator();
  return (
    <productStack.Navigator
      initialRouteName="Product1"
      screenOptions={{
        animation: 'fade_from_bottom',
        headerShown: false,
      }}
      >
      <productStack.Screen name="Product1" component={Product} />
      <productStack.Screen name="AddProducts" component={AddProducts} />
      <productStack.Screen name="productDisplay" component={Display} />
    </productStack.Navigator>
  );
}
function SettingStack() {
  const settingStack = createNativeStackNavigator();
  return (
    <settingStack.Navigator
      initialRouteName="setting"
      screenOptions={{
        animation: 'fade_from_bottom',
        headerShown: false,
      }}
      >
      <settingStack.Screen name="setting" component={Settings} />
      <settingStack.Screen name="supplierDisplay" component={Supplier} />
      <settingStack.Screen name="supplierDis" component={SupplierDisplay} />
      <settingStack.Screen name="addsup" component={AddSupplier} />
      <settingStack.Screen name="customerdis" component={Customer} />
      <settingStack.Screen name="cusdis" component={CustomerDisplay} />
      <settingStack.Screen name="addcus" component={AddCustomer} />
      <settingStack.Screen name="memdis" component={Member} />
      <settingStack.Screen name="addmem" component={Addmember} />
      <settingStack.Screen name="category" component={Category} />
    </settingStack.Navigator>
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
function TransactionStack() {
  const saleStack = createNativeStackNavigator();
  return (
    <saleStack.Navigator 
    screenOptions={{animation:'fade_from_bottom'}}
    >
      <saleStack.Screen
        name="Transaction"
        component={Transactions}
        options={{
          headerShown: false,
        }}
      />
      <saleStack.Screen
        name="History Transaction"
        component={HistoryTransaction}
        options={{
          headerShown: false,
        }}
      />
      <saleStack.Screen
        name="Stockin"
        component={Stockin}
        options={{
          headerShown: false,
        }}
      />
      <saleStack.Screen
        name="Stockout"
        component={StockOut}
        options={{
          headerShown: false,
        }}
      />
      <saleStack.Screen
        name="listcustomer"
        component={ListCustomer}
        options={{
          headerShown: false,
        }}
      />
      <saleStack.Screen
        name="listsupplier"
        component={ListSupplier}
        options={{
          headerShown: false,
        }}
      />
      <saleStack.Screen
        name="listitem"
        component={Listitem}
        options={{
          headerShown: false,
        }}
      />
      <saleStack.Screen
        name="listitem2"
        component={Listitems}
        options={{
          headerShown: false,
        }}
      />
    </saleStack.Navigator>
  );
}
export default function Homestack() {
  const Tab = createBottomTabNavigator();
  const { height } = useWindowDimensions();
  return (
    
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: '#fff',
          height: height / 15,
          paddingBottom: 10,
          borderTopColor: '#fff',
          elevation: 1,
        },
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? { name: 'md-home', type: 'ionicons' }
              : { name: 'md-home-outline', type: 'ionicons' };
          } else if (route.name === 'Items') {
            iconName = focused
              ? { name: 'CodeSandbox', type: 'AntDesign' }
              : { name: 'box', type: 'Feather' };
          } else if (route.name === 'In/Out') {
            iconName = focused
              ? { name: 'arrow-swap', type: 'Fontisto' }
              : { name: 'arrow-swap', type: 'Fontisto' };
          }
          else if (route.name === 'Settings') {
            iconName = focused
              ? { name: 'settings', type: 'ionicons' }
              : { name: 'settings-outline', type: 'ionicons' };
          }

          // You can return any component that you like here!
          if (iconName.type === 'ionicons') {
            return <Ionicons name={iconName.name} size={size} color={color} />;
          } else if (iconName.type === 'octicons') {
            return <Octicons name={iconName.name} size={size} color={color} />;
          } else if (iconName.type === 'Feather') {
            return <Feather name={iconName.name} size={size} color={color} />;
          } else if (iconName.type === 'AntDesign') {
            return <AntDesign name={iconName.name} size={size} color={color} />;
          } else if (iconName.type === 'Fontisto') {
            return <Fontisto name={iconName.name} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#386BF6',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Items" component={ProductStack} />
      <Tab.Screen name="In/Out" component={TransactionStack} />
      <Tab.Screen name="Settings" component={SettingStack} />
    </Tab.Navigator>
  );
}
