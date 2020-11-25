import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Slider from '@react-native-community/slider';

function SettingActivity({navigation}) {
    const [size, setsize] = useState(16);
    const [newlyCreatedActivity, setnewlyCreatedActivity] = useState(true);

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('font_size', '' + value)
        } catch (e) {
            // saving error
            console.log('error =>' + e);
        }
    }
    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('font_size')
            if (value !== null) {
                setsize(parseInt(value));
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        if (newlyCreatedActivity) {
            setnewlyCreatedActivity(false);
            getData()
        }
    });

    const prevScreen = () => {
        navigation.goBack();
    }
    const sideNav = () => {
        console.log('side nav');
        navigation.openDrawer();
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header renderHeader={123} title={'Setting'} backClicked={prevScreen} openSideNav={sideNav} />
            <View style={styles.section}>
                <View>
                    <Text style={styles.textOption}>
                        Song Font Size
                </Text>
                </View>
                <View>
                    <Slider
                        style={{ width: '100%', height: 40, marginTop: 8 }}
                        minimumValue={8}
                        maximumValue={32}
                        step={2}
                        value={size}
                        minimumTrackTintColor="#E1BD7B"
                        maximumTrackTintColor="#cccccc"
                        onValueChange={value => {
                            console.log(value)
                            setsize(value)
                        }}
                        onSlidingComplete={fontsize => {
                            console.log(fontsize);
                            storeData(fontsize);
                        }}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: size }} >
                        Your font size is {size}
                </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textOption: {
        fontSize: 20
    },
    textOptionClick: {
        fontSize: 20,
        opacity: 0.4
    },
    section: {
        borderBottomColor: '#E1BD7B',
        borderBottomWidth: 1,
        paddingVertical: 8,
        marginTop: 8,
        marginHorizontal: 16
    },
    arrangeHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default SettingActivity;