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
import {postSupplierDetails} from './supplierAction';
import _ from 'lodash';
import { AppHeaders } from '../../components/AppHeaders';

export default function AddSupplier({navigation}) {
  const {data: userDatafromRedux} = useSelector(state => state.auth);
  const user_id=userDatafromRedux?.result?._id;
  // const backAction = useCallback(() => {
  //   navigation.goBack();
  //   return true;
  // }, []);

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backAction);
  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backAction);
  // }, [backAction]);
  const dispatch = useDispatch();
  const {postMessage, loading, error} = useSelector(state => state.supplier);

  const loginSchema = yup.object().shape({
    sup_email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    sup_id: yup
      .string()
      // .min(8, ({min}) => 'password must be atleast 8 characters')
      .required('id is required'),
    sup_name: yup
      .string()
       .min(4, ({min}) => 'name must be atleast 4 characters')
      .required('name is required'),
    sup_mobile: yup
    .string()
       .min(10, ({min}) => 'mobile must have 10 digits')
      .required('mobile no is required'),
      sup_username: yup
      .string()
       .min(4, ({min}) => 'udername must be atleast 4 characters')
      .required('username is required'),

  });

  function handleSupplier(values) {
    const payload = {
      sup_name: values.sup_name,
      sup_email: values.sup_email,
      sup_mobile: parseInt(values.sup_mobile),
    };
    dispatch(postSupplierDetails(payload));
    // dispatch(getCustomerDetails(user_id));
  }

  useEffect(() => {
    if (!_.isEmpty(postMessage)) {
      console.log('data in Supplier', postMessage);
      Toast.show({
        text1: 'SUCCESS',
        text2: postMessage?.message,
        type: 'success',
      });
    }
  }, [postMessage]);

  useEffect(() => {
    if (error !== null) {
      Toast.show({
        text1: 'ERROR',
        text2: error?.message?.error,
        type: 'error',
      });
    }
  }, [error]);

  return (
    <Formik
      initialValues={{
        sup_id: '',
        sup_name: '',
        sup_mobile: '',
        sup_username: '',
        sup_email: '',
        // items: '',
      }}
      validateOnMount={true}
      onSubmit={values => handleSupplier(values)}
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
             <AppHeaders title={'Add Supplier'} color={'#fff'} main={true}></AppHeaders>
          <AppStatusBar backgroundColor={'#fff'} barStyle="dark-content"  />
          
          <KeyboardAvoidingView>
            
            <ScrollView>
              <View>
                <Text style={styles.top}>Account info</Text>
              </View>
              <View style={styles.container}>
                <TextInput
                  mode="outlined"
                  label={'Supplier ID'}
                  autoCapitalize="none"
                  onChangeText={handleChange('sup_id')}
                  onBlur={handleBlur('sup_id')}
                  value={values.sup_id}
                  style={styles.inputf}></TextInput>
                  {errors.sup_id && touched.sup_id && (
                    <Text style={styles.errors}>{errors.sup_id}</Text>
                  )}
                <TextInput
                  mode="outlined"
                  label={'Supplier Name'}
                  autoCapitalize="none"
                  onChangeText={handleChange('sup_name')}
                  onBlur={handleBlur('sup_name')}
                  value={values.sup_name}
                  style={styles.inputf}></TextInput>
                  {errors.sup_name && touched.sup_name && (
                    <Text style={styles.errors}>{errors.sup_name}</Text>
                  )}
                <TextInput
                  mode="outlined"
                  label={'Mobile no'}
                  autoCapitalize="none"
                  onChangeText={handleChange('sup_mobile')}
                  onBlur={handleBlur('sup_mobile')}
                  value={values.sup_mobile}
                  style={styles.inputf}></TextInput>
                  {errors.sup_mobile && touched.sup_mobile && (
                    <Text style={styles.errors}>{errors.sup_mobile}</Text>
                  )}
                <TextInput
                  mode="outlined"
                  label={'Username'}
                  autoCapitalize="none"
                  onChangeText={handleChange('sup_username')}
                  onBlur={handleBlur('sup_username')}
                  value={values.sup_username}
                  style={styles.inputf}></TextInput>
                  {errors.sup_username && touched.sup_username && (
                    <Text style={styles.errors}>{errors.sup_username}</Text>
                  )}
                <TextInput
                  mode="outlined"
                  label={'Email id'}
                  autoCapitalize="none"
                  onChangeText={handleChange('sup_email')}
                  onBlur={handleBlur('sup_email')}
                  value={values.sup_email}
                  style={styles.inputf}></TextInput>
                  {errors.sup_email && touched.sup_email && (
                    <Text style={styles.errors}>{errors.sup_email}</Text>
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
