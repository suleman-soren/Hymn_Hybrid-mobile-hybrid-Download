import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import TrackPlayer, {
    Capability,
    useTrackPlayerEvents,
    usePlaybackState,
    TrackPlayerEvents,
    STATE_PLAYING,
    Event,
  } from 'react-native-track-player';
import Header from '../components/Header';
import SingleList from '../components/SingleList';
import SearchBar from '../components/SearchBar';
import Controller from './Controller';
import SliderComp from './SliderComp';
const FAVOURITE = require('../asset/favourite.json');

function FavouriteActivity({ navigation }) {
    const [query, updateQuery] = useState('');
    const onSearch = (currentTarget) => {
        updateQuery(currentTarget);
        if (isNaN(currentTarget)) {
            currentTarget = currentTarget.toUpperCase();
            filteredSongNumber = [];
            for (let index = 0; index < CATEGORYLIST.length; index++) {
                if ((CATEGORYLIST[index].title).toUpperCase().includes(currentTarget)) {
                    filteredSongNumber.push(CATEGORYLIST[index].Id);
                }
            }
            filteredSongList = [];
            for (x of filteredSongNumber) {
                filteredSongList.push(CATEGORYLIST.find(cid => cid.Id === x));
            }
            filterSongData(filteredSongList);
        } else {
            filteredSongNumber = [];
            for (let index = 0; index < CATEGORYLIST.length; index++) {
                if (CATEGORYLIST[index].Id.includes(currentTarget)) {
                    filteredSongNumber.push(CATEGORYLIST[index].Id);
                }
            }
            filteredSongList = [];
            for (x of filteredSongNumber) {
                filteredSongList.push(CATEGORYLIST.find(cid => cid.Id === x));
            }
            filterSongData(filteredSongList);
        }
    }
    const displaySelectedCategory = favId => {
        console.log(favId);
    }
    const prevScreen = () => {
        navigation.goBack();
    }
    const sideNav = () => {
        navigation.openDrawer();
    }


    return (
        <SafeAreaView style={styles.container}>
            <Header renderHeader={123} title={'Favourite'} backClicked={prevScreen} openSideNav={sideNav} />
            <SearchBar placeholder={'Search Favourite'} valueProps={query} onChangeTextProps={onSearch} />
            <FlatList
                keyExtractor={(item, index) => item.Id}
                data={FAVOURITE}
                renderItem={favList => <SingleList selectedCategory={displaySelectedCategory} Id={favList.item.Id} ListName={favList.item.fav} />} />
                      <SliderComp />
                      <Controller/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default FavouriteActivity;