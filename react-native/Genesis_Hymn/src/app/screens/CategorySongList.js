import React, { useState } from 'react';
import {
    StyleSheet,
    FlatList,
    SafeAreaView
} from 'react-native';
import SongListItem from '../components/SongListItem';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

const CATEGORYLIST = require('../asset/category.json');
const HYMDATA = require('../asset/hymndata.json');

function CategorySongList({ route, navigation }) {
    const [query, updateQuery] = useState('');
    const [categoryData, filtercategoryData] = useState(CATEGORYLIST);
    var categoryName;
    const { categoryId } = route.params;
    // GETTING SINGLE CATEGORY
    for (singleCategory in CATEGORYLIST) {
        if (CATEGORYLIST.hasOwnProperty(singleCategory)) {
            const element = CATEGORYLIST[singleCategory];
            if (element.key === categoryId) {
                categoryName = element.category;
            }
        }
    }
    filteredSongList = [];
    filteredSongNumber = CATEGORYLIST[categoryId].songs;

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
            // for (let index = 0; index < CATEGORYLIST.length; index++) {
            //     if ((CATEGORYLIST[index].title).toUpperCase().includes(currentTarget)) {
            //         filteredSongNumber.push(CATEGORYLIST[index].Id);
            //     }
            // }
            // filteredSongList = [];
            // for (x of filteredSongNumber) {
            //     filteredSongList.push(CATEGORYLIST.find(cid => cid.Id === x));
            // }
            // filterSongData(filteredSongList);
        } else {
            filteredSongNumber = [];
            // for (let index = 0; index < CATEGORYLIST.length; index++) {
            //     if (CATEGORYLIST[index].Id.includes(currentTarget)) {
            //         filteredSongNumber.push(CATEGORYLIST[index].Id);
            //     }
            // }
            // filteredSongList = [];
            // for (x of filteredSongNumber) {
            //     filteredSongList.push(CATEGORYLIST.find(cid => cid.Id === x));
            // }
            // filterSongData(filteredSongList);
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
            <Header renderHeader={123} title={categoryName} backClicked={prevScreen} openSideNav={sideNav} />
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

export default CategorySongList;