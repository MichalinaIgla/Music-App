import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import {songs} from '../model/data';
import React, {useRef, useEffect, useState, useCallback} from 'react';
import TrackPlayer, {
  Capability,
  Event,
  State,
  // playbackState,
  useProgress,
  useTrackPlayerEvents,
  usePlaybackState,
} from 'react-native-track-player';

const setupPlayer = async () => {
  // var TrackPlayer = react_native_1.NativeModules.TrackPlayerModule;
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add(songs);
  // await TrackPlayer.setupPlayer({}).then(() => {
  //   TrackPlayer.updateOptions({
  //     capabilities: [
  //       TrackPlayer.CAPABILITY_PLAY,
  //       TrackPlayer.CAPABILITY_PAUSE,
  //       TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
  //       TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
  //     ],
  //   });
  // });
};

const togglePlayback = async playbackState => {
  const currenTrack = await TrackPlayer.getCurrentTrack();
  console.log(currenTrack, 'currenTrack');
  if (currenTrack !== null) {
    console.log(playbackState, 'state');
    if (playbackState === State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const {width, height} = Dimensions.get('window');

const MusicPlayer = () => {
  const playbackState = usePlaybackState();
  const [songIndex, setSongIndex] = useState(0);
  const songSlider = useRef(null);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 100,
  };
  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length === 1) {
      setSongIndex(viewableItems[0].index);
      console.log(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);

  const skipSong = to => {
    const number = to === 'next' ? 1 : -1;
    songSlider.current.scrollToIndex({index: songIndex + number});
  };
  useEffect(() => {
    setupPlayer();
  }, []);
  const renderSongs = ({index, item}) => {
    return (
      <View
        style={{
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <View style={styles.imageWrapper}>
          <Image source={item.artwork} style={styles.imageArt} />
        </View>
        <View style={{marginTop: 30}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.author}>{item.artist}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <FlatList
          ref={songSlider}
          data={songs}
          renderItem={renderSongs}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
        />

        <View>
          <Slider
            style={styles.sliderContainer}
            value={10}
            minValue={0}
            maxValue={100}
            thumbTintColor="#EEEEFF"
            minimumTrackTintColor="#7CFFC4"
            maximumTrackTintColor="#7CFFC4"
            onSlidingComplete={() => {}}
          />
        </View>

        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabelText}>0:00</Text>
          <Text style={styles.progressLabelText}>3:55</Text>
        </View>

        <View style={styles.musicControlls}>
          <TouchableOpacity
            onPress={() => {
              skipSong('prev');
            }}
            disabled={songIndex - 1 < 0}>
            <Ionicons
              name="play-skip-back-outline"
              size={35}
              color="#7CFFC4"
              style={{marginTop: 25}}></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              togglePlayback(playbackState);
            }}>
            <Ionicons
              name={
                playbackState === State.Playing
                  ? 'ios-pause'
                  : 'ios-pause-circle'
              }
              size={75}
              color="#7CFFC4"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              skipSong('next');
            }}
            disabled={songIndex + 1 >= songs.length}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="#7CFFC4"
              style={{marginTop: 25}}></Ionicons>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomControls}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="heart-outline" size={30} color="#7CFFC4"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="repeat" size={30} color="#7CFFC4"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="share-outline" size={30} color="#7CFFC4"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons
              name="ellipsis-horizontal"
              size={30}
              color="#7CFFC4"></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
    width: 320,
    height: 320,
    marginVertical: 50,
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
    paddingVertical: 15,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  author: {
    fontSize: 14,
    fontWeight: '200',
    textAlign: 'center',
    color: '#7CFFC4',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#EEEEFF',
  },
  sliderContainer: {
    width: 350,
    height: 40,
    flexDirection: 'row',
  },
  progressLabelContainer: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#EEEEFF',
  },
  musicControlls: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginBottom: 35,
  },
});
