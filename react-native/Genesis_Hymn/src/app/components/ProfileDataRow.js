import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileDataRow = props => {
    return (
        <View style={styles.listContainer}>
            <View style={styles.listItem}>
                <Text style={styles.item}>{props.username}</Text>
            </View>
            <View style={styles.listItem}>
                <Text style={styles.item}>{props.name}</Text>
            </View>
            <View style={styles.listItem}>
                <Text style={styles.item}>{props.email}</Text>
            </View>
            <View style={styles.listItem}>
                <TouchableOpacity onPress={props.goToMembership}>
                    <Text style={styles.item}>{props.membership}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listItem}>
                <Text style={styles.item}>{props.password}</Text>
            </View>
            <View style={styles.logoutContainer}>
                <TouchableOpacity onPress={props.logout} >
                    <Text style={{ fontSize: 18, color: '#E1BD7B', fontWeight: 'bold' }}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        paddingVertical: 16,
        borderBottomColor: '#E1BD7B',
        borderBottomWidth: 1
    },
    item: {
        fontSize: 18
    },
    logoutContainer: {
        alignItems: 'center',
        marginTop: 106
    }
})

export default ProfileDataRow;