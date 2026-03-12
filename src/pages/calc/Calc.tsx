import { Text, View } from "react-native";
import CalcStyle from "./ui/CalcStyle";
import CalcButton from "./ui/CalcButton";
import { CalcButtonTypes } from "./model/CalcButtonTypes";
import MemoryButton from "./ui/MemoryButton";
import { MemoryButtonTypes, MemoryButtonStates } from "./model/MemoryButtonTypes";
import React, { useState } from "react";


const maxDigits: number = 20;
const SHORT_SPACE = '\u202F'; 

export default function Home() {
    const [expression, setExpression] = useState<string>("");
    const [result, setResult] = useState<string>("0");

    const [floatSymbol, setFloatSymbol] = useState<string>("");
    const [memory, setMemory] = useState<number>(0);

    const countDigits = (numStr: string): number => {
        return numStr.replace(/[\s\.\ \-]/g, '').length;
    };

    const formatNumberWithSpaces = (numStr: string): string => {
        const cleanNum = numStr.replace(/\s/g, '').replace(/\u202F/g, ''); 
        
        const parts = cleanNum.split('.');
        let integerPart = parts[0];
        const decimalPart = parts[1];
        
        let sign = '';
        if (integerPart.startsWith('-')) {
            sign = '-';
            integerPart = integerPart.substring(1);
        }
        
        integerPart = integerPart.replace(/^0+(?=\d)/, '');
        if (integerPart === '') {
            integerPart = '0';
        }
        
        let formattedInteger = '';
        for (let i = integerPart.length - 1; i >= 0; i--) {
            if ((integerPart.length - 1 - i) > 0 && (integerPart.length - 1 - i) % 3 === 0) {
                formattedInteger = SHORT_SPACE + formattedInteger;
            }
            formattedInteger = integerPart[i] + formattedInteger;
        }
        
        let result = sign + formattedInteger;
        if (decimalPart !== undefined) {
            result += '.' + decimalPart;
        }
        
        return result;
    };

    const digitClick = (text: string) => {
        let res = result.replace(/\u202F/g, ''); 

        if (result === '0') {
            res = '';
        }
        
        const digitCount = countDigits(res + text);
        
        if (digitCount <= maxDigits) {
            res += text;
        }

        res = formatNumberWithSpaces(res);
        setResult(res);
    };

    const clearResultClick = () => {
        setResult('0');
        setFloatSymbol("");
    };

    const backSpaceClick = () => {
        const cleanRes = result.replace(/\u202F/g, ''); 
        const len: number = cleanRes.length;
        let res = (len > 1)? cleanRes.slice(0, -1) : "0";
        
        res = formatNumberWithSpaces(res);
        setResult(res);
    }

    const dotClick = (text: string) => {
        setFloatSymbol(text);
        if (!(result.includes(text))) {
            let res = result.replace(/\u202F/g, '') + text; 
            res = formatNumberWithSpaces(res);
            setResult(res);
        }
    }

    const pmClick = () => {
        const cleanRes = result.replace(/\u202F/g, ''); 
        
        if (cleanRes.charAt(0) == '0')  return;
        
        let res = "";
        if (cleanRes.charAt(0) != '-' && cleanRes.length != 0) {
            res = "-" + cleanRes;
        }
        else {
            res = cleanRes.slice(1);
        }
        
        res = formatNumberWithSpaces(res);
        setResult(res);
    }

    const mcClick = () => {
        setMemory(0);
    };

    const mrClick = () => {
        let formattedMemory = formatNumberWithSpaces(memory.toString());
        setResult(formattedMemory);
    };

    const mpClick = () => {
        const cleanRes = result.replace(/\u202F/g, ''); 
        setMemory(memory + parseFloat(cleanRes));
        setResult("0");
    };

    const mmClick = () => {
        const cleanRes = result.replace(/\u202F/g, ''); ъ
        setMemory(memory - parseFloat(cleanRes));
        setResult("0");
    };

    const msClick = () => {
        const cleanRes = result.replace(/\u202F/g, ''); /
        setMemory(parseFloat(cleanRes));
        setResult("0");
    };

    const mvClick = () => {
        let formattedMemory = formatNumberWithSpaces(memory.toString());
        setResult(formattedMemory);
    };

    const resultDigitCount = countDigits(result);
    const resultFontSize = resultDigitCount <= 11 ? 60.0 : 660.0 / resultDigitCount;

    return (
        <View style={CalcStyle.pageContainer}>
            <Text style={CalcStyle.pageTitle}>Calculator</Text>
            <Text style={CalcStyle.expression}>{expression}</Text>
            <Text style={[CalcStyle.result, {fontSize: resultFontSize}]}>{result}</Text>
            <View style={CalcStyle.memoryRow}>
                <MemoryButton 
                    buttonType={MemoryButtonTypes.MC} 
                    state={memory === 0 ? MemoryButtonStates.disabled : MemoryButtonStates.enabled}
                    text="MC" 
                    onPress={mcClick}
                />
                <MemoryButton 
                    buttonType={MemoryButtonTypes.MR} 
                    state={memory === 0 ? MemoryButtonStates.disabled : MemoryButtonStates.enabled}
                    text="MR" 
                    onPress={mrClick}
                />
                <MemoryButton 
                    buttonType={MemoryButtonTypes.MP} 
                    state={MemoryButtonStates.enabled}
                    text="M+" 
                    onPress={mpClick}
                />
                <MemoryButton 
                    buttonType={MemoryButtonTypes.MM} 
                    state={MemoryButtonStates.enabled}
                    text="M-" 
                    onPress={mmClick}
                />
                <MemoryButton 
                    buttonType={MemoryButtonTypes.MS} 
                    state={MemoryButtonStates.enabled}
                    text="MS" 
                    onPress={msClick}
                />
                <MemoryButton 
                    buttonType={MemoryButtonTypes.MV} 
                    state={memory === 0 ? MemoryButtonStates.disabled : MemoryButtonStates.enabled}
                    text="Mv" 
                    onPress={mvClick}
                />
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