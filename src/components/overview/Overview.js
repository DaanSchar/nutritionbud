import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity, FlatList,
} from "react-native";
import React from 'react';
import { color } from "../../../assets/color/color";
import LinearGradient from "react-native-linear-gradient";
import NutritionCard from "./components/NutritionCard";
import SwipeableMealCard from "./components/SwipeableMealCard";
import { connect } from "react-redux";


const Overview = ({ navigation, meals, totalCalories, totalProtein, totalFat, totalCarbohydrates}) => {


  return (
    <SafeAreaView style={{ flex: 1,}}>

      {/* Menu */}
      <StatusBar translucent={true} backgroundColor={'transparent'} />

      {/* Top*/}
      <LinearGradient colors={[color.primary, color.two]} style={styles.topContainer}>

        <View style={styles.content}>

          <View>
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

        <TouchableOpacity onPress={() => navigation.navigate('AddMeal')}>
          <LinearGradient colors={[color.two, color.one]} style={styles.addMealButton}>
            <Text style={styles.buttonTitle}>Add Meal</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.bottomContainer}>

          <Text style={styles.bottomTitle}>Today's Meals</Text>

          <View style={styles.bottomContent}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={meals}
              keyExtractor={item => item.id}
              renderItem={item => (<SwipeableMealCard item={ item.item}/>)}/>
          </View>
        </View>

      </View>

    </SafeAreaView>
  )
}


const mapStateToProps = (state, ownProps) => ({
  navigation: ownProps.navigation,
  meals: state.currentIntake.meals,
  totalCalories: state.currentIntake.totalCalories,
  totalProtein: state.currentIntake.totalProtein,
  totalFat: state.currentIntake.totalFat,
  totalCarbohydrates: state.currentIntake.totalCarbohydrates,
})

export default connect(mapStateToProps)(Overview);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.grey,
  },
  topContainer: {
    height: '25%',
  },
  content: {
    marginTop: '30%',
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
  bottomContainer: {
    backgroundColor: color.white,
    height: '50%',
    borderRadius: 30,
  },
  bottomContent: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },

  addMealButton: {
    backgroundColor: color.two,
    alignSelf: 'center',
    marginBottom: 30,
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
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
