import _ from 'lodash';
import React, {useEffect, useCallback, useState, useContext} from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context'
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Touchable,
  BackHandler,
  RefreshControl,
  Pressable,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import AppStatusBar from '../../components/Appstatusbar';
import Loader from '../../components/Loader';
import {getSaleDetails} from './saleAction'
import {UserContext} from '../../service/context/context';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import globalStyles from '../../components/Styles';
const screenWidth = Dimensions.get('window').width;
import {AppHeaders} from '../../components/AppHeaders';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Sale({navigation}) {

  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.sale);
  const {data: userDatafromRedux} = useSelector(state => state.auth);
  const [saleData, setSaleData] = useState([]);
  const {userData, isInternet} = useContext(UserContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [handleSearchUIState, setSearchUIState] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const backAction = useCallback(() => {
    navigation.navigate('Dashboard')
    return true;
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [backAction]);


  function getData() {
    let userId = userDatafromRedux?.result?._id;
    console.log('usedata form redux ', userDatafromRedux);
    if (_.isString(userId)) {
      dispatch(getSaleDetails(userId));
    } else {
      console.log('userdara ', userData);
      userId = userData?.result?._id;
      dispatch(getSaleDetails(userId));
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
  }, []);
  
  function search(text) {
    setSearchInput(text);
    const newData = data?.data.filter(item => {
      const itemData = `${item?.sales_desc?.toLowerCase()}${item?.sales_bill?.toLowerCase()}${item?.sales_amount}${
        item?._id
      }`;
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    setSaleData(newData);
  }
 

  useEffect(() => {
    if (!_.isEmpty(data)) {
      console.log('data in product', data);
      setSaleData(data?.data);
    }
  }, [data]);

  useEffect(() => {
    if (error !== null) {
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
  return (
    <>
    {loading ? <Loader /> : null}
    <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: '#fff',
      // justifyContent: 'flex-end',
    }}>
      <AppHeaders title={'Sale'} color={'#fff'} main={true}>
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
                size={30}
                color="#000"
              />
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <View style={{paddingHorizontal: 10}}>
                <Ionicons
                  onPress={() => navigation.navigate('AddSale')}
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
        </AppHeaders>
    <AppStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
    <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          <View
            style={{
              flexDirection: 'row',
              padding: 20,
              justifyContent: 'space-between',
            }}>
            <View style={styles.card}>
              <Text
                style={[
                  globalStyles.text,
                  {fontSize: 20, paddingTop: 10, color: '#6b6b6b'},
                ]}>
                Sales Record
              </Text>
              <View>
                {/* <View style={styles.iconWrapper}>
                  <Entypo name="price-tag" size={35} color="#000" />
                </View> */}
                <Text
                  style={[globalStyles.text, {color: '#000', fontSize: 33}]}>
                  9.8k
                </Text>
              </View>
            </View>
            <View style={styles.card1}>
              <Text
                style={[
                  globalStyles.text,
                  {fontSize: 20, paddingTop: 10, color: '#6b6b6b'},
                ]}>
                Sale Target
              </Text>
              <View>
                {/* <Ionicons name="pie-chart" size={35} color="#000" /> */}
                <Text
                  style={[globalStyles.text, {color: '#000', fontSize: 33}]}>
                  2345
                </Text>
              </View>
            </View>
          </View>
          <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
            <Text style={[globalStyles.text, {fontSize: 25, color: '#000'}]}>
              Sale List
            </Text>
          </View>
          <View style={{padding: 10}}>
            {_.isEmpty(saleData) ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>NO Data</Text>
              </View>
            ) : (
              saleData?.map((ele, index) => (
                <View
                  style={{
                    padding: 15,
                    flexDirection: 'row',
                    margin: 10,
                    justifyContent:'space-between'
                  }}
                  key={index}>
                  <View style={{flexDirection:'row'}}>
                    <View
                      style={{
                        backgroundColor: '#e4e4e4',
                        borderRadius: 20,
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <AntDesign name="paperclip" size={20} color="#000" />
                    </View>
                    <View style={{paddingHorizontal: 20}}>
                      <Text style={globalStyles}>{ele?.sales_bill}</Text>
                      <Text style={globalStyles}>{ele?.sales_desc}</Text>
                    </View>
                  </View>
                  <View>
                    <Pressable
                     onPress={() => navigation.navigate('saleDisplay',{data:ele})}
                    
                    >
                    <AntDesign name='right' size={20} color="#000"/>
                    </Pressable>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
  </SafeAreaView>
  </>
);
}
const styles = StyleSheet.create({
  container: {},
  top: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    margin: 10,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').height / 6,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: '#B9D7E8',
  },
  card1: {
    padding: 15,
    borderRadius: 10,
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').height / 6,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#B9D7E8',
  },
});