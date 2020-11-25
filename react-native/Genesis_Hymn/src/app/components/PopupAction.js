import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

function PopupAction(props) {
    var type = props.clickable;
    return (
        <View style={{ position: 'absolute', top: '40%', width: '100%', zIndex: 1 }}>
            {type ? (
                <View style={{ paddingHorizontal: '8%' }}>
                    <View style={{ alignItems: 'center', backgroundColor: '#404040', elevation: 6, borderRadius: 12 }}>
                        <View style={{ padding: 16 }}>
                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 20, color: 'white' }}>
                                {props.heading}
                            </Text>
                        </View>
                        <View style={{ padding: 16 }}>
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 18, color: 'white' }}>
                                {props.body}
                            </Text>
                        </View>
                        <TouchableOpacity style={{ width: '100%', padding: 16, backgroundColor: '#363636', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}
                            onPress={props.clickedButton}>
                            <Text style={{ color: 'white', fontFamily: 'Roboto-Medium', fontSize: 18 }}>
                                {props.buttonText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : <View style={{ paddingHorizontal: '8%' }}>
                    <View style={{ alignItems: 'center', backgroundColor: '#404040', elevation: 6, borderRadius: 12 }}>
                        <View style={{ padding: 16 }}>
                            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 20, color: 'white' }}>
                                {props.heading}
                            </Text>
                        </View>
                        <View style={{ padding: 16, marginBottom: 8 }}>
                            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 18, color: 'white' }}>
                                {props.body}
                            </Text>
                        </View>
                    </View>
                </View>
            }
        </View>
    )
}

export default PopupAction;