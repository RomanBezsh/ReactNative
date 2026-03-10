import { StyleSheet } from "react-native";

const CalcButtonStyle = StyleSheet.create({
    container: {
        backgroundColor: "#2C333E",
        borderRadius: 5.0,
        flex: 1,
        justifyContent: "center", // display: "flex" в RN по дефолту, можно убрать
        alignItems: "center",
    },
    digitContainer: {
        backgroundColor: "#353A4E",
    },
    funcContainer: {
        backgroundColor: "#212630", // Добавил нормальный цвет вместо "#"
    },
    equalContainer: {
        backgroundColor: "#578de5",
    },
    text: {
        color: "#D3DBE2",
    },
    digitText: {
        color: "#D3DBE2",
    },
    funcText: {
        color: "#AAA",
    },
    equalText: {
        color: "#333",
    },
});

export default CalcButtonStyle;