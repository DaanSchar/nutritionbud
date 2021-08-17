import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView, ActivityIndicator
} from "react-native";
import React, {useEffect, useState} from 'react';
import { color } from "../../../../assets/color/color";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Menu from "./components/Menu";
import MealCard from "./components/MealCard";
import {connect} from "react-redux";
import * as mealApiService from "../../../services/mealApiService";


const AddMeal = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [cantLoad, setCantLoad] = useState(false);
  const [data, setData] = useState([]);

    useEffect(() => {
        mealApiService.getAllMeals().then(r => {
            setData([...r]);
            setIsLoading(false)
        }).catch(error => {
            console.log(error);
            setCantLoad(true);
        })
    }, [])

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Details', { item })}>
        <MealCard item={item}/>
      </TouchableOpacity>
    )
  }


  return (
    <View style={{ flex: 1,}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />

      <Menu navigation={navigation}/>

      <View style={styles.search}>
        <View style={styles.searchBarContainer}>
          <MaterialIcons style={{marginLeft: 15,}} name={'search'} color={'grey'} size={25}/>
          <TextInput placeholder={'find a meal'} fontSize={17}></TextInput>
        </View>
      </View>

      <View style={styles.content}>
          {
              isLoading && !cantLoad? <ActivityIndicator color={color.primary} size={40} style={{marginTop: 250}}/> :
              <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={renderItem}/>
          }
          {
              cantLoad ? <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>Unable to load meals.</Text>
                  <Text style={styles.errorText}>Please try again later</Text>
              </View> : null
          }
      </View>
    </View>
  )
}


const mapStateToProps = (state, ownProps) => ({
    navigation : ownProps.navigation,
    meals: state.meals
})

export default connect(mapStateToProps)(AddMeal)


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
        flex: 1,
    },

    errorContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 400,
    },
    errorText: {
        fontFamily: 'Roboto-Regular',
        color: 'gray',
        fontSize: 15,
    }

})
