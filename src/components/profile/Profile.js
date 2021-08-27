import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator} from "react-native";
import React, {useEffect, useState} from 'react';
import TopMenu from "../TopMenu";
import {color} from "../../../assets/color/color";
import {storeUserToken} from "../../services/storage";
import * as userApiService from "../../services/api/userApiService";
import LinearGradient from "react-native-linear-gradient";
import {useIsFocused} from "@react-navigation/native";

const Profile = ({ navigation }) => {

    const [isLoading, setLoading] = useState(true);
    const [goal, setGoal] = useState({
        calories: null,
        fat: null,
        protein: null,
        carbohydrates: null,
    });

    const isFocused = useIsFocused()

    const logout = () => {
        navigation.navigate('Login');
        storeUserToken('')
    }

    useEffect(() => {
        userApiService.getUserGoals()
            .then( r =>  setGoal(r))
            .then(r => setLoading(false))
    }, [isFocused])

    return (
        <View>
            <TopMenu>
                <View style={{ alignItems: 'center', marginTop: 55, }}>
                    <Text style={styles.title}>Profile</Text>
                </View>
            </TopMenu>

            <View style={styles.contentContainer}>

                <TouchableOpacity onPress={() => {navigation.navigate('EditGoals')}}>
                    <LinearGradient style={styles.goalContainer} colors={[color.primary, color.three]}>

                        <View style={styles.section}>
                            <Text style={styles.goalTitle}>Goals</Text>
                        </View>

                        {isLoading ? <ActivityIndicator size={25} color={color.white} style={{height: 127}}/> : <View>
                            <View style={styles.section}>
                                <View style={styles.goalSection}>
                                    <Text style={styles.goalText}>Calories</Text>
                                    <Text
                                        style={styles.goal}>{goal.calories === null ? '-' : goal.calories + ' kcal'}</Text>
                                </View>
                            </View>

                            <View style={styles.section}>
                                <View style={styles.goalSection}>
                                    <Text style={styles.goalText}>Protein</Text>
                                    <Text style={styles.goal}>{goal.protein === null ? '-' : goal.protein + ' g'}</Text>
                                </View>
                            </View>


                            <View style={styles.section}>
                                <View style={styles.goalSection}>
                                    <Text style={styles.goalText}>Fat</Text>
                                    <Text style={styles.goal}>{goal.fat === null ? '-' : goal.fat + ' g'}</Text>
                                </View>
                            </View>

                            <View>
                                <View style={styles.goalSection}>
                                    <Text style={styles.goalText}>Carbohydrates</Text>
                                    <Text
                                        style={styles.goal}>{goal.carbohydrates === null ? '-' : goal.carbohydrates + ' g'}</Text>
                                </View>
                            </View>
                        </View>}
                    </LinearGradient>
                </TouchableOpacity>

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
        marginHorizontal: 20,
        marginTop: 20,
    },
    goalContainer: {
        paddingVertical: 5,
        elevation: 2,
        borderRadius: 15,
    },
    goalSection: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 3,
    },
    section: {

    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: color.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        paddingVertical: 5,
        borderWidth: 2,
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
    goalTitle: {
        fontFamily: 'Roboto-Bold',
        color: color.white,
        fontSize: 25,
        marginLeft: 10,
        marginBottom: 10,
    },
    goalText: {
        fontFamily: 'Roboto-Bold',
        color: color.white,
        fontSize: 19,
    },
    goal: {
        fontFamily: 'Roboto-Bold',
        color: color.white,
        fontSize: 19,
    },
})
