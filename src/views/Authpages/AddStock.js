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

export default function AddStock() {
  function handleStock(values) {
    console.log(values);
  }
  return (
    <Formik
      initialValues={{
        stock_id: '',
        stock_name: '',
        stocknum: '',
        Description: '',
        type: '',
        items: '',
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
                  onChangeText={handleChange('stock_id')}
                  onBlur={handleBlur('stock_id')}
                  value={values.stock_id}
                  style={styles.inputf}></TextInput>
                <TextInput
                  mode="outlined"
                  label={'Stock Name'}
                  autoCapitalize="none"
                  onChangeText={handleChange('stock_name')}
                  onBlur={handleBlur('stock_name')}
                  value={values.stock_name}
                  style={styles.inputf}></TextInput>
                <TextInput
                  mode="outlined"
                  label={'Stock code'}
                  autoCapitalize="none"
                  onChangeText={handleChange('stocknum')}
                  onBlur={handleBlur('stocknum')}
                  value={values.stocknum}
                  style={styles.inputf}></TextInput>
                <TextInput
                  mode="outlined"
                  label={'Description'}
                  autoCapitalize="none"
                  onChangeText={handleChange('Description')}
                  onBlur={handleBlur('Description')}
                  value={values.Description}
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
                  onChangeText={handleChange('items')}
                  onBlur={handleBlur('items')}
                  value={values.items}
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
