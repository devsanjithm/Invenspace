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

export default function AddProducts() {

    function handleProduct(values){
        console.log(values);
    }
  return (
    <Formik
      initialValues={{Productcount: '',ProductName: '',Productcode: '',HSN: '',Specification: '',Price: '',Description: '',}}
      validateOnMount={true}
      onSubmit={values => handleProduct(values)}
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
          <Text style={styles.top}>Add Product</Text>
        </View>
        <View style={styles.container}>
          <TextInput
            mode="outlined"
            label={'Product count'}
            autoCapitalize="none"
            onChangeText={handleChange('Productcount')}
            onBlur={handleBlur('Productcount')}
            value={values.Productcount}
            style={styles.inputf}></TextInput>
          <TextInput
            mode="outlined"
            label={'Product Name'}
            autoCapitalize="none"
            onChangeText={handleChange('ProductName')}
            onBlur={handleBlur('ProductName')}
            value={values.ProductName}
            style={styles.inputf}></TextInput>
          <TextInput
            mode="outlined"
            label={'Product code'}
            autoCapitalize="none"
            onChangeText={handleChange('Productcode')}
            onBlur={handleBlur('Productcode')}
            value={values.Productcode}
            style={styles.inputf}></TextInput>
          <TextInput
            mode="outlined"
            label={'HSN'}
            autoCapitalize="none"
            onChangeText={handleChange('HSN')}
            onBlur={handleBlur('HSN')}
            value={values.HSN}
            style={styles.inputf}></TextInput>
          <TextInput
            mode="outlined"
            label={'Specification'}
            autoCapitalize="none"
            onChangeText={handleChange('Specification')}
            onBlur={handleBlur('Specification')}
            value={values.Specification}
            style={styles.inputf}></TextInput>
          <TextInput
            mode="outlined"
            label={'Price'}
            autoCapitalize="none"
            onChangeText={handleChange('Price')}
            onBlur={handleBlur('Price')}
            value={values.Price}
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
  button:{
    flex:1,
    width:'50%',
    marginTop:50,
    // justifyContent:'center',
    alignSelf:'center'
  }
});
