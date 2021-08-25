import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import React from 'react';
import TopMenu from "../TopMenu";
import {color} from "../../../assets/color/color";
import {storeUserToken} from "../../services/storage";

const Profile = ({ navigation }) => {

    const logout = () => {
        navigation.navigate('Login');
        storeUserToken('')
    }

    return (
        <View>
            <TopMenu>
                <View style={{ alignItems: 'center', marginTop: 55, }}>
                    <Text style={styles.title}>Profile</Text>
                </View>
            </TopMenu>

            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    contentContainer: {
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
    },
    logoutButton: {
        backgroundColor: color.white,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        paddingVertical: 5,
        borderWidth: 1.5,
        borderColor: color.primary,
    },

    // text
    title: {
        fontFamily: 'Roboto-Bold',
        color: color.white,
        fontSize: 19,
    },
    buttonText: {
        fontFamily: 'Roboto-SemiBold',
        fontSize: 20,
        color: color.primary,
    },
})
