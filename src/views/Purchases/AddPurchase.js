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
import {postPurchaseDetails} from './purchaseAction';
import _ from 'lodash';




export default function AddPurchase({navigation}) {
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
  const {postMessage, loading, error} = useSelector(state => state.purchase);

  function handlePurchase(values) {
    const payload = {
      purchase_id: values.Purchaseid,
      purchase_sup_id: values.purchase_sup_id,
      purchase_amount: values.purchase_amount,
      purchase_bill: values.purchase_bill,
      purchase_desc: values.Description,
      purchase_type: values.purchase_type,
      purchase_total: values.purchase_total,
      user_id:user_id,
    };
    dispatch(postPurchaseDetails(payload));
    dispatch(getCustomerDetails(user_id));
  }

  useEffect(() => {
    if (!_.isEmpty(postMessage)) {
      console.log('data in purchase', postMessage);
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
      <Formik
        initialValues={{
          Purchaseid: '',
          purchase_bill: '',
          purchase_type: '',
          purchase_total: '',
          purchase_sup_id: '',
          purchase_amount: '',
          Description: '',
        }}
        validateOnMount={true}
        onSubmit={values => handlePurchase(values)}
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
                  <Text style={styles.top}>Add Purchase</Text>
                </View>
                <View style={styles.container}>
                  <TextInput
                    mode="outlined"
                    label={'Purchase Id'}
                    autoCapitalize="none"
                    onChangeText={handleChange('Purchaseid')}
                    onBlur={handleBlur('Purchaseid')}
                    value={values.Purchaseid}
                    style={styles.inputf}></TextInput>
                  <TextInput
                    mode="outlined"
                    label={'Purchase Bill'}
                    autoCapitalize="none"
                    onChangeText={handleChange('purchase_bill')}
                    onBlur={handleBlur('purchase_bill')}
                    value={values.purchase_bill}
                    style={styles.inputf}></TextInput>
                  <TextInput
                    mode="outlined"
                    label={'Purchase Type'}
                    autoCapitalize="none"
                    onChangeText={handleChange('purchase_type')}
                    onBlur={handleBlur('purchase_type')}
                    value={values.purchase_type}
                    style={styles.inputf}></TextInput>
                  <TextInput
                    mode="outlined"
                    label={'Purchase total'}
                    autoCapitalize="none"
                    onChangeText={handleChange('purchase_total')}
                    onBlur={handleBlur('purchase_total')}
                    value={values.purchase_total}
                    style={styles.inputf}></TextInput>
                  <TextInput
                    mode="outlined"
                    label={'Supply Id'}
                    autoCapitalize="none"
                    onChangeText={handleChange('purchase_sup_id')}
                    onBlur={handleBlur('purchase_sup_id')}
                    value={values.purchase_sup_id}
                    style={styles.inputf}></TextInput>
                  <TextInput
                    mode="outlined"
                    label={'Amount'}
                    autoCapitalize="none"
                    onChangeText={handleChange('purchase_amount')}
                    onBlur={handleBlur('purchase_amount')}
                    value={values.purchase_amount}
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
