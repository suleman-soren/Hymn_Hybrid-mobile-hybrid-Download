import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Modal,
    TouchableHighlight,
    SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import ButtonBlack from '../components/ButtonBlack';

function LoginActivity({ navigation }) {

    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalConfirmVisible, setModalConfirmVisible] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    // store data in async storage
    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            // saving error
            console.log('error =>' + e);
        }
    }

    const handleSubmitPress = () => {
        if (!username) {
            alert('Please fill Email');
            return;
        }
        if (!password) {
            alert('Please fill Password');
            return;
        }
        console.log('login submit:');

        fetch('https://reqres.in/api/users/' + username, {
            method: 'GET',
            //Request Type
        })
            .then((response) => response.json())
            //If response is in json then in success
            .then((responseJson) => {
                //Success
                console.log(responseJson.data.first_name, responseJson.data.email, responseJson.data.avatar);
                storeData('first_name', responseJson.data.first_name);
                storeData('last_name', responseJson.data.last_name);
                storeData('email', responseJson.data.email);
                storeData('profile_image_url', responseJson.data.avatar);
                navigation.navigate('LandingActivity')
            })
            //If response is not in json then in error
            .catch((error) => {
                //Error
                console.error(error);
            });

        // fetch('https://gorest.co.in/public-api/users', {
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         "data": {
        //             Email: username,
        //             Password: password
        //         }
        //     })
        // }).then((response) => response.text())
        //     .then((res) => {
        //         if (typeof (res.message) != "undefined") {
        //             console.log("Error", "Error: " + res.message);
        //         }
        //         else {
        //             // this.setState({ auth_token: res.auth_token });
        //             console.log("Welcome", " You have succesfully logged in", res);

        //             navigation.navigate('LandingActivity')
        //         }
        //     }).catch((error) => {
        //         console.error(error);
        //     });
    };

    const prevScreen = () => {
        navigation.goBack();
    }
    const sideNav = () => {
        navigation.openDrawer();
    }

    // <SafeAreaView style={styles.containerView} behavior="padding">
    //     <Header renderHeader={123} backClicked={prevScreen} openSideNav={sideNav} />
    //     <View style={styles.loginScreenContainer}>
    //         <Text style={styles.logoText}>Log In</Text>
    //         <View style={styles.loginFormView}>
    //             <TextInput
    //                 placeholder="Username"
    //                 placeholderColor="#c4c3cb"
    //                 style={styles.loginFormTextInput}
    //                 value={username}
    //                 onChangeText={setUsername}
    //             />
    //             <TextInput
    //                 placeholder="Password"
    //                 placeholderColor="#c4c3cb"
    //                 style={styles.loginFormTextInput}
    //                 value={password}
    //                 onChangeText={setPassword}
    //                 secureTextEntry={true}
    //             />
    //             <TouchableOpacity
    //                 onPress={handleSubmitPress} >
    //                 <ButtonBlack text={'LOGIN'} />
    //             </TouchableOpacity>
    //             <View style={{ marginTop: 16, justifyContent: 'center', alignItems: 'center' }}>
    //                 <TouchableOpacity onPress={() => {
    //                     setModalConfirmVisible(false);
    //                     setModalVisible(true);
    //                 }}>
    //                     <Text style={{ color: '#E1BD7B', fontSize: 18, fontFamily: 'Roboto-Regular' }}>
    //                         Forgot Password
    //                         </Text>
    //                 </TouchableOpacity>
    //             </View>
    //             <View style={{ marginTop: 16, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
    //                 <Text style={{ fontSize: 18, fontFamily: 'Roboto-Regular' }}>
    //                     Don't have an account
    //                     </Text>
    //                 <TouchableOpacity onPress={() => { navigation.navigate('SigninActivity') }} >
    //                     <Text style={{ color: '#E1BD7B', fontSize: 18, fontFamily: 'Roboto-Regular', marginLeft: 8 }}>
    //                         Create one
    //                     </Text>
    //                 </TouchableOpacity>
    //             </View>
    //         </View>
    //     </View>

    //     <Modal
    //         animationType="slide"
    //         transparent={false}
    //         visible={modalVisible} >
    //         {modalConfirmVisible ?
    //             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //                 <Text style={{ fontFamily: 'Roboto', fontSize: 20 }}>
    //                     Check your mail for Password
    //                     </Text>
    //                 <TouchableHighlight
    //                     style={{ ...styles.openButton, backgroundColor: "#000000", width: '80%' }}
    //                     onPress={() => {
    //                         setModalVisible(!modalVisible);
    //                     }} >
    //                     <Text style={styles.textStyle, { color: '#E1BD7B', textAlign: 'center', fontSize: 20, fontFamily: 'NotoSans-Bold' }}>OK</Text>
    //                 </TouchableHighlight>
    //             </View> :
    //             <View style={styles.centeredView}>
    //                 <Text style={styles.modalText}>
    //                     Enter email to get password
    //                     </Text>
    //                 <View style={{ width: '100%', paddingHorizontal: 16 }}>
    //                     <TextInput
    //                         placeholder="Enter email"
    //                         placeholderColor="#c4c3cb"
    //                         style={styles.forgotPasswordEmail}
    //                     />
    //                 </View>
    //                 <TouchableHighlight
    //                     style={{ ...styles.openButton, backgroundColor: "#000000" }}
    //                     onPress={() => {
    //                         setModalConfirmVisible(true);
    //                         // setModalVisible(!modalVisible);
    //                     }} >
    //                     <Text style={styles.textStyle, { color: '#E1BD7B', textAlign: 'center', fontSize: 20, fontFamily: 'NotoSans-Bold' }}>Reset Password</Text>
    //                 </TouchableHighlight>
    //             </View>}
    //     </Modal>
    // </SafeAreaView>

    return (
        <SafeAreaView>
            <Header renderHeader={123} backClicked={prevScreen} openSideNav={sideNav} />
            <KeyboardAvoidingView>
                <Text style={styles.logoText}>Log In</Text>
                <TextInput
                    placeholder="Username"
                    placeholderColor="#c4c3cb"
                    style={styles.loginFormTextInput}
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    placeholder="Password"
                    placeholderColor="#c4c3cb"
                    style={styles.loginFormTextInput}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    onPress={handleSubmitPress} >
                    <ButtonBlack text={'LOGIN'} />
                </TouchableOpacity>
                <View style={{ marginTop: 16, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        setModalConfirmVisible(false);
                        setModalVisible(true);
                    }}>
                        <Text style={{ color: '#E1BD7B', fontSize: 18, fontFamily: 'Roboto-Regular' }}>
                            Forgot Password
                             </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 16, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Roboto-Regular' }}>
                        Don't have an account
                         </Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('SigninActivity') }} >
                        <Text style={{ color: '#E1BD7B', fontSize: 18, fontFamily: 'Roboto-Regular', marginLeft: 8 }}>
                            Create one
                         </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible} >
                {modalConfirmVisible ?
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={{alignItems: 'center', marginBottom: 56 }}>
                            <Text style={{ fontFamily: 'Roboto', fontSize: 20 }}>
                                Check your mail for Password
                            </Text>
                        </View>
                        <TouchableHighlight
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }} >
                            <ButtonBlack text={'OK'} />
                        </TouchableHighlight>
                    </View> :
                    <View style={styles.centeredView}>
                        <Text style={styles.modalText}>
                            Enter email to get password
                         </Text>
                        <View style={{ width: '100%', paddingHorizontal: 16, marginBottom: 56 }}>
                            <TextInput
                                placeholder="Enter email"
                                placeholderColor="#c4c3cb"
                                style={styles.forgotPasswordEmail}
                            />
                        </View>
                        <TouchableHighlight
                            onPress={() => {
                                setModalConfirmVisible(true);
                                // setModalVisible(!modalVisible);
                            }} >
                            <ButtonBlack text={'GET PASSWORD'} />
                        </TouchableHighlight>
                    </View>}
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
    },
    loginScreenContainer: {
        flex: 1,
    },
    logoText: {
        fontFamily: 'Roboto',
        fontSize: 40,
        marginTop: 56,
        marginBottom: 56,
        textAlign: 'center',
    },
    loginFormView: {
        flex: 1,
        marginTop: 50,
    },
    loginFormTextInput: {
        height: 43,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
    },
    loginBtn: {
        height: 42,
        justifyContent: 'center',
        borderColor: '#ccc',
        backgroundColor: '#000',
        paddingLeft: 10,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 50,
        marginBottom: 5,
        borderRadius: 8
    },
    loginText: {
        color: '#ffffff',
        marginTop: 10,
        marginBottom: 30,
        textAlign: 'center',
        fontFamily: 'NotoSans',
        fontSize: 18,
        borderRadius: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center"
    },
    forgotPasswordEmail: {
        height: 43,
        width: '100%',
        fontSize: 18,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        paddingLeft: 8,
        fontFamily: 'Roboto-Medium'
    },
    openButton: {
        marginTop: 128,
        backgroundColor: "#F194FF",
        borderRadius: 6,
        padding: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 64,
        textAlign: "center",
        fontSize: 20,
        fontFamily: 'Roboto-Light'
    }
});

export default LoginActivity;