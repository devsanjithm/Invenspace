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
import {postSaleDetails} from './saleAction';
import _ from 'lodash';
export default function AddSale({navigation}) {
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
  const {postMessage, loading, error} = useSelector(state => state.sale);

  function handleSale(values) {
    const payload = {
      sales_id: values.sales_id,
      sales_cust_id: '639dcd8cb159e9328f803f40',
      sales_amount: values.sales_amount,
      sales_bill: values.sales_bill,
      sales_desc: values.Description,
      sales_type: values.sales_type,
      sales_total: values.sales_total,
      user_id:user_id,
    };
    dispatch(postSaleDetails(payload));
    dispatch(getCustomerDetails(user_id));
  }

  useEffect(() => {
    if (!_.isEmpty(postMessage)) {
      console.log('data in Sale', postMessage);
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
    {loading ? <Loader /> : null}
      <Formik
        initialValues={{
          sales_id: '',
          sales_bill: '',
          sales_type: '',
          sales_total: '',
          sales_cust_id: '',
          sales_amount: '',
          Description: '',
        }}
        validateOnMount={true}
        onSubmit={values => handleSale(values)}
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
                  <Text style={styles.top}>Add Sale</Text>
                </View>
                <View style={styles.container}>
                  <TextInput
                    mode="outlined"
                    label={'Sale Id'}
                    autoCapitalize="none"
                    onChangeText={handleChange('sales_id')}
                    // onBlur={handleBlur('sales_id')}
                    value={values.sales_id}
                    style={styles.inputf}></TextInput>
                  {/* <TextInput
                  mode="outlined"
                  label={'Sale Id'}
                  autoCapitalize="none"
                  onChangeText={handleChange('sales_id')}
                  onBlur={handleBlur('sales_id')}
                  value={values.sales_id}
                  style={styles.inputf}></TextInput> */}
                  <TextInput
                    mode="outlined"
                    label={'Bill'}
                    autoCapitalize="none"
                    onChangeText={handleChange('sales_bill')}
                    onBlur={handleBlur('sales_bill')}
                    value={values.sales_bill}
                    style={styles.inputf}></TextInput>
                  <TextInput
                    mode="outlined"
                    label={'Type'}
                    autoCapitalize="none"
                    onChangeText={handleChange('sales_type')}
                    onBlur={handleBlur('sales_type')}
                    value={values.sales_type}
                    style={styles.inputf}></TextInput>
                  <TextInput
                    mode="outlined"
                    label={'Sales total'}
                    autoCapitalize="none"
                    onChangeText={handleChange('sales_total')}
                    onBlur={handleBlur('sales_total')}
                    value={values.sales_total}
                    style={styles.inputf}></TextInput>
                  <TextInput
                    mode="outlined"
                    label={'Sale Id'}
                    autoCapitalize="none"
                    onChangeText={handleChange('sales_cust_id')}
                    onBlur={handleBlur('sales_cust_id')}
                    value={values.sales_cust_id}
                    style={styles.inputf}></TextInput>
                  <TextInput
                    mode="outlined"
                    label={'Amount'}
                    autoCapitalize="none"
                    onChangeText={handleChange('sales_amount')}
                    onBlur={handleBlur('sales_amount')}
                    value={values.sales_amount}
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
