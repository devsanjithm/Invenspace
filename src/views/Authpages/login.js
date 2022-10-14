import React, { useState } from 'react';
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
import {Checkbox, TextInput, Button} from 'react-native-paper';
import Img2 from '../../assets/bottomimage.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppStatusBar from '../../componenets/Appstatusbar';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Login() {
  const [checked, setChecked] = React.useState(false);
const [securetext,setsecuretext] = useState(false);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent:"flex-end"
      }}>
      <AppStatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <KeyboardAvoidingView>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 30,
                color: 'black',
                marginTop: '20%',
              }}>
              Login
            </Text>
          </View>

          <View>
            <View
              style={{
                flex: 1,
                paddingHorizontal: 20,
                justifyContent: 'center',
              }}>
              <TextInput
                style={styles.input}
                label="Email"
                mode="outlined"
                activeOutlineColor="#469FD1"
                autoCapitalize='none'
                left={
                    <TextInput.Icon
                    style={{
                        paddingTop:10,
                    }}
                    name="email" color="#676666"/>
                }
                //   value={text}
                //   onChangeText={text => setText(text)}
              />
              <TextInput
                style={styles.input1}
                label="Password"
                mode="outlined"
                secureTextEntry={!securetext}
                activeOutlineColor="#469FD1"
                left={
                    <TextInput.Icon
                    style={{
                        paddingTop:10,
                    }}
                    name="lock" color="#676666"/>
                }
                right={
                  <TextInput.Icon
                  style={{
                    paddingTop:10,
                  }}
                  icon={securetext?"eye":"eye-off"} 
                  onPress={()=>{
                    setsecuretext(!securetext)
                  }}
                  />
                }
                //   value={text}
                //   onChangeText={text => setText(text)}
              />
            <View style={{flexDirection: 'row',marginVertical:20}}>
              <Checkbox
                color="#469FD1"
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <View style={{
                flexDirection:"row",
                justifyContent:"space-between",
                width:"85%"
              }}>
              <Text
              onPress={()=>{
                setChecked(!checked);
              }}
              style={{color: '#6B5E5E',marginTop:8}}>Remember password</Text>
              <Text style={{color: '#469FD1',marginTop:8,fontSize:16}}>Forget password</Text>
              </View>
            </View>
            </View>
          </View>

          <Button
          onPress={()=>{
            console.log("clicked");
          }}
          style={{justifyContent:"center",marginHorizontal:40,marginTop:20,padding:10}}
          color={"#469FD1"}
          mode="contained">
            <Text style={{
                color:"#fff",
                fontWeight:"700",
            }}>
            Login
            </Text>
          </Button>

          <View
            style={{
              width: '100%',
              height: '90%',
            }}>
            <ImageBackground source={Img2} style={styles.img}>
              <View style={styles.container}></View>
            </ImageBackground>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {},
  input: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 90,
    color: '#469FD1',
    height: 45,
  },
  input1: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    color: '#469FD1',
    height: 45,
  },
  img: {
    height: Dimensions.get('window').height / 2.5,
    width: Dimensions.get('window').width,
  },
  scroll: {},
});
