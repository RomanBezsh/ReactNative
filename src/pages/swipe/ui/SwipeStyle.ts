import { StyleSheet } from "react-native";
import Colors from "../../../features/config/Colors";

const SwipeStyle = StyleSheet.create({
    pageContainer: {
        alignItems: "center",
    },
    gameField: {
        backgroundColor: "#555",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        // justifyContent: "space-between",
    },
    tileRowInPlace: {
        backgroundColor: 'green', // цвет фона для правильного ряда
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 2.0,
    },
    tileContainer: {
        alignItems: "stretch",
        justifyContent: "space-between",
    },
    tile: {
        flex: 1,
        backgroundColor: "#333",
        alignItems: "center",
        justifyContent: "center",
        margin: 2.0,
    },
    tileText: {
        color: Colors.primaryTextColor,
        fontSize: 30.0,
    },
    tileTextInPlace: {
        color: Colors.successTextColor,
        fontSize: 30.0,
    },
    difficultyContainer: {
        //marginVertical: 10.0
    },
    difficultySelector: {
        backgroundColor: "#555",
    },
    difficultyItem: {
        backgroundColor: "#333",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    difficultySelected: {
        flex: 1,
        backgroundColor: "#333",
        borderColor: "#aaa",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        margin: 2.0
    }
});

export default SwipeStyle;