import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import TabNav from "../components/navigation/tabnav/TabNav";
import MealSelector from "../components/addmeal/MealSelector";
import Scanner from "../components/scanner/Scanner";
import Details from "../components/details/Details";
import CreateMeal from "../components/createmeal/CreateMeal";

const Stack = createStackNavigator();

const TabNavStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'Home'} component={TabNav}/>

            <Stack.Screen name={'MealSelector'} component={MealSelector}/>
            <Stack.Screen name={'Details'} component={Details}/>

            <Stack.Screen name={'Scanner'} component={Scanner}/>
            <Stack.Screen name={'CreateMeal'} component={CreateMeal}/>


        </Stack.Navigator>
    )
}

export default TabNavStack;
