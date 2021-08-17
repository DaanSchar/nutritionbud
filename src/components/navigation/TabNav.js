import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import IntakeStack from "../../routes/IntakeStack";
import Overview from "../progress/Overview";
import {Text, View} from "react-native";
import {color} from "../../../assets/color/color";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

const TabNav = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    elevation: 0,
                    backgroundColor: color.white,
                    height: 75,
                }
            }}
        >
            <Tab.Screen name="Intake" component={IntakeStack} options={{
            tabBarIcon: ({focused}) => (
                <View style={{}}>
                    <Ionicons
                        name={'restaurant-outline'}
                        size={30}
                        color={focused ? color.primary : 'grey'}
                    />
                </View>
                )}
            }/>
            <Tab.Screen name="Progress" component={Overview} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{}}>
                        <Ionicons
                            name={'analytics-outline'}
                            size={45}
                            color={focused ? color.primary : 'grey'}/>
                    </View>
                )}
            }/>
        </Tab.Navigator>
    );
}

export default TabNav;
