import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UserDataScreen from './Screen/UserData';

export default function App() {
  return (
    <View style={styles.container}>
      <UserDataScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
});
