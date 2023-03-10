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
import globalStyles from '../../components/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppHeaders} from '../../components/AppHeaders';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  setProductDetailsFailure,
  setProductDetailsSuccess,
} from './productSlice';
import {setAuthDetailsSuccess} from '../Authpages/authSlice';
import {clearAll} from '../../service/localstorage';
import {Icon} from 'react-native-paper/lib/typescript/components/List/List';
import {TextInputAffix} from 'react-native-paper/lib/typescript/components/TextInput/Adornment/TextInputAffix';

const screenWidth = Dimensions.get('window').width;

export default function Product({navigation}) {
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
        text2: error?.message?.error,
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
        }}>
        <View style={{alignSelf: 'center', borderBottomColor: '#e4e4e4'}}>
          <Text style={{fontSize: 25, color: 'black'}}>Products</Text>
        </View>
        <AppStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          <View style={{paddingHorizontal: 20, paddingVertical: 10}}></View>
          <View style={{paddingHorizontal: 10, marginLeft: 10}}>
            <TextInput
              value={searchInput}
              placeholder={'Search'}
              placeholderTextColor={"#000"}
              onChangeText={text => search(text)}
              // left={ <Ionicons
              //   onPress={() => setSearchUIState(!handleSearchUIState)}
              //   name="search"
              //   size={30}
              //   color="#000"
              // />}
              style={{
                height: 40,
                width: screenWidth / 1.1,
                borderWidth: 1,
                borderRadius: 10,
                padding: 5,
                paddingHorizontal: 10,
                backgroundColor: '#eee',
                color:"#000"
              }}
            />
            
          </View>
          <View style={styles.container}>
            {_.isEmpty(productData) ? (
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>NO Data</Text>
              </View>
            ) : (
              productData?.map((ele, index) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    navigation.navigate('productDisplay', {data: ele})
                  }
                  style={styles.productContainer}>
                  <View style={styles.iconContainer}>
                    <AntDesign name="paperclip" size={24} color="#777" />
                  </View>
                  <View style={{marginLeft: 20, padding: 10}}>
                    <Text style={styles.productName}>{ele.pro_name}</Text>
                    <Text style={styles.productDesc}>{ele.pro_desc}</Text>
                  </View>
                </Pressable>
              ))
            )}
          </View>
        </ScrollView>
        <View
          style={{paddingHorizontal: 10, alignSelf: 'flex-end', margin: 14}}>
          <Ionicons
            onPress={() => navigation.navigate('AddProducts')}
            name="ios-add-circle"
            size={60}
            color="#000"
          />
        </View>
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

{
  /* <AppHeaders title={'Products'} color={'#fff'} main={true}>
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
                    padding: 5,
                    paddingHorizontal: 10,
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
                size={30}
                color="#000"
              />
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <View style={{paddingHorizontal: 10}}>
                <Ionicons
                  onPress={() => navigation.navigate('AddProducts')}
                  name="ios-add-circle"
                  size={30}
                  color="#000"
                />
              </View>
              <View style={{paddingHorizontal: 10}}>
                <Ionicons
                  onPress={() => setSearchUIState(!handleSearchUIState)}
                  name="search"
                  size={30}
                  color="#000"
                />
              </View>
            </View>
          )}
        </AppHeaders> */
}
