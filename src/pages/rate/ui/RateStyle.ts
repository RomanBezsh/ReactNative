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
        color: Color.primaryTextColor,
        fontWeight: 600,
        textAlign: "center",
        fontSize: 20.0,
        marginVertical: 10.0
    },
    pageTitleRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    search: {
        borderWidth: 1.0,
        borderColor: "#888"
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