import { color } from "../../../../../assets/color/color";
import { View, StyleSheet } from "react-native";
import React from 'react';

const TopMenu = props => {
  return (
    <View style={styles.topMenu}>{props.children}</View>
    )
}

export default TopMenu;

const styles = StyleSheet.create({
  topMenu: {
    backgroundColor: color.primary,
    height: '5%',
  },
})
