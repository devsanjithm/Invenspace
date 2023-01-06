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
  import {Button} from 'react-native-paper';
  
  import AppStatusBar from '../../components/Appstatusbar';
  import React from 'react';
  import {TextInput} from 'react-native-paper';
  import {Formik} from 'formik';
export default function AddCustomer() {
    function handlCustomer(values) {
        console.log(values);
      }
      return (
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
          onSubmit={values => handlCustomer(values)}
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
        marginLeft:15
      },
      button: {
        flex: 1,
        width: '50%',
        marginTop: 50,
        // justifyContent:'center',
        alignSelf: 'center',
      },
    });
    