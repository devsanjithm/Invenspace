import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    outerContianer: {
      flex:1,
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:'rgba(0,0,0,0.5)',
      paddingBottom:'10%'
    },
    container: {
      minWidth: width / 1.2,
      minHeight: height / 4,
      maxWidth:width/1.2,
      maxHeight:height/1.5,
      backgroundColor: 'white',
      borderRadius: 10,
      margin:20,
    },
    closeButton: {
      position: 'absolute',
      top: 16,
      right: 16,
    },
    closeButtonText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  });