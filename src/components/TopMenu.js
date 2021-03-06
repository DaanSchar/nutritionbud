import { StatusBar, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import React from "react";
import { color } from "../../assets/color/color";

const TopMenu = ({ children }) => {
  return (
    <View>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <LinearGradient
          colors={[color.primary, color.four]}
          style={styles.topMenu}
          start={{ x: 0, y: 0 }}
          end={{ x: 3, y: 0 }}
      >
        { children }
      </LinearGradient>
    </View>
  )
}


export default TopMenu;


const styles = StyleSheet.create({
  topMenu: {
    height: 100,
  },
  menu: {
    marginTop: 55,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

})
