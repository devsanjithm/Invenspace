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
import {postSupplierDetails} from './supplierAction';
import _ from 'lodash';

export default function AddSupplier({navigation}) {
  const {data: userDatafromRedux} = useSelector(state => state.auth);
  const user_id=userDatafromRedux?.result?._id;
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
  const {postMessage, loading, error} = useSelector(state => state.supplier);

  function handleSupplier(values) {
    const payload = {
      sup_id: values.sup_id,
      sup_name: values.sup_name,
      sup_username: values.sup_username,
      sup_email: values.sup_email,
      sup_mobile: values.sup_mobile,
      user_id: user_id,
    };
    dispatch(postSupplierDetails(payload));
    dispatch(getCustomerDetails(user_id));
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
        text2: error?.message,
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
                  label={'Supplier ID'}
                  autoCapitalize="none"
                  onChangeText={handleChange('sup_id')}
                  onBlur={handleBlur('sup_id')}
                  value={values.sup_id}
                  style={styles.inputf}></TextInput>
                <TextInput
                  mode="outlined"
                  label={'Supplier Name'}
                  autoCapitalize="none"
                  onChangeText={handleChange('sup_name')}
                  onBlur={handleBlur('sup_name')}
                  value={values.sup_name}
                  style={styles.inputf}></TextInput>
                <TextInput
                  mode="outlined"
                  label={'Mobile no'}
                  autoCapitalize="none"
                  onChangeText={handleChange('sup_mobile')}
                  onBlur={handleBlur('sup_mobile')}
                  value={values.sup_mobile}
                  style={styles.inputf}></TextInput>
                <TextInput
                  mode="outlined"
                  label={'Username'}
                  autoCapitalize="none"
                  onChangeText={handleChange('sup_username')}
                  onBlur={handleBlur('sup_username')}
                  value={values.sup_username}
                  style={styles.inputf}></TextInput>
                <TextInput
                  mode="outlined"
                  label={'Email id'}
                  autoCapitalize="none"
                  onChangeText={handleChange('sup_email')}
                  onBlur={handleBlur('sup_email')}
                  value={values.sup_email}
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
