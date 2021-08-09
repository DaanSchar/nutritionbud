import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { color } from "../../../../assets/color/color";
import { Swipeable } from "react-native-gesture-handler";
import React from "react";
import MealCard from "../../addmeal/components/MealCard";
import Feather from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import * as currentIntakeActions from "../../../store/meals/currentIntakeActions";

const SwipeableMealCard = ({ item, deleteMeal }) => {

  const leftSwipe = () => {
    return (
      <View style={styles.deleteBox}>
        <TouchableOpacity onPress={() => {deleteMeal(item.id)}}>
          <View style={styles.circle}>
            <Feather name={'trash-2'} size={22} color={color.white}/>
          </View>
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
    marginBottom: 20,
  },
  circle: {
    backgroundColor: 'red',
    borderRadius: 200,
    padding: 8,
    marginRight: 20,
  },
})
