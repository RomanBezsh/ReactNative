import { TouchableOpacity, Text } from "react-native";
import { MemoryButtonType, MemoryButtonState } from "../model/MemoryButtonTypes";
import MemoryButtonStyle from "./MemoryButtonStyle";
import React from "react";

export default function MemoryButton({ 
    buttonType, 
    state, 
    text, 
    onPress 
}: { 
    buttonType: MemoryButtonType, 
    state: MemoryButtonState,
    text: string, 
    onPress?: () => void 
}) {
    
    const containerStyle = 
        state === "enabled" ? MemoryButtonStyle.enabledContainer
        : MemoryButtonStyle.disabledContainer;

    const textStyle = 
        state === "enabled" ? MemoryButtonStyle.enabledText
        : MemoryButtonStyle.disabledText;

    return (
        <TouchableOpacity 
            style={[MemoryButtonStyle.container, containerStyle]} 
            onPress={onPress}
            disabled={state === "disabled"}
        >
            <Text style={[MemoryButtonStyle.text, textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
}
