import React, {useEffect, useState} from 'react';
import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import store from "./src/store/store";
import TabNavStack from "./src/routes/TabNavStack";
import SplashStack from "./src/routes/SplashStack";
import {color} from "./assets/color/color";
import {verifyToken} from "./src/services/api/mealApiService";
import {Text, View, StyleSheet, StatusBar} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {Startup} from "./src/components/splashscreen/Startup";

export default function App() {

    return (
        <Provider store={store}>
            <NavigationContainer theme={{colors: {background: color.white}}}>
                <SplashStack/>
            </NavigationContainer>
        </Provider>
    );
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

