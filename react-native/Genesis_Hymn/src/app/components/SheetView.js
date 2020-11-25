import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Svg, { Rect, Circle } from 'react-native-svg';
import Sheet from '../asset/images/sheet.svg';

const SheetView = props => {
    return (
    <View style={styles.lyricsContainer}>
        <Sheet />
    </View>
    )
}

const styles = StyleSheet.create({
    lyricsContainer: {
        marginVertical: 16
    }
});

export default SheetView;