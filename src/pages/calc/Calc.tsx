import { Text, useWindowDimensions, View } from "react-native";
import CalcStyle from "./ui/CalcStyle";
import CalcButton from "./ui/CalcButton";
import { CalcButtonTypes } from "./model/CalcButtonTypes";
import MemoryButton from "./ui/MemoryButton";
import { MemoryButtonTypes, MemoryButtonStates } from "./model/MemoryButtonTypes";
import React, { useState } from "react";
import { CalcOperations } from "./model/CalcOperations";


const maxDigits: number = 20;
const minusSymbol = '\u2212';
const SHORT_SPACE = '\u202F';
const floatSymbol = ',';

interface ICaclState {
    expression: string,
    result: string,
    isNeedClear: boolean,
    operation?: CalcOperations,
    prevArgument?: number,
    isNeedClearEntry: boolean,
};

const initCalcState: ICaclState = {
    expression: "",
    result: "0",
    isNeedClear: true,
    isNeedClearEntry: false
};

export default function Home() {
    const [calcState, setCalcState] = useState<ICaclState>(initCalcState);
    const [memory, setMemory] = useState<number>(0);
    const { width, height } = useWindowDimensions();

    const equalClick = () => {
        if (!calcState.operation) return;
        const operations = {
            "add": numToRes(calcState.prevArgument! + resToNum(calcState.result)),
            "sub": numToRes(calcState.prevArgument! - resToNum(calcState.result)),
            "mul": numToRes(calcState.prevArgument! * resToNum(calcState.result)),
            "div": numToRes(calcState.prevArgument! / resToNum(calcState.result)),
        };
        setCalcState({
            ...calcState,
            result: operations[calcState.operation],
            expression: `${calcState.expression} ${calcState.result} =`,
            operation: undefined,
            prevArgument: undefined,
            isNeedClear: true
        });
    };

    const operButtonClick = (oper: CalcOperations, symbol: string) => {
        setCalcState({
            ...calcState,
            operation: oper,
            expression: `${calcState.result} ${symbol}`,
            prevArgument: resToNum(calcState.result),
            isNeedClearEntry: true
        })
    };

    const countDigits = (numStr: string): number => {
        return numStr.replace(/[\s\.\u202F\-\,]/g, '').length;
    };


    const resToNum = (res: string): number => {
        console.log(res, res.split(SHORT_SPACE).join('').replace(minusSymbol, '-').replace(floatSymbol, '.'))
        return Number(res.split(SHORT_SPACE).join('')
            .replace(minusSymbol, '-')
            .replace(floatSymbol, '.')
        )
    }

    const numToRes = (num: number): string => {
        console.log(num)
        return formatNumberWithSpaces(num.toString()
            .replace('.', floatSymbol)
            .replace('-', minusSymbol));
    }

    const invClick = () => {
        if (calcState.result != '0') {
            const num = 1 / resToNum(calcState.result);
            setCalcState({
                ...calcState,
                result: numToRes(num),
                expression: `1 / ${calcState.result}`,
                isNeedClear: true
            })
        }
    };


    const formatNumberWithSpaces = (numStr: string): string => {
        const cleanNum = numStr.replace(/\s/g, '').replace(/\u202F/g, '');
        const normalized = cleanNum.replace('.', floatSymbol);

        const parts = normalized.split(floatSymbol);
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
            result += floatSymbol + decimalPart;
        }

        return result;
    };

    const digitClick = (text: string) => {
        let newState = { ...calcState };
        let res = calcState.result.replace(/\u202F/g, '');

        if (calcState.isNeedClearEntry) {
            res = text;
            newState.isNeedClearEntry = false;
        } else if (calcState.result === '0') {
            res = text;
            newState.isNeedClear = false;
        } else {
            const digitCount = countDigits(res + text);
            if (digitCount <= maxDigits) {
                res += text;
            }
        }

        res = formatNumberWithSpaces(res);
        newState.result = res;
        newState.expression = newState.isNeedClear ? "" : newState.expression;
        newState.isNeedClear = false;

        setCalcState(newState);
    };

    const clearResultClick = () => {
        setCalcState({
            ...calcState,
            result: '0'
        })
    };

    const backSpaceClick = () => {
        const cleanRes = calcState.result.replace(/\u202F/g, '');
        const len: number = cleanRes.length;
        let res = (len > 1) ? cleanRes.slice(0, -1) : "0";

        res = formatNumberWithSpaces(res);
        setCalcState({
            ...calcState,
            result: res
        })
    }

    const dotClick = (text: string) => {
        let newState = { ...calcState };
        let res = calcState.result.replace(/\u202F/g, '');

        if (calcState.isNeedClearEntry) {
            res = '0' + text;
            newState.isNeedClearEntry = false;
        } else if (!calcState.result.includes(text)) {
            res += text;
        } else {
            return;
        }

        res = formatNumberWithSpaces(res);
        newState.result = res;
        setCalcState(newState);
    }

    const pmClick = () => {
        const cleanRes = calcState.result.replace(/\u202F/g, '');

        if (cleanRes.charAt(0) == '0') return;

        let res = "";
        if (cleanRes.charAt(0) != '-' && cleanRes.length != 0) {
            res = "-" + cleanRes;
        }
        else {
            res = cleanRes.slice(1);
        }

        res = formatNumberWithSpaces(res);
        setCalcState({
            ...calcState,
            result: res
        })
    }

    const mcClick = () => {
        setMemory(0);
    };

    const mrClick = () => {
        let formattedMemory = formatNumberWithSpaces(memory.toString());
        setCalcState({
            ...calcState,
            result: formattedMemory
        })
    };

    const mpClick = () => {
        const cleanRes = calcState.result.replace(/\u202F/g, '');
        setMemory(memory + parseFloat(cleanRes));
        setCalcState({
            ...calcState,
            result: "0"
        })
    };

    const mmClick = () => {
        const cleanRes = calcState.result.replace(/\u202F/g, '');
        setMemory(memory - parseFloat(cleanRes));
        setCalcState({
            ...calcState,
            result: "0"
        })
    };

    const msClick = () => {
        const cleanRes = calcState.result.replace(/\u202F/g, '');
        setMemory(parseFloat(cleanRes));
        setCalcState({
            ...calcState,
            result: "0"
        })
    };

    const mvClick = () => {
        let formattedMemory = formatNumberWithSpaces(memory.toString());
        setCalcState({
            ...calcState,
            result: formattedMemory
        });
    };

    const resultDigitCount = countDigits(calcState.result);
    const resultFontSize = resultDigitCount <= 11 ? 60.0 : 660.0 / resultDigitCount;



    const PortraitView = () => <View style={CalcStyle.pageContainer}>
        <Text style={CalcStyle.pageTitle}>Calculator</Text>
        <Text style={CalcStyle.expression}>{calcState.expression}</Text>
        <Text style={[CalcStyle.result, { fontSize: resultFontSize }]}>{calcState.result}</Text>
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
                <CalcButton text="%" buttonType={CalcButtonTypes.func} onPress={() => console.log("Press")} />
                <CalcButton text="CE" buttonType={CalcButtonTypes.func} />
                <CalcButton text="C" buttonType={CalcButtonTypes.func} onPress={() => { clearResultClick() }} />
                <CalcButton text="⌫" buttonType={CalcButtonTypes.func} onPress={() => { backSpaceClick() }} />
            </View>
            <View style={CalcStyle.buttonsRow}>
                <CalcButton text={"\u00b9/\u2093"} buttonType={CalcButtonTypes.func} onPress={invClick} />
                <CalcButton text={"x\u00b2"} buttonType={CalcButtonTypes.func} />
                <CalcButton text={"\u221ax\u0305"} buttonType={CalcButtonTypes.func} />
                <CalcButton text={"\u00F7"} buttonType={CalcButtonTypes.func} onPress={(face) => operButtonClick(CalcOperations.div, face)} />
            </View>
            <View style={CalcStyle.buttonsRow}>
                <CalcButton text="7" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="8" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="9" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u00D7"} buttonType={CalcButtonTypes.func} onPress={(face) => operButtonClick(CalcOperations.mul, face)} />
            </View>
            <View style={CalcStyle.buttonsRow}>
                <CalcButton text="4" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="5" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="6" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={minusSymbol} buttonType={CalcButtonTypes.func} onPress={(face) => operButtonClick(CalcOperations.sub, face)} />
            </View>
            <View style={CalcStyle.buttonsRow}>
                <CalcButton text="1" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="2" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="3" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\uFF0B"} buttonType={CalcButtonTypes.func} onPress={(face) => operButtonClick(CalcOperations.add, face)} />
            </View>
            <View style={CalcStyle.buttonsRow}>
                <CalcButton text={"\u00B1"} buttonType={CalcButtonTypes.digit} onPress={pmClick} />
                <CalcButton text="0" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={floatSymbol} buttonType={CalcButtonTypes.digit} onPress={dotClick} />
                <CalcButton text={"\uFF1D"} buttonType={CalcButtonTypes.equal} onPress={equalClick} />
            </View>
        </View>
    </View>;
    const LandscapeView = () => <View style={CalcStyle.pageContainer}>
        <View style={CalcStyle.displayLand}>
            <View style={CalcStyle.displayLeftLand}>
                <Text style={CalcStyle.pageTitle}>Calculator</Text>
                <Text style={CalcStyle.expression}>{calcState.expression}</Text>
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
            </View>
            <Text style={[CalcStyle.resultLand, { fontSize: resultFontSize }]}>{calcState.result}</Text>
        </View>

        <View style={CalcStyle.keyboardLand}>
            <View style={CalcStyle.buttonsRow}>
                <CalcButton text={"\u00b9/\u2093"} buttonType={CalcButtonTypes.func} onPress={invClick} />
                <CalcButton text="7" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="8" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="9" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u00F7"} buttonType={CalcButtonTypes.func} onPress={(face) => operButtonClick(CalcOperations.div, face)} />
                <CalcButton text="C" buttonType={CalcButtonTypes.func} onPress={() => { clearResultClick() }} />
            </View>
            <View style={CalcStyle.buttonsRow}>
                <CalcButton text={"x\u00b2"} buttonType={CalcButtonTypes.func} />
                <CalcButton text="4" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="5" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="6" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u00D7"} buttonType={CalcButtonTypes.func} onPress={(face) => operButtonClick(CalcOperations.mul, face)} />
                <CalcButton text="CE" buttonType={CalcButtonTypes.func} />
                
            </View>
            <View style={CalcStyle.buttonsRow}>
                <CalcButton text={"\u221ax\u0305"} buttonType={CalcButtonTypes.func} />
                <CalcButton text="1" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="2" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="3" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={minusSymbol} buttonType={CalcButtonTypes.func} onPress={(face) => operButtonClick(CalcOperations.sub, face)} />
                <CalcButton text="⌫" buttonType={CalcButtonTypes.func} onPress={() => { backSpaceClick() }} />

            </View>
            <View style={CalcStyle.buttonsRow}>
                <CalcButton text="%" buttonType={CalcButtonTypes.func} onPress={() => console.log("Press")} />
                <CalcButton text={"\u00B1"} buttonType={CalcButtonTypes.digit} onPress={pmClick} />
                <CalcButton text="0" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={floatSymbol} buttonType={CalcButtonTypes.digit} onPress={dotClick} />
                <CalcButton text={"\uFF0B"} buttonType={CalcButtonTypes.func} onPress={(face) => operButtonClick(CalcOperations.add, face)} />
                <CalcButton text={"\uFF1D"} buttonType={CalcButtonTypes.equal} onPress={equalClick} />
            </View>
        </View>
    </View>;
    return width < height ? <PortraitView /> : <LandscapeView />;
}
