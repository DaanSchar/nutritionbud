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
import { color } from "../../../assets/color/color";
import LinearGradient from "react-native-linear-gradient";
import NutritionCard from "./components/NutritionCard";
import SwipeableMealCard from "./components/SwipeableMealCard";
import { connect } from "react-redux";
import * as mealApiService from "../../services/mealApiService";
import {useIsFocused} from "@react-navigation/native";
import * as currentIntakeActions from "../../store/meals/currentIntakeActions";
import {getMacros} from "../../services/mealApiService";


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

    <LinearGradient
        colors={[color.primary, color.two]}
        start={{ x: 0, y: 0 }}
        end={{ x: 3, y: 0 }}
        style={styles.topContainer}>

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
        <NutritionCard type={'Protein'} total={parseInt(totalProtein)} index={1}/>
        <NutritionCard type={'Fat'} total={parseInt(totalFat)} index={2}/>
        <NutritionCard type={'Carbs'} total={parseInt(totalCarbohydrates)} index={3}/>
      </ScrollView>

      <View style={styles.bottomContainer}>

        <Text style={styles.bottomTitle}>Today's Meals</Text>

        <View style={styles.bottomContent}>
          {
            meals.map(item => (
                <View key={item.id}>
                  <View style={{flexDirection: 'row', backgroundColor: color.grey, marginHorizontal: 5,}}>
                    <LinearGradient
                        colors={[color.white, color.grey]}
                        style={styles.separator}
                        start={{x: 0, y: 0}} end={{x: 0.2, y: 0}}
                    />
                    <LinearGradient
                        colors={[ color.grey, color.white]}
                        style={styles.separator}
                        start={{x: 0.8, y: 0}} end={{x: 1, y: 0}}
                  />
                    </View>
                  <SwipeableMealCard item={item}/>
                </View>
            ))
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
    flex: 1,
    backgroundColor: color.white,
  },
  topContainer: {
    flex: 1,
    backgroundColor: color.primary,
  },
  separator: {
    height: 3,
    flex: 1,
    backgroundColor: color.grey,
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
  cardContainer: {
    flex: 1,
    marginTop: 30,
    flexDirection: 'row',
  },
  bottomContainer: {
    backgroundColor: color.white,
    flex: 1,
    minHeight: 327,
    marginTop: 10,
  },
  bottomContent: {
    flex: 1,
    backgroundColor: color.white,
    marginTop: 10,
  },


  // text
  title: {
    fontFamily: 'Roboto-Regular',
    color: color.white,
    fontSize: 15,
  },
  calorieTitle: {
    fontFamily: 'Roboto-Light',
    color: color.white,
    fontSize: 45,
  },
  bottomTitle: {
    marginTop: 10,
    fontFamily: 'Roboto-SemiBold',
    color: color.two,
    fontSize: 26,
    alignSelf: 'center',
  }
})
