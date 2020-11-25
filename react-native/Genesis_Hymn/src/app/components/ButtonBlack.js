import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

const ButtonBlack = props => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}>
                    {props.text}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 43,
        alignItems: 'center'
    },
    content: {
        backgroundColor: '#000',
        width: '90%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    text: {
        color: '#E1BD7B',
        fontFamily: 'Roboto-Medium',
        fontSize: 20
    }
})

export default ButtonBlack;

