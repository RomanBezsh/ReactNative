import { Text, View } from "react-native";
import CalcStyle from "./ui/CalcStyle";
import CalcButton from "./ui/CalcButton";
import { CalcButtonTypes } from "./model/CalcButtonTypes";

export default function Home() {

    return (
        <View style={CalcStyle.pageContainer}>
            <Text style={CalcStyle.pageTitle}>Calculator</Text>
            <Text style={CalcStyle.expression}>23 + 45 =</Text>
            <Text style={CalcStyle.result}>68</Text>
            <View style={CalcStyle.memoryRow}>
                <Text>Memory buttons</Text>
            </View>
            <View style={CalcStyle.keyboard}>
                <View style={CalcStyle.buttonsRow}>
                    <CalcButton text="%" buttonType={CalcButtonTypes.func} />
                    <CalcButton text="CE" buttonType={CalcButtonTypes.func} />
                    <CalcButton text="C" buttonType={CalcButtonTypes.func} />
                    <CalcButton text="⌫" buttonType={CalcButtonTypes.func} />
                </View>
                <View style={CalcStyle.buttonsRow}>
                    <CalcButton text={"\u00b9/\u2093"} buttonType={CalcButtonTypes.func}/>
                    <CalcButton text={"x\u00b2"} buttonType={CalcButtonTypes.func}/>
                    <CalcButton text={"\u221ax\u0305"} buttonType={CalcButtonTypes.func}/>
                    <CalcButton text={"\u00F7"} buttonType={CalcButtonTypes.func}/>
                </View>
                <View style={CalcStyle.buttonsRow}>
                    <CalcButton text="7" buttonType={CalcButtonTypes.digit} />
                    <CalcButton text="8" buttonType={CalcButtonTypes.digit} />
                    <CalcButton text="9" buttonType={CalcButtonTypes.digit} />
                    <CalcButton text={"\u00D7"} buttonType={CalcButtonTypes.func} />
                </View>
                <View style={CalcStyle.buttonsRow}>
                    <CalcButton text="4" buttonType={CalcButtonTypes.digit} />
                    <CalcButton text="5" buttonType={CalcButtonTypes.digit} />
                    <CalcButton text="6" buttonType={CalcButtonTypes.digit} />
                    <CalcButton text={"\u2212"} buttonType={CalcButtonTypes.func} />
                </View>
                <View style={CalcStyle.buttonsRow}>
                    <CalcButton text="1" buttonType={CalcButtonTypes.digit} />
                    <CalcButton text="2" buttonType={CalcButtonTypes.digit} />
                    <CalcButton text="3" buttonType={CalcButtonTypes.digit} />
                    <CalcButton text={"\u002B"} buttonType={CalcButtonTypes.func} />
                </View>
                <View style={CalcStyle.buttonsRow}>
                    <CalcButton text={"\u00B1"} buttonType={CalcButtonTypes.digit} />
                    <CalcButton text="0" buttonType={CalcButtonTypes.digit} />
                    <CalcButton text="." buttonType={CalcButtonTypes.digit} />
                    <CalcButton text={"\uFF1D"} buttonType={CalcButtonTypes.equal} />
                </View>
            </View>
        </View>
    );
}