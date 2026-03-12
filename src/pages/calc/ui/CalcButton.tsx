import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { CalcButtonTypes } from "../model/CalcButtonTypes";
import CalcButtonStyle from "./CalcButtonStyle";
import React from "react";

export default function CalcButton({ buttonType, text, onPress }: 
    { buttonType: CalcButtonTypes, text: string, onPress?: (text: string) => void }) {
    
    const containerStyle = 
        buttonType === CalcButtonTypes.digit ? CalcButtonStyle.digitContainer
        : buttonType === CalcButtonTypes.equal ? CalcButtonStyle.equalContainer
        : CalcButtonStyle.funcContainer;

    const textStyle = 
        buttonType === CalcButtonTypes.digit ? CalcButtonStyle.digitText
        : buttonType === CalcButtonTypes.equal ? CalcButtonStyle.equalText
        : CalcButtonStyle.funcText;

    return (
        <TouchableOpacity style={[CalcButtonStyle.container, containerStyle]} onPress={() => {if (onPress) onPress(text)}}>
            <Text style={[CalcButtonStyle.text, textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
}

