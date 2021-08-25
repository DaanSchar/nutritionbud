import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import AddMeal from "../components/home/mealselector/MealSelector";
import Details from "../components/home/details/Details";
import Overview from "../components/home/journal/Journal";
import Scanner from "../components/scanner/Scanner";
import CreateMeal from "../components/home/createmeal/CreateMeal";
import MealSelector from "../components/home/mealselector/MealSelector";

const Stack = createStackNavigator();

const IntakeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'Overview'} component={Overview}/>
    </Stack.Navigator>
  )
}

export default IntakeStack;
