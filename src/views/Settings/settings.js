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
  TouchableOpacity,
} from 'react-native';
import Img2 from '../../assets/settings.jpg';
import {FlatList} from 'react-native-gesture-handler';
import {Button, Modal} from 'react-native-paper';
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
import SupplierAPIs from '../Suppliers/supplierService';
import CustomerAPIs from '../Customers/customerService';
import {setAuthDetailsSuccess} from '../Authpages/authSlice';
import {clearAll} from '../../service/localstorage';
import CommonAPIs from '../../service/commonredux/commonService';
import {postCompanyDetails} from '../../service/commonredux/commonAction';
import CustomModal from '../../components/Modal';
export default function Settings({navigation}) {
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.customer);
  const {data: userDatafromRedux, loginData} = useSelector(state => state.auth);
  const {loading: commonLoading} = useSelector(state => state.common);
  const {setRoute, isInternet} = useContext(UserContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [supcount, setSupcount] = useState();
  const [cuscount, setCuscount] = useState();
  const [memcount, setMemcount] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState(
    _.isEmpty(userDatafromRedux) ? loginData : userDatafromRedux,
  );

  let username = userDetails?.data?.user?.name;

  const handleModalClose = () => setModalVisible(false);

  async function fetchData() {
    try {
      // payload = JSON.stringify(payload)
      const response = await SupplierAPIs.ProductCount();
      setSupcount(response?.data.data.count);
      const response2 = await CustomerAPIs.CustomerCount();
      setCuscount(response2?.data.data.count);
      const response3 = await CommonAPIs.getMemberCount();
      setMemcount(response3?.data.data.count);

      // setMemcount(response3?.data.data.count);
    } catch (error) {
      Toast.show({
        text1: 'ERROR',
        text2: error?.message?.error,
        type: 'error',
      });
      console.log(error);
    }
    setRefreshing(false);
  }

  useEffect(() => {
    console.log(userDetails, '090909009');
    setUserDetails(loginData);
  }, [loginData]);

  useEffect(() => {
    fetchData();
  }, []);

  function handleRefresh() {
    if (isInternet) {
      setRefreshing(true);
      console.log(username);
      fetchData();
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
  const [text, setText] = useState(userDetails?.data?.user.Company?.name);

  const handleSubmit = () => {
    const payload = {
      name: text,
    };
    dispatch(postCompanyDetails(payload));
    handleCancel();
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      {loading || commonLoading ? <Loader /> : null}
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
          }>
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
                <Text style={styles.container1}>
                  {userDetails?.data?.user?.Company?.name}
                </Text>
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
              Manage Team
            </Text>
            <Pressable
              onPress={() => {
                setModalVisible(true);
              }}>
              <View
                style={{
                  padding: 15,
                  flexDirection: 'row',
                  marginLeft: 10,
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={globalStyles}>Team Name</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{paddingHorizontal: 20}}>
                    <Text style={globalStyles}>
                      {userDetails?.data?.user.Company?.name}
                    </Text>
                  </View>
                  <View style={{marginTop: 5}}>
                    <AntDesign name="right" size={18} color="#000" />
                  </View>
                </View>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate('memdis');
              }}>
              <View
                style={{
                  padding: 15,
                  flexDirection: 'row',
                  marginLeft: 10,
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={globalStyles}>Member</Text>
                </View>
                <Pressable
                  onPress={() => {
                    navigation.navigate('memdis');
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{paddingHorizontal: 20}}>
                      <Text style={globalStyles}>{memcount} members</Text>
                    </View>
                    <View style={{marginTop: 5}}>
                      <AntDesign name="right" size={18} color="#000" />
                    </View>
                  </View>
                </Pressable>
              </View>
              <View style={{marginLeft: 22}}>
                <Text style={{color: 'blue', fontSize: 15}}>+Invite</Text>
              </View>
            </Pressable>
          </View>
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
              Category Settings
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('category');
              }}>
              <View
                style={{
                  padding: 15,
                  flexDirection: 'row',
                  marginLeft: 10,
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={globalStyles}>item</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{paddingHorizontal: 20}}>
                    <Text style={globalStyles}>6 categories</Text>
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
        <CustomModal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={handleModalClose}
          onDismiss={handleModalClose}>
          <View>
            <View
              style={{backgroundColor: 'white', borderRadius: 8, padding: 16}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginBottom: 8,
                  color: 'black',
                  textAlign: 'center',
                }}>
                Edit Team Name
              </Text>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <TextInput
                  style={{
                    height: 60,
                    width: 250,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 4,
                    padding: 8,
                    marginBottom: 25,
                    marginTop: 20,
                  }}
                  onChangeText={setText}
                  value={text}
                  placeholder="Enter new name"
                />
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={handleCancel}
                  style={{
                    backgroundColor: 'red',
                    padding: 8,
                    borderRadius: 4,
                    width: 100,
                    height: 40,
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    backgroundColor: 'blue',
                    padding: 8,
                    borderRadius: 4,
                    width: 100,
                    height: 40,
                  }}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </CustomModal>
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
