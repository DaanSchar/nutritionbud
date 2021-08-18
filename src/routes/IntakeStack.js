import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import AddMeal from "../components/addmeal/MealSelector";
import Details from "../components/details/Details";
import Overview from "../components/overview/Overview";
import Scanner from "../components/scanner/Scanner";
import CreateMeal from "../components/createmeal/CreateMeal";
import MealSelector from "../components/addmeal/MealSelector";

const Stack = createStackNavigator();

const IntakeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'Overview'} component={Overview}/>
    </Stack.Navigator>
  )
}

export default IntakeStack;
