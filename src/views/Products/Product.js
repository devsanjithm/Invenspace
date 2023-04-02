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

  // const backAction = useCallback(() => {
  //   if(!_.isEmpty(searchInput)){
  //     setProductData(data?.data.data);
  //     setSearchInput('')
  //     return true
  //   }else{
  //     // navigation.goBack();
  //     return false;
  //   }
  // }, []);

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
          <Text style={{fontSize: 25, color: 'black',marginVertical:10}}>Products</Text>
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
              placeholder={'Search by Item name'}
              placeholderTextColor={'gray'}
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
                borderRadius: 10,
                padding: 5,
                paddingHorizontal: 10,
                backgroundColor: '#eee',
                color: '#000',
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
                  <View style={{flexDirection:"row",alignItems:'center',paddingHorizontal:10}}>
                    <View style={styles.iconContainer}>
                      <AntDesign name="paperclip" size={24} color="#777" />
                    </View>
                    <View style={{ padding: 10}}>
                      <Text style={styles.productName}>{ele.pro_name}</Text>
                      <Text 
                      ellipsizeMode='tail'
                      numberOfLines={1}
                      style={styles.productDesc}>{ele.pro_desc}</Text>
                    </View>
                  </View>
                  <View >
                    <Text style={{
                      color:"blue",
                      paddingHorizontal:20,
                      fontSize:20
                    }}>{ele?.quantity}</Text>
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
    padding: 20,
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
    justifyContent:"space-between"
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
    width:screenWidth/2
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
