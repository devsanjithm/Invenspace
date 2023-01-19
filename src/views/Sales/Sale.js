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
export default function Sale({navigation}) {

  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.sale);
  const {data: userDatafromRedux} = useSelector(state => state.auth);
  const [saleData, setSaleData] = useState([]);
  const {userData, isInternet} = useContext(UserContext);
  const [refreshing, setRefreshing] = React.useState(false);

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
          <AppStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
            <ScrollView
             refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }>
              <View style={styles.top}>
                <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>
                  Sales
                </Text>
                <View>
                  <Button mode="contained" color="blue" onPress={()=>{navigation.push('AddSale');}}>
                    Add Sale
                  </Button>
                </View>
              </View>
              <View>
            {_.isEmpty(saleData) ? (
              <View>
                <Text>NO Data</Text>
              </View>
            ) : (
              saleData?.map((ele, index) => (
                <View
                  style={{
                    borderWidth: 1,
                    padding: 10,
                  }}
                  key={index}>
                  <Text style={globalStyles}>{ele?._id}</Text>
                  <Text style={globalStyles}>{ele?.sales_bill}</Text>
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
        margin:10
      },
    });
    