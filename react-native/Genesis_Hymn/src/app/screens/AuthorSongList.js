import React, { useState } from 'react';
import {
    StyleSheet,
    FlatList,
    SafeAreaView
} from 'react-native';
import SongListItem from '../components/SongListItem';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

const AUTHOR = require('../asset/author.json');
const HYMDATA = require('../asset/hymndata.json');

function AuthorSongList({ route, navigation }) {
    const [query, updateQuery] = useState('');
    const [SongData, filterSongData] = useState(HYMDATA);
    // const [authorName, setauthorName] = useState('');
    var authorName;
    const { authorId } = route.params;
    // GETTING SINGLE AUTHOR
    for (singleAuthor in AUTHOR) {
        if (AUTHOR.hasOwnProperty(singleAuthor)) {
            const element = AUTHOR[singleAuthor];
            if (element.Id === authorId) {
                console.log(element.Id);
                authorName = element.author;
            }
        }
    }
    console.log(route.params)
    filteredSongList = [];
    filteredSongNumber = AUTHOR[authorId].songs;

    const addSongToList = (songNum) => {
        for (singleSong in HYMDATA) {
            if ((HYMDATA[singleSong].Id) === songNum) {
                filteredSongList.push(HYMDATA[singleSong]);
            }
        }
    }
    filteredSongNumber.forEach((item) => {
        addSongToList(item);
    });
     
    const onSearch = (currentTarget) => {
        updateQuery(currentTarget);
        if (isNaN(currentTarget)) {
            currentTarget = currentTarget.toUpperCase();
            filteredSongNumber = [];
            for (let index = 0; index < AUTHOR.length; index++) {
                if ((AUTHOR[index].title).toUpperCase().includes(currentTarget)) {
                    filteredSongNumber.push(AUTHOR[index].Id);
                }
            }
            filteredSongList = [];
            for (x of filteredSongNumber) {
                filteredSongList.push(AUTHOR.find(cid => cid.Id === x));
            }
            filterSongData(filteredSongList);
        } else {
            filteredSongNumber = [];
            for (let index = 0; index < AUTHOR.length; index++) {
                if (AUTHOR[index].Id.includes(currentTarget)) {
                    filteredSongNumber.push(AUTHOR[index].Id);
                }
            }
            filteredSongList = [];
            for (x of filteredSongNumber) {
                filteredSongList.push(AUTHOR.find(cid => cid.Id === x));
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
            <Header renderHeader={123} title={authorName} backClicked={prevScreen} openSideNav={sideNav} />
            <SearchBar placeholder={'Search Song'} valueProps={query} onChangeTextProps={onSearch} />
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item.Id}
                data={filteredSongList}
                renderItem={songList => <SongListItem selectedSong={displaySelectedSong} Id={songList.item.Id} Title={songList.item.title} />} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default AuthorSongList;