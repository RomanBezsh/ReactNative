import { Text, View } from "react-native";
import AppContentStyle from "./AppContentStyle";





export default function AppContent() {
    return (
        <View style={AppContentStyle.container}>
            <View style={AppContentStyle.topBar}> 
                <View style={AppContentStyle.topBarIcon}></View>
                <Text style={AppContentStyle.topBarTitle}>Mobile-P33</Text>
                <View style={AppContentStyle.topBarIcon}></View>
            </View>

            <View style={AppContentStyle.pageWidget}>
                <View style={AppContentStyle.preloaderContainer}>
                    {Array.from({ length: 9 }).map((_, idx) => (
                        <View key={idx} style={AppContentStyle.preloaderItem}>
                            <View style={AppContentStyle.preloaderSquare} />
                            <Text style={AppContentStyle.preloaderText}>######</Text>
                        </View>
                    ))}
                </View>
            </View>
            
            <View style={AppContentStyle.bottomBar}> 
                <View style={AppContentStyle.bottomBarIcon}></View>
                <View style={AppContentStyle.bottomBarIcon}></View>
                <View style={AppContentStyle.bottomBarIcon}></View>
                <View style={AppContentStyle.bottomBarIcon}></View>
                <View style={AppContentStyle.bottomBarIcon}></View>
            </View>
        </View>
    );
}