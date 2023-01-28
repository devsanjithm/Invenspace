import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {View, Text, ScrollView, Pressable, Image, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {UserContext} from '../../service/context/context';
import {clearAll} from '../../service/localstorage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppStatusBar from '../../components/Appstatusbar';
import { setAuthDetailsSuccess } from '../Authpages/authSlice';

export default function SideNavPage() {
  const navigation = useNavigation();
  const {setRoute} = useContext(UserContext);
  const dispatch = useDispatch();
  function handleback() {
    navigation.goBack();
  }

  const pages = [
    {
      name: 'Dashboard',
      link: 'Dashboard',
    },
    {
      name: 'Customer',
      link: 'Customer',
    },
    {
      name: 'Products',
      link: 'Product',
    },
    {
      name: 'Stocks',
      link: 'Stock',
    },
    {
      name: 'Sales',
      link: 'Sale',
    },
    {
      name: 'Purchases',
      link: 'Purchase',
    },
    {
      name: 'Suppliers',
      link: 'Supplier',
    },
  ];
  

  async function handleLogout() {
    Alert.alert('Logout', 'Are you sure you want to Logout?', [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          dispatch(setAuthDetailsSuccess({}));
          setRoute(false);
          clearAll();
        },
      },
      {
        text: 'No',
      },
    ]);
  }

  function handleNavigate(link) {
    navigation.navigate(link);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
        <AppStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <View
        style={{
          padding: 10,
          margin: 10,
          flexDirection: 'row',
        }}>
        <Pressable onPress={handleback}>
          <Ionicons name="arrow-back" color={'#000'} size={30} />
        </Pressable>
        <View style={{paddingLeft: 20, paddingBottom: 10}}>
          <Text style={{fontSize: 30, color: '#000'}}>Invenspace</Text>
        </View>
      </View>

      <ScrollView>
        {pages.map((ele, index) => (
          <View
            key={index}
            style={{
              padding: 10,
              margin: 10,
              paddingLeft: 30,
              borderBottomColor: '#e4e4e4',
              borderBottomWidth: 1,
            }}>
            <Pressable onPress={() => handleNavigate(ele.link)}>
              <Text style={{fontSize: 25, color: '#000'}}>{ele.name}</Text>
            </Pressable>
          </View>
        ))}
        <View>
          <Pressable onPress={handleLogout}>
            <View
              style={{
                padding: 10,
                paddingHorizontal: 20,
                margin: 20,
                flexDirection: 'row',
              }}>
              <AntDesign name="logout" size={30} color="#000" />
              <Text
                style={{fontSize: 25, color: '#000', paddingHorizontal: 20}}>
                Logout
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
