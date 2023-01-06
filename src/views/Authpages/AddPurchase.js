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
  
export default function AddPurchase() {
 
    function handlePurchase(values){
        console.log(values);
    }
  return (
    <Formik
      initialValues={{Purchaseid: '',purchase_bill: '',purchase_type: '',purchase_total: '',purchase_sup_id: '',purchase_amount: '',Description: '',}}
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
