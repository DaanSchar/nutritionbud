import {StyleSheet, TouchableOpacity} from "react-native";
import React from 'react';
import {color} from "../../../../../assets/color/color";
import Feather from "react-native-vector-icons/Feather";

const MoreCard = () => {
    return (
        <TouchableOpacity onPress={() => {}} style={styles.card}>
            <Feather name={'chevron-right'} size={25} color={color.one}/>
        </TouchableOpacity>
    )
}

export default MoreCard;

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        width: 40,
        height: 40,
        marginLeft: 20,
        backgroundColor: color.white,
        borderRadius: 100,
        flex: 1,
        elevation: 0,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: color.one,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
    },



    // text
    cardTitle: {
        fontFamily: 'Roboto-SemiBold',
        color: color.white,
        fontSize: 22,
        marginLeft: 5,
    },
    cardText: {
        fontFamily: 'Roboto-Regular',
        color: color.white,
        fontSize: 23,
    },
    cardExtraText: {
        fontFamily: 'Roboto-Light',
        color: color.grey,
        fontSize: 14,
    },
})
