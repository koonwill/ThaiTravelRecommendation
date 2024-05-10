import React from "react";
import {View, Text, StyleSheet, FlatList} from 'react-native';
import slides from "../data/slides";
import OnboardingItem from "./OnboardingItem";

export default function Onboarding() {
    return (
        <View style={styles.container}>
            <FlatList data={slides} renderItem={({item}) => <OnboardingItem item={item} />} horizontal showsHorizontalScrollIndicator={false} pagingEnabled />
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