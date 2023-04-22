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
  import _ from 'lodash';
  import * as yup from 'yup';
import { postMemberDetails } from '../../service/commonredux/commonAction';
import { AppHeaders } from '../../components/AppHeaders';
  export default function Addmember({navigation}) {
    const {data: userDatafromRedux} = useSelector(state => state.auth);
    // const user_id=userDatafromRedux?.result?._id;
    // const backAction = useCallback(() => {
    //   navigation.goBack();
    //   return true;
    // }, []);
  
    // useEffect(() => {
    //   BackHandler.addEventListener('hardwareBackPress', backAction);
    //   return () =>
    //     BackHandler.removeEventListener('hardwareBackPress', backAction);
    // }, [backAction]);
  
    const dispatch = useDispatch();
    const {postMessage, loading, error} = useSelector(state => state.common);
    const loginSchema = yup.object().shape({
      email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
        password: yup
        .string()
        .min(8, ({min}) => 'password must be atleast 8 characters')
        .required('password is required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character',
        ),
      name: yup
        .string()
         .min(4, ({min}) => 'name must be atleast 4 characters')
        .required('name is required'),
      phone: yup
      .string()
         .min(10, ({min}) => 'mobile must have 10 digits')
        .required('mobile no is required'),
    });
  
    function handleSale(values) {
      const payload = {
        email:values.email,
        password: values.password,
        phone:parseInt(values.phone),
        name:values.name,
        invitecode:userDatafromRedux.data.user.Company.id
      };
      dispatch(postMemberDetails(payload));
      
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
            email: '',
            password: '',
            phone: '',
            name: '',
            sales_cust_id: '',
            sales_amount: '',
            Description: '',
          }}
          validateOnMount={true}
          onSubmit={values => handleSale(values)}
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
                 <AppHeaders title={'Add Members'} color={'#fff'} main={true}>
          
          <View style={{flexDirection: 'row'}}>
            
            {/* <View style={{paddingHorizontal: 10}}>
              <Ionicons
                onPress={() => setSearchUIState(!handleSearchUIState)}
                name="search"
                size={24}
                color="#000"
              />
            </View>
            <View style={{paddingHorizontal: 10}}>
              <Ionicons
                onPress={() => navigation.navigate('addmem')}
                name="ios-add-circle"
                size={24}
                color="#000"
              />
            </View> */}
          </View>
      
      </AppHeaders>
              <AppStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
              <KeyboardAvoidingView>
                <ScrollView>
                  {/* <View>
                    <Text style={styles.top}>Add Sale</Text>
                  </View> */}
                  <View style={styles.container}>
                    <TextInput
                      mode="outlined"
                      label={'Email'}
                      autoCapitalize="none"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      style={styles.inputf}></TextInput>
                      {errors.email && touched.email && (
                    <Text style={styles.errors}>{errors.email}</Text>
                  )}
                    <TextInput
                      mode="outlined"
                      label={'Password'}
                      autoCapitalize="none"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      style={styles.inputf}></TextInput>
                      {errors.password && touched.password && (
                    <Text style={styles.errors}>{errors.password}</Text>
                  )}
                    <TextInput
                      mode="outlined"
                      label={'Mobile'}
                      autoCapitalize="none"
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                      style={styles.inputf}></TextInput>
                      {errors.phone && touched.phone && (
                    <Text style={styles.errors}>{errors.phone}</Text>
                  )}
                    <TextInput
                      mode="outlined"
                      label={'Name'}
                      autoCapitalize="none"
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      style={styles.inputf}></TextInput>
                      {errors.name && touched.name && (
                    <Text style={styles.errors}>{errors.name}</Text>
                  )}
                    {/* <TextInput
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
                      style={{width: '90%', margin: 10}}></TextInput> */}
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
      width: '85%',
      margin: 17,
    },
    button: {
      flex: 1,
      width: '50%',
      marginTop: 150,
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
  