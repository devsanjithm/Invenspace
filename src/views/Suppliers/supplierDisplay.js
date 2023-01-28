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

export function SupplierDisplay({route}) {
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
          Sales Details
        </Text>
        <Card>
          <View
            style={{
              padding: 40,
              alignItems:'center'
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Supplier ID
            </Text>
            <Text style={globalStyles.text}>{data.sup_id}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Supplier Name
            </Text>
            <Text style={globalStyles.text}>{data.sup_name}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Supplier Email
            </Text>
            <Text style={globalStyles.text}>{data.sup_email}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Supplier Username
            </Text>
            <Text style={globalStyles.text}>{data.sup_username}</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginTop: 15,
              }}>
              Mobile Number
            </Text>
            <Text style={globalStyles.text}>{data.sup_mobile}</Text>
            
          </View>
        </Card>
      </View>
    </>
  );
}
