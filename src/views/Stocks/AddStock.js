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
import {postStockDetails} from './stockAction';
import _ from 'lodash';

export default function AddStock({navigation}) {
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
  const {postMessage, loading, error} = useSelector(state => state.stock);

  function handleStock(values) {
    const payload = {
      stocks_id: values.stocks_id,
      stocks_num: values.stocks_num,
      stocks_desc: values.stocks_desc,
      stocks_type: values.stocks_desc,
      stocks_items: values.stocks_items,
      user_id: user_id,
    };
    dispatch(postStockDetails(payload));
    dispatch(getCustomerDetails(user_id));
  }

  useEffect(() => {
    if (!_.isEmpty(postMessage)) {
      console.log('data in Stock', postMessage);
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
          stocks_id: '',
          stocks_type: '',
          stocks_num: '',
          stocks_desc: '',
          type: '',
          stocks_items: '',
        }}
        validateOnMount={true}
        onSubmit={values => handleStock(values)}
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
                  <Text style={styles.top}>Add Stock</Text>
                </View>
                <View style={styles.container}>
                  <TextInput
                    mode="outlined"
                    label={'Stock ID'}
                    autoCapitalize="none"
                    onChangeText={handleChange('stocks_id')}
                    onBlur={handleBlur('stocks_id')}
                    value={values.stocks_id}
                    style={styles.inputf}></TextInput>
                  <TextInput
                    mode="outlined"
                    label={'Stock Name'}
                    autoCapitalize="none"
                    onChangeText={handleChange('stocks_type')}
                    onBlur={handleBlur('stocks_type')}
                    value={values.stocks_type}
                    style={styles.inputf}></TextInput>
                  <TextInput
                    mode="outlined"
                    label={'Stock code'}
                    autoCapitalize="none"
                    onChangeText={handleChange('stocks_num')}
                    onBlur={handleBlur('stocks_num')}
                    value={values.stocks_num}
                    style={styles.inputf}></TextInput>
                 
                  <TextInput
                    mode="outlined"
                    label={'type'}
                    autoCapitalize="none"
                    onChangeText={handleChange('type')}
                    onBlur={handleBlur('type')}
                    value={values.type}
                    style={styles.inputf}></TextInput>
                  <TextInput
                    mode="outlined"
                    label={'items'}
                    autoCapitalize="none"
                    onChangeText={handleChange('stocks_items')}
                    onBlur={handleBlur('stocks_items')}
                    value={values.stocks_items}
                    style={styles.inputf}></TextInput>
                     <TextInput
                    mode="outlined"
                    label={'Description'}
                    autoCapitalize="none"
                    onChangeText={handleChange('stocks_desc')}
                    onBlur={handleBlur('stocks_desc')}
                    value={values.stocks_desc}
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
