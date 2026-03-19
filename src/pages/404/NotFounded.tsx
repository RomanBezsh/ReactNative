import React from "react";
import { View, Image, StyleSheet } from "react-native";



export default function NotFounded() {

    return (
        <View>
            <Image style={NotFoundedStyle.image} source={require("../../features/asset/404.png")} />
        </View>
    );
}


const NotFoundedStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
    }
});
