import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Platform, Switch, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header';
import CheckBox from 'expo-checkbox';
import * as Location from 'expo-location';

export default function SearchScreen({ navigation }) {
    const [searchText, setSearchText] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({
        attraction: false,
        accommodation: false,
        restaurant: false,
        shopping: false,
        nearbyLocation: true, // Default value for nearby location switch
    });
    const [location, setLocation] = useState('');

    useEffect(() => {
        const getPermission = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        }
        getPermission();
    }, []);

    const handleFilterChange = (filter) => {
        setSelectedFilters((prevState) => ({
            ...prevState,
            [filter]: !prevState[filter],
        }));
    };

    const handleSearch = () => {
        if (!searchText) {
            Alert.alert('Error', 'Search Text is required');
            return;
        }
        // Navigate to SearchResult page with selected filters as route params
        navigation.navigate('SearchResult', { searchText: searchText, filters: selectedFilters, latitude: location.coords.latitude, longitude: location.coords.longitude});
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Search" backButton navigation={navigation} />
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>
            <View style={styles.filtersContainer}>
                {Object.keys(selectedFilters).map((filter) => (
                    <View key={filter} style={styles.filterItem}>
                        {filter !== 'nearbyLocation' && (
                            <CheckBox
                                value={selectedFilters[filter]}
                                onValueChange={() => handleFilterChange(filter)}
                                boxType="square"
                                tintColor="#8A2BE2"
                                onCheckColor="#8A2BE2"
                                onTintColor="#8A2BE2"
                                style={styles.checkbox}
                            />
                        )}
                        {filter !== 'nearbyLocation' && (
                            <Text style={styles.filterText}>{filter.charAt(0).toUpperCase() + filter.slice(1)}</Text>
                        )}
                        {filter === 'nearbyLocation' && (
                            <Switch
                                value={selectedFilters[filter]}
                                onValueChange={() => handleFilterChange(filter)}
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={selectedFilters[filter] ? "#f4f3f4" : "#f4f3f4"}
                            />
                        )}
                        {filter === 'nearbyLocation' && (
                            <Text style={styles.filterText}>Nearby Location</Text>
                        )}
                    </View>
                ))}
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 40 : 0,
    },
    searchContainer: {
        padding: 10,
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    filtersContainer: {
        padding: 10,
    },
    filterItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        marginRight: 5,
    },
    filterText: {
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: '#8A2BE2',
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
