import { StyleSheet } from "react-native";
import Colors from "../../features/config/Colors";

const AppContentStyle = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
    },
    text: {
        color: Colors.primaryTextColor,

    },
    topBar: {
        backgroundColor: "#333",
        height: 50.0, // dip - density independed pixel
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    bottomBar: {
        backgroundColor: "#333",
        height: 60.0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    topBarIcon: {
        backgroundColor: "#bbb",
        height: 42.0,
        marginHorizontal: 10.0,
        width: 42.0,
    },
    bottomBarIcon: {
        backgroundColor: "#bbb",
        height: 42.0,
        width: 42.0,

    },
    topBarTitle: {
        color: Colors.primaryTextColor,
        flex: 1,
        fontSize: 16.0,
        fontWeight: 700,
        textAlign: "center",
    },
    pageWidget: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default AppContentStyle;