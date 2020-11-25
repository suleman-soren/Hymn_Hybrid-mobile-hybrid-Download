import React from 'react';
import {
    TextInput,
    StyleSheet,
    View
} from 'react-native';

const SongSearchBar = props => {
    return (
        <View>
            <TextInput
                style={styles.textInput}
                onChangeText={props.onChangeTextProps}
                value={props.valueProps}
                placeholder={props.placeholder}
                placeholderTextColor="#757575" />
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        fontSize: 20,
        paddingHorizontal: 8,
        paddingVertical: 6,
        marginHorizontal: 16,
        backgroundColor: '#cccccc',
        color: 'black',
        borderRadius: 8,
        fontFamily: 'Roboto-Light'
    }
})

export default SongSearchBar;

