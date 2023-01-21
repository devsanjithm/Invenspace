import React from 'react';
import {Text, View} from 'react-native';

export default function Card({children}) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        paddingBottom:20,
        marginVertical:10
      }}>
      {children}
    </View>
  );
}

export function InnerCard({children}) {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around',margin:5}}>
     {children}
    </View>
  );
}
