import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { color } from "../../../../assets/color/color";
import Feather from "react-native-vector-icons/Feather";
import React from "react";
import TopMenu from "../../TopMenu";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Menu = ({ navigation }) => {
  return (
      <TopMenu>
        <View style={styles.menu}>
          {/* back button */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name={"chevron-left"} size={30} color={color.white} />
          </TouchableOpacity>

          {/* Menu Title */}
          <Text style={styles.menuTitle}>Add Meal</Text>

          {/* Scan Button */}
          <TouchableOpacity onPress={() => navigation.navigate('Scanner')}>
            <MaterialIcons name={'flip'} size={30} color={color.white}/>
          </TouchableOpacity>
        </View>
      </TopMenu>
  )
}


export default Menu;


const styles = StyleSheet.create({
  menuTitle: {
    fontFamily: 'Roboto-Bold',
    color: color.white,
    fontSize: 19,
  },
  menu: {
    marginTop: 55,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

})
