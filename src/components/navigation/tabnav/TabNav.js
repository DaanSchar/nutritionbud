import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import IntakeStack from "../../../routes/IntakeStack";
import Overview from "../../progress/Overview";
import {Text, View, StyleSheet} from "react-native";
import {color} from "../../../../assets/color/color";
import Ionicons from "react-native-vector-icons/Ionicons";
import MealSelector from "../../addmeal/MealSelector";
import AntDesign from "react-native-vector-icons/AntDesign";
import AddButton from "./components/AddButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Icon from "./components/Icon";

const Tab = createBottomTabNavigator();

const TabNav = ({ navigation }) => {

    const getColor = (focused) => {
        if (focused)
            return color.primary
        return color.offWhite
    }

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: color.white,
                    height: 75,
                    borderTopColor: "transparent"
                }
            }}
        >
            <Tab.Screen name="Journal" component={IntakeStack} options={{
                tabBarIcon: ({focused}) => (
                    <Icon focused={focused} title={'Journal'}>
                        <FontAwesome5 name={'book'} size={23} color={getColor(focused)}/>
                    </Icon>
                )}
            }/>

            <Tab.Screen name="something" component={Overview} options={{
                tabBarIcon: ({focused}) => (
                    <Icon focused={focused} title={'Progress'}>
                        <Ionicons name={'bar-chart'} size={25} color={getColor(focused)}/>
                    </Icon>
                )}
            }/>

            <Tab.Screen name="MealSelector" component={MealSelector} options={{
                tabBarIcon: ({focused}) => (
                    <AddButton navigation={navigation}/>
                )}
            }/>

            <Tab.Screen name="Profile" component={Overview} options={{
                tabBarIcon: ({focused}) => (
                    <Icon focused={focused} title={'Profile'}>
                        <FontAwesome5 name={'user'} size={25} color={getColor(focused)}/>
                    </Icon>
                )}
            }/>

            <Tab.Screen name="Settings" component={Overview} options={{
                tabBarIcon: ({focused}) => (
                    <Icon focused={focused} title={'Settings'}>
                        <FontAwesome5 name={'cog'} size={25} color={getColor(focused)}/>
                    </Icon>
                )}
            }/>
        </Tab.Navigator>
    );
}

export default TabNav;
