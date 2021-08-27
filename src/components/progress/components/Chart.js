import {View} from "react-native";
import React from 'react';
import {
    VictoryArea,
    VictoryAxis,
    VictoryChart,
    VictoryLine, VictoryScatter,
} from "victory-native";
const Chart = ({ data, type, goal }) => {

    const getGoalData = () => {
        let output = []

        for (let i = 0; i < data.length; i++) {
            output.push({
                date: data[i].date,
                totalCalories: goal.calories,
                totalProtein: goal.protein,
                totalFat: goal.fat,
                totalCarbohydrates: goal.carbohydrates,
            })
        }
        return output;
    }


    return (
        <View style={{alignSelf: 'center', marginLeft: 10}}>
            <VictoryChart height={300} width={340}>
                <VictoryAxis
                    fixLabelOverlap
                    style={chartStyles.axis}
                    tickFormat={(x) => new Date(x).getDate() + '/' + (new Date(x).getMonth()+1)}
                />
                <VictoryAxis
                    dependentAxis
                    style={chartStyles.axis}
                />
                <VictoryArea
                    interpolation="natural"
                    x = 'date'
                    y ={'total' + type}
                    style={{ data: { fill: 'rgba(255, 255, 255, 0.3)'}}}
                    data={data}
                    animate
                />
                <VictoryScatter
                    x = 'date'
                    y ={'total' + type}
                    data={data}
                    style={chartStyles.scatter}
                    animate
                />
                <VictoryLine
                    x = 'date'
                    y = {'total' + type}
                    animate
                    data={getGoalData()}
                    style={chartStyles.goalLine}
                />
            </VictoryChart>
        </View>
)
}

export default Chart;

const chartStyles = {
    axis: {
        tickLabels: {
            fill: 'white',
            fontFamily: 'Roboto-Italic',
            fontSize: 16,
        },
        axis: {
            stroke: 'white',
            strokeWidth: 2,
        },
        ticks: {
            stroke: "white",
            size: -5,
        },
    },
    scatter: {
        data: {
            fill: "white",
        }

    },
    goalLine: {
        data: {
            stroke: 'rgba(255, 255, 255, 0.7)',
            strokeDasharray: '5,5'
        }
    }
}
