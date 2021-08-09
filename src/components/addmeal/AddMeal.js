import { Text, View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, TextInput, FlatList } from "react-native";
import React from 'react';
import { color } from "../../../assets/color/color";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Menu from "./components/Menu";
import { foodData } from "../../../assets/data/foodData";
import MealCard from "./components/MealCard";

/**
 * TODO: start on store
 */
const AddMeal = ({ navigation }) => {

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Details', { item })}>
        <MealCard item={item}/>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <StatusBar translucent={true} backgroundColor={'transparent'} />

      <Menu navigation={navigation}/>

      <View style={styles.search}>
        <View style={styles.searchBarContainer}>
          <MaterialIcons style={{marginLeft: 15,}} name={'search'} color={'grey'} size={25}/>
          <TextInput placeholder={'find a meal'} fontSize={17}></TextInput>
        </View>
      </View>

      <View style={styles.content}>
        <FlatList
          data={foodData}
          keyExtractor={item => item.id}
          renderItem={renderItem}/>
      </View>

    </View>
  )
}


export default (AddMeal)


const styles = StyleSheet.create({
  search: {
    backgroundColor: color.three,
    paddingBottom: 15,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.white,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  content: {
    marginTop: 20,
    marginHorizontal: 20,
  },

})
