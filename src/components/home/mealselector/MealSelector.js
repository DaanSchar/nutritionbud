import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView, ActivityIndicator, BackHandler
} from "react-native";
import React, {useEffect, useState} from 'react';
import { color } from "../../../../assets/color/color";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Menu from "./components/Menu";
import MealCard from "./components/MealCard";
import {connect} from "react-redux";
import * as mealApiService from "../../../services/api/mealApiService";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const MealSelector = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [cantLoad, setCantLoad] = useState(false);
  const [data, setData] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    mealApiService.getAllMeals().then(r => {
        setData([...r]);
        setIsLoading(false)
    }).catch(error => {
        console.log(error);
        setCantLoad(true);
    })
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [])

  const backAction = () => {
    navigation.navigate('Home')
    return true
  }

  const sortData = () => {
      return data.filter(item => item.name.toLowerCase().includes(text.toLowerCase()))
  }

  const renderItem = ({ item }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Details', { item })}>
                <MealCard item={item}/>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', backgroundColor: color.grey, marginHorizontal: 5,}}>
                <LinearGradient
                    colors={[color.white, color.grey]}
                    style={styles.separator}
                    start={{x: 0, y: 0}} end={{x: 0.2, y: 0}}
                />
                <LinearGradient
                    colors={[ color.grey, color.white]}
                    style={styles.separator}
                    start={{x: 0.8, y: 0}} end={{x: 1, y: 0}}
                />
            </View>
        </View>
    )
  }


  return (
    <View style={{ flex: 1, backgroundColor: "white"}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />

      <Menu navigation={navigation} destination={'Home'}/>

      <View style={styles.search}>
        <View style={styles.searchBarContainer}>
          <MaterialIcons style={{marginLeft: 15,}} name={'search'} color={'grey'} size={25}/>
          <TextInput style={{flex: 1,}}placeholder={'find a meal'} fontSize={17} onChangeText={text => setText(text)}></TextInput>
        </View>
      </View>

      <View style={styles.content}>
          {
              isLoading && !cantLoad? <ActivityIndicator color={color.primary} size={40} style={{marginTop: 250}}/>
                  :
              <FlatList
              data={sortData()}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}/>
          }
          {
              cantLoad ?
                  <View style={styles.errorContainer}>
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

export default connect(mapStateToProps)(MealSelector)


const styles = StyleSheet.create({
    search: {
        backgroundColor: color.primary,
        paddingBottom: 15,
        width: '100%',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.white,
        borderRadius: 30,
        marginHorizontal: 10,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'green',
    },
    content: {
        flex: 1,
    },
    separator: {
        height: 3,
        flex: 1,
        backgroundColor: color.grey,
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
