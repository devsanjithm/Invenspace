import React,{useEffect,useCallback} from 'react';
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
  BackHandler
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import AppStatusBar from '../../components/Appstatusbar';

export default function Customer({navigation}) {
  const backAction = useCallback(() => {
    navigation.navigate('Dashboard')
    return true;
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [backAction]);
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
              Customer
            </Text>
            <View>
              <Button mode="contained" color="blue" onPress={()=>{navigation.push('AddCustomer');}}>
                Add Customer
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
    margin:10
  },
});
