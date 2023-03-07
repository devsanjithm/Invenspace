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
  Alert,
} from 'react-native';
import Img2 from '../../assets/settings.jpg';
import {FlatList} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import AppStatusBar from '../../components/Appstatusbar';
import Loader from '../../components/Loader';
import {UserContext} from '../../service/context/context';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import globalStyles from '../../components/Styles';
const screenWidth = Dimensions.get('window').width;
import {AppHeaders} from '../../components/AppHeaders';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FAB from '../../components/fab';
import FloatingButton from '../../components/fab';
import SupplierAPIs from '../Suppliers/supplierService';
import CustomerAPIs from '../Customers/customerService';

export default function Settings({navigation}) {
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.customer);
  const {data: userDatafromRedux} = useSelector(state => state.auth);
  const [customerData, setCustomerData] = useState([]);
  const {userData, isInternet} = useContext(UserContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [handleSearchUIState, setSearchUIState] = useState(false);
  const [supcount, setSupcount] = useState();
  const [cuscount, setCuscount] = useState();

  let username = userDatafromRedux?.result?.email;

  // const backAction = useCallback(() => {
  //   navigation.navigate('Dashboard');
  //   return true;
  // }, []);

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backAction);
  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backAction);
  // }, [backAction]);

  async function fetchData() {
    try {
      // payload = JSON.stringify(payload)
      const response = await SupplierAPIs.ProductCount();
      const response2 = await CustomerAPIs.CustomerCount();
      setSupcount(response?.data.data.count);
      setCuscount(response2?.data.data.count);
    } catch (error) {
      console.error(error);
    }
    setRefreshing(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  function handleRefresh() {
    if (isInternet) {
      setRefreshing(true);
      console.log(username);
      fetchData()
    } else {
      Toast.show({
        type: 'error',
        text1: 'No Internet',
        text2: 'Try after Sometime',
        visibilityTime: 5000,
      });
      setRefreshing(false)
    }
  }
  async function handleLogout() {
    Alert.alert('Logout', 'Are you sure you want to Logout?', [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          dispatch(setAuthDetailsSuccess({}));
          setRoute(false);
          clearAll();
        },
      },
      {
        text: 'No',
      },
    ]);
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
        <AppHeaders title={'Settings'} color={'#fff'}>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingHorizontal: 10}}>
              <AntDesign
                //   onPress={() => }
                name="customerservice"
                size={24}
                color="#000"
              />
            </View>
            <View style={{paddingHorizontal: 10}}>
              <Ionicons
                //   onPress={() => }
                name="ios-settings-outline"
                size={24}
                color="#000"
              />
            </View>
          </View>
        </AppHeaders>

        <AppStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          >
          <View>
            <ImageBackground source={Img2} style={styles.img}>
              <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                <View style={styles.container}>
                  <Text style={styles.text}>{username}</Text>
                  <Text style={styles.text}>Member</Text>
                </View>
                <MaterialCommunityIcons
                  color={'pink'}
                  size={40}
                  name="account-circle"
                />
              </View>
              <View>
                <Text style={styles.container1}>Invenspace</Text>
              </View>
            </ImageBackground>
          </View>
          <View
            style={{
              marginTop: 15,
              paddingBottom: 15,
              borderBottomColor: '#e4e4e4',
              borderBottomWidth: 10,
            }}
          />
          <View
            style={{
              marginTop: 15,
              // marginLeft:20,
              paddingBottom: 15,
              borderBottomColor: '#e4e4e4',
              borderBottomWidth: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: '700',
                marginLeft: 15,
              }}>
              Account Settings
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('supplierDisplay');
              }}>
              <View
                style={{
                  padding: 15,
                  flexDirection: 'row',
                  marginLeft: 10,
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={globalStyles}>Supplier</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{paddingHorizontal: 20}}>
                    <Text style={globalStyles}>{supcount} supplier</Text>
                  </View>
                  <View style={{marginTop: 5}}>
                    <AntDesign name="right" size={18} color="#000" />
                  </View>
                </View>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate('customerdis');
              }}>
              <View
                style={{
                  padding: 15,
                  flexDirection: 'row',
                  marginLeft: 10,
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={globalStyles}>Customer</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{paddingHorizontal: 20}}>
                    <Text style={globalStyles}>{cuscount} customer</Text>
                  </View>
                  <View style={{marginTop: 5}}>
                    <AntDesign name="right" size={18} color="#000" />
                  </View>
                </View>
              </View>
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 15,
              paddingBottom: 15,
              borderBottomColor: '#e4e4e4',
              borderBottomWidth: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: '500',
                marginLeft: 15,
              }}>
              Support
            </Text>
            <View
              style={{
                padding: 15,
                flexDirection: 'row',
                marginLeft: 10,
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={globalStyles}>Customer Service</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{paddingHorizontal: 20}}>
                  {/* <Text style={globalStyles}>1 supplier</Text> */}
                </View>
                <View style={{marginTop: 5}}>
                  <AntDesign name="right" size={18} color="#000" />
                </View>
              </View>
            </View>
            <View
              style={{
                padding: 15,
                flexDirection: 'row',
                marginLeft: 10,
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={globalStyles}>Privacy policy</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{paddingHorizontal: 20}}>
                  {/* <Text style={globalStyles}>1 customer</Text> */}
                </View>
                <View style={{marginTop: 5}}>
                  <AntDesign name="right" size={18} color="#000" />
                </View>
              </View>
            </View>
          </View>
          <Pressable onPress={handleLogout}>
            <View
              style={{
                padding: 10,
                paddingHorizontal: 10,
                margin: 20,
                flexDirection: 'row',
              }}>
              <AntDesign name="logout" size={16} color="#000" />
              <Text
                style={{fontSize: 16, color: '#000', paddingHorizontal: 20}}>
                Logout
              </Text>
            </View>
          </Pressable>
          <View>
            <Text> . App version 1.1</Text>
          </View>
          
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    paddingRight: 10,
  },
  container1: {
    marginTop: 80,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  img: {
    height: Dimensions.get('window').height / 4.5,
    width: Dimensions.get('window').width / 1.1,
    margin: 17,
    padding: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  text: {
    justifyContent: 'flex-end',
    color: 'white',
  },
});
