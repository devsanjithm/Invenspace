import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#fff',
  },
  outlineInactive: {
    borderColor: '#1E1E1E99',
    borderWidth: 2.14,
  },
  outlineActive: {
    borderColor: '#1976D2',
    borderWidth: 2.14,
  },
  errorText: {
    position: 'absolute',
    bottom: -22,
    color: '#AB2328',
  },
});
