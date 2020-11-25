import React, {
    useEffect
} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';

function SplashScreen({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('LandingActivityRef');
        }, 2000);
    })

    return (
        <View style={styles.container}>
            <View>
                <Image source={require('../asset/icons/ssf.png')} />
            </View>
            <View>
                <Text style={styles.copyright}>
                    © Sacred Sound Foundation
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    copyright: {
        marginTop: 112,
        fontSize: 20,
        fontFamily: 'Roboto-Light'
    }
})

export default SplashScreen;