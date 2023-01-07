import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, ScrollView, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function SideNavPage() {
  const navigation = useNavigation();

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
      name:'Suppliers',
      link:'Supplier'
    }
  ];

  function handleNavigate(link) {
    navigation.navigate(link);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
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
          <Text style={{fontSize: 30, color: '#000'}}>InvenSpace</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
}
