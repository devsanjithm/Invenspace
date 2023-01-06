import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
export function AppHeaders(props) {
  return (
    <>
      <SafeAreaView style={{backgroundColor: '#fff'}}>
        <View style={{flexDirection: 'row',backgroundColor:props.color}}>
          <TouchableOpacity
            style={styles.headerLeftIcon}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{props.title} </Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: '#000',
    fontSize: 18,
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
