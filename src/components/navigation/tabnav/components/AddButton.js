import {Text, View, StyleSheet, Animated, TouchableWithoutFeedback} from "react-native";
import {color} from "../../../../../assets/color/color";
import React, {useRef} from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import {TouchableOpacity} from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";


const AddButton = ({navigation}) => {
    let buttonSize = new Animated.Value(1)
    let mode = new Animated.Value(0)
    let clicked = false;

    const handlePress = () => {
        clicked = !clicked
        Animated.sequence([
            Animated.timing(buttonSize, {
                toValue: 0.95,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(buttonSize, {
                toValue: 1.0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(mode, {
                duration: clicked ? 200 : 500,
                toValue: clicked ? 1 : 0,
                useNativeDriver: true,
            }),
            Animated.timing(mode, {
                duration: clicked ? 300: 0,
                toValue: clicked ? 0.95 : 0,
                useNativeDriver: true,
            })
        ]).start();

    }

    const center = {x: 0, y: 0}

    const rotation = mode.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg'],
    })

    const addMealX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [center.x, center.x - 45]
    })

    const scanX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [center.x, center.x + 45]
    })

    const buttonsY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [center.y, center.y - 55]
    })

    return (
        <View style={{position: 'absolute', alignItems: 'center', bottom: 20}}>

                <Animated.View style={{
                        position: 'absolute',
                        transform: [{translateX: addMealX}, {translateY: buttonsY}]
                }}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('MealSelector');
                        handlePress();
                    }}>
                        <View style={styles.addMealButton}>
                            <Ionicons name={'restaurant'} size={24} color={'white'}/>
                        </View>
                    </TouchableOpacity>

                </Animated.View>


                <Animated.View style={{
                        position: 'absolute',
                        transform: [{translateX: scanX}, {translateY: buttonsY}]
                }}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Scanner');
                        handlePress();
                    }}>
                        <View style={[styles.addMealButton, { alignItems: 'flex-start'}]}>
                            <Ionicons style={{ marginLeft: 3 }} name={'scan-circle-outline'} size={40} color={'white'}/>
                        </View>
                    </TouchableOpacity>
                </Animated.View>


            <TouchableWithoutFeedback onPress={() => handlePress()}>
                <Animated.View style={[styles.addButton,{ transform: [{scale: buttonSize}]}]}>
                    <Animated.View style={{ transform: [{ rotate: rotation}]}}>
                        <MaterialIcons name={'add'} color={'white'} size={35}/>
                    </Animated.View>
                </Animated.View>
             </TouchableWithoutFeedback>
        </View>
    )
}

export default AddButton;

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: color.four,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        width: 72,
        height: 72,
        elevation: 3,
        borderWidth: 3,
        borderColor: color.white,
    },
    plus: {
        fontFamily: 'Roboto-Regular',
        color: color.white,
        fontSize: 40,
    },
    addMealButton: {
        backgroundColor: color.four,
        justifyContent: 'center',
        alignItems: 'center',
        width: 48,
        height: 48,
        borderRadius: 48,
        borderWidth: 2,
        borderColor: color.white,
    },
})
