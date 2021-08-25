import LinearGradient from "react-native-linear-gradient";
import {color} from "../../../assets/color/color";
import {StatusBar, StyleSheet, Text} from "react-native";
import React, {useEffect } from "react";
import * as userApiService from "../../services/api/userApiService";


export const Startup = ({ navigation }) => {

    useEffect(() => {
        hasValidToken()
    },[])

    const hasValidToken = () => {
        return userApiService.verifyToken().then( r => {
            r ? navigation.navigate('Home') : navigation.navigate('SplashScreen')
        })
    }

    return (
        <LinearGradient colors={[color.four,color.primary]} style={styles.container}>

            <StatusBar translucent={true} backgroundColor={'transparent'} />

            <Text style={styles.title}>Nutrition Bud</Text>

        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        fontFamily: 'Roboto-Black',
        fontSize: 40,
        color: color.white,
        marginBottom: 230,
    },
})
