import { Text, View, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { color } from "../../../../assets/color/color";
import React from "react";
import ProgressCircle from "react-native-progress-circle";
import LinearGradient from "react-native-linear-gradient";

const NutritionCard = ({ type, total, icon, percentage}) => {

  let colors = [color.one, color.two]

  if (type === 'Calories')
    colors = [color.primary, color.three]
  if (type === 'Protein')
    colors = [color.three, color.two]
  if (type ==='Fat')
    colors = [color.three, color.two]
  if (type === 'Carbs')
    colors = [color.one, color.two]


  return (
      <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
      >

      <View style={styles.typeContainer}>
        <MaterialIcons name={icon} size={28} color={color.white}/>
        <Text style={styles.cardTitle}>{ type }</Text>
      </View>


      <View style={styles.totalContainer}>
        <ProgressCircle
          percent={percentage}
          radius={50}
          borderWidth={8}
          color={color.primary}
          shadowColor={'#ffe2e0'}
          bgColor={colors[1]}
        >
          <Text style={[styles.cardText,  type === 'Calories' ? {marginLeft: 20} : {}]}>{ total } {type === 'Calories' ? 'kcal' : 'g'}</Text>
          <Text style={styles.cardExtraText}>{percentage}%</Text>
        </ProgressCircle>
      </View>

    </LinearGradient>
  )
}

export default NutritionCard;

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 200,
    backgroundColor: color.white,
    borderRadius: 20,
  },
  typeContainer: { flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  totalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },

  // text
  cardTitle: {
    fontFamily: 'Roboto-SemiBold',
    color: color.white,
    fontSize: 28,
  },
  cardText: {
    fontFamily: 'Roboto-Black',
    color: color.one,
    fontSize: 23,
  },
  cardExtraText: {
    fontFamily: 'Roboto-Regular',
    color: 'grey',
    fontSize: 14,
  },
})
