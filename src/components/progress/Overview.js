import {Text, View, StyleSheet, StatusBar, ScrollView} from "react-native";
import React from 'react';
import {color} from "../../../assets/color/color";
import Chart from "./components/Chart";
import LinearGradient from "react-native-linear-gradient";

const Overview = () => {

    return (
        <ScrollView style={{ flex: 1, backgroundColor: color.white}}>
            {/* Menu */}
            <StatusBar translucent={true} backgroundColor={'transparent'} />

            <LinearGradient
                colors={[color.primary, color.two]}
                start={{ x: 0, y: 0 }}
                end={{ x: 3, y: 0 }}
                style={styles.topContainer}>

                <View style={styles.topContent}>

                    <View style={{}}>
                        <Text style={styles.title}>Total days tracked</Text>
                        <Text style={styles.daysTitle}>{12} Days</Text>
                    </View>

                </View>
            </LinearGradient>

            <View>
                <Chart/>
            </View>
        </ScrollView>
    )
}

export default Overview

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        backgroundColor: color.primary,
    },
    topContent: {
        flex: 1,
        marginTop: 100,
        marginHorizontal: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    //text
    title: {
        fontFamily: 'Roboto-Regular',
        color: color.white,
        fontSize: 15,
    },
    daysTitle: {
        fontFamily: 'Roboto-Light',
        color: color.white,
        fontSize: 45,
    },

})
