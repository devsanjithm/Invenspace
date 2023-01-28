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

export function PurchaseDisplay({route}) {
  // console.log(route.params.data.pro_desc)
  const {data} = route.params;
  console.log(data.pro_desc);

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
          Purchase Details
        </Text>
        <Card>
          <View
            style={{
              padding: 40,
              alignItems:'center'
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Purchase ID
            </Text>
            <Text style={globalStyles.text}>{data.purchase_id}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Purchase Amount
            </Text>
            <Text style={globalStyles.text}>{data.purchase_amount}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 10,
              }}>
              Purchase Bill
            </Text>
            <Text style={globalStyles.text}>{data.purchase_bill}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Purchase Type
            </Text>
            <Text style={globalStyles.text}>{data.purchase_type}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Purchase Total
            </Text>
            <Text style={globalStyles.text}>{data.purchase_total}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Description
            </Text>
            <Text style={globalStyles.text}>{data.purchase_desc}</Text>
          </View>
        </Card>
      </View>
    </>
  );
}
