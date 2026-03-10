import { Text, View } from "react-native";
import CalcStyle from "./ui/CalcStyle";
import CalcButton from "./ui/CalcButton";
import { CalcButtonTypes } from "./model/CalcButtonTypes";
import React, { useState } from "react";


const maxDigits: number = 20;

export default function Home() {
    const [expression, setExpression] = useState<string>("");
    const [result, setResult] = useState<string>("0");

    const [floatSymbol, setFloatSymbol] = useState<string>("");

    const digitClick = (text: string) => {
        let res = result;

        if (result === '0') {
            res = '';
        }
        
        if (res.length < maxDigits + (res.includes(floatSymbol)? 1 : 0)) {
            res += text;
            console.log(res.length);
        }

        setResult(res);
    };

    const clearResultClick = () => {
        setResult('0');
    };

    const backSpaceClick = () => {
        const len: number = result.length;
        let res = (len > 1)? result.slice(0, -1) : "0";
        setResult(res);
    }

    const dotClick = (text: string) => {
        setFloatSymbol(text);
        if (!(result.includes(text))) {
            setResult(result + text);
        }
    }

    const pmClick = () => {
        if (result.charAt(0) == '0')  return;
        if (result.charAt(0) != '-' && result.length != 0) {
            setResult("-" + result);
        }
        else {
            setResult(result.slice(1));
        }
    }

    const resultFontSize = result.length <= 11 ? 60.0 : 660.0 / result.length;

    return (
        <View style={CalcStyle.pageContainer}>
            <Text style={CalcStyle.pageTitle}>Calculator</Text>
            <Text style={CalcStyle.expression}>{expression}</Text>
            <Text style={[CalcStyle.result, {fontSize: resultFontSize}]}>{result}</Text>
            <View style={CalcStyle.memoryRow}>
                <Text>Memory buttons</Text>
            </View>
            <View style={CalcStyle.keyboard}>
                <View style={CalcStyle.buttonsRow}>
                    <CalcButton text="%" buttonType={CalcButtonTypes.func} onPress={() => console.log("Press")}/>
                    <CalcButton text="CE" buttonType={CalcButtonTypes.func} />
                    <CalcButton text="C" buttonType={CalcButtonTypes.func} onPress={() => {clearResultClick()}}/>
                    <CalcButton text="⌫" buttonType={CalcButtonTypes.func} onPress={() => {backSpaceClick()}}/>
                </View>
                <View style={CalcStyle.buttonsRow}>
                    <CalcButton text={"\u00b9/\u2093"} buttonType={CalcButtonTypes.func}/>
                    <CalcButton text={"x\u00b2"} buttonType={CalcButtonTypes.func}/>
                    <CalcButton text={"\u221ax\u0305"} buttonType={CalcButtonTypes.func}/>
                    <CalcButton text={"\u00F7"} buttonType={CalcButtonTypes.func}/>
                </View>
                <View style={CalcStyle.buttonsRow}>
                    <CalcButton text="7" buttonType={CalcButtonTypes.digit} onPress={digitClick}/>
                    <CalcButton text="8" buttonType={CalcButtonTypes.digit} onPress={digitClick}/>
                    <CalcButton text="9" buttonType={CalcButtonTypes.digit} onPress={digitClick}/>
                    <CalcButton text={"\u00D7"} buttonType={CalcButtonTypes.func} />
                </View>
                <View style={CalcStyle.buttonsRow}>
                    <CalcButton text="4" buttonType={CalcButtonTypes.digit} onPress={digitClick}/>
                    <CalcButton text="5" buttonType={CalcButtonTypes.digit} onPress={digitClick}/>
                    <CalcButton text="6" buttonType={CalcButtonTypes.digit} onPress={digitClick}/>
                    <CalcButton text={"\u2212"} buttonType={CalcButtonTypes.func} />
                </View>
                <View style={CalcStyle.buttonsRow}>
                    <CalcButton text="1" buttonType={CalcButtonTypes.digit} onPress={digitClick}/>
                    <CalcButton text="2" buttonType={CalcButtonTypes.digit} onPress={digitClick}/>
                    <CalcButton text="3" buttonType={CalcButtonTypes.digit} onPress={digitClick}/>
                    <CalcButton text={"\u002B"} buttonType={CalcButtonTypes.func} />
                </View>
                <View style={CalcStyle.buttonsRow}>
                    <CalcButton text={"\u00B1"} buttonType={CalcButtonTypes.digit} onPress={pmClick}/>
                    <CalcButton text="0" buttonType={CalcButtonTypes.digit} onPress={digitClick}/>
                    <CalcButton text="." buttonType={CalcButtonTypes.digit} onPress={dotClick}/>
                    <CalcButton text={"\uFF1D"} buttonType={CalcButtonTypes.equal} />
                </View>
            </View>
        </View>
    );
}