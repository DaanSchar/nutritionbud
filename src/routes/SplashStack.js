import {createStackNavigator, CardStyleInterpolators, TransitionPresets} from "@react-navigation/stack";
import React from "react";
import Login from "../components/splashscreen/Login";
import Register from "../components/splashscreen/Register";
import SplashScreen from "../components/splashscreen/SplashScreen";
import TabNavStack from "./TabNavStack";
import {color} from "../../assets/color/color";
import {Startup} from "../components/splashscreen/Startup";
import TabNav from "../components/navigation/tabnav/TabNav";

const Stack = createStackNavigator();

const SplashStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                transitionSpec: {
                    open: config,
                    close: config,
                },
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
            }}
            animation={'fade'}
        >
            <Stack.Screen name={'Startup'} component={Startup}/>
            <Stack.Screen name={'SplashScreen'} component={SplashScreen}/>
            <Stack.Screen name={'Login'} component={Login} />
            <Stack.Screen name={'Register'} component={Register}/>
            <Stack.Screen name={'App'} component={TabNavStack}/>
        </Stack.Navigator>
    )
}

const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 5,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

const navigatorOptions = {
    headerShown: false,
    cardStyle: { backgroundColor: 'transparent', opacity: 1, },
    cardStyleInterpolator: ({ current: { progress } }) => ({
        cardStyle: {
            opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            }),
        },
    }),
}



export default SplashStack;
