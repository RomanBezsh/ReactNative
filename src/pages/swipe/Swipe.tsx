import { Alert, GestureResponderEvent, Modal, Pressable, Text, TouchableWithoutFeedback, useWindowDimensions, View } from "react-native";
import SwipeStyle from "./ui/SwipeStyle";
import { ReactNode, useEffect, useRef, useState } from "react";
import { MoveDirection } from "./model/MoveDirection";
import React = require("react");

interface IModalData {
    title: string,
    message: string,
    buttons: Array<IModalButton>,
}

interface IModalButton {
    title: string,
    onPress: () => void,
    style: Object
}

export default function Swipe() {
    const { width, height } = useWindowDimensions();
    const shortestSide = Math.min(width, height);
    const fieldSize = 0.96 * shortestSide;
    const tileSize = fieldSize / 4.0;
    const [text, setText] = useState<string>("");
    const [field, setField] = useState<Array<number>>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]);
    //const [field, setField] = useState<Array<number>>(Array.from({ length: 16 }, (_, i) => (i + Math.trunc(i / 4)) % 16));
    const [difficulty, setDifficulty] = useState<number>(1);
    const isPortrait = width < height;
    const continueGame = useRef<boolean>(false);
    const [modalData, setModalData] = useState<IModalData | null>(null);
    const [finishedRows, setFinishedRows] = useEffect<Array<number>>([]);


    // #region gesture detection
    const makeMove = (direction: MoveDirection) => {
        let emptyTileIndex = field.findIndex(i => i == 0);
        let otherTileIndex;
        switch (direction) {
            case MoveDirection.right:
                otherTileIndex = emptyTileIndex % 4 == 0 ? -1 : emptyTileIndex - 1;
                break;
            case MoveDirection.left:
                otherTileIndex = emptyTileIndex % 4 == 3 ? -1 : emptyTileIndex + 1;
                break;
            case MoveDirection.up:
                otherTileIndex = emptyTileIndex >= 12 ? -1 : emptyTileIndex + 4;
                break;
            case MoveDirection.down:
                otherTileIndex = emptyTileIndex < 4 ? -1 : emptyTileIndex - 4;
                break;
        }
        if (otherTileIndex == -1) {
            setText("Рух неможливий");
        }
        else {
            field[emptyTileIndex] = field[otherTileIndex];
            field[otherTileIndex] = 0;
            setField([...field]);
        }
    };

    const onSwipeRight = () => makeMove(MoveDirection.right);
    const onSwipeLeft = () => makeMove(MoveDirection.left);
    const onSwipeTop = () => makeMove(MoveDirection.up);
    const onSwipeBottom = () => makeMove(MoveDirection.down);

    // #endregion

    const gameOver = () => {
        // Alert.alert('Victory', 'You win!\nStart new game or continue?', [{
        //     text: 'New Game',
        //     onPress: () => {
        //         console.log('Cancel Pressed');
        //         continueGame.current = false;
        //     },
        //     style: 'cancel',
        // }, {
        //     text: 'Continue', 
        //     onPress: () => {
        //         console.log('OK Pressed');
        //         continueGame.current = true;
        //         if (difficulty < 4) setDifficulty(difficulty+1);
        //         else setText("You are champion!")
        //     }
        // }]);\

        // setModalVisible(true);

        setModalData({
            title: "Victory",
            message: "Good!",
            buttons: [{
                title: "New Game",
                onPress: () => { continueGame.current = false },
                style: SwipeStyle.buttonOpen
            }, {
                title: "Continue",
                onPress: () => { continueGame.current = true },
                style: SwipeStyle.buttonClose
            },]
        });
    };


    useEffect(() => {
        if (field[0] == 1 && field[1] == 2 && field[2] == 3 && field[3] == 4 && !continueGame.current) {
            checkRows();
        }
    }, [field]);

    const checkRows = () => {
        for (let i = 0; i < 16; i += 4) {
            const rowIndex = i;
            if (!finishedRows.find((index) => index == rowIndex)) {
                let count: number = 0;
                for (let j = i + 1; j < i + 3; j++) {
                    if (field[i] - field[i - 1] == 1) {
                        count++;
                    } else {
                        count = 0;
                        break;
                    }
                }
                if (count == 4) {
                    setFinishedRows(finishedRows.push(rowIndex));
                    gameOver();
                }
            }
        }
    }


    const onDifficultyLeft = () => { if (difficulty > 1) setDifficulty(difficulty - 1) };
    const onDifficultyRight = () => { if (difficulty < 4) setDifficulty(difficulty + 1) };

    return <View style={[SwipeStyle.pageContainer, { flexDirection: isPortrait ? "column" : "row" }]}>

        <Swipeable onSwipeLeft={onDifficultyLeft} onSwipeRight={onDifficultyRight}>
            <View style={[SwipeStyle.difficultyContainer, {
                marginTop: isPortrait ? 40.0 : 0,
                marginLeft: isPortrait ? 0 : 40.0,
            }]}>
                <View style={[SwipeStyle.difficultySelector, {
                    flexDirection: isPortrait ? "row" : "column",
                    height: isPortrait ? tileSize : fieldSize,
                    width: isPortrait ? fieldSize : tileSize,
                }]}>
                    <View style={[difficulty == 1 ? SwipeStyle.difficultyItemSelected : SwipeStyle.difficultyItem]}>
                        <Text style={SwipeStyle.tileText}>1</Text>
                    </View>

                    <View style={[difficulty == 2 ? SwipeStyle.difficultyItemSelected : SwipeStyle.difficultyItem]}>
                        <Text style={SwipeStyle.tileText}>2</Text>
                    </View>

                    <View style={[difficulty == 3 ? SwipeStyle.difficultyItemSelected : SwipeStyle.difficultyItem]}>
                        <Text style={SwipeStyle.tileText}>3</Text>
                    </View>

                    <View style={[difficulty == 4 ? SwipeStyle.difficultyItemSelected : SwipeStyle.difficultyItem]}>
                        <Text style={SwipeStyle.tileText}>4</Text>
                    </View>
                </View>
            </View>
        </Swipeable>

        <Text>Swipe: {text}</Text>

        <Swipeable onSwipeRight={onSwipeRight} onSwipeLeft={onSwipeLeft} onSwipeBottom={onSwipeBottom} onSwipeTop={onSwipeTop} >
            <View style={[SwipeStyle.gameField, { width: fieldSize, height: fieldSize }]}>
                {field.map(i =>
                    <View key={i} style={[SwipeStyle.tileContainer, { width: tileSize, height: tileSize }]}>
                        {i != 0 && <View style={SwipeStyle.tile}>
                            <Text style={true ? SwipeStyle.tileTextInPlace : SwipeStyle.tileText}>{i}</Text>
                        </View>}
                    </View>)}
            </View>
        </Swipeable>

        <View style={[SwipeStyle.difficultyContainer, {
            marginTop: isPortrait ? 40.0 : 0,
            marginLeft: isPortrait ? 0 : 40.0,
        }]}>
            <View style={[SwipeStyle.difficultySelector, {
                flexDirection: isPortrait ? "row" : "column",
                height: isPortrait ? tileSize : fieldSize,
                width: isPortrait ? fieldSize : tileSize,
            }]}>
                <Pressable onPress={() => setDifficulty(1)} style={[difficulty == 1 ? SwipeStyle.difficultyItemSelected : SwipeStyle.difficultyItem]}>
                    <Text style={SwipeStyle.tileText}>1</Text>
                </Pressable>

                <Pressable onPress={() => setDifficulty(2)} style={[difficulty == 2 ? SwipeStyle.difficultyItemSelected : SwipeStyle.difficultyItem]}>
                    <Text style={SwipeStyle.tileText}>2</Text>
                </Pressable>

                <Pressable onPress={() => setDifficulty(3)} style={[difficulty == 3 ? SwipeStyle.difficultyItemSelected : SwipeStyle.difficultyItem]}>
                    <Text style={SwipeStyle.tileText}>3</Text>
                </Pressable>

                <Pressable onPress={() => setDifficulty(4)} style={[difficulty == 4 ? SwipeStyle.difficultyItemSelected : SwipeStyle.difficultyItem]}>
                    <Text style={SwipeStyle.tileText}>4</Text>
                </Pressable>
            </View>
        </View>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalData != null}
            onRequestClose={() => {
                setModalData(null);
            }}>
            <View style={SwipeStyle.centeredView}>
                <View style={SwipeStyle.modalView}>
                    <Text style={SwipeStyle.modalTitle}>{modalData?.message}</Text>
                    <Text style={SwipeStyle.modalText}>{modalData?.title}</Text>
                    {modalData?.buttons ?
                        modalData.buttons.map(btn =>

                            <Pressable
                                key={btn.title}
                                style={[SwipeStyle.button, btn.style]}
                                onPress={() => { setModalData(null); btn.onPress ?? SwipeStyle.buttonClose }}>
                                <Text style={SwipeStyle.textStyle}>{btn.title}</Text>
                            </Pressable>
                        )
                        :
                        <Pressable
                            style={[SwipeStyle.button, SwipeStyle.buttonClose]}
                            onPress={() => setModalData(null)}>
                            <Text style={SwipeStyle.textStyle}>Hide Modal</Text>
                        </Pressable>
                    }

                </View>
            </View>
        </Modal>
    </View>;
}


function Swipeable(
    { onSwipeRight, onSwipeLeft, onSwipeTop, onSwipeBottom, onUrecognized, children }:
        {
            onSwipeRight?: () => void,
            onSwipeLeft?: () => void,
            onSwipeTop?: () => void,
            onSwipeBottom?: () => void,
            onUrecognized?: (reason: string) => void,
            children: ReactNode
        }) {

    const minSwipeLength = 100.0;
    const minSwipeVelocity = 100.0 / 400.0;   // 100 пікселів за 400 мілісекунд

    const eventBegin = useRef<GestureResponderEvent | null>(null);

    const onGestureBegin = (event: GestureResponderEvent) => {
        /*
        event.nativeEvent.pageX/Y - відлік від меж пристрою (сторінки)
        event.nativeEvent.locationX/Y - від меж блоку-детектора
        */
        eventBegin.current = event;
    };
    const onGestureEnd = (event: GestureResponderEvent) => {
        const e1 = eventBegin.current;
        if (e1) {
            const dx = event.nativeEvent.pageX - e1.nativeEvent.pageX;
            const dy = event.nativeEvent.pageY - e1.nativeEvent.pageY;
            const dt = event.nativeEvent.timestamp - e1.nativeEvent.timestamp;
            // є три рішення: жест є горизонтальним, вертикальним або невизначеним (у межах похибок) 
            const lenX = Math.abs(dx);
            const lenY = Math.abs(dy);
            if (lenX > 2 * lenY) {
                // Горизонтальні жести також поділяємо на три варіанти:
                // свайп ліворуч, праворуч або не свайп (закороткий або заповільний)
                if (lenX < minSwipeLength) {
                    if (onUrecognized) onUrecognized("Horizontal: too short");
                }
                else if (lenX / dt < minSwipeVelocity) {
                    if (onUrecognized) onUrecognized("Horizontal: too slow");
                }
                else if (dx < 0) {
                    if (onSwipeLeft) onSwipeLeft();
                }
                else {
                    if (onSwipeRight) onSwipeRight();
                }
            }
            else if (lenY > 2 * lenX) {
                if (lenY < minSwipeLength) {
                    if (onUrecognized) onUrecognized("Vertical: too short");
                }
                else if (lenY / dt < minSwipeVelocity) {
                    if (onUrecognized) onUrecognized("Vertical: too slow");
                }
                else if (dy < 0) {
                    if (onSwipeTop) onSwipeTop();
                }
                else {
                    if (onSwipeBottom) onSwipeBottom();
                }
            }
            else {
                if (onUrecognized) onUrecognized("Diagonal");
            }
        }
    };
    return <TouchableWithoutFeedback onPressIn={onGestureBegin} onPressOut={onGestureEnd}>
        {children}
    </TouchableWithoutFeedback>;
}
/*
Свайп - жест, який складається з послідовності:
-торкання
-проведення
-відпускання
Особливості:
- слід обмежити мінімальну довжину проведення
- ... мінімальну швидкість ...
Питання:
чи буде залежати координатна сітка від орієнтації пристрою?
Перевірка:
сітка також повертається, висновок про горизонтальність
 прив'язується до реальної (світової) горизонталі

Д.З. Реалізувати анімацію переміщення:
На всі види свайпів - переміщень

*/


// import { GestureResponderEvent, Pressable, Text, TouchableWithoutFeedback, useWindowDimensions, View } from "react-native";
// import SwipeStyle from "./ui/SwipeStyle";
// import { useState, useRef } from "react";
// import React from "react";
// import { Animated } from "react-native";
// import { MoveDirection } from "./model/MoveDirection";

// let eventBegin: GestureResponderEvent | null = null;

// const minSwipeLength = 100.0;
// const minSwipeVelocity = 100.0 / 400.0;

// export default function Swipe() {
//     const { width, height } = useWindowDimensions();
//     const shortestSide = Math.min(width, height);
//     const fieldSize = 0.96 * shortestSide;
//     const tileSize = fieldSize / 4.0;
//     const [text, setText] = useState<string>("");
//     const [field, setField] = useState<Array<number>>(
//         [...Array(16).keys()].sort(() => Math.random() - 0.5)
//     );
//     // const [field, setField] = useState<Array<number>>(
//     //     [1, 2, 3, 44,
//     //         5, 6, 7, 8,
//     //         9, 2, 4, 152,
//     //         234, 14, 324, 0]
//     // );
//     const [difficulty, setDifficulty] = useState<number>(1);

//     const translateX = useRef(new Animated.Value(0)).current;
//     const translateY = useRef(new Animated.Value(0)).current;

//     const animateAndMove = (
//         direction: MoveDirection,
//         moveFunction: () => void,
//         toValueX: number,
//         toValueY: number
//     ) => {
//         const animations = [];

//         if (toValueX !== 0) {
//             animations.push(
//                 Animated.timing(translateX, {
//                     toValue: toValueX,
//                     duration: 150,
//                     useNativeDriver: true,
//                 })
//             );
//         }

//         if (toValueY !== 0) {
//             animations.push(
//                 Animated.timing(translateY, {
//                     toValue: toValueY,
//                     duration: 150,
//                     useNativeDriver: true,
//                 })
//             );
//         }

//         Animated.parallel(animations).start(() => {
//             moveFunction();

//             const resetAnimations = [];
//             if (toValueX !== 0) {
//                 resetAnimations.push(
//                     Animated.timing(translateX, {
//                         toValue: 0,
//                         duration: 0,
//                         useNativeDriver: true,
//                     })
//                 );
//             }
//             if (toValueY !== 0) {
//                 resetAnimations.push(
//                     Animated.timing(translateY, {
//                         toValue: 0,
//                         duration: 0,
//                         useNativeDriver: true,
//                     })
//                 );
//             }

//             Animated.parallel(resetAnimations).start();
//         });
//     };

//     const onSwipeRight = () => {
//         const emptyTileIndex = field.findIndex(i => i === 0);

//         if (emptyTileIndex % 4 !== 0) {
//             animateAndMove(MoveDirection.right, () => {
//                 const newField = [...field];
//                 const leftTileIndex = emptyTileIndex - 1;

//                 [newField[emptyTileIndex], newField[leftTileIndex]] = [
//                     newField[leftTileIndex],
//                     newField[emptyTileIndex]
//                 ];

//                 setField(newField);
//             }, 20, 0);
//         } else {
//             setText("Move not allowed");
//             // Анімація відмови
//             Animated.sequence([
//                 Animated.timing(translateX, {
//                     toValue: -10,
//                     duration: 50,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(translateX, {
//                     toValue: 10,
//                     duration: 50,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(translateX, {
//                     toValue: 0,
//                     duration: 50,
//                     useNativeDriver: true,
//                 }),
//             ]).start();
//         }
//     };

//     const onSwipeLeft = () => {
//         const emptyTileIndex = field.findIndex(i => i === 0);

//         if (emptyTileIndex % 4 !== 3) {
//             animateAndMove(MoveDirection.left, () => {
//                 const newField = [...field];
//                 const rightTileIndex = emptyTileIndex + 1;

//                 [newField[emptyTileIndex], newField[rightTileIndex]] = [
//                     newField[rightTileIndex],
//                     newField[emptyTileIndex]
//                 ];

//                 setField(newField);
//             }, -20, 0);
//         } else {
//             setText("Move not allowed");
//             // Анімація відмови
//             Animated.sequence([
//                 Animated.timing(translateX, {
//                     toValue: 10,
//                     duration: 50,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(translateX, {
//                     toValue: -10,
//                     duration: 50,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(translateX, {
//                     toValue: 0,
//                     duration: 50,
//                     useNativeDriver: true,
//                 }),
//             ]).start();
//         }
//     };

//     const onSwipeUp = () => {
//         const emptyTileIndex = field.findIndex(i => i === 0);

//         if (emptyTileIndex < 12) {
//             animateAndMove(MoveDirection.up, () => {
//                 const newField = [...field];
//                 const belowTileIndex = emptyTileIndex + 4;

//                 [newField[emptyTileIndex], newField[belowTileIndex]] = [
//                     newField[belowTileIndex],
//                     newField[emptyTileIndex]
//                 ];

//                 setField(newField);
//             }, 0, -20);
//         } else {
//             setText("Move not allowed");

//             Animated.sequence([
//                 Animated.timing(translateY, {
//                     toValue: 10,
//                     duration: 50,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(translateY, {
//                     toValue: -10,
//                     duration: 50,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(translateY, {
//                     toValue: 0,
//                     duration: 50,
//                     useNativeDriver: true,
//                 }),
//             ]).start();
//         }
//     };

//     const onSwipeDown = () => {
//         const emptyTileIndex = field.findIndex(i => i === 0);

//         if (emptyTileIndex > 3) {
//             animateAndMove(MoveDirection.down, () => {
//                 const newField = [...field];
//                 const aboveTileIndex = emptyTileIndex - 4;

//                 [newField[emptyTileIndex], newField[aboveTileIndex]] = [
//                     newField[aboveTileIndex],
//                     newField[emptyTileIndex]
//                 ];

//                 setField(newField);
//             }, 0, 20);
//         } else {
//             setText("Move not allowed");
//             Animated.sequence([
//                 Animated.timing(translateY, {
//                     toValue: -10,
//                     duration: 50,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(translateY, {
//                     toValue: 10,
//                     duration: 50,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(translateY, {
//                     toValue: 0,
//                     duration: 50,
//                     useNativeDriver: true,
//                 }),
//             ]).start();
//         }
//     };

//     const onGestureBegin = (event: GestureResponderEvent) => {
//         eventBegin = event;
//     };

//     const onGestureEnd = (event: GestureResponderEvent) => {
//         if (eventBegin) {
//             const dx = event.nativeEvent.locationX - eventBegin.nativeEvent.locationX;
//             const dy = event.nativeEvent.locationY - eventBegin.nativeEvent.locationY;
//             const dt = event.nativeEvent.timestamp - eventBegin.nativeEvent.timestamp;

//             setText(`dX=${dx}
//                 \ndY=${dy}
//                 \nt=${dt}`);

//             const lenX = Math.abs(dx);
//             const lenY = Math.abs(dy);
//             let result = "";

//             if (lenX > lenY) {
//                 result = "Horizontal: ";
//                 if (dx < 0) {
//                     result += "left";
//                     onSwipeLeft();
//                 } else {
//                     result += "right";
//                     onSwipeRight();
//                 }
//             } else if (lenY > lenX) {
//                 result = "Vertical: ";
//                 if (dy < 0) {
//                     result += "up";
//                     onSwipeUp();
//                 } else {
//                     result += "down";
//                     onSwipeDown();
//                 }
//             } else {
//                 result = "Diagonal";
//             }
//             setText(`\ndX=${dx}\ndY=${dy}\ndt=${dt}\n${result}`);
//             eventBegin = null;
//         }
//     };


//     const isPortrait = width < height;

//     const getDifficultyColor = (level: number) => {
//         switch (level) {
//             case 1: return "green";
//             case 2: return "#FFC107";
//             case 3: return "orange";
//             case 4: return "red";
//             default: return "#333";
//         }
//     };

//     return <View style={[SwipeStyle.pageContainer, { flexDirection: isPortrait ? "column" : "row" }]}>
//         <Text style={{ color: "#fff" }}>Swipe: {text}</Text>

//         <Swipeable
//             field={field}
//             fieldSize={fieldSize}
//             tileSize={tileSize}
//             onGestureBegin={onGestureBegin}
//             onGestureEnd={onGestureEnd}
//         />

//         <View style={[SwipeStyle.difficultyContainer, {
//             marginTop: isPortrait ? 40.0 : 0,
//             marginLeft: isPortrait ? 0 : 40.0,
//         }]}>
//             <View style={[SwipeStyle.difficultySelector,
//             {
//                 flexDirection: !isPortrait ? "column" : "row",
//                 height: isPortrait ? tileSize : fieldSize,
//                 width: isPortrait ? fieldSize : tileSize,
//             }]}>
//                 <Pressable
//                     onPress={() => setDifficulty(1)}
//                     style={[
//                         SwipeStyle.difficultyItem,
//                         difficulty == 1 && { backgroundColor: getDifficultyColor(1) }
//                     ]}
//                 >
//                     <View>
//                         <Text style={SwipeStyle.tileText}>1</Text>
//                     </View>
//                 </Pressable>

//                 <Pressable
//                     onPress={() => setDifficulty(2)}
//                     style={[
//                         SwipeStyle.difficultyItem,
//                         difficulty == 2 && { backgroundColor: getDifficultyColor(2) }
//                     ]}
//                 >
//                     <View>
//                         <Text style={SwipeStyle.tileText}>2</Text>
//                     </View>
//                 </Pressable>

//                 <Pressable
//                     onPress={() => setDifficulty(3)}
//                     style={[
//                         SwipeStyle.difficultyItem,
//                         difficulty == 3 && { backgroundColor: getDifficultyColor(3) }
//                     ]}
//                 >
//                     <View>
//                         <Text style={SwipeStyle.tileText}>3</Text>
//                     </View>
//                 </Pressable>

//                 <Pressable
//                     onPress={() => setDifficulty(4)}
//                     style={[
//                         SwipeStyle.difficultyItem,
//                         difficulty == 4 && { backgroundColor: getDifficultyColor(4) }
//                     ]}
//                 >
//                     <View>
//                         <Text style={SwipeStyle.tileText}>4</Text>
//                     </View>
//                 </Pressable>

//             </View>
//         </View>
//     </View>;
// }

// interface SwipeableProps {
//     field: number[];
//     fieldSize: number;
//     tileSize: number;
//     onGestureBegin: (e: any) => void;
//     onGestureEnd: (e: any) => void;
// }

// function Swipeable({
//     field,
//     fieldSize,
//     tileSize,
//     onGestureBegin,
//     onGestureEnd,
// }: SwipeableProps) {
//     return (
//         <TouchableWithoutFeedback
//             onPressIn={onGestureBegin}
//             onPressOut={onGestureEnd}
//         >
//             <View
//                 style={[
//                     SwipeStyle.gameField,
//                     { width: fieldSize, height: fieldSize }
//                 ]}
//             >
//                 {[0, 1, 2, 3].map((rowIndex) => {
//                     const rowStart = rowIndex * 4;
//                     const rowTiles = field.slice(rowStart, rowStart + 4);

//                     const isRowCorrect = rowTiles.every(
//                         (tile, i) =>
//                             tile === rowStart + i + 1 ||
//                             (rowStart + i === 15 && tile === 0)
//                     );

//                     return (
//                         <View key={rowIndex} style={{ flexDirection: "row" }}>
//                             {rowTiles.map((tile, colIndex) => (
//                                 <View
//                                     key={colIndex}
//                                     style={[
//                                         SwipeStyle.tileContainer,
//                                         { width: tileSize, height: tileSize }
//                                     ]}
//                                 >
//                                     {tile !== 0 && (
//                                         <View
//                                             style={[
//                                                 SwipeStyle.tile,
//                                                 isRowCorrect && {
//                                                     backgroundColor: "green"
//                                                 }
//                                             ]}
//                                         >
//                                             <Text
//                                                 style={
//                                                     tile === rowStart + colIndex + 1
//                                                         ? SwipeStyle.tileTextInPlace
//                                                         : SwipeStyle.tileText
//                                                 }
//                                             >
//                                                 {tile}
//                                             </Text>
//                                         </View>
//                                     )}
//                                 </View>
//                             ))}
//                         </View>
//                     );
//                 })}
//             </View>
//         </TouchableWithoutFeedback>
//     );
// }
