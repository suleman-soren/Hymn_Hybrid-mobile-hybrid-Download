import React from 'react';
import { StyleSheet, Text, Image, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MembershipActivity({ navigation }) {

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('membership_plan', value)
        } catch (e) {
            // saving error
            console.log(e);
        }
    }

    const prevScreen = () => {
        navigation.goBack();
    }
    const sideNav = () => {
        console.log('side nav');
        navigation.openDrawer();
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header renderHeader={12} title={'Membership'} backClicked={prevScreen} openSideNav={sideNav} />
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View>
                        <Text style={styles.modalText}>
                            YEARLY MEMBERSHIP PLAN
                    </Text>
                        <Text>
                            $10
                    </Text>
                    </View>
                    <TouchableOpacity style={{ marginTop: 36 }} onPress={() => {
                        storeData('YEARLY MEMBERSHIP PLAN')
                        navigation.navigate('PaymentActivity');
                    }}>
                        <View style={{ backgroundColor: '#E1BD7B', padding: 8, borderRadius: 6, width: 120, alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>
                                TRY NOW
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View>
                        <Text style={styles.modalText}>
                            LIFETIME MEMBERSHIP PLAN
                    </Text>
                        <Text>
                            $79
                    </Text>
                    </View>
                    <TouchableOpacity style={{ marginTop: 36 }} onPress={() => {
                        storeData('LIFETIME MEMBERSHIP PLAN')
                        navigation.navigate('PaymentActivity');
                    }}>
                        <View style={{ backgroundColor: '#E1BD7B', padding: 8, borderRadius: 6, width: 120, alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>
                                TRY NOW
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View>
                        <Text style={styles.modalText}>
                            CHURCH LIFETIME MEMBERSHIP PLAN
                    </Text>
                        <Text>
                            $99
                    </Text>
                    </View>
                    <TouchableOpacity style={{ marginTop: 36 }} onPress={() => {
                        storeData('CHURCH LIFETIME MEMBERSHIP PLAN')
                        navigation.navigate('PaymentActivity');
                    }}>
                        <View style={{ backgroundColor: '#E1BD7B', padding: 8, borderRadius: 6, width: 120, alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>
                                TRY NOW
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 16,
        marginVertical: 36
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        marginBottom: 8,
        fontSize: 16
    }
})

export default MembershipActivity;