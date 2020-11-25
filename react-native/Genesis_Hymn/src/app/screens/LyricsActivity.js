import React, {
    useState,
    useEffect
} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Platform,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LyricsView from '../components/LyricsView';
import SheetView from '../components/SheetView';
import LyricsHeadingView from '../components/LyricsHeadingView';
import Header from '../components/Header';
import PopupAction from '../components/PopupAction';

const SONGLIST = require('../asset/hymndata.json');
var isiPhone = Platform.OS === 'ios';
var isAndroid = Platform.OS === 'android';
var RNFS = require('react-native-fs');

function LyricsActivity({ route, navigation }) {
    const [lyricsSize, setlyricsSize] = useState(0)
    const [modalVisible, setModalVisible] = useState(false);
    const [bottomNavVisible, setBottomNavVisible] = useState(true);
    const [sheetVisible, setSheetVisible] = useState(false);
    const [disclaimerShowing, setdisclaimerShowing] = useState(false);
    const [disclaimerShow, setdisclaimerShow] = useState('');
    const [disclaimer, setdisclaimer] = useState(false);
    const { SongToBeDisplayed } = route.params;
    var SelectedSong = SONGLIST.find(el => el.Id === SongToBeDisplayed);
    var copyright = SelectedSong['copyrights'];
    var title = SelectedSong['title'];
    if (title.length > 18) {
        console.log(title.substr(0, 22));
        title = title.substr(0, 22) + '...';
    }

    storeData = async (value) => {
        try {
            setdisclaimerShow(value)
            await AsyncStorage.setItem('disclaimer', value)
        } catch (e) {
            console.log(e)
        }
    }
    getData = async () => {
        try {
            const ls = await AsyncStorage.getItem('font_size')
            setlyricsSize(parseInt(ls));
            const value = await AsyncStorage.getItem('disclaimer')
            if (value !== null) {
                setdisclaimerShow(value)
            }
        } catch (e) {
            console.log(e)
        }
    }
    const checkDisclaimer = () => {
        if (copyright === "true") {
            setdisclaimer(true);
            // Alert.alert(
            //     "Disclaimer",
            //     "Disclamer message to be displayed from txt file",
            //     [
            //         { text: "Agree", onPress: () => storeData('false') }
            //     ]
            // );
        }
    }
    useEffect(() => {
        // storeData('true')
        getData();
        setTimeout(() => {
            setBottomNavVisible(false);
        }, 6000);
    });
    if (disclaimerShow === '') {

    } else {
        if (disclaimerShow === 'true') {
            if (!disclaimerShowing) {
                setdisclaimerShowing(true)
                checkDisclaimer();
            }
        } else if (disclaimerShow === 'false') {

        }
    }
    // alert for copyright
    const createCopyrightAlert = () => { setModalVisible(true) }
    const addToFavourite = () => { console.log('favourite' + SelectedSong['Id']) }
    // function you can use:
    function getSecondPart(str) {
        return str.split('/')[2];
    }
    // use the function:
    var songNumber = getSecondPart(SelectedSong['Lyrics']);
    var locPath = '/' + songNumber;
    var lyricsPath = locPath;
    var lPath = '';
    const [lyrics, setLyrics] = useState('NO LYRICS FOUND');

    if (isiPhone) {
        lPath = RNFS.MainBundlePath + lyricsPath;
        RNFS.readFile(lPath).then((contents) => {
            var contentString = contents.toString();
            setLyrics(contentString);
        });
    } else if (isAndroid) {
        console.log('isAndroid');
        console.log(songNumber);
        //TODO android lyrics
        RNFS.readFileAssets(songNumber, 'utf8').then((content) => {
            setLyrics(content);
        })
    }
    openSongBackground = () => {
        navigation.navigate('Author');
    }
    const prevScreen = () => {
        navigation.goBack();
    }
    const sideNav = () => {
        console.log('side nav');
        navigation.openDrawer();
    }
    //TODO rectify touch
    return (
        <SafeAreaView style={styles.container} >
            {disclaimer ? (
                <PopupAction clickable={true} heading={'Disclaimer'} body={'To be displayed from text file. Waiting for updation of text file for all disclaimers'} buttonText={'AGREE'} clickedButton={() => {
                    storeData('false');
                    setdisclaimer(false);
                }} />
            ) : null}
            <Header renderHeader={123} backClicked={prevScreen} openSideNav={sideNav} />
            {modalVisible ? (
                <PopupAction clickable={false} heading={'Copyright'} body={'To be displayed from text file. Waiting for updation of tetx file for all copyright'} />
            ) : null}
            <LyricsHeadingView copyrightPressed={createCopyrightAlert} heartPressed={addToFavourite} authorClicked={openSongBackground} Id={SelectedSong['Id']} Title={title} Author={SelectedSong.Author} />
            {sheetVisible ? (
                <ScrollView showsVerticalScrollIndicator={true} onTouchStart={() => {
                    setBottomNavVisible(true);
                    setModalVisible(false);
                }}><SheetView /></ScrollView>
            ) : <ScrollView showsVerticalScrollIndicator={false} onTouchStart={() => {
                setBottomNavVisible(true);
                setModalVisible(false);
            }}><LyricsView Lyrics={lyrics} LyricsSize={lyricsSize} /></ScrollView>}
            {bottomNavVisible ? (
                <View style={stylesBN.container}>
                    <View style={stylesBN.bottomTab}>
                        <View style={stylesBN.bottomNav}>
                            <TouchableOpacity
                                style={stylesBN.buttonStyle}
                                onPress={() => setSheetVisible(!(sheetVisible))}>
                                <Image style={stylesBN.navIcon} source={require('../asset/icons/song_sheet.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={stylesBN.buttonStyle}
                                onPress={() => navigation.navigate('Player')}>
                                <Image style={stylesBN.navIcon} source={require('../asset/icons/play.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={stylesBN.buttonStyle}
                                onPress={() => navigation.navigate('Search')}>
                                <Image style={stylesBN.navIcon} source={require('../asset/icons/search.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ) : null}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
const stylesBN = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
    },
    bottomNav: {
        flexDirection: 'row',
    },
    navIcon: {
        width: 28,
        height: 28
    },
    buttonStyle: {
        flex: 1,
        alignItems: 'center',
        padding: 12,
        margin: 0,
    },
});

export default LyricsActivity;