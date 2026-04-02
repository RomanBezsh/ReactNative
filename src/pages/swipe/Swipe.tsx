import { GestureResponderEvent, Pressable, Text, TouchableWithoutFeedback, useWindowDimensions, View } from "react-native";
import SwipeStyle from "./ui/SwipeStyle";
import { useState, useRef } from "react";
import React from "react";
import { Animated } from "react-native";
import { MoveDirection } from "./model/MoveDirection";

let eventBegin: GestureResponderEvent | null = null;

const minSwipeLength = 100.0;
const minSwipeVelocity = 100.0 / 400.0;

export default function Swipe() {
    const { width, height } = useWindowDimensions();
    const shortestSide = Math.min(width, height);
    const fieldSize = 0.96 * shortestSide;
    const tileSize = fieldSize / 4.0;
    const [text, setText] = useState<string>("");
    const [field, setField] = useState<Array<number>>(
        [...Array(16).keys()].sort(() => Math.random() - 0.5)
    );
    // const [field, setField] = useState<Array<number>>(
    //     [1, 2, 3, 44, 
    //         5, 6, 7, 8, 
    //         9, 2, 4, 152, 
    //         234, 14, 324, 0] 
    // );
    const [difficulty, setDifficulty] = useState<number>(1);

    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;

    const animateAndMove = (
        direction: MoveDirection,
        moveFunction: () => void,
        toValueX: number,
        toValueY: number
    ) => {
        const animations = [];

        if (toValueX !== 0) {
            animations.push(
                Animated.timing(translateX, {
                    toValue: toValueX,
                    duration: 150,
                    useNativeDriver: true,
                })
            );
        }

        if (toValueY !== 0) {
            animations.push(
                Animated.timing(translateY, {
                    toValue: toValueY,
                    duration: 150,
                    useNativeDriver: true,
                })
            );
        }

        Animated.parallel(animations).start(() => {
            moveFunction();

            const resetAnimations = [];
            if (toValueX !== 0) {
                resetAnimations.push(
                    Animated.timing(translateX, {
                        toValue: 0,
                        duration: 0,
                        useNativeDriver: true,
                    })
                );
            }
            if (toValueY !== 0) {
                resetAnimations.push(
                    Animated.timing(translateY, {
                        toValue: 0,
                        duration: 0,
                        useNativeDriver: true,
                    })
                );
            }

            Animated.parallel(resetAnimations).start();
        });
    };

    const onSwipeRight = () => {
        const emptyTileIndex = field.findIndex(i => i === 0);

        if (emptyTileIndex % 4 !== 0) {
            animateAndMove(MoveDirection.right, () => {
                const newField = [...field];
                const leftTileIndex = emptyTileIndex - 1;

                [newField[emptyTileIndex], newField[leftTileIndex]] = [
                    newField[leftTileIndex],
                    newField[emptyTileIndex]
                ];

                setField(newField);
            }, 20, 0);
        } else {
            setText("Move not allowed");
            // Анімація відмови
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: -10,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: 10,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    };

    const onSwipeLeft = () => {
        const emptyTileIndex = field.findIndex(i => i === 0);

        if (emptyTileIndex % 4 !== 3) {
            animateAndMove(MoveDirection.left, () => {
                const newField = [...field];
                const rightTileIndex = emptyTileIndex + 1;

                [newField[emptyTileIndex], newField[rightTileIndex]] = [
                    newField[rightTileIndex],
                    newField[emptyTileIndex]
                ];

                setField(newField);
            }, -20, 0);
        } else {
            setText("Move not allowed");
            // Анімація відмови
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: 10,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: -10,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    };

    const onSwipeUp = () => {
        const emptyTileIndex = field.findIndex(i => i === 0);

        if (emptyTileIndex < 12) {
            animateAndMove(MoveDirection.up, () => {
                const newField = [...field];
                const belowTileIndex = emptyTileIndex + 4;

                [newField[emptyTileIndex], newField[belowTileIndex]] = [
                    newField[belowTileIndex],
                    newField[emptyTileIndex]
                ];

                setField(newField);
            }, 0, -20);
        } else {
            setText("Move not allowed");

            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: 10,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: -10,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    };

    const onSwipeDown = () => {
        const emptyTileIndex = field.findIndex(i => i === 0);

        if (emptyTileIndex > 3) {
            animateAndMove(MoveDirection.down, () => {
                const newField = [...field];
                const aboveTileIndex = emptyTileIndex - 4;

                [newField[emptyTileIndex], newField[aboveTileIndex]] = [
                    newField[aboveTileIndex],
                    newField[emptyTileIndex]
                ];

                setField(newField);
            }, 0, 20);
        } else {
            setText("Move not allowed");
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: -10,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 10,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    };

    const onGestureBegin = (event: GestureResponderEvent) => {
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
                if (dx < 0) {
                    result += "left";
                    onSwipeLeft();
                } else {
                    result += "right";
                    onSwipeRight();
                }
            } else if (lenY > lenX) {
                result = "Vertical: ";
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
            setText(`\ndX=${dx}\ndY=${dy}\ndt=${dt}\n${result}`);
            eventBegin = null;
        }
    };


    const isPortrait = width < height;

    const getDifficultyColor = (level: number) => {
        switch (level) {
            case 1: return "green";
            case 2: return "#FFC107";
            case 3: return "orange";
            case 4: return "red";
            default: return "#333";
        }
    };

    return <View style={[SwipeStyle.pageContainer, { flexDirection: isPortrait ? "column" : "row" }]}>
        <Text style={{ color: "#fff" }}>Swipe: {text}</Text>

        <Swipeable
            field={field}
            fieldSize={fieldSize}
            tileSize={tileSize}
            onGestureBegin={onGestureBegin}
            onGestureEnd={onGestureEnd}
        />

        <View style={[SwipeStyle.difficultyContainer, {
            marginTop: isPortrait ? 40.0 : 0,
            marginLeft: isPortrait ? 0 : 40.0,
        }]}>
            <View style={[SwipeStyle.difficultySelector,
            {
                flexDirection: !isPortrait ? "column" : "row",
                height: isPortrait ? tileSize : fieldSize,
                width: isPortrait ? fieldSize : tileSize,
            }]}>
                <Pressable
                    onPress={() => setDifficulty(1)}
                    style={[
                        SwipeStyle.difficultyItem,
                        difficulty == 1 && { backgroundColor: getDifficultyColor(1) }
                    ]}
                >
                    <View>
                        <Text style={SwipeStyle.tileText}>1</Text>
                    </View>
                </Pressable>

                <Pressable
                    onPress={() => setDifficulty(2)}
                    style={[
                        SwipeStyle.difficultyItem,
                        difficulty == 2 && { backgroundColor: getDifficultyColor(2) }
                    ]}
                >
                    <View>
                        <Text style={SwipeStyle.tileText}>2</Text>
                    </View>
                </Pressable>

                <Pressable
                    onPress={() => setDifficulty(3)}
                    style={[
                        SwipeStyle.difficultyItem,
                        difficulty == 3 && { backgroundColor: getDifficultyColor(3) }
                    ]}
                >
                    <View>
                        <Text style={SwipeStyle.tileText}>3</Text>
                    </View>
                </Pressable>

                <Pressable
                    onPress={() => setDifficulty(4)}
                    style={[
                        SwipeStyle.difficultyItem,
                        difficulty == 4 && { backgroundColor: getDifficultyColor(4) }
                    ]}
                >
                    <View>
                        <Text style={SwipeStyle.tileText}>4</Text>
                    </View>
                </Pressable>

            </View>
        </View>
    </View>;
}

interface SwipeableProps {
    field: number[];
    fieldSize: number;
    tileSize: number;
    onGestureBegin: (e: any) => void;
    onGestureEnd: (e: any) => void;
}

function Swipeable({
    field,
    fieldSize,
    tileSize,
    onGestureBegin,
    onGestureEnd,
}: SwipeableProps) {
    return (
        <TouchableWithoutFeedback
            onPressIn={onGestureBegin}
            onPressOut={onGestureEnd}
        >
            <View
                style={[
                    SwipeStyle.gameField,
                    { width: fieldSize, height: fieldSize }
                ]}
            >
                {[0, 1, 2, 3].map((rowIndex) => {
                    const rowStart = rowIndex * 4;
                    const rowTiles = field.slice(rowStart, rowStart + 4);

                    const isRowCorrect = rowTiles.every(
                        (tile, i) =>
                            tile === rowStart + i + 1 ||
                            (rowStart + i === 15 && tile === 0)
                    );

                    return (
                        <View key={rowIndex} style={{ flexDirection: "row" }}>
                            {rowTiles.map((tile, colIndex) => (
                                <View
                                    key={colIndex}
                                    style={[
                                        SwipeStyle.tileContainer,
                                        { width: tileSize, height: tileSize }
                                    ]}
                                >
                                    {tile !== 0 && (
                                        <View
                                            style={[
                                                SwipeStyle.tile,
                                                isRowCorrect && {
                                                    backgroundColor: "green"
                                                }
                                            ]}
                                        >
                                            <Text
                                                style={
                                                    tile === rowStart + colIndex + 1
                                                        ? SwipeStyle.tileTextInPlace
                                                        : SwipeStyle.tileText
                                                }
                                            >
                                                {tile}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
                    );
                })}
            </View>
        </TouchableWithoutFeedback>
    );
}
