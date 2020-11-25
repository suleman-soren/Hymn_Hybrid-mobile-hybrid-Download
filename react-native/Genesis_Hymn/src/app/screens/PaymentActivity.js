import React, { useEffect } from 'react';
import { StyleSheet, Text, Image, View, SafeAreaView } from 'react-native';
import Header from '../components/Header';

function PaymentActivity({ navigation }) {

    const prevScreen = () => {
        navigation.goBack();
    }
    const sideNav = () => {
        console.log('side nav');
        navigation.openDrawer();
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header renderHeader={12} title={'Payment'} backClicked={prevScreen} openSideNav={sideNav} />
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default PaymentActivity;