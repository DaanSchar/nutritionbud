import { Text, View, StyleSheet, TouchableOpacity, Animated} from "react-native";
import { color } from "../../../../assets/color/color";
import { Swipeable } from "react-native-gesture-handler";
import React from "react";
import MealCard from "../../addmeal/components/MealCard";
import Feather from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import * as currentIntakeActions from "../../../store/meals/currentIntakeActions";
import * as mealApiService from "../../../services/mealApiService";

const SwipeableMealCard = ({ item, deleteMeal }) => {

  const userId = '11'

  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange : [0, 50],
      outputRange: [0, 1],
    });

    const deleteIntake = () => {
      deleteMeal(item)
      mealApiService.deleteIntake(item).then(r => console.log(r))
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
    deleteMeal: (id) => dispatch(currentIntakeActions.deleteMeal(id))
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
    backgroundColor: 'red',
    borderRadius: 200,
    padding: 8,
    marginLeft: 10,
  },
})
