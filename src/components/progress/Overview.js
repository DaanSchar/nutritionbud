import {Text, View, StyleSheet, StatusBar, ScrollView, FlatList, ActivityIndicator} from "react-native";
import React, {useEffect, useState} from 'react';
import {color} from "../../../assets/color/color";
import LinearGradient from "react-native-linear-gradient";
import * as mealApiService from "../../services/api/mealApiService";
import ChartCard from "./components/ChartCard";
import {useIsFocused} from "@react-navigation/native";
import * as intakeApiService from "../../services/api/intakeApiService";

const Overview = () => {

    const isFocused = useIsFocused()
    let colors = [color.primary, color.three]

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        intakeApiService.getMacros()
            .then(data => {
                setData([...data])
            })
            .then(() =>setLoading(false))
    }, [isFocused])


    return (
        isLoading ?
        <View style={{flex: 1, backgroundColor: colors.white}}>
            <ActivityIndicator color={color.primary} size={40} style={{marginTop: 250}}/>
        </View>
            :
        <ScrollView style={{ flex: 1, backgroundColor: color.white}}>
            {/* Menu */}
            <StatusBar translucent={true} backgroundColor={'transparent'} />

            <LinearGradient
                colors={[color.primary, color.two]}
                start={{ x: 0, y: 0 }}
                end={{ x: 3, y: 0 }}
                style={styles.topContainer}>

                <View style={styles.topContent}>

                    <View>
                        <Text style={styles.title}>Total days tracked</Text>
                        <Text style={styles.daysTitle}>{data.length} Days</Text>
                    </View>

                </View>
            </LinearGradient>
            {
                isLoading ? <ActivityIndicator color={color.primary} size={40} style={{marginTop: 150}}/> : <ChartCard data={data}/>
            }

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
