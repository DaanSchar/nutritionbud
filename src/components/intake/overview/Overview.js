import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity, FlatList, ActivityIndicator,
} from "react-native";
import React, {useEffect, useState} from 'react';
import { color } from "../../../../assets/color/color";
import LinearGradient from "react-native-linear-gradient";
import NutritionCard from "./components/NutritionCard";
import SwipeableMealCard from "./components/SwipeableMealCard";
import { connect } from "react-redux";
import * as mealApiService from "../../../services/mealApiService";
import {useIsFocused} from "@react-navigation/native";
import * as currentIntakeActions from "../../../store/meals/currentIntakeActions";
import {getMacros} from "../../../services/mealApiService";


const Overview = ({ navigation, meals, setMacros, totalCalories, totalProtein, totalFat, totalCarbohydrates, setMeals}) => {

  const [isLoading, setLoading] = useState(true);
  const [cantLoad, setCantLoad] = useState(false);
  const isFocused = useIsFocused()
  const userId = '1'
  const id = '2222'

  useEffect(() => {
    if (isFocused)
      getIntake()
      getMacros()
  }, [isFocused])

  const getIntake = () => {
    mealApiService.getIntakeToday().then(r => {
      setMeals([...r]);
    }).catch(error => {
      console.log(error);
      setCantLoad(true);
    })
  }

  const getMacros = () => {
    mealApiService.getMacros(userId).then(r => {
      setMacros(r)
      setLoading(false)
    }).catch(error => {
      console.log(error);
      setCantLoad(true);
    })
  }

  return (
      isLoading ? <ActivityIndicator color={color.primary} size={40} style={{marginTop: 250}}/> :
    <ScrollView showsVerticalScrollIndicator={false}>

    {/* Menu */}
    <StatusBar translucent={true} backgroundColor={'transparent'} />

    <LinearGradient colors={[color.primary, color.two]} style={styles.topContainer}>

      <View style={styles.topContent}>

        <View style={{}}>
          <Text style={styles.title}>Today's Total Intake</Text>
          <Text style={styles.calorieTitle}>{parseInt(totalCalories)} Kcal</Text>
        </View>

      </View>
    </LinearGradient>

    {/* Content */}
    <View style={styles.container}>

      {/* Nutrition */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={true}
        style={styles.cardContainer}>
        <NutritionCard type={'Protein'} total={parseInt(totalProtein)} icon={'set-meal'}/>
        <NutritionCard type={'Fat'} total={parseInt(totalFat)} icon={'fastfood'}/>
        <NutritionCard type={'Carbs'} total={parseInt(totalCarbohydrates)} icon={'rice-bowl'}/>
      </ScrollView>

      <TouchableOpacity onPress={() => navigation.navigate('AddMeal') }>
        <LinearGradient colors={[color.two, color.one]} style={styles.addMealButton}>
          <Text style={styles.buttonTitle}>Add Meal</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>

        <Text style={styles.bottomTitle}>Today's Meals</Text>

        <View style={styles.bottomContent}>
          {
            meals.map(item => (<SwipeableMealCard key={item.id} item={item}/>))
          }
        </View>
      </View>

      </View>
    </ScrollView>
  )
}


const mapStateToProps = (state, ownProps) => ({
  navigation: ownProps.navigation,
  meals: state.currentIntake.meals,
  totalCalories: state.currentIntake.macros.totalCalories,
  totalProtein: state.currentIntake.macros.totalProtein,
  totalFat: state.currentIntake.macros.totalFat,
  totalCarbohydrates: state.currentIntake.macros.totalCarbohydrates,
})

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    setMeals: (data) => dispatch(currentIntakeActions.setMeals(data)),
    setMacros: (data) => dispatch(currentIntakeActions.setMacros(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview);

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.grey,
  },
  topContainer: {
    backgroundColor: color.primary,
  },
  topContent: {
    marginTop: 100,
    marginHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
  bottomContainer: {
    marginTop: 30,
    backgroundColor: color.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    minHeight: 337,
  },
  bottomContent: {
    marginTop: 10,
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
  title: {
    fontFamily: 'Roboto-Regular',
    color: color.white,
    fontSize: 15,
  },
  calorieTitle: {
    fontFamily: 'Roboto-Black',
    color: color.white,
    fontSize: 28,
  },
  buttonTitle: {
    fontFamily: 'Roboto-Bold',
    color: color.white,
    fontSize: 26,
  },
  bottomTitle: {
    marginTop: 10,
    fontFamily: 'Roboto-SemiBold',
    color: color.two,
    fontSize: 26,
    alignSelf: 'center',
  }
})
