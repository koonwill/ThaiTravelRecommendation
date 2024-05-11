import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, Platform, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import Header from '../components/Header';
import { TAT_API_KEY } from '@env';

const BackButton = ({ navigation }) => (
    <HeaderBackButton
        tintColor="#fff"
        onPress={() => navigation.goBack()}
    />
);

export default function SearchResult({ navigation, route }) {
    const { searchText, filters, latitude, longitude } = route.params;
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const searchAPI = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept-Language': 'EN',
                    Authorization: `Bearer ${TAT_API_KEY}`,
                };

                let url;
                if (!filters.nearbyLocation) {
                    const joinFilter = Object.keys(filters)
                        .filter(filter => filters[filter] && filter !== 'nearbyLocation')
                        .map(filter => filter === 'shopping' ? 'shop' : filter)
                        .join(',')
                        .toUpperCase();
                    url = `https://tatapi.tourismthailand.org/tatapi/v5/places/search?keyword=${searchText}&numberOfResult=50&categorycodes=${joinFilter}`;
                } else {
                    const joinFilter = Object.keys(filters)
                        .filter(filter => filters[filter] && filter !== 'nearbyLocation')
                        .map(filter => filter === 'shopping' ? 'shop' : filter)
                        .join(',')
                        .toUpperCase();
                    url = `https://tatapi.tourismthailand.org/tatapi/v5/places/search?keyword=${searchText}&location=${latitude},${longitude}&radius=1000&numberOfResult=50&categorycodes=${joinFilter}`;
                }

                const response = await axios.get(url, { headers });
                const data = response.data.result;
                const placeData = data.map(place => ({
                    id: place.place_id,
                    img: place.thumbnail_url,
                    name: place.place_name,
                    distance: getDistanceFromLatLonInKm(latitude, longitude, place.latitude, place.longitude).toFixed(2) + ' km',
                    address: place.location.address,
                    category: place.category_description,
                }));
                setSearchResults(placeData);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setSearchResults([]);
                    Alert.alert('Error', 'No results found');
                    navigation.goBack();
                }
            }
        };

        searchAPI();
    }, [searchText, filters]);

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const R = 6371;
        let dLat = toRadians(lat2 - lat1);
        let dLon = toRadians(lon2 - lon1);
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    return (
        <SafeAreaView style={styles.container}>
        <Header title="Search Result" backButton navigation={navigation} />
            <ScrollView style={styles.resultsContainer}>
                {searchResults.map((result, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() =>
                            navigation.navigate('PlaceDetail', {
                                placeId: result.id,
                                category: result.category.toLowerCase(),
                            })
                        }
                    >
                        <View style={styles.resultItem}>
                            <Image
                                source={
                                    result.img
                                        ? { uri: result.img }
                                        : require('../img/image_not_avaiable.png')
                                }
                                style={styles.resultImage}
                            />
                            <View style={styles.resultDetails}>
                                <Text style={styles.resultName}>
                                    {result.name}
                                </Text>
                                <Text style={styles.resultCategory}>
                                    {result.category}
                                </Text>
                                <Text style={styles.resultAddress}>
                                    {result.address}
                                </Text>
                                <Text style={styles.resultDistance}>
                                    {result.distance}
                                </Text>
                            </View>
                        </View>
                        {index !== searchResults.length - 1 && (
                            <View style={styles.separator} />
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 40 : 0,
    },
    filtersContainer: {
        padding: 20,
    },
    filterText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    filterItem: {
        fontSize: 16,
        marginBottom: 5,
    },
    resultsContainer: {
        flex: 1,
        paddingVertical: 10,
    },
    resultItem: {
        flexDirection: 'row',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    resultImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    resultDetails: {
        marginLeft: 10,
        flex: 1,
    },
    resultName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    resultCategory: {
        fontSize: 14,
        color: '#666',
    },
    resultDetail: {
        fontSize: 14,
        marginBottom: 5,
    },
    resultDistance: {
        fontSize: 14,
        color: '#666',
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginHorizontal: 20,
    },
});
