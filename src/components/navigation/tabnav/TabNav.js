import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import IntakeStack from "../../../routes/IntakeStack";
import Overview from "../../progress/Overview";
import {Text, View, StyleSheet} from "react-native";
import {color} from "../../../../assets/color/color";
import Ionicons from "react-native-vector-icons/Ionicons";
import MealSelector from "../../home/mealselector/MealSelector";
import AddButton from "./components/AddButton";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Icon from "./components/Icon";
import Profile from "../../profile/Profile";
import Settings from "../../settings/Settings";
import ProfileStack from "../../../routes/ProfileStack";

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

            <Tab.Screen name="Progress" component={Overview} options={{
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

            <Tab.Screen name="ProfileStack" component={ProfileStack} options={{
                tabBarIcon: ({focused}) => (
                    <Icon focused={focused} title={'Profile'}>
                        <FontAwesome5 name={'user'} size={25} color={getColor(focused)}/>
                    </Icon>
                )}
            }/>

            <Tab.Screen name="Settings" component={Settings} options={{
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
