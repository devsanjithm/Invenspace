import React, {Component} from 'react';
import Card from '../../components/card';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Touchable,
  BackHandler,
  RefreshControl,
  TextInput,
  Pressable,
} from 'react-native';
import {globalStyles} from '../../utils/styles';

export function CustomerDisplay({route}) {
  // console.log(route.params.data.pro_desc)
  const {data} = route.params;
//   console.log(data.pro_desc);

  return (
    <>
      <View
        style={{
          padding: 25,
          alignItems: 'center',
          margin: 10,
          marginTop: 70,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 20,
          }}>
          Customer Details
        </Text>
        <Card>
          <View
            style={{
              padding: 40,
              alignItems:'center'
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Customer name
            </Text>
            <Text style={globalStyles.text}>{data.cust_name}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Customer Email
            </Text>
            <Text style={globalStyles.text}>{data.cust_email}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Customer mobile
            </Text>
            <Text style={globalStyles.text}>{data.cust_mobile}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Customer id
            </Text>
            <Text style={globalStyles.text}>{data.cust_id}</Text>
            {/* <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Description
            </Text>
            <Text style={globalStyles.text}>{data.pro_desc}</Text> */}
          </View>
        </Card>
      </View>
    </>
  );
}
