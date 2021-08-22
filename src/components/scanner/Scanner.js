import React, { useEffect, useState } from "react";
import {StatusBar, Text, View, StyleSheet, Button, TouchableOpacity, Dimensions} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import {color} from "../../../assets/color/color";
import {connect} from "react-redux";
import * as ScannerActions from "../../store/scanner/ScannerActions";
import * as mealActions from "../../store/meals/mealActions";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import TopMenu from "../TopMenu";
import Feather from "react-native-vector-icons/Feather";
import * as mealApiService from "../../services/mealApiService";
import {useIsFocused} from "@react-navigation/native";

const Scanner = ({ navigation }) => {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const {width, height} = Dimensions.get('window');

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission((status == 'granted'));
    })()
  }

  useEffect(() => {
    setScanned(false)
    askForCameraPermission()
  }, []);


  if (hasPermission === null) {
    return (
      <View></View>
    )
  }

  if (hasPermission === false) {
    return (
        <View>
          <StatusBar translucent={false} backgroundColor={color.primary} />
          <Text style={{margin: 10}}>No access to camera</Text>
          <Button title={'Allow access'} onPress={() => askForCameraPermission()}/>
        </View>
    )
  }


  const handleBarCodeScanned = async ({type, data}) => {
    setScanned(true)
    let id = data;
    console.log(scanned)


    navigation.navigate('Loading')

    let item = await mealApiService.getMealById(id).then(() => {
      if (item) {
        console.log(item)
        navigation.navigate('Details', {item})
    } else {
      console.log('we didnt found m')
      navigation.navigate('CreateMeal', {id})
    }})
  }

  return (
    <View style={{ flex: 1,}}>

      <TopMenu>
        <View style={styles.menu}>

          {/* back button */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name={"chevron-left"} size={30} color={color.white} />
          </TouchableOpacity>

          <Text style={styles.menuTitle}>Scanner</Text>
          <View style={{ width: 20,}}/>

        </View>
      </TopMenu>

      <View style={styles.barcodeBox}>
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{height: 525, width: width, backgroundColor: color.three,}}
        />
      </View>

      <LinearGradient
          colors={[color.primary, color.four]}
          style={styles.bottomBox}
          start={{ x: 0, y: 0 }}
          end={{ x: 3, y: 0 }}
      />

    </View>
  )
}


export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    marginTop: 55,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  barcodeBox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  bottomBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // text
  menuTitle: {
    fontFamily: 'Roboto-Bold',
    color: color.white,
    fontSize: 19,
  },
  mainText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 25,
    margin: 20,
    color: color.white,
  },

})
