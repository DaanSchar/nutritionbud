import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity, FlatList, ActivityIndicator, BackHandler,
} from "react-native";
import React, {useEffect, useState} from 'react';
import { color } from "../../../../assets/color/color";
import LinearGradient from "react-native-linear-gradient";
import NutritionCard from "./components/NutritionCard";
import SwipeableMealCard from "./components/SwipeableMealCard";
import { connect } from "react-redux";
import * as mealApiService from "../../../services/api/mealApiService";
import {useIsFocused} from "@react-navigation/native";
import * as currentIntakeActions from "../../../store/meals/currentIntakeActions";
import * as storage from "../../../services/storage";
import MoreCard from "./components/MoreCard";
import Feather from "react-native-vector-icons/Feather";
import * as intakeApiService from "../../../services/api/intakeApiService";


const Journal = ({ navigation, intakes, setMacros, totalCalories, totalProtein, totalFat, totalCarbohydrates, setMeals}) => {

  const [isLoading, setLoading] = useState(true);
  const [cantLoad, setCantLoad] = useState(false);
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused)
      // getUserToken()
      getIntake()
      getMacros()
  }, [isFocused])

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [])

  const backAction = () => {
    return true
  }

  const getIntake = () => {
    intakeApiService.getIntakeToday()
        .then(r => {
          setMeals([...r]);
      })
        .catch(error => {
          console.log(error);
          setCantLoad(true);
      })
  }

  const getMacros = () => {
    intakeApiService.getMacrosToday()
        .then(r => {
          setMacros(r)
          setLoading(false)
      })
        .catch(error => {
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
          style={styles.topContainer}
      >

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
          style={styles.cardContainer}
        >
          <NutritionCard type={'Protein'} total={parseInt(totalProtein)} index={1}/>
          <NutritionCard type={'Fat'} total={parseInt(totalFat)} index={2}/>
          <NutritionCard type={'Carbs'} total={parseInt(totalCarbohydrates)} index={3}/>
          <MoreCard/>
        </ScrollView>

        <View style={styles.bottomContainer}>

          <Text style={styles.bottomTitle}>Today's Meals</Text>

          <View style={styles.bottomContent}>
          {
            intakes.length === 0 ?
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyTitle}>Start tracking your meals </Text>
                  <Feather style={{marginTop: 30,}} name={'arrow-down'} size={25} color={color.primary}/>
                </View>
                :
                intakes.map(item => (
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
  intakes: state.currentIntake.intakes,
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

export default connect(mapStateToProps, mapDispatchToProps)(Journal);

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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 130
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
  },
  emptyTitle: {
    fontFamily: 'Roboto-Light',
    color: 'grey',
    fontSize: 16,
  },
})
