import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text } from 'react-native';
import SingleList from '../components/SingleList';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
const AUTHOR = require('../asset/author.json');

function AuthorSearchActivity({ navigation }) {
    const [query, updateQuery] = useState('');
    // GETTING SINGLE AUTHOR
    // for (singleAuthor in AUTHOR) {
    //     if (AUTHOR.hasOwnProperty(singleAuthor)) {
    //         const element = AUTHOR[singleAuthor];
    //         // console.log(element);
    //     }
    // }
    // console.log(CATEGORY);
    const onSearch = (currentTarget) => {
        // updateQuery(currentTarget);
        // if (isNaN(currentTarget)) {
        //     currentTarget = currentTarget.toUpperCase();
        //     filteredSongNumber = [];
        //     for (let index = 0; index < SONGLIST.length; index++) {
        //         if ((SONGLIST[index].title).toUpperCase().includes(currentTarget)) {
        //             filteredSongNumber.push(SONGLIST[index].Id);
        //         }
        //     }
        //     filteredSongList = [];
        //     for (x of filteredSongNumber) {
        //         filteredSongList.push(SONGLIST.find(cid => cid.Id === x));
        //     }
        //     filterSongData(filteredSongList);
        // } else {
        //     filteredSongNumber = [];
        //     for (let index = 0; index < SONGLIST.length; index++) {
        //         if (SONGLIST[index].Id.includes(currentTarget)) {
        //             filteredSongNumber.push(SONGLIST[index].Id);
        //         }
        //     }
        //     filteredSongList = [];
        //     for (x of filteredSongNumber) {
        //         filteredSongList.push(SONGLIST.find(cid => cid.Id === x));
        //     }
        //     filterSongData(filteredSongList);
        // }
    }
    const displaySelectedAuthor = authorId => {
        navigation.navigate('AuthorSongList', {authorId: authorId});
    }
    const prevScreen = () => {
        navigation.goBack();
    }
    const sideNav = () => {
        navigation.openDrawer();
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header renderHeader={123} title={'Author Search'} backClicked={prevScreen} openSideNav={sideNav} />
            <SearchBar placeholder={'Search Author'} valueProps={query} onChangeTextProps={onSearch} />
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item.Id}
                data={AUTHOR}
                renderItem={autList => <SingleList selectedCategory={displaySelectedAuthor} Id={autList.item.Id} ListName={autList.item.author} />} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default AuthorSearchActivity;