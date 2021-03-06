import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import TabNav from "../components/navigation/tabnav/TabNav";
import MealSelector from "../components/home/mealselector/MealSelector";
import Scanner from "../components/scanner/Scanner";
import Details from "../components/home/details/Details";
import CreateMeal from "../components/home/createmeal/CreateMeal";
import Loading from "../components/home/loading/Loading";

const Stack = createStackNavigator();

const TabNavStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
            animation={'fade'}
        >
            <Stack.Screen name={'Home'} component={TabNav} />

            <Stack.Screen name={'MealSelector'} component={MealSelector}/>
            <Stack.Screen name={'Details'} component={Details} />

            <Stack.Screen name={'Scanner'} component={Scanner} />
            <Stack.Screen name={'CreateMeal'} component={CreateMeal}/>

            <Stack.Screen name={'Loading'} component={Loading}/>

        </Stack.Navigator>
    )
}



// const navigatorOptions = {
//     headerShown: false,
//     cardStyle: { backgroundColor: 'transparent', opacity: 1, },
//     cardStyleInterpolator: ({ current: { progress } }) => ({
//         cardStyle: {
//             opacity: progress.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [0, 1],
//             }),
//         },
//     }),
// }

export default TabNavStack;
