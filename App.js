import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import store from "./src/store/store";
import TabNavStack from "./src/routes/TabNavStack";

export default function App() {

    return (
      <Provider store={store}>
        <NavigationContainer>
          <TabNavStack/>
        </NavigationContainer>
      </Provider>
    );
}

