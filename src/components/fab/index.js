import * as React from 'react';
import {FAB, Portal, Provider} from 'react-native-paper';

const FloatingButton = () => {
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          color='blue'
          visible
          icon='plus'
          actions={[
            {icon: 'plus', onPress: () => console.log('Pressed add')},
            {
              icon: 'star',
              label: 'Product',
              onPress: () => console.log('Product pressed'),
            },
            {
              icon: 'face-man-profile',
              label: 'Customer',
              onPress: () => console.log('Customer pressed'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
              console.log('high');
            }
          }}
          style={{ position: 'absolute', right: 0, bottom: 0, margin: 16 }}
        />
      </Portal>
    </Provider>
  );
};

export default FloatingButton;
