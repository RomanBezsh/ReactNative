import { StyleSheet } from "react-native";

const MemoryButtonStyle = StyleSheet.create({
    container: {
        borderRadius: 5.0,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 4,
        paddingVertical: 8,
    },
    enabledContainer: {
        backgroundColor: "#1E6AB0",
    },
    disabledContainer: {
        backgroundColor: "#3A4350",
    },
    text: {
        fontSize: 14,
        fontWeight: "600",
    },
    enabledText: {
        color: "#E8F0F8",
    },
    disabledText: {
        color: "#6B7280",
    },
});

export default MemoryButtonStyle;
