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
import {UserContext} from '../../service/context/context';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import globalStyles from '../../components/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppHeaders} from '../../components/AppHeaders';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {setAuthDetailsSuccess} from '../Authpages/authSlice';
import {clearAll} from '../../service/localstorage';
import {Icon} from 'react-native-paper/lib/typescript/components/List/List';
import {TextInputAffix} from 'react-native-paper/lib/typescript/components/TextInput/Adornment/TextInputAffix';
import { getProductDetails } from '../Products/productAction';
import { setProductDetailsFailure } from '../Products/productSlice';

const screenWidth = Dimensions.get('window').width;

export default function Listitems({navigation}) {
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.product);
  const {data: userDatafromRedux} = useSelector(state => state.auth);
  const [productData, setProductData] = useState([]);
  const {userData, isInternet} = useContext(UserContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [handleSearchUIState, setSearchUIState] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const {setRoute} = useContext(UserContext);

  const backAction = useCallback(() => {
    navigation.navigate('Dashboard');
    return true;
  }, []);

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backAction);
  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backAction);
  // }, [backAction]);

  function getData() {
    let userId = userDatafromRedux?.result?._id;
    console.log('usedata form redux ', userDatafromRedux);
    if (_.isString(userId)) {
      dispatch(getProductDetails(userId));
    } else {
      console.log('userdara ', userData);
      userId = userData?.result?._id;
      dispatch(getProductDetails(userId));
    }
    setRefreshing(false);
  }

  useEffect(() => {
    if (isInternet) {
      getData();
    } else {
      Toast.show({
        type: 'error',
        text1: 'No Internet',
        text2: 'Try after Sometime',
        visibilityTime: 5000,
      });
    }
    return () => {
      dispatch(setProductDetailsFailure({}));
    };
  }, []);

  useEffect(() => {
    if (!_.isEmpty(data)) {
      console.log('data in product', data.data.data);
      setProductData(data?.data.data);
    }
  }, [data]);

  useEffect(() => {
    if (!_.isEmpty(error)) {
      Toast.show({
        text1: 'ERROR',
        text2: error?.message,
        type: 'error',
      });
    }
  }, [error]);

  function handleRefresh() {
    setRefreshing(true);
    if (isInternet) {
      getData();
    } else {
      Toast.show({
        type: 'error',
        text1: 'No Internet',
        text2: 'Try after Sometime',
        visibilityTime: 5000,
      });
      setRefreshing(false);
    }
  }

  function search(text) {
    setSearchInput(text);
    const newData = data?.data.data.filter(item => {
      const itemData = `${item?.pro_desc?.toLowerCase()}${item?.pro_name?.toLowerCase()}${item?.pro_type?.toLowerCase()}${
        item?._id
      }`;
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    setProductData(newData);
  }
  
  return (
    <>
    {loading ? <Loader /> : null}
    <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: '#fff',
      // justifyContent: 'flex-end',
    }}>
      <AppHeaders title={'Items'} color={'#fff'} main={true}>
          {handleSearchUIState ? (
            <View style={{flexDirection: 'row'}}>
              <View style={{paddingHorizontal: 10}}>
                <TextInput
                  value={searchInput} 
                  placeholder={'Search'}
                  onChangeText={text => search(text)}
                  style={{
                    height: 35,
                    width: screenWidth / 2.5,
                    borderWidth: 1,
                    borderRadius: 10,
                  }}
                />
              </View>
              <MaterialIcons
                onPress={() => {
                  if (handleSearchUIState) {
                    search('');
                  }
                  setSearchUIState(!handleSearchUIState);
                }}
                name="cancel"
                size={24}
                color="#000"
              />
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              
              <View style={{paddingHorizontal: 10}}>
                <Ionicons
                  onPress={() => setSearchUIState(!handleSearchUIState)}
                  name="search"
                  size={24}
                  color="#000"
                />
              </View>
              <View style={{paddingHorizontal: 10}}>
                <Ionicons
                  onPress={() => navigation.navigate('addsup')}
                  name="ios-add-circle"
                  size={24}
                  color="#000"
                />
              </View>
            </View>
          )}
        </AppHeaders>
    <AppStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
    <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          <View style={{padding: 10}}>
            {_.isEmpty(productData) ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  
                }}>
                <Text>NO Data</Text>
              </View>
            ) : (
              productData?.map((ele, index) => (
                <Pressable
                     onPress={() => navigation.navigate('Stockout',{data:ele})}
                     key={index}
                    >
                      
                <View
                  style={{
                    padding: 15,
                    flexDirection: 'row',
                    margin: 5,
                    justifyContent:'space-between',
                    
                    
                  }}
                >
                  <View style={{flexDirection:'row'}}>
                    <View
                      style={{
                        backgroundColor: '#e4e4e4',
                        borderRadius: 20,
                        width: 30,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MaterialCommunityIcons name="handshake" size={20} color="#000" />
                    </View>
                    <View style={{paddingHorizontal: 20}}>
                      <Text style={globalStyles}>{ele?.pro_name}</Text>
                      {/* <Text style={globalStyles}>{ele?.sup_mobile}</Text> */}
                    </View>
                  </View>
                  {/* <View>
                    
                    <AntDesign name='right' size={20} color="#000"/>
                   
                  </View> */}
                </View>
                <View  style={{
                   borderBottomColor: '#e4e4e4',
                   borderBottomWidth: 0.5,
                    
                    
                  }}></View>
                </Pressable>
              ))
            )}
          </View>
        </ScrollView>
  </SafeAreaView>
  </>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#555',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    elevation: 9,
    borderRadius: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productDesc: {
    fontSize: 16,
    color: '#777',
  },
});


