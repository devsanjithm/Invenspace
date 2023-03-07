import {StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';
const {width} = Dimensions.get('window').width

export const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical:40
  },
  btnText: {
    color: '#000',
    fontSize: 18,
  },
  cnclBtn: {
    backgroundColor: '#e4e4e4',
    padding: 15,
    borderRadius: 15,
    paddingHorizontal: 30,
  },
  subBtn: {
    backgroundColor: '#8e99ed',
    padding: 15,
    borderRadius: 15,
    paddingHorizontal: 30,
  },
  inputError: {
    borderColor: '#AB2328',
    borderWidth: 2.14,
  },
  inputBox:{
    marginVertical:15,
    marginHorizontal:10,
    backgroundColor:'#fff',
    borderRadius:10,
  },
 
});
