import { StyleSheet } from "react-native";
import Colors from "../../features/config/Colors";




const CardStyle = StyleSheet.create({
    preloaderContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        width: "100%",
        padding: 10,
    },
    preloaderItem: {
        width: "30%",
        marginVertical: 10,
        alignItems: "center",
    },
    preloaderSquare: {
        backgroundColor: "rgba(0,0,0,0.1)",
        width: 80,
        height: 80,
        borderRadius: 4,
    },
    preloaderText: {
        marginTop: 6,
        color: Colors.primaryTextColor,
        fontSize: 12,
    }
});


export default CardStyle;