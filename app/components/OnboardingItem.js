import React from "react";
import {View, Text, StyleSheet} from 'react-native';

export default function OnboardingItem() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>OnboardingItem</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})