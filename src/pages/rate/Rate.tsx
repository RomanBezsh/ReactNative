import { Text, TouchableOpacity, View, Image, ScrollView, StyleSheet, TextInput } from "react-native";
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
    const [showRates, setShowRates] = useState<Array<INbuRate>>([]);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState<string>("");
    

    useEffect(() => {
        NbuRateApi.getCurrentRates().then(setRates);
    }, [])

    useEffect(() => {
        NbuRateApi.getRatesByDate(date).then(setRates);
    }, [date])

    useEffect(() => {
        if (search.length > 0) {
            setShowRates(rates.filter(r => r.cc.includes(search.toLocaleUpperCase())));
        }
        else {
            setShowRates(rates);
        }
    }, [search, rates]);

    return (
        <View style={HomeStyle.pageContainer}>
            <View style={RateStyle.pageTitleRow}>
                <TextInput
                    style={HomeStyle.search}
                    value={search}
                    onChangeText={setSearch}
                />

                <Text style={HomeStyle.pageTitle}>Курси валют НБУ</Text>
                <TouchableOpacity onPress={() => setOpen(true)}>
                    <Text style={RateStyle.titleDate}

                    >{date.toDotted()}</Text>
                </TouchableOpacity>
            </View>


            <Table data={showRates} />

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
            <View style={[styles.row, styles.headerRow]}>
                <Text style={styles.headerCell}>CC</Text>
                <Text style={styles.headerCell}>Назва</Text>
                <Text style={styles.headerCell}>Курс</Text>
            </View>
            {data.map((rate, index) => (
                <View
                    key={index}
                    style={[
                        styles.row,
                        index % 2 === 0 ? styles.evenRow : styles.oddRow,
                    ]}
                >
                    <Text style={styles.cell}>{rate.cc}</Text>
                    <Text style={styles.cell}>{rate.txt}</Text>
                    <Text style={styles.cell}>{rate.rate}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    table: {
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 10,
        marginTop: 30,
        borderRadius: 6,
        overflow: "hidden",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 45,
    },
    headerRow: {
        backgroundColor: "#503f3f",
    },
    headerCell: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRightWidth: 1,
        borderColor: "#ccc",
        textAlign: "center",
        fontSize: 14,
        fontWeight: "600",
        color: "#fff",
    },
    cell: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 5,
        borderRightWidth: 1,
        borderColor: "#eee",
        textAlign: "center",
        fontSize: 13,
        color: "#333",
    },
    evenRow: {
        backgroundColor: "#f9f9f9",
    },
    oddRow: {
        backgroundColor: "#fff",
    },
});

