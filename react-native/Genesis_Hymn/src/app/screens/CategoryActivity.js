import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text } from 'react-native';
import SingleList from '../components/SingleList';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
const CATEGORY = require('../asset/category.json');

function CategoryActivity({ navigation }) {
    const [query, updateQuery] = useState('');
    const CategoryArray = [];
    for (singleCategory in CATEGORY) {
        if (CATEGORY.hasOwnProperty(singleCategory)) {
            const element = CATEGORY[singleCategory];
            // console.log(element);
        }
    }
    // console.log(CATEGORY);
    const onSearch = (currentTarget) => {
        // updateQuery(currentTarget);
        // if (isNaN(currentTarget)) {
        //     currentTarget = currentTarget.toUpperCase();
        //     filteredSongNumber = [];
        //     for (let index = 0; index < CATEGORYLIST.length; index++) {
        //         if ((CATEGORYLIST[index].title).toUpperCase().includes(currentTarget)) {
        //             filteredSongNumber.push(CATEGORYLIST[index].Id);
        //         }
        //     }
        //     filteredSongList = [];
        //     for (x of filteredSongNumber) {
        //         filteredSongList.push(CATEGORYLIST.find(cid => cid.Id === x));
        //     }
        //     filterSongData(filteredSongList);
        // } else {
        //     filteredSongNumber = [];
        //     for (let index = 0; index < CATEGORYLIST.length; index++) {
        //         if (CATEGORYLIST[index].Id.includes(currentTarget)) {
        //             filteredSongNumber.push(CATEGORYLIST[index].Id);
        //         }
        //     }
        //     filteredSongList = [];
        //     for (x of filteredSongNumber) {
        //         filteredSongList.push(CATEGORYLIST.find(cid => cid.Id === x));
        //     }
        //     filterSongData(filteredSongList);
        // }
    }
    const displaySelectedCategory = catId => {
        // console.log(catId);
        navigation.navigate('CategorySongList', {categoryId: catId});
    }
    const prevScreen = () => {
        navigation.goBack();
    }
    const sideNav = () => {
        navigation.openDrawer();
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header renderHeader={123} title={'Category'} backClicked={prevScreen} openSideNav={sideNav} />
            <SearchBar placeholder={'Search Category'} valueProps={query} onChangeTextProps={onSearch} />
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item.key}
                data={CATEGORY}
                renderItem={catList => <SingleList selectedCategory={displaySelectedCategory} Id={catList.item.key} ListName={catList.item.category} />} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default CategoryActivity;