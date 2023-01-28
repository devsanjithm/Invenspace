import React, {useState, useContext} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {UserContext} from '../service/context/context';
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
  Pressable,
} from 'react-native';
import AppStatusBar from '../components/Appstatusbar';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Card, {InnerCard} from '../components/card';
import {globalStyles} from '../utils/styles';
import {LineChart} from 'react-native-chart-kit';
const screenWidth = Dimensions.get("window").width;
export default function Dashboard() {
  const {setRoute} = useContext(UserContext);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function handleSide() {
    navigation.navigate('SideBarPage');
  }
  const chartConfig = {
    backgroundGradientFrom: "#e0e0e0",
    backgroundGradientTo: "#e0e0e0",
    color:(opacity = 1) => `rgba(0, 0, 0, ${opacity})` ,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const data = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        data: [20, 45, 28, 60,],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Profit'], // optional
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#e0e0e0',
        padding: 5,
        // justifyContent: 'flex-end',
      }}>
      <AppStatusBar backgroundColor={'#e0e0e0'} barStyle="dark-content" />
      <KeyboardAvoidingView style={{paddingHorizontal: 10}}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 5,
              marginBottom: 10,
            }}>
            <Pressable onPress={handleSide}>
              <Entypo
                style={{paddingTop: 4}}
                name="menu"
                color={'black'}
                size={30}
              />
            </Pressable>
            <Text
              style={{
                fontSize: 28,
                color: 'black',
                paddingHorizontal: 20,
              }}>
              Dashboard
            </Text>
            <Fontisto
              style={{
                position: 'absolute',
                right: 10,
                bottom: 3,
              }}
              name="bell"
              color={'black'}
              size={25}
            />
          </View>
          <Card>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                marginBottom: 10,
              }}>
              <Text style={{color: '#000', fontSize: 20}}>Sales Overview</Text>
              <Entypo name="dots-three-vertical" size={20} color="#000" />
            </View>
            <View>
              <InnerCard>
                <View style={styles.card}>
                  <View>
                    <View style={styles.iconWrapper}>
                      <Entypo name="price-tag" size={25} color="#fff" />
                    </View>
                    <Text style={[globalStyles.text, {color: '#fff'}]}>
                      9.8k
                    </Text>
                  </View>
                  <Text
                    style={[
                      globalStyles.text,
                      {fontSize: 23, paddingTop: 10, color: '#fff'},
                    ]}>
                    Sales
                  </Text>
                </View>
                <View style={styles.card1}>
                  <View>
                    <Ionicons name="pie-chart" size={25} color="#fff" />
                    <Text style={[globalStyles.text, {color: '#fff'}]}>
                      2345
                    </Text>
                  </View>
                  <Text
                    style={[globalStyles.text, {fontSize: 23, color: '#fff'}]}>
                    Revenue
                  </Text>
                </View>
              </InnerCard>
              <InnerCard>
                <View style={styles.card1}>
                  <View>
                    <Ionicons name="pie-chart" size={25} color="#fff" />
                    <Text style={[globalStyles.text, {color: '#fff'}]}>
                      7654
                    </Text>
                  </View>
                  <Text
                    style={[globalStyles.text, {fontSize: 23, color: '#fff'}]}>
                    Cost
                  </Text>
                </View>
                <View style={styles.card}>
                  <View>
                    <Ionicons name="pie-chart" size={25} color="#fff" />
                    <Text style={[globalStyles.text, {color: '#fff'}]}>
                      1.2k
                    </Text>
                  </View>
                  <Text
                    style={[
                      globalStyles.text,
                      {fontSize: 23, paddingTop: 10, color: '#fff'},
                    ]}>
                    Profit
                  </Text>
                </View>
              </InnerCard>
            </View>
          </Card>
          <Card>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                marginBottom: 10,
              }}>
              <Text style={{color: '#000', fontSize: 20}}>
                Purchase Overview
              </Text>
              <Entypo name="dots-three-vertical" size={20} color="#000" />
            </View>
            <View>
              <InnerCard>
                <View style={styles.card}>
                  <View>
                    <View style={styles.iconWrapper}>
                      <Entypo name="price-tag" size={25} color="#fff" />
                    </View>
                    <Text style={[globalStyles.text, {color: '#fff'}]}>
                      9.8k
                    </Text>
                  </View>
                  <Text
                    style={[
                      globalStyles.text,
                      {fontSize: 20, paddingTop: 10, color: '#fff'},
                    ]}>
                    Total Purchase
                  </Text>
                </View>
                <View style={styles.card1}>
                  <View>
                    <Ionicons name="pie-chart" size={25} color="#fff" />
                    <Text style={[globalStyles.text, {color: '#fff'}]}>
                      2345
                    </Text>
                  </View>
                  <Text
                    style={[globalStyles.text, {fontSize: 20, color: '#fff'}]}>
                    Canceled Orders
                  </Text>
                </View>
              </InnerCard>
              <InnerCard>
                <View style={styles.card1}>
                  <View>
                    <Ionicons name="pie-chart" size={25} color="#fff" />
                    <Text style={[globalStyles.text, {color: '#fff'}]}>
                      7654
                    </Text>
                  </View>
                  <Text
                    style={[globalStyles.text, {fontSize: 23, color: '#fff'}]}>
                    Cost
                  </Text>
                </View>
                <View style={styles.card}>
                  <View>
                    <Ionicons name="pie-chart" size={25} color="#fff" />
                    <Text style={[globalStyles.text, {color: '#fff'}]}>
                      1.2k
                    </Text>
                  </View>
                  <Text
                    style={[
                      globalStyles.text,
                      {fontSize: 23, paddingTop: 10, color: '#fff'},
                    ]}>
                    Returns
                  </Text>
                </View>
              </InnerCard>
            </View>
          </Card>
          <Card>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                marginBottom: 10,
              }}>
              <Text style={{color: '#000', fontSize: 20}}>No of Users</Text>
              <Entypo name="dots-three-vertical" size={20} color="#000" />
            </View>
            <View>
              <InnerCard>
                <View style={styles.card}>
                  <View>
                    <View style={styles.iconWrapper}>
                      <Entypo name="price-tag" size={25} color="#fff" />
                    </View>
                    <Text style={[globalStyles.text, {color: '#fff'}]}>
                      9.8k
                    </Text>
                  </View>
                  <Text
                    style={[
                      globalStyles.text,
                      {fontSize: 20, paddingTop: 10, color: '#fff'},
                    ]}>
                    Total Customers
                  </Text>
                </View>
                <View style={styles.card1}>
                  <View>
                    <Ionicons name="pie-chart" size={25} color="#fff" />
                    <Text style={[globalStyles.text, {color: '#fff'}]}>
                      2345
                    </Text>
                  </View>
                  <Text
                    style={[globalStyles.text, {fontSize: 20, color: '#fff'}]}>
                    Total Suppliers
                  </Text>
                </View>
              </InnerCard>
            </View>
          </Card>
          <Card>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                marginBottom: 10,
              }}>
              <Text style={{color: '#000', fontSize: 20}}>
                Inventory Summary
              </Text>
              <Entypo name="dots-three-vertical" size={20} color="#000" />
            </View>
            <View>
              <InnerCard>
                <View style={styles.card}>
                  <View>
                    <View style={styles.iconWrapper}>
                      <Entypo name="price-tag" size={25} color="#fff" />
                    </View>
                    <Text style={[globalStyles.text, {color: '#fff'}]}>
                      9.8k
                    </Text>
                  </View>
                  <Text
                    style={[
                      globalStyles.text,
                      {fontSize: 20, paddingTop: 10, color: '#fff'},
                    ]}>
                    Items in Hand
                  </Text>
                </View>
                <View style={styles.card1}>
                  <View>
                    <Ionicons name="pie-chart" size={25} color="#fff" />
                    <Text style={[globalStyles.text, {color: '#fff'}]}>
                      2345
                    </Text>
                  </View>
                  <Text
                    style={[globalStyles.text, {fontSize: 20, color: '#fff'}]}>
                    Will be received
                  </Text>
                </View>
              </InnerCard>
            </View>
          </Card>
          <Card>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                marginBottom: 10,
              }}>
              <Text style={{color: '#000', fontSize: 20}}>Product Details</Text>
              <Entypo name="dots-three-vertical" size={20} color="#000" />
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                }}>
                <Text style={[globalStyles.text, {padding: 10}]}>
                  Low Stock Items
                </Text>
                <Text style={[globalStyles.text, {padding: 10}]}>04</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                }}>
                <Text style={[globalStyles.text, {padding: 10}]}>
                  Items Group
                </Text>
                <Text style={[globalStyles.text, {padding: 10}]}>52</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                }}>
                <Text style={[globalStyles.text, {padding: 10}]}>
                  No of Items
                </Text>
                <Text style={[globalStyles.text, {padding: 10}]}>104</Text>
              </View>
            </View>
          </Card>
          <Card>
          <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                marginBottom: 10,
              }}>
              <Text style={{color: '#000', fontSize: 20}}>
                Weekly Report
              </Text>
              <Entypo name="dots-three-vertical" size={20} color="#000" />
            </View>
            <View style={{padding:10}}>
            <LineChart
              data={data}
              width={screenWidth/1.2}
              height={220}
              chartConfig={chartConfig}
              />
              </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#469FD1',
    padding: 15,
    borderRadius: 10,
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').height / 6,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  card1: {
    backgroundColor: '#0386D0',
    padding: 15,
    borderRadius: 10,
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').height / 6,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 40,
    color: '#469FD1',
    height: 45,
  },
  img: {
    height: Dimensions.get('window').height / 2.5,
    width: Dimensions.get('window').width,
  },
  scroll: {},
  errors: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
    paddingLeft: 10,
  },
  iconWrapper: {},
});
