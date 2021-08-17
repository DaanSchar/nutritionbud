import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import AddMeal from "../components/intake/addmeal/AddMeal";
import Details from "../components/intake/details/Details";
import Overview from "../components/intake/overview/Overview";
import Scanner from "../components/intake/scanner/Scanner";
import CreateMeal from "../components/intake/createmeal/CreateMeal";

const Stack = createStackNavigator();

const IntakeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Overview'} component={Overview}/>
      <Stack.Screen name={'AddMeal'} component={AddMeal}/>
      <Stack.Screen name={'Details'} component={Details}/>
      <Stack.Screen name={'Scanner'} component={Scanner}/>
      <Stack.Screen name={'CreateMeal'} component={CreateMeal}/>
    </Stack.Navigator>
  )
}

export default IntakeStack;
