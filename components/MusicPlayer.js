import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const {width, height} = Dimensions.get('window')

const MusicPlayer = () => {
  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Text>React Native music Player</Text>
        </View>

         <View style={styles.bottomContainer}>
            <View style={styles.bottomControls}>
              <TouchableOpacity onPress={() => {}} >
                <Ionicons name="heart-outline" size={30} color="#7CFFC4" ></Ionicons>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} >
                <Ionicons name="repeat" size={30} color="#7CFFC4"></Ionicons>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} >
                <Ionicons name="share-outline" size={30} color="#7CFFC4"></Ionicons>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} >
                <Ionicons name="ellipsis-horizontal" size={30} color="#7CFFC4"></Ionicons>
              </TouchableOpacity>
            </View>
         </View>
      </SafeAreaView>
  );
}

export default MusicPlayer;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#160F29',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    borderTopColor: '#7CFFC4',
    borderTopWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15
  },
  bottomControls: {
    flexDirection: 'row', 
    justifyContent:'space-between', 
    width: '80%'
  }
});
