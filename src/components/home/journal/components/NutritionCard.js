import { Text, View, StyleSheet } from "react-native";
import { color } from "../../../../../assets/color/color";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import LinearGradient from "react-native-linear-gradient";

const NutritionCard = ({ type, total, index, goal}) => {

  let colors = [color.one, color.two]
  let nutritionGoal = goal[type.toLowerCase()];

  if (type === 'Carbs')
    nutritionGoal = goal.carbohydrates

  if (index === 1)
    colors = [color.primary, color.three]
  if (index === 2)
    colors = [color.three, color.two]
  if (index === 3)
    colors = [color.one, color.two]

  return (
      <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.card, index === 3 ? {marginRight: 0} : null]}>


      <View style={styles.typeContainer}>
        <FontAwesome5 name={'burn'} size={18} color={color.white}/>
        <Text style={styles.cardTitle}>{ type }</Text>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.cardText}>{ total } g</Text>
        <Text style={[styles.cardExtraText, { fontFamily: 'Roboto-Light' , fontSize: 15}]}>
          {nutritionGoal === null || nutritionGoal == 0 ? '-' : parseInt(total / nutritionGoal * 100) + '%'}
        </Text>
        <Text style={styles.cardExtraText}>
          {nutritionGoal === null ? null : "of today's goal"}
        </Text>
      </View>
      </LinearGradient>
  )
}

export default NutritionCard;

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 150,
    marginLeft: 20,
    backgroundColor: color.white,
    borderRadius: 20,
    flex: 1,
    elevation: 5,
    marginBottom: 10,
  },
  typeContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    marginLeft: 15,
  },
  totalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  // text
  cardTitle: {
    fontFamily: 'Roboto-SemiBold',
    color: color.white,
    fontSize: 22,
    marginLeft: 5,
  },
  cardText: {
    fontFamily: 'Roboto-Regular',
    color: color.white,
    fontSize: 23,
    marginBottom: 5,
  },
  cardExtraText: {
    fontFamily: 'Roboto-Thin',
    color: color.grey,
    fontSize: 13,
  },
})
