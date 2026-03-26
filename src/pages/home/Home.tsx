import { Text, TouchableOpacity, View, Image } from "react-native";
import HomeStyle from "./ui/HomeStyle";
import React, { useContext } from "react";
import { AppContext } from "../../features/context/AppContext";

export default function Home() {

    const { navigate } = useContext(AppContext);

    return (
        <View style={HomeStyle.pageContainer}>


            <Text style={HomeStyle.pageTitle}>React Native</Text>
            <TouchableOpacity onPress={() => navigate({ slug: 'calc' })} style={HomeStyle.navItem}>
                <Image source={require('../../features/asset/calc.png')}
                    style={HomeStyle.navImage} />
                <Text style={HomeStyle.navText}>Калькулятор</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate({ slug: 'rate' })} style={HomeStyle.navItem}>
                <Image source={require('../../features/asset/rate.png')}
                    style={HomeStyle.navImage} />
                <Text style={HomeStyle.navText}>Курс валют НБУ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate({ slug: 'anim' })} style={HomeStyle.navItem}>
                <Image source={require('../../features/asset/calc.png')}
                    style={HomeStyle.navImage} />
                <Text style={HomeStyle.navText}>Анімації</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate({ slug: 'swipe' })} style={HomeStyle.navItem}>
                <Image source={require('../../features/asset/swipe.png')}
                    style={HomeStyle.navImage} />
                <Text style={HomeStyle.navText}>Жести: свайgи</Text>
            </TouchableOpacity>

        </View>
    );
}