import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import TopMenu from "../TopMenu";
import {color} from "../../../assets/color/color";

const Settings = () => {
    return (
        <View>
            <TopMenu>
                <View style={{ alignItems: 'center', marginTop: 55, }}>
                    <Text style={styles.title}>Settings</Text>
                </View>
            </TopMenu>

            {/*<View style={styles.contentContainer}>*/}
            {/*</View>*/}

        </View>
    )
}

export default Settings;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Roboto-Bold',
        color: color.white,
        fontSize: 19,
    },
    contentContainer: {
        marginHorizontal: 20,
        marginTop: 30,
        borderWidth: 1.5,
        borderColor: color.offWhite,
        borderRadius: 20,
    },
    section: {
        borderBottomWidth: 1.5,
        borderColor: color.offWhite,

    }
})
