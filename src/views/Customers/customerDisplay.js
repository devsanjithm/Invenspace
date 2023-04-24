import React, {Component, useCallback, useEffect, useState} from 'react';
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
  BackHandler,
  Pressable,
} from 'react-native';
import {globalStyles} from '../../utils/styles';
import {AppHeaders} from '../../components/AppHeaders';
import {styles} from './styles';
import Input from '../../components/Input/index';
import {CustomerInputKey} from './constants';
import {validateData} from '../../utils/validator';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import {updateCustomerDetails, getCustomerDetails} from './customerAction';
import {
  setCustomerDetailsFailure,
  setUpdateCustomerDetailsSucess,
} from './customerSlice';
import _ from 'lodash';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export function CustomerDisplay({route, navigation}) {
  console.log(route.params.data);
  const {data} = route.params;
  // const backAction = useCallback(() => {
  //   navigation.goBack();
  //   return true;
  // }, []);
  const dispatch = useDispatch();
  const {
    updateData,
    loading,
    error: cusError,
  } = useSelector(state => state.customer);
  const {data: userDatafromRedux} = useSelector(state => state.auth);

  function getData() {
    let userId = userDatafromRedux?.result?._id;
    console.log('usedata form redux ', userDatafromRedux);
    if (_.isString(userId)) {
      dispatch(getCustomerDetails(userId));
    }
  }

  const [editable, setEditable] = useState(false);

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backAction);
  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backAction);
  // }, [backAction]);

  const defCustomerData = {
    cust_email: data?.cust_email,
    cust_mobile: data?.cust_mobile,
    cust_name: data?.cust_name,
  };
  const defErrorData = {
    cust_email: false,
    cust_mobile: false,
    cust_name: false,
  };

  const [customerData, setcustomerData] = useState(defCustomerData);
  const [error, setError] = useState(defErrorData);

  const onInputChange = (key, value) => {
    setcustomerData({...customerData, [key]: value});
    setError({...error, [key]: false});
  };

  function onSubmit() {
    if (validateData(customerData.cust_name)) {
      setError({...error, cust_name: true});
      return;
    }
    const payload = {
      id: data._id,
    };
    let isUpdate = false;
    if (defCustomerData.cust_name !== customerData.cust_name) {
      payload.cust_name = customerData.cust_name;
      isUpdate = true;
    }
    if (isUpdate) {
      dispatch(updateCustomerDetails(payload));
      getData();
    } else {
      Toast.show({
        text1: 'INFO !',
        text2: 'Updated',
        type: 'info',
      });
    }
  }

  useEffect(() => {
    if (!_.isEmpty(updateData)) {
      Toast.show({
        text1: 'SUCCESS',
        text2: updateData?.message,
        type: 'success',
      });
    }
  }, [updateData]);

  useEffect(() => {
    console.log(cusError, '-----------------------');
    if (!_.isEmpty(cusError)) {
      Toast.show({
        text1: 'ERROR',
        text2: cusError?.message,
        type: 'error',
      });
    }
  }, [cusError]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(setUpdateCustomerDetailsSucess({}));
  //     dispatch(setCustomerDetailsFailure({}));
  //   };
  // }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <AppHeaders title={data?.cust_name} color={'#fff'}>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            onPress={() => {
              setEditable(true);
            }}>
            {!editable ? (
              <FontAwesome name="edit" size={20} color="#000" />
            ) : null}
          </Pressable>
          <View style={{marginLeft: 15, marginRight: 10}}>
            <Pressable onPress={() => {}}>
              {/* {
               !editable?
              <AntDesign  name='delete' size={20} color='#000' />:null
            } */}
            </Pressable>
          </View>
        </View>
      </AppHeaders>
      <KeyboardAvoidingView style={globalStyles.screenLayout}>
        <SafeAreaView>
          <ScrollView>
            {!editable ? (
              <View>
                <View>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '600',
                      fontSize: 20,
                      marginLeft: 12,
                      marginBottom: 20,
                    }}>
                    Account info
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 10,
                      marginBottom: 30,
                    }}>
                    <Text style={{fontSize: 17, color: 'black'}}>Account</Text>
                    <Text style={{fontSize: 17, color: 'black'}}>
                      {data.cust_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 10,
                      marginBottom: 30,
                    }}>
                    <Text style={{fontSize: 17, color: 'black'}}>
                      Telephone
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{fontSize: 17, color: 'black', marginRight: 10}}>
                        {data.cust_mobile}
                      </Text>
                      <Foundation name="telephone" size={20} color="blue" />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 10,
                      marginBottom: 30,
                    }}>
                    <Text style={{fontSize: 17, color: 'black'}}>Email</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{fontSize: 17, color: 'black', marginRight: 10}}>
                        {data.cust_email}
                      </Text>
                      <Fontisto name="email" size={20} color="blue" />
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
            {editable ? (
              <View>
                <View>
                  <View style={styles.inputBox}>
                    <Input
                      mode={'outlined'}
                      label={'cus_name'}
                      value={customerData.cust_name}
                      onChangeText={value =>
                        onInputChange(CustomerInputKey.cust_name, value)
                      }
                      error={error.cust_name}
                      outlineStyle={error.cust_name && styles.inputError}
                      placeholder={'CUSTOMER_NAME'}
                      disabled={!editable}
                    />
                  </View>
                  <View style={styles.inputBox}>
                    <Input
                      mode={'outlined'}
                      label={'cus-num'}
                      keyboardType={'phone-pad'}
                      value={customerData.cust_mobile}
                      onChangeText={value =>
                        onInputChange(CustomerInputKey.cust_mobile, value)
                      }
                      error={error.cust_mobile}
                      outlineStyle={error.cust_mobile && styles.inputError}
                      placeholder={'MOBILE'}
                      disabled={true}
                    />
                  </View>
                  <View style={styles.inputBox}>
                    <Input
                      mode={'outlined'}
                      label={'cus_email'}
                      value={customerData.cust_email}
                      onChangeText={value =>
                        onInputChange(CustomerInputKey.cust_email, value)
                      }
                      error={error.cust_email}
                      outlineStyle={error.cust_email && styles.inputError}
                      placeholder={'CUS_EMAIL'}
                      multiline={true}
                      numberOfLines={4}
                      disabled={true}
                    />
                  </View>
                  {/* <View style={styles.inputBox}>
                <Input
                  mode={'outlined'}
                  label={'Pro-items'}
                  value={customerData.pro_items}
                  onChangeText={value =>
                    onInputChange(CustomerInputKey.pro_items, value)
                  }
                  error={error.pro_items}
                  outlineStyle={error.pro_items && styles.inputError}
                  placeholder={'PRO_items'}
                  disabled={!editable}
                />
              </View>
              <View style={styles.inputBox}>
                <Input
                  mode={'outlined'}
                  label={'Pro-type'}
                  value={customerData.pro_type}
                  onChangeText={value =>
                    onInputChange(CustomerInputKey.pro_type, value)
                  }
                  error={error.pro_type}
                  outlineStyle={error.pro_type && styles.inputError}
                  placeholder={'PRO_type'}
                  disabled={true}
                />
              </View> */}
                </View>
                <View style={styles.bottomContainer}>
                  <View style={styles.cnclBtn}>
                    <Pressable
                      onPress={() => {
                        setEditable(false);
                      }}>
                      <Text style={styles.btnText}>Cancel</Text>
                    </Pressable>
                  </View>
                  <View style={styles.subBtn}>
                    <Pressable onPress={onSubmit}>
                      <Text style={[styles.btnText, {color: '#fff'}]}>
                        Submit
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ) : null}
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}
