import React, { useState } from 'react';
import {
    StyleSheet,
    FlatList,
    SafeAreaView
} from 'react-native';
import SongListItem from '../components/SongListItem';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

const SONGLIST = require('../asset/hymndata.json');

function SearchActivity({ navigation }) {
    const [query, updateQuery] = useState('');
    const [SongData, filterSongData] = useState(SONGLIST);

    const onSearch = (currentTarget) => {
        updateQuery(currentTarget);
        if (isNaN(currentTarget)) {
            currentTarget = currentTarget.toUpperCase();
            filteredSongNumber = [];
            for (let index = 0; index < SONGLIST.length; index++) {
                if ((SONGLIST[index].title).toUpperCase().includes(currentTarget)) {
                    filteredSongNumber.push(SONGLIST[index].Id);
                }
            }
            filteredSongList = [];
            for (x of filteredSongNumber) {
                filteredSongList.push(SONGLIST.find(cid => cid.Id === x));
            }
            filterSongData(filteredSongList);
        } else {
            filteredSongNumber = [];
            for (let index = 0; index < SONGLIST.length; index++) {
                if (SONGLIST[index].Id.includes(currentTarget)) {
                    filteredSongNumber.push(SONGLIST[index].Id);
                }
            }
            filteredSongList = [];
            for (x of filteredSongNumber) {
                filteredSongList.push(SONGLIST.find(cid => cid.Id === x));
            }
            filterSongData(filteredSongList);
        }
    }
    const displaySelectedSong = songId => {
        navigation.navigate('Lyrics', { SongToBeDisplayed: songId });
    }
    const prevScreen = () => {
        navigation.goBack();
    }
    const sideNav = () => {
        navigation.openDrawer();
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header renderHeader={123} title={'Search Song'} backClicked={prevScreen} openSideNav={sideNav} />
            <SearchBar placeholder={'Search Song'} valueProps={query} onChangeTextProps={onSearch} />
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item.Id}
                data={SongData}
                renderItem={songList => <SongListItem selectedSong={displaySelectedSong} Id={songList.item.Id} Title={songList.item.title} />} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default SearchActivity;