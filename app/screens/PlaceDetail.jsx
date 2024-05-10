import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { TAT_API_KEY } from '@env';

export default function PlaceDetail({ navigation, route }) {
    const { placeId, category } = route.params;
    const [placeDetail, setPlaceDetail] = useState(null);

    useEffect(() => {
        fetchPlaceDetail(placeId, category);
    }, [placeId, category]);

    const fetchPlaceDetail = async (placeId, category) => {
        const headers = {
            'Content-Type': 'application/json',
            'Accept-Language': 'EN',
            Authorization: `Bearer ${TAT_API_KEY}`,
        };

        try {
            const response = await axios.get(`https://tatapi.tourismthailand.org/tatapi/v5/${category}/${placeId}`, { headers });
            const data = response.data.result;
            const addressLines = [
                data.location.address,
                data.location.sub_district,
                data.location.district,
                data.location.province,
                `Postcode: ${data.location.postcode}`
            ].filter(Boolean).join('\n');

            const hasPhoneNumbers = data.contact && (data.contact.phones?.length > 0 || data.contact.mobiles?.length > 0);

            const placeInformation = [data.place_information.introduction, data.place_information.detail].filter(Boolean).join('\n');

            const placeDetail = {
                id: data.place_id,
                img: data.thumbnail_url,
                place_name: data.place_name,
                address: addressLines || 'No address available',
                detail: placeInformation || 'No details available',
                telephone: hasPhoneNumbers ? (data.contact.phones ? data.contact.phones[0] : data.contact.mobiles[0]) : 'No phone number available',
                facilities: data.facilities && data.facilities.length > 0 ? data.facilities.map(facility => facility.description).join(', ') : 'Parking',
                services: data.services || '',
            };

            setPlaceDetail(placeDetail);
        } catch (error) {
            console.error('Error fetching place detail:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Place Detail</Text>
            </View>
            {placeDetail ? (
                <View style={styles.detailContainer}>
                    <Text style={styles.detailText}>
                        <Text style={styles.label}>Name: </Text>
                        {placeDetail.place_name}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.label}>Address: </Text>
                        {placeDetail.address || 'Hamji'}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.label}>Detail: </Text>
                        {placeDetail.detail || 'Hamji'}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.label}>Tel: </Text>
                        {placeDetail.telephone || '08-00xxxxx'}
                    </Text>
                </View>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        backgroundColor: '#9370DB',
        padding: 8,
        marginBottom: 16,
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    detailContainer: {
        padding: 16,
    },
    detailText: {
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
    },
});