import {ActivityIndicator, Text, View} from "react-native";
import {color} from "../../../../assets/color/color";
import React from "react";

const Loading = ({ route }) => {

    return (
        <View>
            <ActivityIndicator size={35} color={color.primary} style={{ marginTop: 350}}/>
        </View>
    )
}

export default Loading

