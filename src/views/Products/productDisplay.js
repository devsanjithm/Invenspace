import React, {Component, useCallback, useEffect, useState} from 'react';
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
  BackHandler,
  Pressable,
} from 'react-native';
import {globalStyles} from '../../utils/styles';
import {AppHeaders} from '../../components/AppHeaders';
import {styles} from './styles';
import Input from '../../components/Input/index';
import {productInputKey} from './constants';
import {validateData} from '../../utils/validator';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import {updateProductDetails, getProductDetails} from './productAction';
import {
  setProductDetailsFailure,
  setUpdateProductDetailsSucess,
} from './productSlice';
import _ from 'lodash';
import Entypo from 'react-native-vector-icons/Entypo';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
export function Display({route, navigation}) {
  console.log(route.params.data);
  const {data} = route.params;
  const backAction = useCallback(() => {
    navigation.goBack();
    return true;
  }, []);
  const dispatch = useDispatch();
  const {
    updateData,
    loading,
    error: proError,
  } = useSelector(state => state.product);
  const {data: userDatafromRedux} = useSelector(state => state.auth);

  function getData() {
    let userId = userDatafromRedux?.result?._id;
    console.log('usedata form redux ', userDatafromRedux);
    if (_.isString(userId)) {
      dispatch(getProductDetails(userId));
    }
  }

  const [editable,setEditable] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [backAction]);

  const defProductData = {
    pro_id: data?.pro_id,
    pro_items: data?.pro_items,
    pro_type: data?.pro_type,
    pro_desc: data?.pro_desc,
    pro_num: data?.pro_num,
  };
  const defErrorData = {
    pro_id: false,
    pro_items: false,
    pro_type: false,
    pro_desc: false,
    pro_num: false,
  };

  const [productData, setproductData] = useState(defProductData);
  const [error, setError] = useState(defErrorData);

  const onInputChange = (key, value) => {
    setproductData({...productData, [key]: value});
    setError({...error, [key]: false});
  };

  function onSubmit() {
    if (validateData(productData.pro_items)) {
      setError({...error, pro_items: true});
      return;
    }
    if (validateData(productData.pro_desc)) {
      setError({...error, pro_desc: true});
      return;
    }
    const payload = {
      id: data._id,
    };
    let isUpdate = false;
    if (defProductData.pro_desc !== productData.pro_desc) {
      payload.pro_desc = productData.pro_desc;
      isUpdate = true;
    }
    if (defProductData.pro_items !== productData.pro_items) {
      payload.pro_items = productData.pro_items;
      isUpdate = true;
    }
    if (isUpdate) {
      dispatch(updateProductDetails(payload));
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
    console.log(proError, '-----------------------');
    if (!_.isEmpty(proError)) {
      Toast.show({
        text1: 'ERROR',
        text2: proError?.message,
        type: 'error',
      });
    }
  }, [proError]);

  useEffect(() => {
    return () => {
      dispatch(setUpdateProductDetailsSucess({}));
      dispatch(setProductDetailsFailure({}));
    };
  }, []);

  return (
    <>
      {loading ? <Loader /> : null}
      <AppHeaders title={editable?'Edit Product':'View Product'} color={'#fff'}>
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
                  label={'Pro-id'}
                  value={productData.pro_id}
                  onChangeText={value =>
                    onInputChange(productInputKey.pro_id, value)
                  }
                  error={error.pro_id}
                  outlineStyle={error.pro_id && styles.inputError}
                  placeholder={'PRO_ID'}
                  disabled={true}
                />
              </View>
              <View style={styles.inputBox}>
                <Input
                  mode={'outlined'}
                  label={'Pro-num'}
                  keyboardType={'phone-pad'}
                  value={productData.pro_num}
                  onChangeText={value =>
                    onInputChange(productInputKey.pro_num, value)
                  }
                  error={error.pro_num}
                  outlineStyle={error.pro_num && styles.inputError}
                  placeholder={'PRO_NUM'}
                  disabled={true}
                />
              </View>
              <View style={styles.inputBox}>
                <Input
                  mode={'outlined'}
                  label={'Pro-desc'}
                  value={productData.pro_desc}
                  onChangeText={value =>
                    onInputChange(productInputKey.pro_desc, value)
                  }
                  error={error.pro_desc}
                  outlineStyle={error.pro_desc && styles.inputError}
                  placeholder={'PRO_DESC'}
                  multiline={true}
                  numberOfLines={4}
                  disabled={!editable}
                />
              </View>
              <View style={styles.inputBox}>
                <Input
                  mode={'outlined'}
                  label={'Pro-items'}
                  value={productData.pro_items}
                  onChangeText={value =>
                    onInputChange(productInputKey.pro_items, value)
                  }
                  error={error.pro_items}
                  outlineStyle={error.pro_items && styles.inputError}
                  placeholder={'PRO_items'}
                  disabled={!editable}
                />
              </View>
              <View style={styles.inputBox}>
                <Input
                  mode={'outlined'}
                  label={'Pro-type'}
                  value={productData.pro_type}
                  onChangeText={value =>
                    onInputChange(productInputKey.pro_type, value)
                  }
                  error={error.pro_type}
                  outlineStyle={error.pro_type && styles.inputError}
                  placeholder={'PRO_type'}
                  disabled={true}
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
