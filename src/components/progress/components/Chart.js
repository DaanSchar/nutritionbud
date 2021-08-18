import React from 'react';
import {View, StyleSheet} from "react-native";
import {VictoryBar, VictoryChart} from "victory-native";

const Chart = () => {

    const data = [
        {quarter: 1, earnings: 13000},
        {quarter: 2, earnings: 16500},
        {quarter: 3, earnings: 14250},
        {quarter: 4, earnings: 19000}
    ];

    return (
        <View style={{marginTop: 100, marginLeft: 15,}}>
            <VictoryChart>
                <VictoryBar
                    data={data}
                    x="quarter"
                    y="earnings"
                />
            </VictoryChart>
        </View>
    )
}

export default Chart;

const styles = StyleSheet.create({

})
