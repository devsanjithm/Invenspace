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
import * as yup from 'yup';
import { getProductDetails } from './productAction';
import { CommonActions } from '@react-navigation/native';
export default function AddProducts({navigation}) {
  const {data: userDatafromRedux} = useSelector(state => state.auth);
  const user_id = userDatafromRedux?.result?._id;

  // const backAction = useCallback(() => {
  //   navigation.dispatch(
  //     CommonActions.reset({
  //       index:0,
  //       routes:[{name:'Home'}]
  //     })
  //   )
  //   return true;
  // }, []);

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backAction);
  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backAction);
  // }, [backAction]);

  const dispatch = useDispatch();
  const {postMessage, loading, error} = useSelector(state => state.product);

  const loginSchema = yup.object().shape({
    ProductName: yup
      .string()
      .required('name is required')
      .min(3, ({min}) => 'name must be atleast 3 characters'),
    pro_id: yup
      .string()
      // .min(8, ({min}) => 'password must be atleast 8 characters')
      .required('id is required'),
    quantity: yup
      .string()
      .required('quantity is required'),
    Price: yup
      .string()
      .required('Price is required'),
    Description: yup
      .string()
      .required('Description is required'),

  });

  function handleProduct(values) {
    const product = {
      pro_id: values.pro_id,
      pro_name: values.ProductName,
      pro_desc: values.Description,
      quantity:parseInt(values.quantity),
      pro_price: parseInt(values.Price),
      // user_id: user_id,

      //   "pro_desc":"hello",
      // "pro_name":"laptop1",
      // "pro_price
    };
    const category = {
      type: values.type,
      manufacturer: values.manufacturer,
      color: values.color,
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
          quantity:'',
          type:'',
          manufacturer:'',
          color:'',
        }}
        validateOnMount={true}
        onSubmit={values => handleProduct(values)}
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
                  {/* <View style={styles.Box}>
                    <Entypo
                      name="camera"
                      size={25}
                      color="black"
                      style={styles.icon}
                    />
                  </View> */}
                  <View style={{marginTop: 30}}>
                    <View style={{flexDirection: 'row', marginBottom: 35,justifyContent:'space-between'}}>
                      <Text style={styles.text}>Product id</Text>
                      {errors.pro_id && touched.pro_id && (
                    <Text style={styles.errors}>{errors.pro_id}</Text>
                  )}
                      <TextInput
                      keyboardType='phone-pad'
                        autoCapitalize="none"
                        onChangeText={handleChange('pro_id')}
                        onBlur={handleBlur('pro_id')}
                        backgroundColor="white"
                        value={values.pro_id}
                        style={styles.inputf}></TextInput>
                      
                    </View>
                    
                    <View style={{flexDirection: 'row', marginBottom: 35,justifyContent:'space-between'}}>
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
                    {errors.ProductName && touched.ProductName && (
                    <Text style={styles.errors}>{errors.ProductName}</Text>
                  )}
                    <View style={{flexDirection: 'row', marginBottom: 35,justifyContent:'space-between'}}>
                      <Text style={styles.text}>Product Price  </Text>
                      {errors.Price && touched.Price && (
                    <Text style={styles.errors}>{errors.Price}</Text>
                  )}
                      <TextInput
                      keyboardType='phone-pad'

                        autoCapitalize="none"
                        onChangeText={handleChange('Price')}
                        onBlur={handleBlur('Price')}
                        backgroundColor="white"
                        value={values.Price}
                        style={styles.inputf}></TextInput>
                       
                    </View>
                   
                    <View style={{flexDirection: 'row', marginBottom: 35,justifyContent:'space-between'}}>
                      <Text style={styles.text}>Product Quantity</Text>
                      {errors.quantity && touched.quantity && (
                    <Text style={styles.errors}>{errors.quantity}</Text>
                  )}
                      <TextInput
                        autoCapitalize="none"
                        keyboardType='numeric'
                        onChangeText={handleChange('quantity')}
                        onBlur={handleBlur('quantity')}
                        backgroundColor="white"
                        value={values.quantity}
                        style={{width:'50%',height:25}}></TextInput>
                       
                    </View>
                    
                    <View style={{flexDirection: 'row', marginBottom: 35,justifyContent:'space-between'}}>
                      <Text style={styles.text}>Product description</Text>
                      {errors.Description && touched.Description && (
                    <Text style={styles.errors}>{errors.Description}</Text>
                  )}
                    
                      <TextInput
                        autoCapitalize="none"
                        onChangeText={handleChange('Description')}
                        onBlur={handleBlur('Description')}
                        backgroundColor="white"
                        value={values.Description}
                        style={{width:'50%',height:25}}></TextInput>
                       
                    </View>
                    <View style={{alignSelf:'center'}}>
                      <Text style={{fontSize:20,color:'black',marginBottom:25}}>Category</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 35,justifyContent:'space-between'}}>
                      <Text style={styles.text}>Type</Text>
                      <TextInput
                        autoCapitalize="none"
                        onChangeText={handleChange('type')}
                        onBlur={handleBlur('type')}
                        backgroundColor="white"
                        value={values.type}
                        style={styles.inputf}></TextInput>
                        
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 35,justifyContent:'space-between'}}>
                      <Text style={styles.text}>Manufacturer</Text>
                      <TextInput
                        autoCapitalize="none"
                        onChangeText={handleChange('manufacturer')}
                        onBlur={handleBlur('manufacturer')}
                        backgroundColor="white"
                        value={values.manufacturer}
                        style={styles.inputf}></TextInput>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 35,justifyContent:'space-between'}}>
                      <Text style={styles.text}>Colour</Text>
                      <TextInput
                        autoCapitalize="none"
                        onChangeText={handleChange('color')}
                        onBlur={handleBlur('color')}
                        backgroundColor="white"
                        value={values.color}
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
    width: '50%',
    // margin: 5,
    marginLeft: 15,
    height: 25,
    color:'black'
  },
  button: {
    flex: 1,
    width: '50%',
    marginTop: 20,
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
