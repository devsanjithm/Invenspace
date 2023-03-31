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
  TouchableOpacity,
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
import {useNavigation} from '@react-navigation/native';
import {Modal} from 'react-native-paper';
const screenWidth = Dimensions.get('window').width;
const scrrenHeight = Dimensions.get('window').height;

function Card(props) {
  const navigation = useNavigation();
  let loopedData = [];
  if (_.isEmpty(props?.data)) {
    return null;
  }
  let stockOutIcon = (
    <FontAwesome name="angle-double-down" size={25} color="#000" />
  );
  let stockInIcon = (
    <FontAwesome name="angle-double-up" size={25} color="#000" />
  );

  for (let i = 0; i < props?.data.length; i++) {
    const element = props?.data[i];
    const type = element?.type;
    loopedData.push(
      <View key={i}>
        <Pressable
          onPress={() => {
            navigation.navigate('History Transaction', {id: element?.id});
          }}>
          <View style={styles.card2InnerContainer}>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <Text style={styles.card2Heading}>
                {type === 1 ? 'Stock Out' : 'Stock In'}
              </Text>
              <Text style={{color: '#000', fontSize: 20, padding: 10}}>
                {type === 1
                  ? element?.customer?.cust_name
                  : element?.suppiler?.sup_name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{padding: 10}}>
                  {element?.type === 1 ? stockOutIcon : stockInIcon}
                </View>
                <Text style={{color: '#000', padding: 10, fontSize: 20}}>
                  {element?.product?.pro_name}
                </Text>
              </View>
              <View style={{padding: 10}}>
                <Text
                  style={[
                    {padding: 10, fontSize: 20},
                    type === 1 ? {color: 'red'} : {color: 'green'},
                  ]}>
                  {type === 1 ? '-' : ''}
                  {element?.quantity}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </View>,
    );
  }
  return (
    <View style={styles.cardContainer}>
      <View>{loopedData}</View>
    </View>
  );
}

export default function Transactions({navigation}) {
  const [loading, setLoading] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isVisible, setIsVisible] = useState(false);
  function handleToggleModal() {
    setIsVisible(!isVisible);
  }

  async function getAllTransactions() {
    let data;
    let payload = {
      include: {
        product: true,
        customer: true,
        suppiler: true,
      },
      where: {
        status: true,
      },
    };
    try {
      data = await transactionsService.getAllTransaction(payload);
      console.log(data?.data?.data);
      setTransactionData(data?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
    setRefreshing(false);
  }

  function handleRefresh() {
    setRefreshing(true);
    getAllTransactions();
  }

  useEffect(() => {
    setLoading(true);
    getAllTransactions();
  }, []);

  return (
    <>
      <SafeAreaView style={globalStyles.screenLayout}>
        <AppStatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
        {loading ? <Loader /> : null}
        <View style={{padding: 10}}>
          <View style={{alignItems: 'flex-end'}}>
            <Pressable
              onPress={() => {
                handleToggleModal();
              }}>
              <AntDesign name="plus" size={25} color="#000" />
            </Pressable>
          </View>
        </View>
        <View style={{padding: 10}}>
          <Text style={styles.headerText}>Stock In/Out</Text>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          <Card data={transactionData} />
        </ScrollView>
        <Modal
          visible={isVisible}
          onDismiss={handleToggleModal}
          contentContainerStyle={styles.modalContainer}
          animationType="slide">
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleToggleModal}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false)
              navigation.navigate('Stockin');
            }}>
            <Text style={styles.modalText}>Stock IN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false)
              navigation.navigate('Stockout');
            }}>
            <Text style={styles.modalText}>Stock Out</Text>
          </TouchableOpacity>
        </Modal>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color:'#000'
  },
});
