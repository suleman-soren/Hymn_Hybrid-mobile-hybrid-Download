import React, {
    useState
} from 'react';
import {
    SafeAreaView,
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import SongSearchButton from '../components/SongSearchButton';
import FavouriteActivity from './FavouriteActivity';
import CategoryActivity from './CategoryActivity';
import PlayerActivity from './PlayerActivity';
import SettingActivity from './SettingActivity';
const HYMDATA = require('../asset/hymndata.json');
// SVG Icons
import Heartb from '../asset/icons/heartb.svg';

function LandingActivity({ navigation }) {
    var randomNumber = Math.floor(Math.random() * 695) + 1;
    var hymnOfTheDay;
    for (singleHymn in HYMDATA) {
        if (HYMDATA.hasOwnProperty(singleHymn)) {
            const element = HYMDATA[singleHymn];
            if (element.Id === '' + randomNumber) {
                hymnOfTheDay = element.title;
                if (hymnOfTheDay.length > 20) {
                    hymnOfTheDay = hymnOfTheDay.substr(0, 19) + '...';
                }
            }
        }
    }

    function LandingPage() {
        function openSearchActivity() {
            navigation.navigate('Search');
        }
        return (
            <View style={stylesP.container}>
                <View>
                    <Image source={require('../asset/icons/know_hymn.png')} />
                </View>
                <View style={{ width: '100%', marginTop: 120 }}>
                    <View style={stylesP.hymnoftheday}>
                        <View>
                            <Text style={stylesP.hymnofthedayText} >
                                {hymnOfTheDay}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => { navigation.navigate('Lyrics', { SongToBeDisplayed: '' + randomNumber }) }}>
                                <Image style={{ marginRight: 16 }} source={require('../asset/icons/song_sheet.png')} />
                            </TouchableOpacity>
                            <Image style={{ marginLeft: 16 }} source={require('../asset/icons/play.png')} />
                        </View>
                    </View>
                    <View style={stylesP.searchbutton}>
                        <SongSearchButton placeholder={'Song Search'} clickedSearchButton={openSearchActivity} />
                    </View>
                </View>
            </View>
        );
    }
    const [index, setIndex] = useState(0);
    const RenderElement = () => {
        if (index === 0) {
            return <LandingPage navigation={navigation} />;
        } else if (index === 1) {
            return <FavouriteActivity navigation={navigation} />;
        } else if (index === 2) {
            return <CategoryActivity navigation={navigation} />;
        } else if (index === 3) {
            return <PlayerActivity navigation={navigation} />;
        } else if (index === 4) {
            return <SettingActivity navigation={navigation} />;
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <RenderElement />
            <View style={styles.bottomNav}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => setIndex(1)}>
                    <Heartb width={28} height={28} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => setIndex(2)}>
                    <Image style={styles.navIcon} source={require('../asset/icons/list.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => setIndex(3)}>
                    <Image style={styles.navIcon} source={require('../asset/icons/playlist.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => setIndex(4)}>
                    <Image style={styles.navIcon} source={require('../asset/icons/settings.png')} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomNav: {
        flexDirection: 'row',
    },
    buttonStyle: {
        flex: 1,
        alignItems: 'center',
        padding: 12,
        margin: 0,
    },
    navIcon: {
        width: 28,
        height: 28
    }
});
const stylesP = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    hymnoftheday: {
        flexDirection: 'row',
        marginHorizontal: 48,
        justifyContent: 'space-between'
    },
    hymnofthedayText: {
        fontSize: 20,
        fontFamily: 'Roboto-Light'
    },
    searchbutton: {
        marginTop: 46,
        paddingHorizontal: 16,
        width: "100%"
    }
})

export default LandingActivity;