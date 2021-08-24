import React from 'react';
import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import store from "./src/store/store";
import TabNavStack from "./src/routes/TabNavStack";
import SplashStack from "./src/routes/SplashStack";
import {color} from "./assets/color/color";

export default function App() {

    return (
      <Provider store={store}>
        <NavigationContainer theme={{ colors: { background: color.white } }}>
          <SplashStack/>
        </NavigationContainer>
      </Provider>
    );
}

