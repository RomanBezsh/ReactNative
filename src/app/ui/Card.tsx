import { View, Text } from "react-native";
import CardStyle from "./CardStyle"; 



export default function Card() {

    return (
        <View style={CardStyle.preloaderItem}>
            <View style={CardStyle.preloaderSquare} />
            <Text style={CardStyle.preloaderText}>######</Text>
        </View>
    );
}