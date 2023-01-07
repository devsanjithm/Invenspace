import React, {useState, useContext} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import {Avatar, Card, Title, Paragraph, Button} from 'react-native-paper';
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
import { useDispatch } from 'react-redux';
import { getAuthDetails } from './Authpages/authActions';
import { setAuthDetailsSuccess } from './Authpages/authSlice';
import { clearAll } from '../service/localstorage';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
  const {setRoute} = useContext(UserContext);
  const dispatch = useDispatch()
  const navigation = useNavigation()
  async function handleLogout(){
    dispatch(setAuthDetailsSuccess({}))
    setRoute(false);
    clearAll()
  }

  function handleSide(){
    navigation.navigate('SideBarPage')
  }

  async function handleChange(values) {}
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#D3D3D3',
        // justifyContent: 'flex-end',
      }}>
      <AppStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <KeyboardAvoidingView>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: 30,
                color: 'black',
                marginTop: '5%',
                // marginLeft:'10%',
              }}>
                <Pressable
                onPress={handleSide}
                >
              <Entypo name="menu" color={'black'} size={30} />
                </Pressable>
              Dashboard
            </Text>
            <Fontisto
              style={{
                marginTop: '5%',
                marginLeft: '38%',
              }}
              name="bell"
              color={'black'}
              size={30}
            />
          </View>
          <Card style={styles.card}>
            <Card.Content>
              <Title>Sales overview</Title>
              <Card style={styles.card1}>
                <Card.Content>
                  <Title>Card title</Title>
                  <Paragraph>Card cont</Paragraph>
                </Card.Content>
              </Card>
              <Card style={styles.card1}>
                <Card.Content>
                  <Title>Card title</Title>
                  <Paragraph>Card content</Paragraph>
                </Card.Content>
              </Card>
            </Card.Content>
          </Card>
        </ScrollView>
        <Button
        onPress={handleLogout}
        >Logout</Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderEndWidth: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card1: {
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderEndWidth: 5,
    backgroundColor: '#87CEEB',
    width: '40%',
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
});
