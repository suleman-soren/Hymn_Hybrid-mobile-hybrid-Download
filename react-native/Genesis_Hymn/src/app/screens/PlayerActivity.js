import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import TrackPlayer, {
  Capability,
  useTrackPlayerEvents,
  usePlaybackState,
  TrackPlayerEvents,
  STATE_PLAYING,
  Event,
} from 'react-native-track-player';
import Header from '../components/Header';
import songs from '../asset/data';
import Controller from './Controller';
import SliderComp from './SliderComp';

const {width, height} = Dimensions.get('window');

// const events = [
//   TrackPlayerEvents.PLAYBACK_STATE,
//   TrackPlayerEvents.PLAYBACK_ERROR
// ];

export default function PlayerActivity({navigation}) {
  
  const scrollX = useRef(new Animated.Value(0)).current;
  const slider = useRef(null);
  const isPlayerReady = useRef(false);
  const index = useRef(0);
  const [songIndex, setSongIndex] = useState(0);
  const isItFromUser = useRef(true);
  // for tranlating the album art
  const position = useRef(Animated.divide(scrollX, width)).current;
  const playbackState = usePlaybackState();

  useEffect(() => {
    isPlayerReady.current = false;
    scrollX.addListener(({value}) => {
      const val = Math.round(value / width);
      setSongIndex(val);
    });

    TrackPlayer.addEventListener('playback-track-changed', async (data) => {
      if (isPlayerReady.current && isItFromUser.current) {
        const trackId = (await TrackPlayer.getCurrentTrack()) - 1; //get the current id
        console.log('track id', trackId, 'index', index.current);
        if (trackId !== index.current) {
          setSongIndex(trackId);
          isItFromUser.current = false;
          if (trackId > index.current) {
            goNext();
          } else {
            goPrv();
          }
          setTimeout(() => {
            isItFromUser.current = true;
          }, 200);
        }
      }
    });

    TrackPlayer.setupPlayer().then(async () => {
      // The player is ready to be used
      console.log('Player ready');
      // add the array of songs in the playlist
      await TrackPlayer.reset();
      await TrackPlayer.add(songs);
      // let tracks = await TrackPlayer.getQueue();
      TrackPlayer.play();
      isPlayerReady.current = true;

      await TrackPlayer.updateOptions({
        stopWithApp: false,
        alwaysPauseOnInterruption: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });

      //monitor intterupt when other apps start playing music
      TrackPlayer.addEventListener(Event.RemoteDuck, (e) => {
        // console.log(e);
        if (e.paused) {
          // if pause true we need to pause the music
          TrackPlayer.pause();
        } else {
          TrackPlayer.play();
        }
      });
    });

    return () => {
      scrollX.removeAllListeners();
      TrackPlayer.destroy();
    };
  }, []);

  // change the song when index changes
  useEffect(() => {
    if (isPlayerReady.current && isItFromUser.current) {
      TrackPlayer.skip(songs[songIndex].id)
        .then((_) => {
          console.log('changed track', songs[songIndex].id);
        })
        .catch((e) => console.log('error in changing track ', e));
    }
    index.current = songIndex;
  }, [songIndex]);

  //   const exitPlayer = async () => {
  //     try {
  //       await TrackPlayer.stop();
  //     } catch (error) {
  //       console.error('exitPlayer', error);
  //     }
  //   };

  const goNext = async () => {
    slider.current.scrollToOffset({
      offset: (index.current + 1) * width,
    });
    await TrackPlayer.play();
  };
  const goPrv = async () => {
    slider.current.scrollToOffset({
      offset: (index.current - 1) * width,
    });
    await TrackPlayer.play();
  };

  const renderItem = ({index, item}) => {
    return (
      <Animated.View
        style={{
          alignItems: 'center',
          width: width,
          transform: [
            {
              translateX: Animated.multiply(
                Animated.add(position, -index),
                -100,
              ),
            },
          ],
        }}>
        <Animated.Image
          source={item.artwork}
          style={{width: 200, height: 200, borderRadius: 5}}
        />
      </Animated.View>
    );
  };

  const prevScreen = () => {
    navigation.goBack();
  };
  const sideNav = () => {
    navigation.openDrawer();
  };

  const favSongs = () =>{
    console.log('favSongs')
    navigation.navigate('FavouriteActivity')
  }

  const allSongs = () =>{
    console.log('allSongs')
    // navigation.navigate('FavouriteActivity')
  }


  return (
    <SafeAreaView style={styles.container}>
      <Header
        renderHeader={123}
        title={'Music'}
        backClicked={prevScreen}
        openSideNav={sideNav}
      />
      <View style={styles.favlist}>
        <TouchableOpacity onPress={favSongs}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../asset/icons/heart.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={allSongs}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../asset/icons/playlist.png')}
          />
        </TouchableOpacity>
      </View>
      <SafeAreaView style={{height: 300}}>
        <Animated.FlatList
          ref={slider}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          data={songs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
        />
      </SafeAreaView>
      <View style={styles.titleartist}>
        <Text style={styles.title}>{songs[songIndex].title}</Text>
        <Text style={styles.artist}>{songs[songIndex].artist}</Text>
      </View>

      <SliderComp />

      <Controller data='player'/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
    borderWidth: 1,
    borderColor: '#000',
  },
  titleartist: {
    justifyContent: 'space-around',
    width: '100%',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    textTransform: 'capitalize',
    color: '#000',
  },
  artist: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
    textTransform: 'capitalize',
  },
  favlist: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    // borderWidth:1
  },
});
