import {Text, View, StyleSheet} from "react-native";
import React from 'react';
import {color} from "../../../assets/color/color";

const Overview = () => {
    return (
        <View style={{ flex: 1, }}>
            <View style={styles.contentContainer}>

            </View>
        </View>
    )
}

export default Overview

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: color.white,
        flex: 1,
    },

})
