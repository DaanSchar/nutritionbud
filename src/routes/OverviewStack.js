import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import AddMeal from "../components/addmeal/AddMeal";
import Details from "../components/details/Details";
import Scanner from "../components/scanner/Scanner";
import Overview from "../components/overview/Overview";

const Stack = createStackNavigator();

const OverviewStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Overview'} component={Overview}/>
      <Stack.Screen name={'AddMeal'} component={AddMeal}/>
      <Stack.Screen name={'Details'} component={Details}/>
      {/*<Stack.Screen name={'Scanner'} component={Scanner}></Stack.Screen>*/}
    </Stack.Navigator>
  )
}

export default OverviewStack;
