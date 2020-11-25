import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    SafeAreaView,
    Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import ButtonBlack from '../components/ButtonBlack';

function SigninActivity({ navigation }) {

    const [firstName, setfirstName] = React.useState('');
    const [lastName, setlastName] = React.useState('');
    const [email, setemail] = React.useState('');
    const [password, setpassword] = React.useState('');

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
        if (!firstName) {
            alert('Please fill First Name');
            return;
        }
        if (!lastName) {
            alert('Please fill Last Name');
            return;
        }
        if (!email) {
            alert('Please fill Email');
            return;
        }
        if (!password) {
            alert('Please fill Password');
            return;
        }
        console.log('login submit:');

        // fetch('https://reqres.in/api/users/' + firstName, {
        //     method: 'GET',
        //     //Request Type
        // })
        //     .then((response) => response.json())
        //     //If response is in json then in success
        //     .then((responseJson) => {
        //         //Success
        //         console.log(responseJson.data.first_name, responseJson.data.email, responseJson.data.avatar);
        //         storeData('first_name', responseJson.data.first_name);
        //         storeData('last_name', responseJson.data.last_name);
        //         storeData('email', responseJson.data.email);
        //         storeData('profile_image_url', responseJson.data.avatar);
        //         navigation.navigate('LandingActivity')
        //     })
        //     //If response is not in json then in error
        //     .catch((error) => {
        //         //Error
        //         console.error(error);
        //     });

        fetch('https://reqres.in/api/register/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "data": {
                    email: email,
                    password: password
                }
            })
        }).then((response) => response.text())
            .then((res) => {
                if (typeof (res.message) != "undefined") {
                    console.log("Error", "Error: " + res.message);
                }
                else {
                    // this.setState({ auth_token: res.auth_token });
                    console.log("Welcome", " You have succesfully Signed in", res);

                    navigation.navigate('LandingActivity')
                }
            }).catch((error) => {
                console.error(error);
            });

    };

    const prevScreen = () => {
        navigation.goBack();
    }
    const sideNav = () => {
        navigation.openDrawer();
    }

    return (
        <SafeAreaView style={styles.containerView} behavior="padding">
            <Header renderHeader={123} backClicked={prevScreen} openSideNav={sideNav} />
            <View style={styles.loginScreenContainer}>
                <Text style={styles.logoText}>Sign In</Text>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../asset/icons/account.png')}
                    />
                </View>
                <View style={styles.loginFormView}>
                    <TextInput
                        placeholder="First Name"
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}
                        value={firstName}
                        onChangeText={setfirstName}
                    />
                    <TextInput
                        placeholder="Last Name"
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}
                        value={lastName}
                        onChangeText={setlastName}
                    />
                    <TextInput
                        placeholder="Email"
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}
                        value={email}
                        onChangeText={setemail}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}
                        value={password}
                        onChangeText={setpassword}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        onPress={handleSubmitPress} >
                        <ButtonBlack text={'SIGN IN'} />
                    </TouchableOpacity>

                    <View style={{ marginTop: 16, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Roboto-Regular' }}>
                            Already have an account
                        </Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('Login') }} >
                            <Text style={{ color: '#E1BD7B', fontSize: 18, fontFamily: 'Roboto-Regular', marginLeft: 8 }}>
                                Login
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

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
        fontFamily: 'NotoSans',
        fontSize: 40,
        marginTop: 36,
        marginBottom: 16,
        textAlign: 'center',
    },
    loginFormView: {
        flex: 1,
        marginTop: 16,
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
        height: 43,
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
        fontSize: 18,
        borderRadius: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: '80%',
        backgroundColor: "white",
        borderRadius: 12,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    forgotPasswordEmail: {
        height: 43,
        width: '100%',
        fontSize: 14,
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
    openButton: {
        marginTop: 36,
        backgroundColor: "#F194FF",
        borderRadius: 6,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16
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
});

export default SigninActivity;