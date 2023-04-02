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
import {
  setPostProductDetailsSucess,
  setProductDetailsFailure,
} from './productSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Input from '../../components/Input';
import { getProductDetails } from './productAction';
import { CommonActions } from '@react-navigation/native';
export default function AddProducts({navigation}) {
  const {data: userDatafromRedux} = useSelector(state => state.auth);
  const user_id = userDatafromRedux?.result?._id;

  const backAction = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index:0,
        routes:[{name:'Home'}]
      })
    )
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
    const product = {
      pro_id: values.pro_id,
      pro_name: values.ProductName,
      pro_desc: values.Description,
      pro_price: parseInt(values.Price),
      // user_id: user_id,

      //   "pro_desc":"hello",
      // "pro_name":"laptop1",
      // "pro_price
    };
    const category = {
      type: 'sationary',
      manufacturer: 'Luxor',
      color: 'red',
    };
    const payload = {};

    payload['product'] = product;
    payload['category'] = category;

    console.log(payload);

    dispatch(postProductDetails(payload));
    // dispatch(getCustomerDetails(user_id));
  }

  useEffect(() => {
    return () => {
      dispatch(setPostProductDetailsSucess({}));
      dispatch(setProductDetailsFailure({}));
    };
  }, []);

  useEffect(() => {
    if (!_.isEmpty(postMessage)) {
      console.log('data in product', postMessage);
      Toast.show({
        text1: 'SUCCESS',
        text2: postMessage?.message,
        type: 'success',
      });
      navigation.goBack()
      dispatch(getProductDetails())
    }
  }, [postMessage]);

  useEffect(() => {
    if (!_.isEmpty(error)) {
      Toast.show({
        text1: 'ERROR',
        text2: error?.message?.error,
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
            <AppHeaders title={'Add Item'} color={'#fff'}>
              <MaterialIcons
                onPress={() => {
                  // navigation.navigate('Product1');
                  // navigation.poptoTop()
                  navigation.dispatch(
                    CommonActions.reset({
                      index:0,
                      routes:[{name:'Home'}]
                    })
                  )
                }}
                name="cancel"
                size={24}
                color="#000"
              />
            </AppHeaders>
            <KeyboardAvoidingView>
              <ScrollView>
                <View
                  style={{
                    margin: 10,
                    marginHorizontal: 20,
                    justifyContent: 'center',
                  }}>
                  <View style={styles.Box}>
                    <Entypo
                      name="camera"
                      size={25}
                      color="black"
                      style={styles.icon}
                    />
                  </View>
                  <View style={{marginTop: 30}}>
                    <View style={{flexDirection: 'row', marginBottom: 35}}>
                      <Text style={styles.text}>Product id</Text>
                      <TextInput
                        autoCapitalize="none"
                        onChangeText={handleChange('pro_id')}
                        onBlur={handleBlur('pro_id')}
                        backgroundColor="white"
                        value={values.pro_id}
                        style={styles.inputf}></TextInput>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 35}}>
                      <Text style={styles.text}>Product Name </Text>
                      <TextInput
                        // label={'input item name'}
                        autoCapitalize="none"
                        onChangeText={handleChange('ProductName')}
                        onBlur={handleBlur('ProductName')}
                        backgroundColor="white"
                        value={values.ProductName}
                        style={styles.inputf}></TextInput>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 35}}>
                      <Text style={styles.text}>Product Price</Text>
                      <TextInput
                        autoCapitalize="none"
                        onChangeText={handleChange('Price')}
                        onBlur={handleBlur('Price')}
                        backgroundColor="white"
                        value={values.Price}
                        style={styles.inputf}></TextInput>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 35}}>
                      <Text style={styles.text}>Product description</Text>
                      <TextInput
                        autoCapitalize="none"
                        onChangeText={handleChange('Description')}
                        onBlur={handleBlur('Description')}
                        backgroundColor="white"
                        value={values.Description}
                        style={styles.inputf}></TextInput>
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
  text: {
    fontSize: 17,
    color: 'black',
    fontWeight: '300',
    marginRight: 20,
  },
  Box: {
    width: 80,
    height: 80,
    backgroundColor: '#eee',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
    alignSelf: 'center',
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 55,
  },
  inputBox: {
    marginVertical: 15,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  inputf: {
    width: '60%',
    // margin: 5,
    marginLeft: 15,
    height: 30,
  },
  button: {
    flex: 1,
    width: '50%',
    marginTop: 50,
    // justifyContent:'center',
    alignSelf: 'center',
  },
});
