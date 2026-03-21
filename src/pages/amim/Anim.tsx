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

                <Pressable style={AnimStyle.block} onPress={blinkPress}>
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
        </View>
    );
}