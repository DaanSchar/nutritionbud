import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import TabNav from "../components/navigation/tabnav/TabNav";
import Profile from "../components/profile/Profile";
import EditGoals from "../components/profile/EditGoals";


const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
            animation={'fade'}
        >
            <Stack.Screen name={'Profile'} component={Profile} />
            <Stack.Screen name={'EditGoals'} component={EditGoals} />



        </Stack.Navigator>
    )
}


export default ProfileStack;
