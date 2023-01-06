import React, {useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo  from 'react-native-vector-icons/Entypo';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

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
} from 'react-native';
import AppStatusBar from '../components/Appstatusbar';



export default function Dashboard({navigation}) {


  async function handleChange(values) {
    
  }
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
                    flexDirection: "row",
                     justifyContent: "flex-start"
                }}>
                     
                <Text
                  style={{
                    fontSize: 30,
                    color: 'black',
                    marginTop: '5%',
                    // marginLeft:'10%',
                    
                    
                  }}>
                 <Entypo name='menu' color={'black'} size={30} />
                  Dashboard
                  
                  </Text>
                  <Fontisto 
                  style={{
                    
                    marginTop: '5%',
                    marginLeft:'38%',
                    
                    
                  }}
                  
                  name='bell' color={'black'} size={30} />
              
              </View>
              <Card style={styles.card} >
            
   
    <Card.Content>
    <Title>Sales overview</Title>
        <Card style={styles.card1} >
            <Card.Content>
              <Title>Card title</Title>
              <Paragraph>Card cont</Paragraph>
            </Card.Content>
        </Card>
        <Card style={styles.card1} >
            <Card.Content>
              <Title>Card title</Title>
              <Paragraph>Card content</Paragraph>
            </Card.Content>
        </Card>

    </Card.Content>
    
    
  </Card>
              

              
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
     
  );
}
const styles = StyleSheet.create({
  card: {
    marginTop:10,
    marginHorizontal:10,
    borderRadius:10,
    borderEndWidth:5,
    backgroundColor:'white',
    flexDirection:'row',
    flexWrap:'wrap'
  },
  card1: {
    marginTop:10,
    marginHorizontal:10,
    borderRadius:10,
    borderEndWidth:5,
    backgroundColor:'#87CEEB',
    width:'40%',
    
    
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
