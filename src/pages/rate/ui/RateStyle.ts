import { StyleSheet } from "react-native";
import Color from "../../../features/config/Colors";


const RateStyle = StyleSheet.create({
    pageContainer: {
        flex: 1,   
        display: "flex",
        flexDirection: "column",
        width: "100%"
    },
    pageTitle: {
        flex: 1,
        color: Color.primaryTextColor,
        fontWeight: 600,
        textAlign: "center",
        fontSize: 20.0,
        marginVertical: 10.0
    },
    pageTitleRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    titleDate: {
        color: Color.primaryTextColor,
    },
    search: {
        borderWidth: 1.0,
        borderColor: "#888",
        color: "#FFF",
        flex: 1,
    },
    rateLine: {
        display: "flex",
        flexDirection: "row"
    },
    rateCc: {
        flex: 1
    },
    rateTxt: {
        flex: 5,
    },
    rateRate: {
        flex: 2
    }
});


export default RateStyle;