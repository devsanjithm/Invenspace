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
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import {getCustomerDetails, postCustomerDetails} from './customerAction';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import _ from 'lodash';
import { setPostCustomerDetailsSucess } from './customerSlice';
import { AppHeaders } from '../../components/AppHeaders';

export default function AddCustomer({navigation}) {
  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backAction);
  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backAction);
  // }, [backAction]);

  const dispatch = useDispatch();
  const {postMessage, loading, error} = useSelector(state => state.customer);

  function handleCustomer(values) {
    const payload = {
      cust_id: values.cust_id,
      cust_name: values.cust_name,
      cust_username: values.cust_username,
      cust_email: values.cust_email,
      cust_mobile: values.cust_mobile,
      user_id: user_id,

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
            <AppHeaders title={'Add Item'} color={'#fff'}>
              <MaterialIcons
                onPress={() => {
                  navigation.goBack();
                }}
                name="cancel"
                size={24}
                color="#000"
              />
            </AppHeaders>
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
                    <View style={{flexDirection: 'row', marginBottom: 35,justifyContent:'space-between'}}>
                      <Text style={styles.text}>Customer id      </Text>
                      <TextInput
                        mode="outlined"
                        label={'input cus id'}
                        autoCapitalize="none"
                        onChangeText={handleChange('cust_id')}
                        onBlur={handleBlur('cust_id')}
                        backgroundColor="white"
                        value={values.cust_id}
                        style={styles.inputf}></TextInput>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 35,justifyContent:'space-between'}}>
                      <Text style={styles.text}>Cus Name </Text>
                      <TextInput
                        mode="outlined"
                        label={'input Cus name'}
                        autoCapitalize="none"
                        onChangeText={handleChange('cust_name')}
                        onBlur={handleBlur('cust_name')}
                        backgroundColor="white"
                        value={values.cust_name}
                        style={styles.inputf}></TextInput>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 35,justifyContent:'space-between'}}>
                      <Text style={styles.text}>Email        </Text>
                      <TextInput
                        mode="outlined"
                        label={'input cus email'}
                        autoCapitalize="none"
                        onChangeText={handleChange('cust_email')}
                        onBlur={handleBlur('cust_email')}
                        backgroundColor="white"
                        value={values.cust_email}
                        style={styles.inputf}></TextInput>
                    </View>
                    <View style={{flexDirection: 'row', marginBottom: 35,justifyContent:'space-between'}}>
                      <Text style={styles.text}>Cust mobile</Text>
                      <TextInput
                        mode="outlined"
                        label={'input item Description'}
                        autoCapitalize="none"
                        onChangeText={handleChange('cust_mobile')}
                        onBlur={handleBlur('cust_mobile')}
                        backgroundColor="white"
                        value={values.cust_mobile}
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
  top: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
  inputf: {
    width: '90%',
    margin: 5,
    marginLeft: 15,
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
  button: {
    flex: 1,
    width: '50%',
    marginTop: 50,
    // justifyContent:'center',
    alignSelf: 'center',
  },
  inputf: {
    width: '60%',
    // margin: 5,
    marginLeft: 15,
    height: 30,
  },
});
