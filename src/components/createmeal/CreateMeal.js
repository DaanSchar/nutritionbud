import {Text, View, StyleSheet, TouchableOpacity, TextInput, Picker, ScrollView} from "react-native";
import React, {useState} from 'react';
import TopMenu from "../TopMenu";
import Feather from "react-native-vector-icons/Feather";
import {color} from "../../../assets/color/color";
import Menu from "./components/Menu";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from "react-native-linear-gradient";
import {connect} from "react-redux";
import * as mealActions from "../../store/meals/mealActions";
import * as mealApiService from "../../services/mealApiService";


const CreateMeal = ({ navigation, route, createMeal}) => {

    let id = route.params.id;

    const [name, setName] = useState('');
    const [calories, setCalories] = useState(NaN);
    const [fat, setFat] = useState(NaN);
    const [carbs, setCarbs] = useState(NaN);
    const [protein, setProtein] = useState(NaN);
    const [portion, setPortion] = useState(100);
    const [portionType, setPortionType] = useState('g');

    const [showFields, setShowFields] = useState(false);

    let meal = {
        name: name,
        id: id,
        calories: calories,
        fat: fat,
        carbohydrates: carbs,
        protein: protein,
        portion: portion,
        portionType: portionType,
    }

    const onPressCreate = () => {
        if (filledInAll()) {
            createMeal(meal);
            mealApiService.createMeal(meal).then(r => console.log(r))
            navigation.navigate('AddMeal')
        } else {
            setShowFields(true);
        }
    }

    const filledInAll = () => {
        if (meal.name.length < 3)
            return false
        if (meal.calories === null || meal.calories === 0)
            return false;
        if (meal.fat === null)
            return false;
        if (meal.carbohydrates === null)
            return false;
        if (meal.protein === null)
            return false;
        if (meal.portion === null || meal.portion === 0)
            return false;
        return true;
    }

    return (
        <ScrollView>
            <Menu navigation={navigation}/>

            <View style={styles.content}>

                {/* Name */}
                <View style={styles.inputContainer}>
                    <View style={{ flexDirection: 'row', marginLeft: 20,}}>
                        <MaterialIcons name={'edit'} color={color.primary} size={25}/>
                        <Text style={styles.text}>Name</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginRight: 20,}}>
                        <TextInput placeholder={'enter name'} fontSize={20} fontFamily={'Roboto-SemiBold'} onChangeText={text => {
                            setName(text); setShowFields(false);
                        }}/>
                    </View>
                </View>

                {name.length < 3 && showFields ? <Text style={{ color: 'red', alignSelf: 'center', marginTop: 10}}>Name is too short</Text> : null}

                {/* Serving Size*/}
                <View style={[styles.inputContainer, {paddingVertical: 10}]}>
                    <View style={{ flexDirection: 'row', marginLeft: 20,}}>
                        <MaterialIcons name={'takeout-dining'} color={color.primary} size={25}/>
                        <Text style={styles.text}>Serving size</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginRight: 20,}}>
                        <TextInput fontSize={20} fontFamily={'Roboto-SemiBold'} onChangeText={(text) => {
                            setPortion(parseInt(text)); setShowFields(false);
                        }} keyboardType={'numeric'}>100</TextInput>
                        <Picker style={{ width: 90}} selectedValue={portionType} onValueChange={(itemValue) => setPortionType(itemValue)}>
                            <Picker.Item label={'g'} value={'g'}/>
                            <Picker.Item label={'ml'} value={'ml'}/>
                        </Picker>
                    </View>
                </View>

                {portion < 25  ? <Text style={{ color: 'red', alignSelf: 'center', marginTop: 10}}>Must be at least 25 g or ml</Text> : null}
                {isNaN(portion) && showFields ? <Text style={{ color: 'red', alignSelf: 'center', marginTop: 10}}>you can't leave this field blank</Text> : null}

                {/* calories */}
                <View style={styles.inputContainer}>
                    <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center'}}>
                        <Text style={styles.iconText}>kcal</Text>
                        <Text style={styles.text}>Calories</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginRight: 20,}}>
                        <TextInput placeholder={'enter amount'} fontSize={20} fontFamily={'Roboto-SemiBold'} onChangeText={text => {
                            setCalories(parseInt(text)); setShowFields(false);
                        }} keyboardType={'numeric'}/>
                    </View>
                </View>

                {calories < 1  ? <Text style={{ color: 'red', alignSelf: 'center', marginTop: 10}}>Must be more than 0</Text> : null}
                {isNaN(calories) && showFields ? <Text style={{ color: 'red', alignSelf: 'center', marginTop: 10}}>You can't leave this field blank</Text> : null}


                {/* Protein */}
                <View style={styles.inputContainer}>
                    <View style={{ flexDirection: 'row', marginLeft: 20,}}>
                        <MaterialIcons name={'set-meal'} color={color.primary} size={25}/>
                        <Text style={styles.text}>Protein</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginRight: 20,}}>
                        <TextInput placeholder={'enter amount'} fontSize={20} fontFamily={'Roboto-SemiBold'} onChangeText={text => {
                            setProtein(parseInt(text)); setShowFields(false);
                        }} keyboardType={'numeric'}/>
                    </View>
                </View>

                {isNaN(protein) && showFields ? <Text style={{ color: 'red', alignSelf: 'center', marginTop: 10}}>you can't leave this field blank</Text> : null}


                {/* Fat */}
                <View style={styles.inputContainer}>
                    <View style={{ flexDirection: 'row', marginLeft: 20,}}>
                        <MaterialIcons name={'fastfood'} color={color.primary} size={25}/>
                        <Text style={styles.text}>Fat</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginRight: 20,}}>
                        <TextInput placeholder={'enter amount'} fontSize={20} fontFamily={'Roboto-SemiBold'} onChangeText={text => {
                            setFat(parseInt(text)); setShowFields(false);
                        }} keyboardType={'numeric'}/>
                    </View>
                </View>

                {isNaN(fat) && showFields ? <Text style={{ color: 'red', alignSelf: 'center', marginTop: 10}}>you can't leave this field blank</Text> : null}

                {/* carbs */}
                <View style={styles.inputContainer}>
                    <View style={{ flexDirection: 'row', marginLeft: 20,}}>
                        <MaterialIcons name={'rice-bowl'} color={color.primary} size={25}/>
                        <Text style={styles.text}>Carbs</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginRight: 20,}}>
                        <TextInput placeholder={'enter amount'} fontSize={20} fontFamily={'Roboto-SemiBold'} onChangeText={text => {
                            setCarbs(parseInt(text)); setShowFields(false);
                        }} keyboardType={'numeric'}/>
                    </View>
                </View>

                {isNaN(carbs) && showFields ? <Text style={{ color: 'red', alignSelf: 'center', marginTop: 10}}>you can't leave this field blank</Text> : null}

                <TouchableOpacity onPress={() => {onPressCreate()}}>
                    <LinearGradient colors={[color.two, color.one]} style={styles.addMealButton}>
                        <Text style={styles.buttonTitle}>Create</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        createMeal: (meal) => dispatch(mealActions.createMeal(meal)),
    }
}


export default connect(null, mapDispatchToProps)(CreateMeal);

const styles = StyleSheet.create({
    content: {
        marginHorizontal: 20,
    },
    inputContainer: {
        justifyContent: 'space-between',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.white,
        borderRadius: 30,
        paddingVertical: 20,
    },
    addMealButton: {
        backgroundColor: color.two,
        alignSelf: 'center',
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 5,
        marginTop: 30,
    },

    // text
    text: {
        fontFamily: 'Roboto-Bold',
        color: color.primary,
        fontSize: 19,
        marginRight: 20,
    },
    buttonTitle: {
        fontFamily: 'Roboto-Bold',
        color: color.white,
        fontSize: 26,
    },
    iconText: {
        fontFamily: 'Roboto-Black',
        color: color.primary,
        fontSize: 12,
        marginRight: 3,
    },

})
