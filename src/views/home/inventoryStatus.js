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
import {globalStyles} from '../../utils/styles';
import moment from 'moment';
import {LineChart, ProgressChart} from 'react-native-chart-kit';
import CommonAPIs from '../../service/commonredux/commonService';
import {UserContext} from '../../service/context/context';
const screenWidth = Dimensions.get('window').width;
const scrrenHeight = Dimensions.get('window').height;

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [graphDataIn, setGraphDataIn] = useState([]);
  const [graphDataOut, setGraphDataOut] = useState([]);
  const {setRoute, isInternet} = useContext(UserContext);
  const [refreshing, setRefreshing] = React.useState(false);

  const sub_dates = moment(new Date(), 'DD-MM-YYYY').subtract(30, 'days');
  const dates = [];
  let plused_date = moment(sub_dates, 'DD-MM-YYYY').add(5, 'days');
  dates.push(moment(plused_date).format('DD/MM'));
  for (let i = 0; i < 5; i++) {
    plused_date = moment(plused_date, 'DD-MM-YYYY').add(5, 'days');
    dates.push(moment(plused_date).format('DD/MM'));
  }

  const dataIn = {
    labels: dates,
    datasets: [
      {
        data: graphDataIn,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };
  const dataOut = {
    labels: dates,
    datasets: [
      {
        data: graphDataOut,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 156, 146, ${opacity})`,
    barPercentage: 0.5,
  };

  const getGraphData = async () => {
    const data = await CommonAPIs.getGraphData();
    console.log(data);
    setGraphDataIn(data?.data?.in);
    setGraphDataOut(data?.data?.out);
    setRefreshing(false);
    setLoading(false);
  };

  function handleRefresh() {
    if (isInternet) {
      setRefreshing(true);
      getGraphData();
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

  useEffect(() => {
    setLoading(true);
    getGraphData();
  }, []);

  return (
    <>
      <SafeAreaView style={globalStyles.screenLayout}>
        {loading ? <Loader /> : null}
        <AppStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View>
          <Text style={styles.Header}>Dashboard</Text>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          {_.isEmpty(graphDataIn) ? null : (
            <View
              style={{
                backgroundColor: '#fff',
                paddingVertical: 20,
                elevation: 10,
                borderRadius: 10,
                margin: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  paddingBottom: 20,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 18,
                  }}>
                  Stock In
                </Text>
                <Text
                  style={{
                    color: '#969696',
                    fontSize: 18,
                  }}>
                  Last 30 Days
                </Text>
              </View>
              <LineChart
                data={dataIn}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
              />
            </View>
          )}
          {_.isEmpty(graphDataOut) ? null : (
            <View
              style={{
                backgroundColor: '#fff',
                paddingVertical: 20,
                elevation: 10,
                borderRadius: 10,
                margin: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  paddingBottom: 20,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 18,
                  }}>
                  Stock Out
                </Text>
                <Text
                  style={{
                    color: '#969696',
                    fontSize: 18,
                  }}>
                  Last 30 Days
                </Text>
              </View>
              <LineChart
                data={dataOut}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
              />
            </View>
          )}
          {_.isEmpty(graphDataIn) && _.isEmpty(graphDataOut) ? (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                }}>
                No Data
              </Text>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  Header: {
    color: '#000',
    textAlign: 'center',
    fontSize: 25,
    margin: 10,
    fontWeight: '600',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  innerCardContainer: {
    backgroundColor: '#5053f4',
    width: screenWidth / 1.1,
    height: scrrenHeight / 6,
    borderRadius: 10,
  },
  cardTodayText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 20,
  },
  todayTextWrapper: {
    margin: 15,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  cardtimetext: {
    color: '#e4e4e4',
    marginHorizontal: 20,
    fontSize: 17,
    paddingTop: 5,
  },
  cardStocksWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardStock: {
    marginHorizontal: 10,
  },
  cardStocksDownText: {
    fontSize: 15,
    color: '#e4e4e4',
  },
  cardStocksUpText: {
    fontSize: 25,
    color: '#fff',
    marginBottom: 5,
    fontWeight: '600',
  },
  card2InnerContainer: {
    backgroundColor: '#fff',
    width: screenWidth / 1.1,
    minHeight: scrrenHeight / 6,
    borderRadius: 10,
    elevation: 7,
    padding: 10,
  },
  card2Heading: {
    color: '#000',
    fontSize: 23,
    fontWeight: '600',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
