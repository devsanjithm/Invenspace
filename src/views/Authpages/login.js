import React, {useState, useEffect, useContext} from 'react';

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
} from 'react-native';
import {Checkbox, TextInput, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Img2 from '../../assets/bottomimage.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppStatusBar from '../../components/Appstatusbar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import * as yup from 'yup';
import {setLocalStorageItem} from '../../service/localstorage';
import {appRouteKey, authTokenKey, userDataKey} from '../../utils/constant';
import {getAuthDetails} from './authActions';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Loader from '../../components/Loader';
import {UserContext} from '../../service/context/context';
import _ from 'lodash';

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
});

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(false);
  const [securetext, setsecuretext] = useState(false);
  const {data, loading, error} = useSelector(state => state.auth);
  const {setRoute, isInternet} = useContext(UserContext);

  async function handleLogin(values) {
    // setLocalStorageItem(appRouteKey,"true")
    console.log('success', values);
    const payload = {
      email: values?.email,
      password: values?.password,
    };
    if (isInternet) {
      dispatch(getAuthDetails(payload));
    } else {
      Toast.show({
        type: 'error',
        text1: 'No Internet',
        text2: 'Try after Sometime',
        visibilityTime: 5000,
      });
    }
  }

  useEffect(() => {
    if (!_.isEmpty(data)) {
      // console.log("data in login",data);
      setLocalStorageItem(authTokenKey,data?.token)
      setLocalStorageItem(appRouteKey,"true")
      setLocalStorageItem(userDataKey,JSON.stringify(data))
      setRoute(true);
    }
  }, [data]);

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
        initialValues={{email: '', password: ''}}
        validateOnMount={true}
        onSubmit={values => handleLogin(values)}
        validationSchema={loginSchema}>
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
              justifyContent: 'flex-end',
            }}>
            <AppStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
            <KeyboardAvoidingView>
              <ScrollView>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 30,
                      color: 'black',
                      marginTop: '10%',
                    }}>
                    Login
                  </Text>
                </View>

                <View>
                  <View
                    style={{
                      flex: 1,
                      paddingHorizontal: 20,
                      justifyContent: 'center',
                    }}>
                    <TextInput
                      style={styles.input}
                      label="Email"
                      mode="outlined"
                      activeOutlineColor="#469FD1"
                      autoCapitalize="none"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      left={
                        <TextInput.Icon
                          style={{
                            paddingTop: 10,
                          }}
                          name="email"
                          color="#676666"
                        />
                      }
                      //   value={text}
                      //   onChangeText={text => setText(text)}
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.errors}>{errors.email}</Text>
                    )}
                    <TextInput
                      style={styles.input1}
                      label="Password"
                      mode="outlined"
                      secureTextEntry={!securetext}
                      activeOutlineColor="#469FD1"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      left={
                        <TextInput.Icon
                          style={{
                            paddingTop: 10,
                          }}
                          name="lock"
                          color="#676666"
                        />
                      }
                      right={
                        <TextInput.Icon
                          style={{
                            paddingTop: 10,
                          }}
                          icon={securetext ? 'eye' : 'eye-off'}
                          onPress={() => {
                            setsecuretext(!securetext);
                          }}
                        />
                      }
                      //   value={text}
                      //   onChangeText={text => setText(text)}
                    />
                    {errors.password && touched.password && (
                      <Text style={styles.errors}>{errors.password}</Text>
                    )}
                    <View style={{flexDirection: 'row', marginVertical: 20}}>
                      <Checkbox
                        color="#469FD1"
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setChecked(!checked);
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '85%',
                        }}>
                        <Text
                          onPress={() => {
                            setChecked(!checked);
                          }}
                          style={{color: '#6B5E5E', marginTop: 8}}>
                          Remember password
                        </Text>
                        <Text
                          onPress={() => {
                            navigation.push('Forgot password');
                          }}
                          style={{
                            color: '#469FD1',
                            marginTop: 8,
                            fontSize: 16,
                          }}>
                          Forget password
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <Button
                  onPress={() => {
                    console.log('clicked');
                    handleSubmit();
                  }}
                  style={{
                    justifyContent: 'center',
                    marginHorizontal: 40,
                    marginTop: 20,
                    padding: 10,
                  }}
                  color={'#469FD1'}
                  mode="contained">
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: '700',
                    }}>
                    Login
                  </Text>
                </Button>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      marginTop: 8,
                      textAlign: 'center',
                    }}>
                    Don't have an account ?{' '}
                    <Text
                      style={{color: '#469FD1', marginTop: 8, fontSize: 16}}
                      onPress={() => {
                        navigation.push('Register');
                      }}>
                      Create account
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: '90%',
                  }}>
                  <ImageBackground source={Img2} style={styles.img}>
                    <View style={styles.container}></View>
                  </ImageBackground>
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
  container: {},
  input: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 90,
    color: '#469FD1',
    height: 45,
  },
  input1: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    color: '#469FD1',
    height: 45,
  },
  img: {
    height: Dimensions.get('window').height / 2.5,
    width: Dimensions.get('window').width,
  },
  scroll: {},
  errors: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
    paddingLeft: 10,
  },
});
