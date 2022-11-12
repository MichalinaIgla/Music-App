
import { StatusBar, StyleSheet, View } from 'react-native';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  return (
     <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <MusicPlayer />
     </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
