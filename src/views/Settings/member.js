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
// import {getMemberDetails} from './commonAction'
import {UserContext} from '../../service/context/context';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import globalStyles from '../../components/Styles';
const screenWidth = Dimensions.get('window').width;
import {AppHeaders} from '../../components/AppHeaders';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getMemberDetails } from '../../service/commonredux/commonAction';

export default function Member({navigation}) {

  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.common);
  const {data: userDatafromRedux} = useSelector(state => state.auth);
  const [memberData, setMemberData] = useState([]);
  const {userData, isInternet} = useContext(UserContext);
  const [refreshing, setRefreshing] = React.useState(false);
  

  // const backAction = useCallback(() => {
  //   navigation.navigate('Dashboard')
  //   return true;
  // }, []);

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backAction);
  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backAction);
  // }, [backAction]);


  function getData() {
    
      console.log('userdara ', userData);
      let payload = {
        where:{
            status:true,
            company_id:userDatafromRedux?.data?.user?.Company?.id,
        }
    }
      dispatch(getMemberDetails(payload));
    
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
  


  useEffect(() => {
    console.log(userDatafromRedux?.data?.user?.Company?.id,"------------------------------------ company")
    if (!_.isEmpty(data)) {
      console.log('data in member', data);
      setMemberData(data?.data.data);
    }
  }, [data]);

  useEffect(() => {
    if (error !== null) {
      console.log(error);
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
  return (
    <>
    {loading ? <Loader /> : null}
    <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: '#fff',
      // justifyContent: 'flex-end',
    }}>
      <AppHeaders title={'Members'} color={'#fff'} main={true}>
          
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
                  onPress={() => navigation.navigate('addmem')}
                  name="ios-add-circle"
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
          <View style={{padding: 10}}>
            {_.isEmpty(memberData) ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  
                }}>
                <Text>NO Data</Text>
              </View>
            ) : (
              memberData?.map((ele, index) => (
                <Pressable
                    //  onPress={() => navigation.navigate('supplierDis',{data:ele})}
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
                      <Text style={globalStyles}>{ele?.name}</Text>
                      {/* <Text style={globalStyles}>{ele?.sup_mobile}</Text> */}
                    </View>
                  </View>
                  <View>
                    
                    <AntDesign name='right' size={20} color="#000"/>
                   
                  </View>
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