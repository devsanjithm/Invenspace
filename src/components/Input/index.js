import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {styles} from './styles';

const Input = props => {
  const [isActive, setActive] = useState(false);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        outlineStyle={isActive ? styles.outlineActive : styles.outlineInactive}
        textColor={'#000'}
        activeOutlineColor={'#1976D2'}
        {...props}
      />
      {props.error && (
        <Text style={styles.errorText}>
          {props?.errormsg || 'Please fill out the field'}
        </Text>
      )}
    </View>
  );
};

export default Input;
