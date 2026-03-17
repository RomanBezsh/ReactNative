import { StyleSheet } from "react-native";
import Color from "../../../features/config/Colors";


const HomeStyle = StyleSheet.create({
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
    navItem: {
        borderWidth: 1.0,
        borderColor: Color.primaryTextColor,
        marginHorizontal: 20.0,
        marginVertical: 10.0,
        padding: 10.0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    navImage: {
        tintColor: Color.primaryTextColor,
        width:50.0,
        height: 50.0
    },
    navText: {
        color: Color.primaryTextColor,
        fontSize: 18.0
    }
});


export default HomeStyle;