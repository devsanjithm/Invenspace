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
import _ from 'lodash';
import { setPostCustomerDetailsSucess } from './customerSlice';


export default function AddCustomer({navigation}) {

  const {data: userDatafromRedux} = useSelector(state => state.auth);
  const backAction = useCallback(() => {
    navigation.goBack();
    dispatch(setPostCustomerDetailsSucess({}))
    return true;
  }, []);
  const user_id = userDatafromRedux?.result?._id;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [backAction]);

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
    };
    if(_.isString(user_id) && !_.isEmpty(user_id)){
      dispatch(postCustomerDetails(payload));
      dispatch(getCustomerDetails(user_id));
    }
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
              <ScrollView>
                <View>
                  <Text style={styles.top}>Add Customer</Text>
                </View>
                <View style={styles.container}>
                  <TextInput
                    mode="outlined"
                    label={'Customer ID'}
                    autoCapitalize="none"
                    onChangeText={handleChange('cust_id')}
                    onBlur={handleBlur('cust_id')}
                    value={values.cust_id}
                    style={styles.inputf}></TextInput>
                  <TextInput
                    mode="outlined"
                    label={'Customer Name'}
                    autoCapitalize="none"
                    onChangeText={handleChange('cust_name')}
                    onBlur={handleBlur('cust_name')}
                    value={values.cust_name}
                    style={styles.inputf}></TextInput>
                  <TextInput
                    mode="outlined"
                    label={'Mobile no'}
                    autoCapitalize="none"
                    onChangeText={handleChange('cust_mobile')}
                    onBlur={handleBlur('cust_mobile')}
                    value={values.cust_mobile}
                    style={styles.inputf}></TextInput>
                  <TextInput
                    mode="outlined"
                    label={'Username'}
                    autoCapitalize="none"
                    onChangeText={handleChange('cust_username')}
                    onBlur={handleBlur('cust_username')}
                    value={values.cust_username}
                    style={styles.inputf}></TextInput>
                  <TextInput
                    mode="outlined"
                    label={'Email id'}
                    autoCapitalize="none"
                    onChangeText={handleChange('cust_email')}
                    onBlur={handleBlur('cust_email')}
                    value={values.cust_email}
                    style={styles.inputf}></TextInput>
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
});
