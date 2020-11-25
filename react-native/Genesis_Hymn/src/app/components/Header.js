import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Back from '../asset/icons/left-arrow.svg';
import Menu from '../asset/icons/menu.svg';

function Header(props) {
    var headerElements = props.renderHeader;
    const RenderHeader = () => {
        if (headerElements === 123) {
            return (
                <View style={styles.header}>
                    <TouchableOpacity onPress={props.backClicked}>
                        <View style={styles.headerIconContainer}>
                            <Back width={36} height={36} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>
                        {props.title}
                    </Text>
                    <TouchableOpacity onPress={props.openSideNav} >
                        <View style={styles.headerIconContainer}>
                            <Menu width={36} height={36} />
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        // else if (headerElements === 1) {
        //     return (
        //         <View style={styles.headerBack}>
        //             <View style={{ flex: 1 }}>
        //                 <TouchableOpacity onPress={props.backClicked}>
        //                     <View style={styles.headerIconContainer}>
        //                         <Image source={require('../asset/icons/back.png')} style={styles.headerIcon} />
        //                     </View>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>
        //     );
        // } else if (headerElements === 12) {
        //     return (
        //         <View style={styles.headerBackTitle}>
        //             <TouchableOpacity onPress={props.backClicked}>
        //                 <View style={styles.headerIconContainer}>
        //                     <Image source={require('../asset/icons/back.png')} style={styles.headerIcon} />
        //                 </View>
        //             </TouchableOpacity>
        //             <View>
        //                 <Text style={styles.headerText}>
        //                     {props.title}
        //                 </Text>
        //             </View>
        //             <View style={styles.headerIcon}>

        //             </View>
        //         </View>
        //     );
        // } else if (headerElements === 13) {
        //     return (
        //         <View style={styles.headerBackTitle}>
        //             <TouchableOpacity onPress={props.backClicked}>
        //                 <View style={styles.headerIconContainer}>
        //                     <Image source={require('../asset/icons/back.png')} style={styles.headerIcon} />
        //                 </View>
        //             </TouchableOpacity>

        //             <TouchableOpacity onPress={props.openSideNav} >
        //                 <View style={styles.headerIconContainer}>
        //                     <Image source={require('../asset/icons/toggle.png')} style={styles.headerIcon} />
        //                 </View>
        //             </TouchableOpacity>
        //         </View>
        //     );
        // }
    }
    return (
        <RenderHeader />
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    headerIconContainer: {
        height: 36,
        width: 36,
    },
    headerIcon: {
        height: 36,
        width: 36
    },
    headerBack: {
        width: '100%',
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    headerBackTitle: {
        width: '100%',
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 20,
        fontFamily: 'Roboto'
    }
});

export default Header;