import { GestureResponderEvent, Text, TouchableWithoutFeedback, useWindowDimensions, View } from "react-native";
import SwipeStyle from "./ui/SwipeStyle";
import { useState } from "react";
import React from "react";

let eventBegin: GestureResponderEvent | null = null;

const minSwipeLength = 10.0;
const minSwipeVelocity = 100.0 / 400.0;

export default function Swipe() {
    const { width, height } = useWindowDimensions();
    const shortestSide = Math.min(width, height);
    const fieldSize = 0.96 * shortestSide;
    const tileSize = fieldSize / 4.0 - 4.0;
    const [text, setText] = useState<string>("");
    const [field, setField] = useState<Array<number>>(
        [...Array(16).keys()].sort(() => Math.random() - 0.5)
    );

    const onSwipeRight = () => {
        const emptyTileIndex = field.findIndex(i => i === 0);

        if (emptyTileIndex % 4 !== 0) {
            const newField = [...field];

            const leftTileIndex = emptyTileIndex - 1;

            [newField[emptyTileIndex], newField[leftTileIndex]] = [
                newField[leftTileIndex],
                newField[emptyTileIndex]
            ];

            setField(newField);
        } else {
            setText("Move not allowed");
        }
    };

    const onSwipeLeft = () => {
        const emptyTileIndex = field.findIndex(i => i === 0);

        if (emptyTileIndex % 4 !== 3) {
            const newField = [...field];
            const rightTileIndex = emptyTileIndex + 1;

            [newField[emptyTileIndex], newField[rightTileIndex]] = [
                newField[rightTileIndex],
                newField[emptyTileIndex]
            ];

            setField(newField);
        } else {
            setText("Move not allowed");
        }
    };

    const onSwipeUp = () => {
        const emptyTileIndex = field.findIndex(i => i === 0);

        if (emptyTileIndex < 12) {
            const newField = [...field];
            const belowTileIndex = emptyTileIndex + 4;

            [newField[emptyTileIndex], newField[belowTileIndex]] = [
                newField[belowTileIndex],
                newField[emptyTileIndex]
            ];

            setField(newField);
        } else {
            setText("Move not allowed");
        }
    };

    const onSwipeDown = () => {
        const emptyTileIndex = field.findIndex(i => i === 0);

        if (emptyTileIndex > 3) {
            const newField = [...field];
            const aboveTileIndex = emptyTileIndex - 4;

            [newField[emptyTileIndex], newField[aboveTileIndex]] = [
                newField[aboveTileIndex],
                newField[emptyTileIndex]
            ];

            setField(newField);
        } else {
            setText("Move not allowed");
        }
    };



    const onGestureBegin = (event: GestureResponderEvent) => {
        /*
        event.nativeEvent.pageX/Y - відлік від меж пристрою (сторінки)
        event.nativeEvent.locationX/Y - від меж блоку-детектора
        */
        eventBegin = event;
    };
    const onGestureEnd = (event: GestureResponderEvent) => {
        if (eventBegin) {
            const dx = event.nativeEvent.locationX - eventBegin.nativeEvent.locationX;
            const dy = event.nativeEvent.locationY - eventBegin.nativeEvent.locationY;
            const dt = event.nativeEvent.timestamp - eventBegin.nativeEvent.timestamp;

            setText(`dX=${dx} 
                \ndY=${dy}
                \nt=${dt}`);

            const lenX = Math.abs(dx);
            const lenY = Math.abs(dy);
            let result = "";
            if (lenX > lenY) {
                result = "Horizontal: ";

                // if (lenX < minSwipeLength) {
                //     result += "too short";
                // } else if (lenX / dt < minSwipeVelocity) {
                //     result += "too slow";
                // } else 
                    
                if (dx < 0) {
                    result += "left";
                    onSwipeLeft();
                } else {
                    result += "right";
                    onSwipeRight();
                }
            } else if (lenY > lenX) {
                result = "Vertical: ";

                // if (lenY < minSwipeLength) {
                //     result += "too short";
                // } else if (lenY / dt < minSwipeVelocity) {
                //     result += "too slow";
                // } 
                 if (dy < 0) {
                    result += "up";
                    onSwipeUp();
                } else {
                    result += "down";
                    onSwipeDown();
                }
            } else {
                result = "Diagonal";
            }
            setText(`\ndX=${dx}\ndY=${dy}\ndt=${dt}\n${result}`)
        }
    };

    return (
        <View style={[SwipeStyle.pageContainer, { flexDirection: width < height ? "column" : "row", alignItems: "center" }]}>
            <Text>Swipe: {text}</Text>
            <TouchableWithoutFeedback onPressIn={onGestureBegin} onPressOut={onGestureEnd}>
                <View style={[SwipeStyle.gameField, { width: fieldSize, height: fieldSize }]}>
                    {field.map((i) => {
                        return (
                            <View key={i} style={[SwipeStyle.tileContainer, { width: tileSize, height: tileSize }]}>
                                {i !== 0 && (
                                    <View style={SwipeStyle.tile}>
                                        <Text style={SwipeStyle.tileText}>{i + 1}</Text>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}
