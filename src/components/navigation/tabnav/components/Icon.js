import React from 'react';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {color} from "../../../../../assets/color/color";
import {Text, View, StyleSheet} from "react-native";



const Icon = (props) => {
    return (
        <View style={[styles.icon, props.focused ? {marginTop: 10} : null]}>
            {
                props.children
            }
            {
                props.focused ? <Text style={styles.title}>{ props.title }</Text> : null
            }
        </View>
    )
}

export default Icon;

const styles = StyleSheet.create({
    icon: {
        top: -10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
        color: color.primary,
    }
})
