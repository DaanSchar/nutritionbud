import {Text, View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity} from "react-native";
import React from 'react';
import {color} from "../../../assets/color/color";
import LinearGradient from "react-native-linear-gradient";
import Feather from "react-native-vector-icons/Feather";

const SplashScreen = ({ navigation }) => {
    return (
            <LinearGradient colors={[color.four,color.primary]} style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'transparent'} />

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Nutrition Bud</Text>
                    <Text style={styles.footNote}>Start tracking your intake today</Text>

                    <TouchableOpacity onPress={() => {navigation.navigate('Login')}} style={styles.circle}>
                        <Feather name={'chevron-right'} color={color.primary} size={25}/>
                    </TouchableOpacity>

                </View>
            </LinearGradient>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        marginTop: 260,
        alignItems: 'center',
        justifyContent: 'center',
    },

    circle: {
        borderRadius: 100,
        width: 40,
        height: 40,
        backgroundColor: color.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 300,
    },

    // text
    title: {
        fontFamily: 'Roboto-Black',
        fontSize: 40,
        color: color.white,
    },
    footNote: {
        marginTop: 10,
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        color: color.white,
    }
})
