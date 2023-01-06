import React, {useState} from 'react';

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
import Img2 from '../../assets/bottomimage.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppStatusBar from '../../components/Appstatusbar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
});

export default function Forgot({navigation}) {
  async function handlePass(values) {
    navigation.navigate('Verification');
    console.log(values.email);
  }
  return (
    <Formik
      initialValues={{email: ''}}
      validateOnMount={true}
      onSubmit={values => handlePass(values)}
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
                    fontSize: 25,
                    color: 'black',
                    marginTop: '30%',
                  }}>
                  Enter Email address
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
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errors}>{errors.email}</Text>
                  )}

                  <View style={{alignItems: 'center', marginTop: 40}}>
                    <Text
                      style={{color: '#469FD1', marginTop: 8, fontSize: 16}}
                      onPress={() => {
                        navigation.push('Login');
                      }}>
                      Back to Signin
                    </Text>
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
                  marginTop: 40,
                  padding: 10,
                }}
                color={'#469FD1'}
                mode="contained">
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '700',
                  }}>
                  Send
                </Text>
              </Button>

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
  );
}
const styles = StyleSheet.create({
  container: {},
  input: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 40,
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
