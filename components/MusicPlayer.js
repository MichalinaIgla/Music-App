/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {songs} from '../model/data';
import React, {useRef, useEffect, useState, useCallback} from 'react';
import TrackPlayer, {
  Capability,
  Event,
  State,
  useProgress,
  useTrackPlayerEvents,
  usePlaybackState,
  RepeatMode,
} from 'react-native-track-player';

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
  });
  await TrackPlayer.add(songs);
};

const togglePlayback = async playbackState => {
  const currenTrack = await TrackPlayer.getCurrentTrack();
  if (currenTrack !== null) {
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
  const songProgress = useProgress();
  const [songIndex, setSongIndex] = useState(0);
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackTitle, setTrackTitle] = useState();
  const [repeatMode, setRepeatMode] = useState('off');

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, artwork, artist} = track;
      setTrackArtist(artist);
      setTrackArtwork(artwork);
      setTrackTitle(title);
    }
  });

  const songSlider = useRef(null);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 100,
  };

  const repeatIcon = () => {
    if (repeatMode === 'off') {
      return 'repeat-off';
    }
    if (repeatMode === 'track') {
      return 'repeat-once';
    }
    if (repeatMode === 'repeat') {
      return 'repeat';
    }
  };

  const changeRepeatMode = () => {
    console.log(repeatMode, 'repeatMode');
    if (repeatMode === 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    }
    if (repeatMode === 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode('repeat');
    }
    if (repeatMode === 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatMode('off');
    }
  };

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length === 1) {
      skipTo(viewableItems[0].index);
      setSongIndex(viewableItems[0].index);
      console.log(
        viewableItems[0].index,
        'viewableItems[0].index)',
        typeof viewableItems[0].index,
      );
    }
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);

  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
  };

  const skipSong = to => {
    const number = to === 'next' ? 1 : -1;
    skipTo(songIndex + number);
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
          <Image source={trackArtwork} style={styles.imageArt} />
        </View>

        <View style={{marginTop: 30}}>
          <Text style={styles.title}>{trackTitle}</Text>
          <Text style={styles.author}>{trackArtist}</Text>
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
            value={songProgress.position}
            minimumValue={0}
            maximumValue={songProgress.duration}
            thumbTintColor="#EEEEFF"
            minimumTrackTintColor="#7CFFC4"
            maximumTrackTintColor="#7CFFC4"
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
          />
        </View>

        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabelText}>
            {new Date(songProgress.position * 1000)
              .toUTCString()
              .substring(26, 20)}
          </Text>
          <Text style={styles.progressLabelText}>
            {new Date((songProgress.duration - songProgress.position) * 1000)
              .toUTCString()
              .substring(26, 20)}
          </Text>
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
              style={{marginTop: 25}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              togglePlayback(playbackState);
            }}>
            <Ionicons
              name={
                playbackState === State.Playing
                  ? 'ios-pause-circle'
                  : 'ios-play-circle'
              }
              size={75}
              color="#7CFFC4"
            />
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
              style={{marginTop: 25}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomControls}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="heart-outline" size={30} color="#3c5c4d" />
          </TouchableOpacity>
          <TouchableOpacity onPress={changeRepeatMode}>
            <MaterialCommunityIcons
              name={`${repeatIcon()}`}
              size={30}
              color={repeatMode !== 'off' ? '#3c5c4d' : '7CFFC4'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="share-outline" size={30} color="#3c5c4d" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="ellipsis-horizontal" size={30} color="#3c5c4d" />
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
    borderTopColor: '#3c5c4d',
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
