import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  BackHandler
} from "react-native";
import React, {useEffect, useState} from "react";
import { color } from "../../../../assets/color/color";
import Menu from "./components/Menu";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import NutritionCard from "./components/NutritionCard";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { personalData } from "../../../../assets/data/personalData";
import * as currentIntakeActions from "../../../store/meals/currentIntakeActions";
import * as mealApiService from "../../../services/mealApiService";


const Details = ({ navigation, route, addIntake }) => {

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [])

  const backAction = () => {
    navigation.navigate('MealSelector')
    return true
  }

  let meal = route.params.item
  const portion = meal.portion;
  const portionType = meal.portionType;
  const profile = personalData;

  const [portionSize, setPortionSize] = useState(1);

  const getCaloriePercentage = () => {
    return meal.calories * portionSize / profile.dailyCalorieGoal * 100;
  }

  const getProteinPercentage = () => {
    return meal.protein * portionSize / profile.dailyProteinGoal * 100;
  }

  const getFatPercentage = () => {
    return meal.fat * portionSize / profile.dailyFatGoal * 100;
  }

  const getCarbPercentage = () => {
    return meal.carbohydrates * portionSize / profile.dailyCarbohydratesGoal * 100;
  }

  const addMealToIntake = async(meal, portionSize) => {
    return await mealApiService.addMealToIntake(meal, portionSize)
  }

  return (
    <SafeAreaView>

      <Menu navigation={navigation} title={meal.name} destination={'MealSelector'}/>

      <KeyboardAvoidingView style={styles.bottomContainer}>

        <View style={{ marginLeft: 20,}}>
          <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 20,}}>

            <MaterialIcons name={'bento'} size={25} color={color.four}/>
            <Text style={styles.cardTitle}>Portion Size</Text>

          </View>

          <View style={styles.searchContainer}>
            <TextInput keyboardType={"numeric"} style={{marginLeft: 10, width: 100}} onChangeText={text => setPortionSize(text)} fontSize={25} fontFamily={'Roboto-Black'}>1</TextInput>
            <Text style={styles.cardExtraText}>{parseInt(portionSize * portion)} {portionType}</Text>
          </View>


        </View>

        <TouchableOpacity onPress={() => {
          addIntake(meal, portionSize)

          navigation.navigate('Loading')
          addMealToIntake(meal, portionSize).then(() => {
            navigation.navigate('Home')
          })
        }}>
          <LinearGradient colors={[color.two, color.one]} style={styles.addMealButton}>
            <Text style={styles.addMealTitle}> Add </Text>
          </LinearGradient>
        </TouchableOpacity>

      </KeyboardAvoidingView>

      <View style={{ flexDirection: 'row', justifyContent: "space-around", marginTop: 40,}}>
        <NutritionCard
            type={'Calories'}
            total={parseInt(meal.calories * portionSize)}
            icon={'inventory'}
            percentage={parseInt(getCaloriePercentage())}/>
        <NutritionCard
            type={'Protein'}
            total={parseInt(meal.protein * portionSize)}
            icon={'set-meal'}
            percentage={parseInt(getProteinPercentage())}/>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: "space-around", marginTop: 30,}}>
        <NutritionCard
            type={'Fat'}
            total={parseInt(meal.fat * portionSize)}
            icon={'fastfood'}
            percentage={parseInt(getFatPercentage())}/>
        <NutritionCard
            type={'Carbs'}
            total={parseInt(meal.carbohydrates * portionSize)}
            icon={'rice-bowl'}
            percentage={parseInt(getCarbPercentage())}/>
      </View>



    </SafeAreaView>
  )
}


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addIntake: (meal, portionSize) => dispatch(currentIntakeActions.addIntake(meal, portionSize)),
  }
}

export default connect(null, mapDispatchToProps)(Details);

const styles = StyleSheet.create({
  addMealButton: {
    marginTop: 50,
    backgroundColor: color.two,
    marginBottom: 30,
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  addMealTitle: {
    fontFamily: 'Roboto-Bold',
    color: color.white,
    fontSize: 26,
  },


  bottomContainer: {
    height: 130,
    backgroundColor: color.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },


  inputCard: {
    width: 150,
    height: 200,
    backgroundColor: color.white,
    borderRadius: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Roboto-SemiBold',
    color: color.four,
    fontSize: 28,
  },
  searchContainer: {
    borderBottomWidth: 1.5,
    borderColor: color.three,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardExtraText: {
    fontFamily: 'Roboto-Regular',
    color: 'grey',
    fontSize: 18,
    marginRight: 10,
  },
})
