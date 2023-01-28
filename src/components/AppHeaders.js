import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
export function AppHeaders(props) {

  const navigation = useNavigation();

  function handleBack(){
    if(props.main){
      navigation.goBack()
    }else{
      navigation.goBack()
    }
  }

  return (
    <>
      <SafeAreaView style={{backgroundColor: '#fff'}}>
        <View style={{flexDirection: 'row',backgroundColor:props.color}}>
          <TouchableOpacity
            style={styles.headerLeftIcon}
            onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{props.title} </Text>
          <View style={{padding:20}}>
          {props.children}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: '#000',
    fontSize: 20,
    flex: 1,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    // textAlign: 'center',
    // paddingLeft: '20%',
  },
  headerLeftIcon: {
    padding: 20,
  },
});
