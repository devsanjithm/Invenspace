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
import {getTransaction} from './transactionAction';
const screenWidth = Dimensions.get('window').width;
const scrrenHeight = Dimensions.get('window').height;

export default function HistoryTransaction({navigation, route}) {
  const id = route.params.id;
  const [transactionData, setTransactionData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const {singleData, loading} = useSelector(state => state.transaction);

  async function getTransactions() {
    try {
      dispatch(getTransaction(id));
    } catch (error) {
      console.log(error);
    }
    setRefreshing(false);
  }

  useEffect(() => {
    if (!_.isEmpty(singleData)) {
      setTransactionData(singleData?.data?.data);
    }
  }, [singleData]);

  function handleRefresh() {
    setRefreshing(true);
    getTransactions();
  }

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <SafeAreaView style={globalStyles.screenLayout}>
        <AppStatusBar
          backgroundColor={loading ? 'rgba(0,0,0,0.75)' : '#fff'}
          barStyle={'dark-content'}
        />
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
                {fontSize: 23, paddingHorizontal: 30, paddingBottom: 10},
              ]}>
              History
            </Text>
          </View>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          <View>
            <Text style={{color: '#828282', padding: 10, fontSize: 15}}>
              {moment(transactionData?.created_at).format(
                'MMM DD, YYYY hh:MM a',
              )}
            </Text>
          </View>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.headerText,
                transactionData?.type === 1
                  ? {color: '#FF6600'}
                  : {color: '#448EE4'},
              ]}>
              {transactionData?.type === 1 ? 'Stock Out' : 'Stock In'}
            </Text>
            <Text style={{color: '#828282', padding: 10, fontSize: 18}}>
              {transactionData?.type === 1
                ? transactionData?.customer?.cust_name
                : transactionData?.suppiler?.sup_name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <View>
              <View>
                <Text style={[globalStyles.text,{fontSize:23}]}>
                  {transactionData?.product?.pro_name}
                </Text>
              </View>
              <View>
                <Text style={globalStyles.text}>
                  {transactionData?.product?.pro_price} |{' '}
                  {transactionData?.product?.quantity}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={[
                  {padding: 10, fontSize: 20},
                  transactionData?.type === 1
                    ? {color: 'red'}
                    : {color: 'green'},
                ]}>
                {transactionData?.type === 1 ? '-' : ''}
                {transactionData?.quantity}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  headerText: {
    color: '#000',
    fontSize: 28,
    fontWeight: '600',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  card2InnerContainer: {
    backgroundColor: '#fff',
    width: screenWidth / 1.1,
    minHeight: scrrenHeight / 6,
    borderRadius: 10,
    elevation: 7,
    padding: 10,
    marginVertical: 10,
  },
  card2Heading: {
    color: '#000',
    fontSize: 23,
    fontWeight: '600',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
