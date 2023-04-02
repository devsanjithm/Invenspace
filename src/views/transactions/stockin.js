import _ from 'lodash';
import React, {useEffect, useCallback, useState, useContext} from 'react';

// import { SafeAreaView } from 'react-native-safe-area-context'
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
  Alert,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import AppStatusBar from '../../components/Appstatusbar';
import Loader from '../../components/Loader';
import {getProductDetails} from './productAction';
import {UserContext} from '../../service/context/context';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppHeaders} from '../../components/AppHeaders';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {clearAll} from '../../service/localstorage';
import {globalStyles} from '../../utils/styles';
import moment from 'moment';
import transactionsService from './transactionsService';
import {Button} from 'react-native-paper';
import {addTransaction, getAllTransaction} from './transactionAction';
import {useNavigation,CommonActions} from '@react-navigation/native';
import { setAddTransactionSuccess, setpostMessagefalse } from './transactionSlice';
const screenWidth = Dimensions.get('window').width;
const scrrenHeight = Dimensions.get('window').height;

export default function Stockin({route}) {
  // const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [supData, setSupData] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [showsup, setShowsup] = useState('Select');
  const [showitem, setShowitem] = useState('Select');
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let payload = {
    include: {
      product: true,
      customer: true,
      suppiler: true,
    },
    where: {
      status: true,
    },
  };
  const {postMessage, loading, error} = useSelector(
    state => state.transaction,
  );

  const backAction = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index:0,
        routes:[{name:'Home'}]
      })
    )
    return true;
  }, []);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [backAction]);


  function handleRefresh() {
    setRefreshing(true);
  }

  useEffect(() => {
    if (route.params) {
      const {data} = route.params;
      if (data.pro_name) {
        setItemData(data);
        setShowitem(data.pro_name);
      } else {
        setSupData(data);
        setShowsup(data.sup_name);
      }
    }
    console.log('hii');
  }, [route]);

  useEffect(() => {
    if (!_.isEmpty(postMessage)) {
      console.log('data in product', postMessage);
      Toast.show({
        text1: 'SUCCESS',
        text2: postMessage?.message,
        type: 'success',
      });
      dispatch(setpostMessagefalse())
      navigation.goBack();
      dispatch(getAllTransaction(payload));
    }
  }, [postMessage]);

  useEffect(() => {
    console.log(postMessage); 
    if (!_.isEmpty(error)) {
      Toast.show({
        text1: 'ERROR',
        text2: error?.message?.error,
        type: 'error',
      });
    }
  }, [error]);

  useEffect(() => {
  
    return () => {
      setAddTransactionSuccess({})
    }
  }, [])
  

  function handleSubmit() {
    console.log('hii');
    console.log(supData.id);
    console.log(itemData.id);

    const payload = {
      product_id: itemData.id,
      type: 0,
      quantity: parseInt(quantity),
      suppiler_id: supData.id,
    };

    console.log(payload);

    dispatch(addTransaction(payload));
  }

  return (
    <>
      <SafeAreaView style={globalStyles.screenLayout}>
        <AppStatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
        {loading ? <Loader /> : null}
        <View
          style={{
            paddingLeft: 10,
            marginVertical: 10,
            borderBottomColor: '#e4e4e4',
            borderBottomWidth: 1,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}>
              <MaterialIcons name="cancel" size={25} color="#000" />
            </Pressable>
            <Text
              style={[
                globalStyles.text,
                {
                  fontSize: 20,
                  paddingHorizontal: 30,
                  paddingBottom: 10,
                  fontWeight: '500',
                },
              ]}>
              Stock In
            </Text>
            <View>
              <Pressable
                onPress={() => {
                  handleSubmit();
                }}>
                <Text
                  style={[
                    {
                      fontSize: 18,
                      paddingHorizontal: 100,
                      paddingBottom: 10,
                      color: 'black',
                    },
                  ]}>
                  Save Draft
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              paddingBottom: 10,
              paddingRight: 15,
              paddingLeft: 15,
              borderBottomColor: '#448EE4',
              borderBottomWidth: 2,
            }}>
            <Text style={{fontSize: 25, fontWeight: '600', color: '#448EE4'}}>
              Stock In
            </Text>
            <Pressable>
              <View style={styles.container}>
                <Text style={{fontSize: 16}}>Add past transaction</Text>
              </View>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
              paddingLeft: 10,
              paddingRight: 10,
              marginBottom: 15,
            }}>
            <Text style={{fontSize: 15}}>Supplier</Text>
            <Pressable onPress={() => navigation.navigate('listsupplier')}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 15}}>{showsup}</Text>
                <View style={{marginLeft: 10}}>
                  <AntDesign name="right" size={20} color="#000" />
                </View>
              </View>
            </Pressable>
          </View>
          <Pressable onPress={() => navigation.navigate('listitem')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
                paddingLeft: 10,
                paddingRight: 10,
                marginBottom: 10,
              }}>
              <Text style={{fontSize: 15}}>Items</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 15}}>{showitem}</Text>
                <View style={{marginLeft: 10}}>
                  <AntDesign name="right" size={20} color="#000" />
                </View>
              </View>
            </View>
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
              paddingLeft: 10,
              paddingRight: 10,
              marginBottom: 15,
            }}>
            <View style={{marginTop: 5}}>
              <Text style={{fontSize: 15}}>Enter Quantity</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginLeft: 10}}>
                <TextInput
                  onChangeText={setQuantity}
                  placeholder="Enter quantity"></TextInput>
              </View>
            </View>
          </View>
          <View style={{marginTop: 400}}>
            <Button
              mode="contained"
              color="#448EE4"
              onPress={() => {
                handleSubmit();
              }}>
              Submit
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
});
