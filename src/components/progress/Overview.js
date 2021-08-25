import {Text, View, StyleSheet, StatusBar, ScrollView, FlatList, ActivityIndicator} from "react-native";
import React, {useEffect, useState} from 'react';
import {color} from "../../../assets/color/color";
import Chart from "./components/Chart";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as mealApiService from "../../services/mealApiService";
import ChartCard from "./components/ChartCard";
import {useIsFocused} from "@react-navigation/native";

const Overview = () => {

    // TODO decrease size of graph buttons

    const isFocused = useIsFocused()
    let colors = [color.primary, color.three]

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        mealApiService.getMacros()
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
