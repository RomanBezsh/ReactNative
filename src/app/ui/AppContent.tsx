import { BackHandler, Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import AppContentStyle from "./AppContentStyle";
import Card from "./Card";
import CardStyle from "./CardStyle";
import Home from "../../pages/home/Home";
import { useEffect, useState } from "react";
import IRoute from "../../features/model/IRoute";
import Calc from "../../pages/calc/Calc";
import NotFounded from "../../pages/404/NotFounded";
import React from "react";


const startPage: IRoute = {
    slug: 'home',
}

export default function AppContent() {
    const [history, setHistory] = useState<Array<IRoute>>([]);
    const [page, setPage] = useState<IRoute>(startPage);
    const { width, height } = useWindowDimensions();
    
    const navigate = (route: IRoute): void => {
        if (route.slug == "-1") {
            console.log("history.length: " + history.length);
            if (history.length > 0) {
                const prevPage = history.pop();
                setPage(prevPage!);
                setHistory(history);
            }
            else {
                //console.log("BackHandler.exitApp();");
                BackHandler.exitApp();
            }
        }
        else if (route.slug != page.slug) {
            setHistory([...history, page]);
            setPage(route);
        }

    }

    useEffect(() => {
        const handler = BackHandler.addEventListener(
            'hardwareBackPress', () => {
                //console.log("back press");
                navigate({ slug: '-1' });
                return true;
            });
        return () => handler.remove();
    }, [history]);

    return (
        <View style={AppContentStyle.container}>
            {width < height && <View style={AppContentStyle.topBar}>
                <View style={AppContentStyle.topBarIcon}>
                    <Text style={AppContentStyle.topBarBack}>
                        {"<"}
                    </Text>
                </View>
                <Text style={AppContentStyle.topBarTitle}>Mobile-P33</Text>
                <View style={AppContentStyle.topBarIcon}></View>
            </View>}

            <View style={AppContentStyle.pageWidget}>
                {page.slug == "home" ? <Home />
                    : page.slug == "calc" ? <Calc />
                        : <NotFounded />
                }
            </View>

            
            {width < height && <View style={AppContentStyle.bottomBar}>
                <TouchableOpacity onPress={() => navigate({ slug: "home" })}>
                    <Image style={AppContentStyle.bottomBarIcon}
                        source={require("../asset/home.png")}></Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigate({ slug: "calc" })}>
                    <Image style={AppContentStyle.bottomBarIcon}
                        source={require("../asset/calc.png")}></Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigate({ slug: "*" })}>
                    <Image style={AppContentStyle.bottomBarIcon}
                        source={require("../asset/404.png")}></Image>
                </TouchableOpacity>

                
            </View>}
        </View>
    );
}