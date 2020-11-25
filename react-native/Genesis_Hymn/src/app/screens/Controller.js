import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';


export default function Controller({data}) {
  const playbackState = usePlaybackState();
  const isPlaying = useRef('paused'); //paused play loading
  console.log(data)
  const pageNmae = data;
  if(pageNmae !== undefined){
    mainPlayer()
  }else{
    subPlayer()
  }
  useEffect(() => {
    // console.log('Player State', playbackState);

    //set the player state 
    if (playbackState === 'playing' || playbackState === 3) {
      isPlaying.current = 'playing';
    } else if (playbackState === 'paused' || playbackState === 2) {
      isPlaying.current = 'paused';
    } else {
      isPlaying.current = 'loading'
    }
  }, [playbackState]);

  const returnPlayBtn = () => {
    switch (isPlaying.current) {
      case 'playing':
        return <Icon color="#EAE434" name="pause" size={45} />;
      case 'paused':
        return <Icon color="#EAE434" name="play-arrow" size={45} />;
      default:
        return <ActivityIndicator size={45} color="#EAE434"/>;
    }
  };

  const onPlayPause = () => {
    if (isPlaying.current === 'playing') {
      TrackPlayer.pause();
    } else if (isPlaying.current === 'paused') {
      TrackPlayer.play();
    }
  };

  const goNext = async () => {
    await TrackPlayer.skipToNext();
  };
  const goPrv = async () => {
    await TrackPlayer.skipToPrevious();
  };

  function mainPlayer(){
    console.log('main player')
  }
  function subPlayer(){
    console.log('sub player')
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    // position: 'absolute',
    // bottom:'5%'
  },
});
