import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function DrawerContent(props) {

    const [first_name, setfirst_name] = useState('Sign In');

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('first_name')
            if (value !== null) {
                // value previously stored
                setfirst_name(value);
                console.log('drawer' + value);
            }
        } catch (e) {
            // error reading value
            console.log('drawer' + e);
        }
    }

    useEffect( () => {
        getData();
    })


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.drawerItemBottom}
                onPress={() => {
                    if (first_name === 'Sign In') {
                        props.navigation.navigate('Login')
                    } else {
                        props.navigation.navigate('Profile')
                    }
                }} >
                <Image style={styles.drawIcon}
                    source={require('../asset/icons/account_white.png')}
                />
                <Text style={styles.drawerText}>
                    {first_name}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItemBottom}
                onPress={() => { props.navigation.navigate('AuthorSearch') }}>
                <Image style={styles.drawIcon}
                    source={require('../asset/icons/author_white.png')}
                />
                <Text style={styles.drawerText}>
                    Author
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItemBottom}
                onPress={() => {props.navigation.navigate('FavouriteActivity')}}>
                <Image style={styles.drawIcon}
                    source={require('../asset/icons/favourite_white.png')}
                />
                <Text style={styles.drawerText}>
                    Favourite
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItemBottom}
                onPress={() => { props.navigation.navigate('Category') }} >
                <Image style={styles.drawIcon}
                    source={require('../asset/icons/category_white.png')}
                />
                <Text style={styles.drawerText}>
                    Category
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerItem}
                onPress={() => { props.navigation.navigate('Setting') }} >
                <Image style={styles.drawIcon}
                    source={require('../asset/icons/setting_white.png')}
                />
                <Text style={styles.drawerText}>
                    Setting
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerItemBottom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1
    },
    drawerText: {
        fontWeight: 'bold',
        color: '#ffffff',
        paddingTop: 16
    },
    drawIcon: {
        width: 36
    }
});