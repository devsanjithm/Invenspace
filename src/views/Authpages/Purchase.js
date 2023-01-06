import React from 'react';
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
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import AppStatusBar from '../../components/Appstatusbar';

export default function Purchase({navigation}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        // justifyContent: 'flex-end',
      }}>
      <AppStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <ScrollView>
        <View style={styles.top}>
          <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>
            Purchase
          </Text>
          <View>
            <Button
              mode="contained"
              color="blue"
              onPress={() => {
                navigation.push('AddPurchase');
              }}>
              Add purchase
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {},
  top: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    margin: 10,
  },
});
