import { Text, View, StyleSheet, TouchableOpacity, Animated} from "react-native";
import { color } from "../../../../../assets/color/color";
import { Swipeable } from "react-native-gesture-handler";
import React from "react";
import MealCard from "../../mealselector/components/MealCard";
import Feather from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import * as currentIntakeActions from "../../../../store/meals/currentIntakeActions";
import * as mealApiService from "../../../../services/api/mealApiService";
import * as intakeApiService from "../../../../services/api/intakeApiService";

const SwipeableMealCard = ({ item, deleteMeal }) => {

  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange : [0, 50],
      outputRange: [0, 1],
    });

    const deleteIntake = () => {
      deleteMeal(item)
      intakeApiService.deleteIntake(item).then(r => console.log(r))
    }


    return (
      <View style={styles.deleteBox}>
        <TouchableOpacity onPress={() => {deleteIntake()}}>
          <Animated.View style={[styles.circle, { transform: [{scale: scale}]}]}>
            <Feather name={'trash-2'} size={22} color={color.white}/>
          </Animated.View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <Swipeable renderLeftActions={leftSwipe}>
      <MealCard item={item}></MealCard>
    </Swipeable>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    deleteMeal: (id) => dispatch(currentIntakeActions.deleteIntake(id))
  }
}

export default connect(null, mapDispatchToProps)(SwipeableMealCard);

const styles = StyleSheet.create({
  deleteBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  circle: {
    backgroundColor: color.primary,
    borderRadius: 200,
    padding: 8,
    marginLeft: 10,
  },
})
