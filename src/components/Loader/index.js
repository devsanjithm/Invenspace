import {View, Text, Modal} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {ActivityIndicator} from 'react-native-paper';

const Loader = () => {
  return (
    <Modal transparent>
      <View style={styles.container}>
        <ActivityIndicator size={45} color={'#386BF6'} />
      </View>
    </Modal>
  );
};

export default Loader;
