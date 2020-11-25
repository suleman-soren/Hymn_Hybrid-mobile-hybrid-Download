import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    Platform,
    ScrollView
} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import Header from '../components/Header';

var isiPhone = Platform.OS === 'ios';
var isAndroid = Platform.OS === 'android';
var RNFS = require('react-native-fs');

function AuthorActivity({ navigation }) {
    const [segmentSelected, setSegmentSelected] = useState(0);
    var authorPath = '';
    const [authorText, setAuthorText] = useState('');
    var backPath = '';
    const [backgroundText, setBackgroundText] = useState('');

    if (isiPhone) {
        authorPath = RNFS.MainBundlePath + '/joachim_neander.txt';
        backPath = RNFS.MainBundlePath + '/1.txt';
        RNFS.readFile(authorPath).then((contents) => {
            var contentString = contents.toString();
            setAuthorText(contentString);
            console.log(contentString);
        });
        RNFS.readFile(backPath).then((contents) => {
            var contentString = contents.toString();
            setBackgroundText(contentString);
            console.log(contentString);
        });
    } else if (isAndroid) {
        authorPath = 'joachim_neander.txt';
        backPath = '1.txt';
        RNFS.readFileAssets(authorPath, 'utf8').then((content) => {
            setAuthorText(content);
        });
        RNFS.readFileAssets(backPath, 'utf8').then((content) => {
            setBackgroundText(content);
        });
    }

    const prevScreen = () => {
        navigation.goBack();
    }
    const sideNav = () => {
        navigation.openDrawer();
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header renderHeader={123} title={'Author Story'} backClicked={prevScreen} openSideNav={sideNav} />
            <SegmentedControl
                values={['Author', 'Background']}
                selectedIndex={segmentSelected}
                backgroundColor='#000000'
                tintColor='#E1BD7B'
                onChange={() => {
                    console.log('=>' + segmentSelected);
                    if (segmentSelected === 0) {
                        setSegmentSelected(1);
                    } else {
                        setSegmentSelected(0);
                    }
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>

                {(segmentSelected === 0) ? (
                    <Text style={styles.aboutBackground}>
                        {authorText}
                    </Text>
                ) :
                    <Text style={styles.aboutBackground}>
                        {backgroundText}
                    </Text>
                }

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16
    },
    aboutBackground: {
        marginVertical: 16,
        fontSize: 16
    }
})

export default AuthorActivity;