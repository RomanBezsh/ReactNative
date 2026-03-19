import AppStyle from './ui/AppStyle';
import {
    SafeAreaProvider,
    SafeAreaView,
} from 'react-native-safe-area-context';
import AppContent from "./ui/AppContent";
import React from 'react';
import "../shared/extensions/date"
import "../shared/extensions/number"

export default function App() {

    return (
        <SafeAreaProvider>
            <SafeAreaView edges={['top', 'bottom']} style={AppStyle.safeArea}>
                <AppContent />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}