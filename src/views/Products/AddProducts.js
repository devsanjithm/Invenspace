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
import React, {useEffect, useCallback, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import {postProductDetails} from './productAction';
import _ from 'lodash';
import {AppHeaders} from '../../components/AppHeaders';
import { setPostProductDetailsSucess, setProductDetailsFailure } from './productSlice';
export default function AddProducts({navigation}) {
  const {data: userDatafromRedux} = useSelector(state => state.auth);
  const user_id = userDatafromRedux?.result?._id;

  const backAction = useCallback(() => {
    navigation.goBack();
    return true;
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [backAction]);

  const dispatch = useDispatch();
  const {postMessage, loading, error} = useSelector(state => state.product);

  function handleProduct(values) {
    const payload = {
      pro_id: values.pro_id,
      pro_num: values.Productcode,
      pro_desc: values.Description,
      pro_type: values.ProductName,
      pro_items: values.pro_items,
      user_id: user_id,
    };
    dispatch(postProductDetails(payload));
    dispatch(getCustomerDetails(user_id));
  }

  useEffect(() => {
    return()=>{
      dispatch(setPostProductDetailsSucess({}))
      dispatch(setProductDetailsFailure({}))
    }
  }, [])
  

  useEffect(() => {
    if (!_.isEmpty(postMessage)) {
      console.log('data in product', postMessage);
      Toast.show({
        text1: 'SUCCESS',
        text2: postMessage?.message,
        type: 'success',
      });

    }
  }, [postMessage]);

  useEffect(() => {
    if (!_.isEmpty(error)) {
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
          pro_id: '',
          ProductName: '',
          Productcode: '',
          pro_items: '',
          Specification: '',
          Price: '',
          Description: '',
        }}
        validateOnMount={true}
        onSubmit={values => handleProduct(values)}
        //   validationSchema={loginSchema}
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
            <AppStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
            <AppHeaders title={'Add Products'} color={'#fff'} />
            <KeyboardAvoidingView>
              <ScrollView>
                <View
                  style={{
                    margin: 10,
                    marginHorizontal: 20,
                  }}>
                  <View>
                    <Text style={styles.top}>Add Product</Text>
                  </View>
                  <View style={styles.container}>
                    <TextInput
                      mode="outlined"
                      label={'Product ID'}
                      autoCapitalize="none"
                      onChangeText={handleChange('pro_id')}
                      onBlur={handleBlur('pro_id')}
                      value={values.pro_id}
                      style={styles.inputf}></TextInput>
                    <TextInput
                      mode="outlined"
                      label={'Product Name'}
                      autoCapitalize="none"
                      onChangeText={handleChange('ProductName')}
                      onBlur={handleBlur('ProductName')}
                      value={values.ProductName}
                      style={styles.inputf}></TextInput>
                    <TextInput
                      mode="outlined"
                      label={'Product code'}
                      autoCapitalize="none"
                      onChangeText={handleChange('Productcode')}
                      onBlur={handleBlur('Productcode')}
                      value={values.Productcode}
                      style={styles.inputf}></TextInput>
                    <TextInput
                      mode="outlined"
                      label={'pro_items'}
                      autoCapitalize="none"
                      onChangeText={handleChange('pro_items')}
                      onBlur={handleBlur('pro_items')}
                      value={values.pro_items}
                      style={styles.inputf}></TextInput>
                    <TextInput
                      mode="outlined"
                      label={'Specification'}
                      autoCapitalize="none"
                      onChangeText={handleChange('Specification')}
                      onBlur={handleBlur('Specification')}
                      value={values.Specification}
                      style={styles.inputf}></TextInput>
                    <TextInput
                      mode="outlined"
                      label={'Price'}
                      autoCapitalize="none"
                      onChangeText={handleChange('Price')}
                      onBlur={handleBlur('Price')}
                      value={values.Price}
                      style={styles.inputf}></TextInput>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                      }}>
                      <TextInput
                        mode="outlined"
                        label={'Product Description'}
                        autoCapitalize="none"
                        onChangeText={handleChange('Description')}
                        onBlur={handleBlur('Description')}
                        value={values.Description}
                        style={{width: '95%'}}></TextInput>
                    </View>
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
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
    marginHorizontal: 10,
  },
  inputf: {
    width: '46%',
    margin: 5,
  },
  button: {
    flex: 1,
    width: '50%',
    marginTop: 50,
    // justifyContent:'center',
    alignSelf: 'center',
  },
});
