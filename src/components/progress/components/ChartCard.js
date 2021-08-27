import LinearGradient from "react-native-linear-gradient";
import {StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import Chart from "./Chart";
import React, {useState} from "react";
import {color} from "../../../../assets/color/color";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const ChartCard = ({ data, goal }) => {

    let colors = [color.four, color.one]
    const [type, setType] = useState('Calories');

    //TODO Play with button colors

    return (
        <View>
            <View style={styles.card}>
                <LinearGradient
                    colors={colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.graphContainer}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginTop: 20,}}>
                        <FontAwesome5 name={'burn'} size={18} color={color.white}/>
                        <Text style={styles.cardTitle}>{type}</Text>
                    </View>
                    <Chart data={data} type={type} goal={goal}/>
                </LinearGradient>
                <View style={styles.cardBottomContainer}>

                    <TouchableOpacity onPress={() => { setType('Calories')}}>
                        <View style={[styles.iconLeft, type === 'Calories' ? { backgroundColor: color.four } : undefined]}>
                            <MaterialIcons name={'inventory'} size={23} color={type === 'Calories' ? color.white : color.offWhite}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setType('Protein')}}>
                        <View style={[styles.icon, type === 'Protein' ? { backgroundColor: color.four } : undefined]}>
                            <MaterialIcons name={'set-meal'} size={23} color={type === 'Protein' ? color.white : color.offWhite}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setType('Fat')}}>
                        <View style={[styles.icon, type === 'Fat' ? { backgroundColor: color.four } : undefined]}>
                            <MaterialIcons name={'fastfood'} size={23} color={type === 'Fat' ? color.white : color.offWhite}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setType('Carbohydrates')}}>
                        <View style={[styles.iconRight, type === 'Carbohydrates' ? { backgroundColor: color.four } : undefined]}>
                            <MaterialIcons name={'rice-bowl'} size={23} color={type === 'Carbohydrates' ? color.white : color.offWhite}/>
                        </View>
                    </TouchableOpacity>


                </View>
            </View>
        </View>
    )
}

export default ChartCard;

const styles = StyleSheet.create({
    card: {
        marginTop: 30,
        backgroundColor: color.white,
        borderRadius: 20,
        flex: 1,
        elevation: 5,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    cardBottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        marginTop: 3,
        height: 55,
        justifyContent: 'center',
        borderBottomWidth: 3,
        paddingVertical: 10,
        flex: 1,
        paddingHorizontal: 27,
        borderColor: color.white,
    },
    iconLeft: {
        marginTop: 3,
        height: 55,
        justifyContent: 'center',
        paddingHorizontal: 27,
        flex: 1,
        borderLeftWidth: 3,
        borderBottomWidth: 3,
        borderColor: color.white,
        borderBottomLeftRadius: 20,
    },
    iconRight: {
        marginTop: 3,
        height: 55,
        justifyContent: 'center',
        borderRightWidth: 3,
        borderBottomWidth: 3,
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 27,
        borderColor: color.white,
        borderBottomRightRadius: 20,
    },


    buttonText: {
        color: 'grey',
        fontSize: 20,
        fontFamily: 'Roboto-Light'
    },
    graphContainer: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    cardTitle: {
        fontFamily: 'Roboto-Regular',
        color: color.white,
        fontSize: 25,
        marginLeft: 7,
    }
})


