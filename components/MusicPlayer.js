
import { SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity,Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Slider from '@react-native-community/slider'

const {width, height} = Dimensions.get('window')

const MusicPlayer = () => {
  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.imageWrapper}>
            <Image source={require('../assets/song-images/BTS_-_Dynamite.png')}  style={styles.imageArt}/>
          </View>

          <View >
            <Text style={styles.title}>Song Title</Text>
            <Text style={styles.author}>Song Author Name</Text>
          </View>

          <View>
            <Slider 
              style={styles.sliderContainer} 
              value={10} 
              minValue={0}
              maxValue={100}
              thumbTintColor="#EEEEFF"
              minimumTrackTintColor="#7CFFC4"
              maximumTrackTintColor="#7CFFC4"
              onSlidingComplete={()=>{}} 
            />
          </View>

          <View style={styles.progressLabelContainer}>
            <Text style={styles.progressLabelText}>0:00</Text>
            <Text style={styles.progressLabelText}>3:55</Text>
          </View>

          <View style={styles.musicControlls}>
            <TouchableOpacity onPress={() => {}} >
              <Ionicons name="play-skip-back-outline" size={35} color="#7CFFC4" style={{marginTop:25}} ></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} >
              <Ionicons name="ios-pause-circle" size={75} color="#7CFFC4" ></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} >
              <Ionicons name="play-skip-forward-outline" size={35} color="#7CFFC4" style={{marginTop:25}} ></Ionicons>
            </TouchableOpacity>
          </View>
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
  imageWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25
  },
  imageArt: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
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
  },
  author: {
    fontSize: 14,
    fontWeight: '200',
    textAlign: 'center',
    color: '#7CFFC4'
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#EEEEFF'
  },
  sliderContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row'
  },
  progressLabelContainer: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#EEEEFF'
  },
  musicControlls: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginTop: 15
  }
});
