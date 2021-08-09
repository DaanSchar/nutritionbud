import { Text, View, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { color } from "../../../../assets/color/color";
import React from "react";

const NutritionCard = ({ type, total, icon}) => {
  return (
    <View style={styles.card}>

      <View style={styles.typeContainer}>
        <MaterialIcons name={icon} size={28} color={color.four}/>
        <Text style={styles.cardTitle}>{ type }</Text>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.cardText}>{ total } g</Text>
        <Text style={styles.cardExtraText}>consumed</Text>
      </View>

    </View>
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
    alignItems: 'center',
  },
  typeContainer: { flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center'
  },
  totalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  // text
  cardTitle: {
    fontFamily: 'Roboto-SemiBold',
    color: color.three,
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
