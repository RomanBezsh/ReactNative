import React, { useRef, useState } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import AnimStyle from "./ui/AnimStyle";

let fadeOutValue = new Animated.Value(1);

export default function Anim() {


    const fadeOutPress = () => {
        Animated.timing(fadeOutValue, {
            toValue: 0.09,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const blinkValue = useRef(new Animated.Value(1)).current;
    const blinkPress = () => {
        Animated.sequence([
            Animated.timing(blinkValue, {
                toValue: 0.0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(blinkValue, {
                toValue: 1.0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const scaleValue = useRef(new Animated.Value(1)).current;
    const [currentScale, setCurrentScale] = useState(1);
    const scalePress = () => {
        const next = currentScale * 0.9;

        Animated.timing(scaleValue, {
            toValue: next,
            duration: 300,
            useNativeDriver: true,
        }).start();

        setCurrentScale(next);
    };

    const fallValue = useRef(new Animated.Value(0)).current;
    const squashValue = useRef(new Animated.Value(1)).current;
    const fallPress = () => {
        Animated.sequence([

            Animated.timing(fallValue, {
                toValue: 100,
                duration: 500,
                useNativeDriver: true,
            }),

            Animated.parallel([
                Animated.timing(squashValue, {
                    toValue: 0.6,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(fallValue, {
                    toValue: 90,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.timing(squashValue, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fallValue, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    };
    const scaleLongPress = () => {
        const next = currentScale * 1.2;

        Animated.timing(scaleValue, {
            toValue: next,
            duration: 300,
            useNativeDriver: true,
        }).start();

        setCurrentScale(next);
    };



    // const transiValue = useRef(new Animated.Value(0.0)).current;

    // const transiPress = () => {
    //     Animated.loop(
    //         Animated.sequence([
    //             Animated.timing(transiValue, {
    //                 toValue: 50,
    //                 duration: 300,
    //                 useNativeDriver: true,
    //             }),
    //             Animated.timing(transiValue, {
    //                 toValue: -50,
    //                 duration: 300,
    //                 useNativeDriver: true,
    //             }),
    //             Animated.timing(transiValue, {
    //                 toValue: 0,
    //                 duration: 300,
    //                 useNativeDriver: true,
    //             }),
    //         ])
    //     ).start();
    // };


    const transiX = useRef(new Animated.Value(0)).current;
    const transiY = useRef(new Animated.Value(0)).current;

    const transiPress = () => {
        Animated.loop(
            Animated.sequence([
                // верхня петля вправо-вгору
                Animated.parallel([
                    Animated.timing(transiX, {
                        toValue: 30,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(transiY, {
                        toValue: -30,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(transiX, {
                        toValue: -30,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(transiY, {
                        toValue: -30,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
                // нижня петля вправо-вниз
                Animated.parallel([
                    Animated.timing(transiX, {
                        toValue: 30,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(transiY, {
                        toValue: 30,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(transiX, {
                        toValue: -30,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(transiY, {
                        toValue: 30,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
                // повернення в центр
                Animated.parallel([
                    Animated.timing(transiX, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(transiY, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
            ])
        ).start();
    };



    const rot1Value = useRef(new Animated.Value(0)).current;
    const rot1Press = () => {
        Animated.sequence([
            Animated.timing(rot1Value, {
                toValue: 45,
                useNativeDriver: true,
                duration: 500
            }),
            Animated.timing(rot1Value, {
                toValue: -45,
                useNativeDriver: true,
                duration: 500
            }),
            Animated.timing(rot1Value, {
                toValue: 0,
                useNativeDriver: true,
                duration: 500
            }),
        ]).start()
    }

    const fin1Value = useRef(new Animated.Value(1.0)).current;
    const [fin1Running, setFin1Running] = useState(false);

    const fin1Press = () => {
        if (fin1Running) {
            fin1Value.stopAnimation(() => {
                fin1Value.setValue(1.0);
            });
            setFin1Running(false);
        } else {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(fin1Value, {
                        toValue: 1.5,
                        useNativeDriver: true,
                        duration: 900,
                    }),
                ])
            ).start();
            setFin1Running(true);
        }
    };



    return (
        <View style={AnimStyle.pageContainer}>
            <Text style={AnimStyle.title}>Анімації</Text>
            <View style={AnimStyle.row}>


                <Pressable style={AnimStyle.anim} onPress={fadeOutPress}>
                    <Animated.View style={[AnimStyle.block, { opacity: fadeOutValue }]}>
                        <View style={AnimStyle.demo}></View>
                        <Text style={AnimStyle.subtitle}>Зникнення</Text>
                    </Animated.View>
                </Pressable>

                <Pressable style={AnimStyle.anim} onPress={blinkPress}>
                    <Animated.View style={[AnimStyle.block, { opacity: blinkValue }]}>
                        <View style={AnimStyle.demo}></View>
                        <Text style={AnimStyle.subtitle}>Блимання</Text>
                    </Animated.View>
                </Pressable>
            </View>

            <View style={AnimStyle.row}>
                <Pressable
                    style={AnimStyle.anim}
                    onPress={scalePress}
                    onLongPress={scaleLongPress}
                >
                    <Animated.View style={[AnimStyle.block, { transform: [{ scale: scaleValue }] }]}>
                        <View style={AnimStyle.demo}></View>
                        <Text style={AnimStyle.subtitle}>Масштабування</Text>
                    </Animated.View>
                </Pressable>


                <Pressable style={AnimStyle.block} onPress={fallPress}>
                    <Animated.View
                        style={[
                            AnimStyle.block,
                            {
                                transform: [
                                    { translateY: fallValue },
                                    { scaleY: squashValue },
                                    {
                                        scaleX: squashValue.interpolate({
                                            inputRange: [0.6, 1],
                                            outputRange: [1.3, 1],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <View style={AnimStyle.demo}></View>
                        <Text style={AnimStyle.subtitle}>Падіння</Text>
                    </Animated.View>

                </Pressable>

            </View>

            <View style={AnimStyle.row}>

                <Pressable style={AnimStyle.anim} onPress={transiPress}>
                    <Animated.View
                        style={[
                            AnimStyle.block,
                            {
                                transform: [
                                    { translateX: transiX },
                                    { translateY: transiY },
                                    {
                                        scale: transiX.interpolate({
                                            inputRange: [-50, 0, 50],
                                            outputRange: [0.75, 1, 1.33]
                                        })
                                    },
                                ]

                            },
                        ]}
                    >
                        <View style={AnimStyle.demo}></View>
                        <Text style={AnimStyle.subtitle}>Вісімка</Text>
                    </Animated.View>
                </Pressable>

                <Pressable style={AnimStyle.anim} onPress={rot1Press}>
                    <Animated.View style={[
                        AnimStyle.block,
                        {
                            transform: [
                                {
                                    rotate: rot1Value.interpolate({
                                        inputRange: [-90, 0, 90],
                                        outputRange: ["-90deg", "0deg", "90deg"],
                                    }),
                                },
                                {
                                    translateX: rot1Value.interpolate({
                                        inputRange: [-90, 90],
                                        outputRange: [150, -150],
                                    })
                                }
                            ],
                        },
                    ]}>
                        <View style={
                            AnimStyle.demo
                        }></View>
                        <Text style={AnimStyle.subtitle}>Оберт</Text>
                    </Animated.View>
                </Pressable>
            </View>

            <View style={AnimStyle.row} >


                <Pressable style={AnimStyle.anim} onPress={fin1Press}>
                    <Animated.View style={[AnimStyle.block, { transform: [{ scale: fin1Value }] }]}>
                        <View style={AnimStyle.demo}></View>
                        <Text style={AnimStyle.subtitle}>Завершення</Text>
                    </Animated.View>
                </Pressable>
            </View>
        </View>
    );
}