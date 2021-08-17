import { Text, View, StyleSheet } from "react-native";
import { color } from "../../../../../assets/color/color";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React from "react";

const MealCard = ({ item }) => {

  let meal = item.meal;
  let portionSize = item.portionSize;
  if (!item.meal) {
    meal = item;
    portionSize = 1;
  }
  let portion = meal.portion;
  let portionType = meal.portionType;

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.cardTitle}>{ meal.name }</Text>
        <Text style={styles.portionText}>{Math.round(portionSize * portion)}{portionType}</Text>
      </View>

      <View style={styles.nutContainer}>

        <View style={styles.icon}>
          <Text style={[styles.nutTitle, { fontSize: 12, color: color.four}]}>Kcal</Text>
          <Text style={[styles.nutTitle, { color: color.four}]}>{ parseInt(meal.calories * portionSize) }</Text>
        </View>

        <View style={styles.icon}>
          <MaterialIcons name={'set-meal'} size={15} color={color.three}/>
          <Text style={[styles.nutTitle, { color: color.three}]}>{ parseInt(meal.protein * portionSize) }g</Text>
        </View>

        <View style={styles.icon}>
          <MaterialIcons name={'fastfood'} size={15} color={color.two}/>
          <Text style={[styles.nutTitle, { color: color.two}]}>{ parseInt(meal.fat * portionSize) }g</Text>
        </View>

        <View style={styles.icon}>
          <MaterialIcons name={'rice-bowl'} size={15} color={color.one}/>
          <Text style={[styles.nutTitle, { color: color.one}]}>{ parseInt(meal.carbohydrates * portionSize) }g</Text>
        </View>

      </View>
    </View>
  )
}

export default MealCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: color.grey,
    borderRadius: 20,
    paddingLeft: 20,
    paddingVertical: 15,
    paddingRight: 5,
    backgroundColor: color.white,
    marginHorizontal: 20,
  },
  cardTitle: {
    fontFamily: 'Roboto-Regular',
    color: color.two,
    fontSize: 22,
  },
  nutContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  nutTitle: {
    fontFamily: 'Roboto-Black',
    color: color.two,
    fontSize: 15,
  },
  icon: {
    alignItems: 'center',
    marginLeft: 13,
  },
  portionText: {
    fontFamily: 'Roboto-Regular',
    color: 'grey',
    fontSize: 12,
  },
})
