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

export function StockDisplay({route}) {
  // console.log(route.params.data.pro_desc)
  const {data} = route.params;

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
          Stock Details
        </Text>
        <Card>
          <View
            style={{
              padding: 40,
              alignItems:'center'
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Stock ID
            </Text>
            <Text style={globalStyles.text}>{data.stocks_id}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Stock Type
            </Text>
            <Text style={globalStyles.text}>{data.stocks_type}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Stock Number
            </Text>
            <Text style={globalStyles.text}>{data.stocks_num}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Stock Items
            </Text>
            <Text style={globalStyles.text}>{data.stocks_items}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Description
            </Text>
            <Text style={globalStyles.text}>{data.stocks_desc}</Text>
          </View>
        </Card>
      </View>
    </>
  );
}
