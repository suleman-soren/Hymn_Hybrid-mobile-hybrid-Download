import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

import TrackPlayer, {useTrackPlayerProgress} from 'react-native-track-player';

export default function SliderComp() {
  const {position, bufferedPosition, duration} = useTrackPlayerProgress();
  const formatTime = (secs) => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);
    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  };

  const handleChange = (val) => {
    TrackPlayer.seekTo(val);
  };


  //components
  return (
    <View style={styles.container}>
      <Slider
        style={{height: 40}}
        minimumValue={0}
        value={position}
        maximumValue={duration}
        minimumTrackTintColor="#EAE434"
        onSlidingComplete={handleChange}
        maximumTrackTintColor="#A9A5A5"
        thumbTintColor="#EAE434"
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timers}>{formatTime(position)}</Text>
        <Text style={styles.timers} >{formatTime(duration)}</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    justifyContent: 'space-around',
    width: '90%',
    // position: 'absolute',
    // bottom: '15%',
  },
  timers: {
    color: '#000',
    fontSize: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // position: 'absolute',
    // bottom: '10%',
    // left: '5%',
  },
});
