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
  password: yup
    .string()
    .min(8, ({min}) => 'password must be atleast 8 characters')
    .required('password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  password1: yup.string().when('password', {
    is: val => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf([yup.ref('password')], "passwords doesn't match"),
  }),
});

export default function Change({navigation}) {
  const [securetext, setsecuretext] = useState(false);

  async function handleChange(values) {
    console.log(values.password);
  }
  return (
    <Formik
      initialValues={{password: '', password1: ''}}
      validateOnMount={true}
      onSubmit={values => handleChange(values)}
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
                    marginTop: '20%',
                  }}>
                  Enter New Password
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
                  <TextInput
                    style={styles.input}
                    label="Password"
                    mode="outlined"
                    secureTextEntry={!securetext}
                    activeOutlineColor="#469FD1"
                    onChangeText={handleChange('password1')}
                    onBlur={handleBlur('password1')}
                    value={values.password1}
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
                        icon={securetext ? 'eye' : 'eye-off'}
                        onPress={() => {
                          setsecuretext(!securetext);
                        }}
                      />
                    }
                    //   value={text}
                    //   onChangeText={text => setText(text)}
                  />
                  {errors.password1 && touched.password1 && (
                    <Text style={styles.errors}>{errors.password1}</Text>
                  )}
                </View>
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
