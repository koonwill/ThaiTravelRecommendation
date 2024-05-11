import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';

const Header = ({ title, backButton, navigation }) => {
    return (
        <View style={[styles.header, backButton && styles.headerWithBackButton]}>
            {backButton && <BackButton navigation={navigation} />}
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const BackButton = ({ navigation }) => (
    <HeaderBackButton
        tintColor="#fff"
        onPress={() => navigation.goBack()}
    />
);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#8A2BE2',
    },
    headerWithBackButton: {
        paddingHorizontal: 0,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default Header;