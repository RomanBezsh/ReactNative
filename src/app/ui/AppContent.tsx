import { BackHandler, Image, Text, TouchableOpacity, View } from "react-native";
import AppContentStyle from "./AppContentStyle";
import Card from "./Card";
import CardStyle from "./CardStyle";
import Home from "../../pages/home/Home";
import { useEffect, useState } from "react";
import IRoute from "../../features/model/IRoute";
import Calc from "../../pages/calc/Calc";


const startPage: IRoute = {
    slug: 'home',
}

export default function AppContent() {
    const [history, setHistory] = useState<Array<IRoute>>([]);
    const [page, setPage] = useState<IRoute>(startPage);

    const navigate = (route:IRoute):void => {
        if (route.slug == "-1") {
            if (history.length > 0) {
                const prevPage = history.pop();
                setPage(prevPage!);
                setHistory(history);
            }
            else {
                BackHandler.exitApp();
            }
        }
        else if (route.slug != page.slug) {
            setHistory([...history,page]);
            setPage(route);
        }
        
    }

    useEffect(() => {
        const handler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigate({slug: "-1"});
            return true;
        });
        return () => handler.remove();
    }, [])
    useEffect(() => {console.log(history)}, [history])

    return (
        <View style={AppContentStyle.container}>
            <View style={AppContentStyle.topBar}> 
                <View style={AppContentStyle.topBarIcon}></View>
                <Text style={AppContentStyle.topBarTitle}>Mobile-P33</Text>
                <View style={AppContentStyle.topBarIcon}></View>
            </View>

            <View style={AppContentStyle.pageWidget}>
                {page.slug == "home" ? <Home /> 
                : page.slug == "calc" ? <Calc/> 
                : <Text>Not Found</Text>
                }
            </View>

            {/* <View style={AppContentStyle.pageWidget}>
                <View style={CardStyle.preloaderContainer}>
                    {Array.from({ length: 12 }).map((_, idx) => (
                        <Card key={idx}/>
                    ))}
                </View>
            </View> */}
            
            <View style={AppContentStyle.bottomBar}> 
                <TouchableOpacity onPress={() => navigate({slug: "home"})}>
                    <Image style={AppContentStyle.bottomBarIcon}
                    source={require("../asset/home.png")}></Image>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigate({slug: "calc"})}>
                    <Image style={AppContentStyle.bottomBarIcon}
                    source={require("../asset/calc.png")}></Image>
                </TouchableOpacity>
                <View style={AppContentStyle.bottomBarIcon}></View>
                <View style={AppContentStyle.bottomBarIcon}></View>
                <View style={AppContentStyle.bottomBarIcon}></View>
            </View>
        </View>
    );
}