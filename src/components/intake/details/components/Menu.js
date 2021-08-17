import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import React from 'react';
import Feather from "react-native-vector-icons/Feather";
import TopMenu from "../../../TopMenu";
import { color } from "../../../../../assets/color/color";


const Menu = ({ navigation, title }) => {

  return (
      <TopMenu>
        <View style={styles.menu}>
          {/* back button */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name={"chevron-left"} size={30} color={color.white} />
          </TouchableOpacity>

          {/* Menu Title */}
          <Text style={styles.menuTitle}>{ title }</Text>

          <View style={{ width: 30,}}/>


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
