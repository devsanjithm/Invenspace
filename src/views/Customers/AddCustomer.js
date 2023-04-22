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
} from 'react-native';
import {Button} from 'react-native-paper';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import AppStatusBar from '../../components/Appstatusbar';
import React, {useEffect, useCallback} from 'react';
import {TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import {getCustomerDetails, postCustomerDetails} from './customerAction';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import _ from 'lodash';
import { setPostCustomerDetailsSucess } from './customerSlice';
import { AppHeaders } from '../../components/AppHeaders';
import { useState } from 'react';

export default function AddCustomer({navigation}) {
  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backAction);
  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backAction);
  // }, [backAction]);

  const dispatch = useDispatch();
  const {postMessage, loading, error} = useSelector(state => state.customer);
  // const [userDetails, setUserDetails] = useState(
  //   _.isEmpty(userDatafromRedux) ? loginData : userDatafromRedux,
  // );
  
  const loginSchema = yup.object().shape({
    cust_email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    cust_id: yup
      .string()
      // .min(8, ({min}) => 'password must be atleast 8 characters')
      .required('id is required'),
    cust_name: yup
      .string()
       .min(4, ({min}) => 'name must be atleast 4 characters')
      .required('name is required'),
    cust_mobile: yup
    .string()
       .min(10, ({min}) => 'mobile must have 10 digits')
      .required('mobile no is required'),
      cust_username: yup
      .string()
       .min(4, ({min}) => 'udername must be atleast 4 characters')
      .required('username is required'),

  });

  function handleCustomer(values) {
    const payload = {
      // cust_id: values.cust_id,
      cust_name: values.cust_name,
      // cust_username: values.cust_username,
      cust_email: values.cust_email,
      cust_mobile: parseInt(values.cust_mobile),
      // user_id: user_id,

      // "cust_id":"2338",
      // "cust_name":"thirdd",
      // "cust_email":"email12345@email.com",
      // "cust_mobile":987654190,
    };
    dispatch(postCustomerDetails(payload));
    dispatch(getCustomerDetails());
  }

  useEffect(() => {
    if (!_.isEmpty(postMessage)) {
      console.log('data in customer', postMessage);
      // console.log(userDetails?.data?.user)
      Toast.show({
        text1: 'SUCCESS',
        text2: postMessage?.message,
        type: 'success',
      });
      // dispatch()
    }
  }, [postMessage]);

  useEffect(() => {
    if (error !== null) {
      Toast.show({
        text1: 'ERROR',
        text2: error?.message,
        type: 'error',
      });
    }
  }, [error]);

  return (
    <>
      {loading ? <Loader /> : null}
      <Formik
        initialValues={{
          cust_id: '',
          cust_name: '',
          cust_mobile: '',
          cust_username: '',
          cust_email: '',
          // items: '',
        }}
        validateOnMount={true}
        onSubmit={values => handleCustomer(values)}
        validationSchema={loginSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          isValid,
        }) => (
          <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#fff',
            // justifyContent: 'flex-end',
          }}>
             <AppHeaders title={'Add Customer'} color={'#fff'} main={true}></AppHeaders>
          <AppStatusBar backgroundColor={'#fff'} barStyle="dark-content"  />
          
          <KeyboardAvoidingView>
            
            <ScrollView>
              <View>
                <Text style={styles.top}>Account info</Text>
              </View>
              <View style={styles.container}>
                <TextInput
                  mode="outlined"
                  keyboardType='numeric'
                  label={'Customer ID'}
                  autoCapitalize="none"
                  onChangeText={handleChange('cust_id')}
                  onBlur={handleBlur('cust_id')}
                  value={values.cust_id}
                  style={styles.inputf}></TextInput>
                  {errors.cust_id && touched.cust_id && (
                    <Text style={styles.errors}>{errors.cust_id}</Text>
                  )}
                <TextInput
                  mode="outlined"
                  label={'Customer Name'}
                  autoCapitalize="none"
                  onChangeText={handleChange('cust_name')}
                  onBlur={handleBlur('cust_name')}
                  value={values.cust_name}
                  style={styles.inputf}></TextInput>
                  {errors.cust_name && touched.cust_name && (
                    <Text style={styles.errors}>{errors.cust_name}</Text>
                  )}
                <TextInput
                  mode="outlined"
                  label={'Mobile no'}
                  autoCapitalize="none"
                  keyboardType='numeric'
                  onChangeText={handleChange('cust_mobile')}
                  onBlur={handleBlur('cust_mobile')}
                  value={values.cust_mobile}
                  style={styles.inputf}></TextInput>
                  {errors.cust_mobile && touched.cust_mobile && (
                    <Text style={styles.errors}>{errors.cust_mobile}</Text>
                  )}
                <TextInput
                  mode="outlined"
                  label={'Username'}
                  autoCapitalize="none"
                  onChangeText={handleChange('cust_username')}
                  onBlur={handleBlur('cust_username')}
                  value={values.cust_username}
                  style={styles.inputf}></TextInput>
                  {errors.cust_username && touched.cust_username && (
                    <Text style={styles.errors}>{errors.cust_username}</Text>
                  )}
                <TextInput
                  mode="outlined"
                  label={'Email id'}
                  autoCapitalize="none"
                  onChangeText={handleChange('cust_email')}
                  onBlur={handleBlur('cust_email')}
                  value={values.cust_email}
                  style={styles.inputf}></TextInput>
                  {errors.cust_email && touched.cust_email && (
                    <Text style={styles.errors}>{errors.cust_email}</Text>
                  )}
              </View>
              <View style={styles.button}>
                <Button
                  mode="contained"
                  color="#87CEEB"
                  onPress={() => {
                    handleSubmit();
                  }}>
                  Add
                </Button>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
        )}
      </Formik>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  top: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
    marginLeft:10
  },
  inputf: {
    width: '90%',
    margin: 5,
    marginLeft: 15,
  },
  button: {
    flex: 1,
    width: '50%',
    marginTop: 50,
    // justifyContent:'center',
    alignSelf: 'center',
  },
  errors: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
    paddingLeft: 10,
  },
});
