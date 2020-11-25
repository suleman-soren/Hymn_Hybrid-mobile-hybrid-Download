import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

const LyricsHeadingView = props => {
    return (
        <View style={styles.header}>
            <View style={{flexDirection: 'row'}}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.songNumber}>{props.Id}</Text>
                    <Text style={styles.songNumber}> - </Text>
                </View>
                <View>
                    <Text style={styles.songTitle}>{props.Title}</Text>
                    <TouchableOpacity onPress={props.authorClicked.bind(this, props.Id)}>
                        <Text style={styles.songAuthor}>{props.Author}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={props.copyrightPressed}>
                    <Image
                        style={{ width: 28, height: 28, marginLeft: 16 }}
                        source={require('../asset/icons/copyright.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={props.heartPressed}>
                    <Image
                        style={{ width: 28, height: 28, marginLeft: 16 }}
                        source={require('../asset/icons/heart.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 8
    },
    songNumber: {
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
    },
    songTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
    },
    songAuthor: {
        paddingTop: 8,
        fontSize: 20,
        fontFamily: 'Roboto-Light',
        textDecorationLine: 'underline'
    }
})

export default LyricsHeadingView;