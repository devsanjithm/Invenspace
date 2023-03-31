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
import { useNavigation } from '@react-navigation/native';
import HomeAPIs from './homeService';
const screenWidth = Dimensions.get('window').width;
const scrrenHeight = Dimensions.get('window').height;

function Card1(props) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.innerCardContainer}>
        <View style={styles.todayTextWrapper}>
          <Text style={styles.cardTodayText}>Today</Text>
          <Text style={styles.cardtimetext}>{moment().format('MMM DD')}</Text>
        </View>
        <View style={styles.cardStocksWrapper}>
          <View style={styles.cardStock}>
            <Text style={styles.cardStocksUpText}>{props?.data?.total}</Text>
            <Text style={styles.cardStocksDownText}>total</Text>
          </View>
          <View style={styles.cardStock}>
            <Text style={styles.cardStocksUpText}>{props?.data?.stockIN}</Text>
            <Text style={styles.cardStocksDownText}>Stock In</Text>
          </View>
          <View style={styles.cardStock}>
            <Text style={styles.cardStocksUpText}>{props?.data?.stockOut}</Text>
            <Text style={styles.cardStocksDownText}>Stock Out</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function Card2(props) {
  const navigation = useNavigation()
  let loopedData = [];
  for (let i = 0; i < props?.data.length; i++) {
    const element = props?.data[i];
    loopedData.push(
      <Pressable key={i}  onPress={()=>{
        if(element?.text === "Stock In"){
          navigation.navigate('Stockin')
        }else if(element?.text === "Register New Item"){
          navigation.navigate('AddProducts')
        }
      }}>
      <View style={{flexDirection: 'row',paddingHorizontal:10,justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <View style={{padding:10}}>{element?.icon}</View>
        <Text style={{color: '#000',padding:10,fontSize:20}}>{element?.text}</Text>
        </View>
        <View style={{padding:10}}>
            <AntDesign name='right' size={20} color='#000' />
        </View>
      </View>
      </Pressable>
    );
  }
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card2InnerContainer}>
        <Text style={styles.card2Heading}>{props.heading}</Text>
        <View>{loopedData}</View>
      </View>
    </View>
  );
}

export default function Home({navigation}) {
  const [dashboardDatacount,setDashboardData]=useState()
  const itemData = [
    {
      icon: <MaterialIcons name="add-chart" size={25} color="#000" />,
      text: 'Register New Item',
    },
  ];
  const stockData = [
    {
      icon: <FontAwesome name="angle-double-up" size={25} color="#000" />,
      text: 'Stock In',
    },
    {
      icon: <FontAwesome name="angle-double-down" size={25} color="#000" />,
      text: 'Stock Out',
    },
  ];
  const lowStockData = [
    {
        icon:(<MaterialCommunityIcons name='gauge-low' size={25} color='#000' />),
        text:'Check stock storage'
    }
  ]
  const dashboardData = [
    {
        icon:(<FontAwesome name='bar-chart-o' size={25} color='#000' />),
        text:'Analyze inventory status'
    }
  ]

  useEffect(() => {
    async function data(){
      const data = await HomeAPIs.getDashboardCount();
      console.log(data.data);
      setDashboardData(data.data)
    }
    data()
  }, [])
  

  return (
    <>
      <SafeAreaView style={globalStyles.screenLayout}>
        <View>
          <Text style={styles.Header}>Home</Text>
        </View>
        <ScrollView>
          <Card1 data={dashboardDatacount}/>
          <Card2 data={itemData} heading={'Add Item'} />
          <Card2 data={stockData} heading={'Stock In/Out'} />
          <Card2 data={lowStockData} heading={'Low Stock Remainder'} />
          <Card2 data={dashboardData} heading={'Dashboard'} />
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
    paddingHorizontal:10
  },
});
