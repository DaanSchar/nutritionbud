import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from "react-redux";
import OverviewStack from "./src/routes/OverviewStack";
import {NavigationContainer} from "@react-navigation/native";
import store from "./src/store/store";

export default function App() {
  return (
      <Provider store={store}>
        <NavigationContainer>
          <OverviewStack/>
        </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
