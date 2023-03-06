import React, {Component, useEffect, useState} from 'react';
import Card from '../../components/card';
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
  RefreshControl,
  TextInput,
  Pressable,
} from 'react-native';
import {globalStyles} from '../../utils/styles';
import {AppHeaders} from '../../components/AppHeaders';
import {styles} from './styles';
import Input from '../../components/Input/index';
import {supplierInputKey} from './constants';
import {validateData} from '../../utils/validator';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import {updateSupplierDetails, getSupplierDetails} from './supplierAction';
import {
  setSupplierDetailsFailure,
  setUpdateSupplierDetailsSucess,
} from './supplierSlice';
import _ from 'lodash';
import Entypo from 'react-native-vector-icons/Entypo';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export function SupplierDisplay({route}) {
  // console.log(route.params.data.sup_username)
  const {data} = route.params;
//   console.log(data.sup_username);

const dispatch = useDispatch();
const {
  updateData,
  loading,
  error: supError,
} = useSelector(state => state.supplier);
const {data: userDatafromRedux} = useSelector(state => state.auth);

function getData() {
  let userId = userDatafromRedux?.result?._id;
  console.log('usedata form redux ', userDatafromRedux);
  if (_.isString(userId)) {
    dispatch(getSupplierDetails(userId));
  }
}

const [editable,setEditable] = useState(false);

// useEffect(() => {
//   BackHandler.addEventListener('hardwareBackPress', backAction);
//   return () =>
//     BackHandler.removeEventListener('hardwareBackPress', backAction);
// }, [backAction]);

const defSupplierData = {
  sup_id: data?.sup_id,
  sup_name: data?.sup_name,
  sup_username: data?.sup_username,
  sup_email: data?.sup_email,
  sup_mobile: data?.sup_mobile,
};
const defErrorData = {
  sup_id: false,
  sup_name: false,
  sup_username: false,
  sup_email: false,
  sup_mobile: false,
};

const [supplierData, setsupplierData] = useState(defSupplierData);
const [error, setError] = useState(defErrorData);

const onInputChange = (key, value) => {
  setsupplierData({...supplierData, [key]: value});
  setError({...error, [key]: false});
};

function onSubmit() {
  if (validateData(supplierData.sup_name)) {
    setError({...error, sup_name: true});
    return;
  }
  if (validateData(supplierData.sup_username)) {
    setError({...error, sup_username: true});
    return;
  }
  const payload = {
    id: data._id,
  };
  let isUpdate = false;
  if (defSupplierData.sup_username !== supplierData.sup_username) {
    payload.sup_username = supplierData.sup_username;
    isUpdate = true;
  }
  if (defSupplierData.sup_name !== supplierData.sup_name) {
    payload.sup_name = supplierData.sup_name;
    isUpdate = true;
  }
  if (isUpdate) {
    dispatch(updateSupplierDetails(payload));
    getData();
  }else{
    Toast.show({
      text1: 'INFO !',
      text2: 'Updated',
      type: 'info',
    });
  }
}

useEffect(() => {
  if (!_.isEmpty(updateData)) {
    Toast.show({
      text1: 'SUCCESS',
      text2: updateData?.message,
      type: 'success',
    });
  }
}, [updateData]);

useEffect(() => {
  console.log(supError, '-----------------------');
  if (!_.isEmpty(supError)) {
    Toast.show({
      text1: 'ERROR',
      text2: supError?.message,
      type: 'error',
    });
  }
}, [supError]);

useEffect(() => {
  return () => {
    dispatch(setUpdateSupplierDetailsSucess({}));
    dispatch(setSupplierDetailsFailure({}));
  };
}, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <AppHeaders title={editable?'Edit Supplier':'View Supplier'} color={'#fff'}>
        <View>
          <Pressable onPress={()=>{
            setEditable(true)
          }}>
            {
              !editable?
              <Entypo name='edit' size={20} color='#000' />:null
            }
          </Pressable>
        </View>
      </AppHeaders>
      <KeyboardAvoidingView style={globalStyles.screenLayout}> 
        <SafeAreaView>
          <ScrollView>
            <View>
              <View style={styles.inputBox}>
                <Input
                  mode={'outlined'}
                  label={'Sup-id'}
                  value={supplierData.sup_id}
                  onChangeText={value =>
                    onInputChange(supplierInputKey.sup_id, value)
                  }
                  error={error.sup_id}
                  outlineStyle={error.sup_id && styles.inputError}
                  placeholder={'SUP_ID'}
                  disabled={true}
                />
              </View>
              <View style={styles.inputBox}>
                <Input
                  mode={'outlined'}
                  label={'mobile'}
                  // keyboardType={'phone-pad'}
                  value={supplierData.sup_mobile}
                  onChangeText={value =>
                    onInputChange(supplierInputKey.sup_mobile, value)
                  }
                  error={error.sup_mobile}
                  outlineStyle={error.  sup_mobile && styles.inputError}
                  placeholder={'SUP_MOBILE'}
                  disabled={true}
                />
              </View>
              <View style={styles.inputBox}>
                <Input
                  mode={'outlined'}
                  label={'user_name'}
                  value={supplierData.sup_username}
                  onChangeText={value =>
                    onInputChange(supplierInputKey.sup_username, value)
                  }
                  error={error.sup_username}
                  outlineStyle={error.sup_username && styles.inputError}
                  placeholder={'USER_NAME'}
                  multiline={true}
                  numberOfLines={4}
                  disabled={!editable}
                />
              </View>
              <View style={styles.inputBox}>
                <Input
                  mode={'outlined'}
                  label={'sup_name'}
                  value={supplierData.sup_name}
                  onChangeText={value =>
                    onInputChange(supplierInputKey.sup_name, value)
                  }
                  error={error.sup_name}
                  outlineStyle={error.sup_name && styles.inputError}
                  placeholder={'SUP_NAME'}
                  disabled={!editable}
                />
              </View>
            </View>
            {
              editable?<View style={styles.bottomContainer}>
              <View style={styles.cnclBtn}>
                <Pressable onPress={() => {setEditable(false)}}>
                  <Text style={styles.btnText}>Cancel</Text>
                </Pressable>
              </View>
              <View style={styles.subBtn}>
                <Pressable onPress={onSubmit}>
                  <Text style={[styles.btnText, {color: '#fff'}]}>Submit</Text>
                </Pressable>
              </View>
            </View>:null
            }
            
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}


// return(
// <><View
//         style={{
//           padding: 25,
//           alignItems: 'center',
//           margin: 10,
//           marginTop: 70,
//           justifyContent: 'space-between',
//         }}>
//         <Text
//           style={{
//             fontSize: 30,
//             fontWeight: 'bold',
//             color: 'black',
//             marginBottom: 20,
//           }}>
//           Sales Details
//         </Text>
//         <Card>
//           <View
//             style={{
//               padding: 40,
//               alignItems:'center'
//             }}>
//             <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
//               Supplier ID
//             </Text>
//             <Text style={globalStyles.text}>{data.sup_id}</Text>
//             <Text
//               style={{
//                 fontSize: 20,
//                 fontWeight: 'bold',
//                 color: 'black',
//                 marginTop: 15,
//               }}>
//               Supplier Name
//             </Text>
//             <Text style={globalStyles.text}>{data.sup_name}</Text>
//             <Text
//               style={{
//                 fontSize: 20,
//                 fontWeight: 'bold',
//                 color: 'black',
//                 marginTop: 15,
//               }}>
//               Supplier Email
//             </Text>
//             <Text style={globalStyles.text}>{data.sup_email}</Text>
//             <Text
//               style={{
//                 fontSize: 20,
//                 fontWeight: 'bold',
//                 color: 'black',
//                 marginTop: 15,
//               }}>
//               Supplier Username
//             </Text>
//             <Text style={globalStyles.text}>{data.sup_username}</Text>
//             <Text
//               style={{
//                 fontSize: 20,
//                 fontWeight: 'bold',
//                 color: 'black',
//                 marginTop: 15,
//               }}>
//               Mobile Number
//             </Text>
//             <Text style={globalStyles.text}>{data.sup_mobile}</Text>
            
//           </View>
//         </Card>
//       </View>
//     </>
// );
//             }