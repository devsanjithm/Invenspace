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

export default function Verification({navigation}) {
  async function handleOTP(values) {
    console.log(values.OTP);
    navigation.navigate('Change password');
  }
  return (
    <Formik
      initialValues={{OTP: ''}}
      validateOnMount={true}
      onSubmit={values => handleOTP(values)}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
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
                  Enter Verification code
                </Text>
              </View>

              <View>
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    justifyContent: 'center',
                    // marginHorizontal: 10,
                  }}>
                  <TextInput
                    style={styles.input}
                    label="Enter OTP"
                    mode="outlined"
                    activeOutlineColor="#469FD1"
                    onChangeText={handleChange('OTP')}
                    onBlur={handleBlur('OTP')}
                    value={values.OTP}

                    //   value={text}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '85%',
                      marginHorizontal: 20,
                    }}>
                    <Text
                      onPress={() => {
                        setChecked(!checked);
                      }}
                      style={{color: '#6B5E5E', marginTop: 8}}>
                      Didn't receive any code
                    </Text>
                    <Text
                      onPress={() => {
                        navigation.push('Forgot password');
                      }}
                      style={{color: '#469FD1', marginTop: 8, fontSize: 16}}>
                      Resend OTP
                    </Text>
                  </View>
                </View>
              </View>

              <Button
                onPress={() => {
                  // console.log('clicked');
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
                  Verify
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
