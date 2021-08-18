import React from 'react';
import {View, StyleSheet} from "react-native";
import {VictoryArea, VictoryBar, VictoryChart, VictoryLine, VictoryStack, VictoryTheme} from "victory-native";
import {color} from "../../../../assets/color/color";

const Chart = () => {


    return (
        <View style={{marginTop: 100, marginLeft: 15,}}>
            <VictoryChart
                height={300}
            >
                <VictoryArea
                    interpolation="natural"
                    x = 'day'
                    y = 'calories'
                    style={{ data: { fill: 'rgba(247, 157, 101, 0.8)'}}}
                    data={[
                        { day: 1, calories: 2155 },
                        { day: 2, calories: 2049 },
                        { day: 3, calories: 2280 },
                        { day: 4, calories: 2014 },
                        { day: 5, calories: 1943 }
                    ]}
                />
                <VictoryLine
                    x = 'day'
                    y = 'calories'
                    style={{ data: { stroke: 'rgba(247, 157, 101, 1)'}}}
                    data={[
                        { day: 1, calories: 2100 },
                        { day: 2, calories: 2100 },
                        { day: 3, calories: 2100 },
                        { day: 4, calories: 2100 },
                        { day: 5, calories: 2100 }
                    ]}
                />
            </VictoryChart>
        </View>
)
}

export default Chart;

const styles = StyleSheet.create({

    })
