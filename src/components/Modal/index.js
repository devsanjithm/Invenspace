import {Modal, View} from 'react-native';
import React, {FC} from 'react';
import {styles} from './style';
import AppStatusBar from '../Appstatusbar';

const CustomModal = props => {
  return (
    <Modal {...props}>
      <AppStatusBar
        backgroundColor={props.visible ? 'rgba(0,0,0,0.4)' : '#FFF'}
        barStyle={'dark-content'}
      />
      <View style={styles.outerContianer}>
        <View style={styles.container}>{props.children}</View>
      </View>
    </Modal>
  );
};

export default CustomModal;
