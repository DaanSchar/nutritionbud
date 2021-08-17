import React, { useEffect, useState } from "react";
import {StatusBar, Text, View, StyleSheet, Button, TouchableOpacity, Dimensions} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import {color} from "../../../../assets/color/color";
import {connect} from "react-redux";
import * as ScannerActions from "../../../store/scanner/ScannerActions";
import * as mealActions from "../../../store/meals/mealActions";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import TopMenu from "../../TopMenu";
import Feather from "react-native-vector-icons/Feather";

const Scanner = ({ meals, navigation, scan, findMeal }) => {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('not scanned yet');

  const {width, height} = Dimensions.get('window');

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission((status == 'granted'));
    })()
  }

  useEffect(() => {
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

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    setText(data);
    scan(data)

    let item = findMeal(data);
    let id = data;

    // TODO: transition to right screen

    if (!(item === null))
      navigation.navigate('Details', { item })
    else
      navigation.navigate('CreateMeal', { id })
  }

  function findMeal(id) {
    for (let i = 0; i < meals.length; i++) {
      if (meals[i].id === id) {
        return meals[i];
      }
    }
    return null;
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

      <LinearGradient colors={[color.three, color.two]} style={styles.bottomBox}>
        <Text style={styles.mainText}>{text}</Text>
        {scanned && <Button title={'scan again?'} onPress={() => setScanned(false)} color={'tomato'}/>}
      </LinearGradient>

    </View>
  )
}

const mapStateToProps = (state, ownProps) => ({
  navigation: ownProps.navigation,
  meals: state.meals,
})

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    scan: (data) => dispatch(ScannerActions.scan(data)),
    findMeal: (id) => dispatch(mealActions.findById(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scanner);

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
