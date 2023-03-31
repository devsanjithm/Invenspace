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
import {getMemberDetails} from '../../service/commonredux/commonAction';

export default function Category({navigation}) {
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

  useEffect(() => {
    if (isInternet) {
      //   getData();
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
        <AppHeaders title={'Item category'} color={'#fff'} main={true}>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingHorizontal: 10}}>
              <Text style={globalStyles}>Add</Text>
            </View>
          </View>
        </AppHeaders>
        <AppStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          <View style={{padding: 10}}>
            <Pressable
            //  onPress={() => navigation.navigate('supplierDis',{data:ele})}
            >
              <View
                style={{
                  paddingLeft: 10,
                  flexDirection: 'row',
                  margin: 5,
                  marginBottom:20,
                  marginTop:20,
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={globalStyles}>type</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text style={globalStyles}>Text</Text>
                  </View>
                  <View style={{paddingLeft: 20}}>
                    <Ionicons name="md-menu-outline" size={20} color="#000" />
                    {/* <Text style={globalStyles}>{ele?.sup_mobile}</Text> */}
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: '#e4e4e4',
                  borderBottomWidth: 0.5,
                }}></View>
            </Pressable>
            <Pressable
            //  onPress={() => navigation.navigate('supplierDis',{data:ele})}
            >
              <View
                style={{
                  paddingLeft: 10,
                  flexDirection: 'row',
                  margin: 5,
                  marginBottom:20,
                  marginTop:20,
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={globalStyles}>Manufacturer</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text style={globalStyles}>Text</Text>
                  </View>
                  <View style={{paddingLeft: 20}}>
                    <Ionicons name="md-menu-outline" size={20} color="#000" />
                    {/* <Text style={globalStyles}>{ele?.sup_mobile}</Text> */}
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: '#e4e4e4',
                  borderBottomWidth: 0.5,
                }}></View>
            </Pressable>
            <Pressable
            //  onPress={() => navigation.navigate('supplierDis',{data:ele})}
            >
              <View
                style={{
                  paddingLeft: 10,
                  flexDirection: 'row',
                  margin: 5,
                  marginBottom:20,
                  marginTop:20,
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={globalStyles}>Size</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text style={globalStyles}>Text</Text>
                  </View>
                  <View style={{paddingLeft: 20}}>
                    <Ionicons name="md-menu-outline" size={20} color="#000" />
                    {/* <Text style={globalStyles}>{ele?.sup_mobile}</Text> */}
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: '#e4e4e4',
                  borderBottomWidth: 0.5,
                }}></View>
            </Pressable>
            <Pressable
            //  onPress={() => navigation.navigate('supplierDis',{data:ele})}
            >
              <View
                style={{
                  paddingLeft: 10,
                  flexDirection: 'row',
                  margin: 5,
                  marginBottom:20,
                  marginTop:20,
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={globalStyles}>Storage</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text style={globalStyles}>Text</Text>
                  </View>
                  <View style={{paddingLeft: 20}}>
                    <Ionicons name="md-menu-outline" size={20} color="#000" />
                    {/* <Text style={globalStyles}>{ele?.sup_mobile}</Text> */}
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: '#e4e4e4',
                  borderBottomWidth: 0.5,
                }}></View>
            </Pressable>
            <Pressable
            //  onPress={() => navigation.navigate('supplierDis',{data:ele})}
            >
              <View
                style={{
                  paddingLeft: 10,
                  flexDirection: 'row',
                  margin: 5,
                  marginBottom:20,
                  marginTop:20,
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={globalStyles}>color</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text style={globalStyles}>Text</Text>
                  </View>
                  <View style={{paddingLeft: 20}}>
                    <Ionicons name="md-menu-outline" size={20} color="#000" />
                    {/* <Text style={globalStyles}>{ele?.sup_mobile}</Text> */}
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: '#e4e4e4',
                  borderBottomWidth: 0.5,
                }}></View>
            </Pressable>
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
