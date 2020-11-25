import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, Image, View } from 'react-native';
import Header from '../components/Header';
import ProfileDataRow from '../components/ProfileDataRow';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileActivity({ navigation }) {

    const [first_name, setfirst_name] = useState('');
    const [last_name, setlast_name] = useState('');
    const [email, setemail] = useState('');
    const [membership, setmembership] = useState('');
    const [avatar, setavatar] = useState('https://static.thenounproject.com/png/219377-200.png');

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('first_name')
            const lastName = await AsyncStorage.getItem('last_name')
            const emailvalue = await AsyncStorage.getItem('email')
            const membershipValue = await AsyncStorage.getItem('membership_plan')
            const avatarvalue = await AsyncStorage.getItem('profile_image_url')
            if (value !== null) {
                // value previously stored
                setfirst_name(value);
                setlast_name(lastName);
                setemail(emailvalue);
                setmembership(membershipValue);
                setavatar(avatarvalue);
                console.log('drawer' + value);
            }
        } catch (e) {
            // error reading value
            console.log('drawer' + e);
        }
    }

    const storeData = async () => {
        try {
            await AsyncStorage.setItem('membership_plan', 'Select Membership')
            await AsyncStorage.setItem('first_name', 'Sign In')
        } catch (e) {
            // saving error
            console.log('error =>' + e);
        }
    }

    useEffect( () => {
        getData();
    })

    const prevScreen = () => {
        navigation.goBack();
    }

    const logoutUser = () => {
        storeData();
        navigation.navigate('LandingActivity');
    }

    const redirectToMembership = () => {
        navigation.navigate('MembershipActivity');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header renderHeader={1} title={'Profile'} backClicked={prevScreen} />
            <View style={styles.imageContainer}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: avatar,
                    }}
                />
            </View>
            <View style={styles.profileDataContainer} >
                <ProfileDataRow username={first_name} name={last_name} email={email} membership={membership} password={'***********'} logout={logoutUser} goToMembership={redirectToMembership} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8,
        marginHorizontal: 16
    },
    imageContainer: {
        alignItems: 'center'
    },
    tinyLogo: {
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#E1BD7B'
    },
    profileDataContainer: {
        marginTop: 56
    },
})

export default ProfileActivity;