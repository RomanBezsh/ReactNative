import React from "react";
import { View, Image, StyleSheet } from "react-native";



export default function NotFounded() {

    return (
        <View>
            <Image source={require("../../app/asset/404.png")} />
        </View>
    );
}


const NotFoundedStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});
