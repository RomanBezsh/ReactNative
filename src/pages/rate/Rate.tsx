import { Text, TouchableOpacity, View, Image, ScrollView, StyleSheet } from "react-native";
import HomeStyle from "./ui/RateStyle";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../features/context/AppContext";
import INbuRate from "../../entities/NbuRate/model/INbuRate";
import NbuRateApi from "../../entities/NbuRate/api/NbuRateApi";
import RateStyle from "./ui/RateStyle";
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'

export default function Rate() {

    const [rates, setRates] = useState<Array<INbuRate>>([]);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState(false)


    useEffect(() => {
        NbuRateApi.getCurrentRates().then(setRates);
    }, [])

    return (
        <View style={HomeStyle.pageContainer}>
            <Text style={HomeStyle.pageTitle}>Курси валют НБУ</Text>
            <TouchableOpacity onPress={() => setOpen(true)}>
                <Text>{date.toDateString()}</Text>
            </TouchableOpacity>
            
            <Table data={rates} />

            <DatePicker
                modal
                mode="date"
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </View>
    );
}

const Table = ({ data }: { data: Array<INbuRate> }) => {
    return (
        <ScrollView style={styles.table}>
            <View style={styles.row}>
                <Text style={styles.col}>CC</Text>
                <Text style={styles.col}>Text</Text>
                <Text style={styles.col}>Rate</Text>
            </View>
            {data.map(rate => <View style={styles.row}>
                <Text style={styles.cell}>{rate.cc}</Text>
                <Text style={styles.cell}>{rate.txt}</Text>
                <Text style={styles.cell}>{rate.rate}</Text>
            </View>)}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    table: {
        borderWidth: 1,
        borderColor: "black",
        marginBottom: 10,
        marginTop: 30,
    },
    col: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        textAlign: "center",
        fontSize: 14,
        fontWeight: "500",
        backgroundColor: "#503f3fff",
        color: "#FFFFFF",
        borderColor: "black",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 40.0,
        backgroundColor: "#fff",
    },
    cell: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        //textAlign: "center",
        fontSize: 12,
        fontWeight: "500",
        color: "black",
        borderColor: "black",
    },
});

