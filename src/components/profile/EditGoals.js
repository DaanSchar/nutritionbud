import {View, StyleSheet, Text, TouchableOpacity, TextInput, ActivityIndicator} from "react-native";
import React, {useEffect, useState} from 'react';
import TopMenu from "../TopMenu";
import {color} from "../../../assets/color/color";
import Feather from "react-native-vector-icons/Feather";
import * as userApiService from "../../services/api/userApiService";

const EditGoals = ({ navigation }) => {

    const [isLoading, setLoading] = useState(false);

    const [calories, setCalories] = useState(null);
    const [protein, setProtein] = useState(null);
    const [fat, setFat] = useState(null);
    const [carbs, setCarbs] = useState(null);

    useEffect(() => {
        setLoading(true);
        userApiService.getUserGoals().then(r => {
            setCalories(r.calories ? r.calories.toString(): '-')
            setProtein(r.protein ? r.protein.toString() : '-')
            setFat(r.fat ? r.fat.toString() : '-')
            setCarbs(r.carbohydrates ? r.carbohydrates.toString() : '-')
        }).then(setLoading(false))
    }, [])

    const update = () => {
        userApiService.updateUserGoal({
            calories: parseFloat(calories),
            protein: parseFloat(protein),
            fat: parseFloat(fat),
            carbohydrates: parseFloat(carbs),
        })
            .catch(e => console.warn(e))
            .then(navigation.navigate('Profile'))
    }

    return (
        <View style={{flex: 1}}>
            <TopMenu>
                <View style={styles.menu}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Feather name={"chevron-left"} size={30} color={color.white} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Edit Goals</Text>
                    <View style={{width: 20}}/>
                </View>
            </TopMenu>

            {
                isLoading ? <ActivityIndicator color={color.primary} size={25}/> :
                    <View style={styles.contentContainer}>

                        <View style={styles.inputContainer}>
                            <Text style={[styles.inputTitle, {width: 90,}]}>Calories</Text>
                            <Text style={styles.measure}>kcal</Text>
                            <TextInput
                                keyboardType = 'numeric'
                                style={styles.input}
                                fontSize={18}
                                onChangeText={text => setCalories(text)}
                            >
                                {calories}
                            </TextInput>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputTitle}>Protein</Text>
                            <Text style={styles.measure}>g</Text>
                            <TextInput
                                keyboardType = 'numeric'
                                style={styles.input}
                                placeholder={protein}
                                fontSize={18}
                                onChangeText={text => setProtein(text)}
                            >
                                {protein}
                            </TextInput>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputTitle}>Fat</Text>
                            <Text style={styles.measure}>g</Text>
                            <TextInput
                                keyboardType = 'numeric'
                                style={styles.input}
                                placeholder={fat}
                                fontSize={18}
                                onChangeText={text => setFat(text)}
                            >
                                {fat}
                            </TextInput>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputTitle}>Carbs</Text>
                            <Text style={styles.measure}>g</Text>
                            <TextInput
                                keyboardType = 'numeric'
                                style={styles.input}
                                placeholder={carbs}
                                fontSize={18}
                                onChangeText={text => setCarbs(text)}
                            >
                                {carbs}
                            </TextInput>
                        </View>

                        <TouchableOpacity onPress={() => update()} style={styles.button}>
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>

                    </View>
            }

        </View>
    )
}

export default EditGoals;

const styles = StyleSheet.create({
    menu: {
        marginTop: 55,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contentContainer: {
        marginTop: 50,
        marginHorizontal: 20,
        flex: 1,
    },
    inputContainer: {
        paddingTop: 15,
        flexDirection: 'row',
        borderBottomWidth: 1.5,
        borderColor: color.offWhite,
        alignItems: 'center',
    },
    input: {
        marginLeft: 5,
        flex: 1,
    },
    button: {
        marginTop: 300,
        backgroundColor: color.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        paddingVertical: 8,
        elevation: 1,
    },

    // text
    title: {
        fontFamily: 'Roboto-Bold',
        color: color.white,
        fontSize: 19,
    },
    inputTitle: {
        width: 110,
        fontFamily: 'Roboto-SemiBold',
        color: color.textDark,
        fontSize: 19,
        marginLeft: 10,
    },
    measure: {
        fontFamily: 'Roboto-Light',
        color: color.textDark,
        fontSize: 15,
    },
    buttonText: {
        fontFamily: 'Roboto-SemiBold',
        color: color.white,
        fontSize: 18,
    },
})
