import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View, } from 'react-native';
import {Provider} from "react-redux";
import IntakeStack from "./src/routes/IntakeStack";
import {NavigationContainer} from "@react-navigation/native";
import store from "./src/store/store";
import TabNav from "./src/components/navigation/TabNav";

export default function App() {

    const url = 'https://reactnative.dev/movies.json'
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    // useEffect(() => {
    //     fetch(url)
    //         .then( (response) => response.json() )
    //         .then( (json) => setData(json.movies) )
    //         .catch( (error) => alert(error) )
    //         .then(setIsLoading(false))
    // })

    return (
      <Provider store={store}>
        <NavigationContainer>
          <TabNav/>
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
