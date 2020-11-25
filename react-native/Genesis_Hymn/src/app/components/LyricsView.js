import React from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';

const LyricsView = props => {
    return (
    <View style={styles.lyricsContainer}>
        <Text style={{fontFamily: 'Roboto', fontSize: props.LyricsSize }}>{props.Lyrics}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    lyricsContainer: {
        marginHorizontal: 16,
    }
});

export default LyricsView;