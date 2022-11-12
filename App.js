import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your appssdddd!</Text>
      <Text>TESSTssssffffsds</Text>
      <Ionicons name="heart-outline" ></Ionicons>
      <StatusBar style="auto" />
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
