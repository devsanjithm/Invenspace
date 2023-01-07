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
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AppStatusBar from '../../components/Appstatusbar';
import React, {useEffect, useCallback} from 'react';
import {TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { postProductDetails } from './productAction';
import _ from 'lodash';
export default function AddProducts({navigation}) {
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
      pro_id: '123',
      pro_num: 12,
      pro_desc: 'hello',
      pro_type: 'pen',
      pro_items: 'done',
      user_id: '633c1f3002be7d48b4017c29',
    };
    dispatch(postProductDetails(payload))
  }

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
    {loading?<Loader/>:null}
    <Formik
      initialValues={{
        Productcount: '',
        ProductName: '',
        Productcode: '',
        HSN: '',
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
          <KeyboardAvoidingView>
            <ScrollView>
              <View>
                <Text style={styles.top}>Add Product</Text>
              </View>
              <View style={styles.container}>
                <TextInput
                  mode="outlined"
                  label={'Product count'}
                  autoCapitalize="none"
                  onChangeText={handleChange('Productcount')}
                  onBlur={handleBlur('Productcount')}
                  value={values.Productcount}
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
                  label={'HSN'}
                  autoCapitalize="none"
                  onChangeText={handleChange('HSN')}
                  onBlur={handleBlur('HSN')}
                  value={values.HSN}
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
                <TextInput
                  mode="outlined"
                  label={'Product Description'}
                  autoCapitalize="none"
                  onChangeText={handleChange('Description')}
                  onBlur={handleBlur('Description')}
                  value={values.Description}
                  style={{width: '90%', margin: 10}}></TextInput>
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
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
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
