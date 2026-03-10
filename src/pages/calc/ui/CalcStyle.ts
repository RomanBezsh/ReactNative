import { Keyboard, StyleSheet } from "react-native";
import Colors from "../../../features/config/Colors";


const CalcStyle = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: "#1B2125",
        width: "100%",
    },
    pageTitle: {
        fontWeight: 600,
        color: Colors.primaryTextColor,
    },
    buttonsRow: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 4.0,
        marginHorizontal: 4.0,
    },
    expression: {
        color: "#A5AABD",
        textAlign: "right",
        fontSize: 16.0,
        marginTop: 10.0,
        marginRight: 10.0,
    },
    result: {
        color: "#F7FFFF",
        fontSize: 60.0,
        textAlign: "right",
        marginRight: 10.0,
        marginVertical: 10.0,
    }, 
    keyboard: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginHorizontal: 4.0,
        marginVertical: 8.0,
        gap: 4.0,
    },
    memoryRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingVertical: 5.0,
    }
});


export default CalcStyle;