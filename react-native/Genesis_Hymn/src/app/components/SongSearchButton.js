import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

const SongSearchButton = props => {
    return (
        <TouchableOpacity
            onPress={props.clickedSearchButton} >
            <View style={styles.container}>
                <View>
                    <Image style={styles.icon} source={require('../asset/icons/search.png')} />
                </View>
                <View>
                    <Text style={styles.text}>
                        {props.placeholder}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: "#ffffff",
        borderRadius: 12,
        height: 42,
        width: "100%",
        alignItems: 'center'
    },
    icon: {
        width: 18,
        height: 18,
        marginLeft: 8
    },
    text: {
        fontSize: 20,
        marginLeft: 8,
        fontFamily: 'Roboto-Light'
    }
})

export default SongSearchButton;