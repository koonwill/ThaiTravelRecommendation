import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import axios from 'axios';
import { TAT_API_KEY } from '@env';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

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
            const placeDetail = {
                id: data.place_id ?? '-',
                img: data.thumbnail_url ?? '-',
                place_name: data.place_name ?? '-',
                address: addressLines ?? '-',
                detail: data.place_information?.introduction ?? '-',
                telephone: hasPhoneNumbers ? (data.contact?.phones ? data.contact.phones[0] : data.contact?.mobiles[0]) ?? '-' : '-',
                email: data.contact?.emails ? data.contact.emails[0] ?? '-' : '-',
                website: data.contact?.websites ? data.contact.websites[0] ?? '-' : '-',
                facilities: data.facilities && data.facilities.length > 0
                ? data.facilities.map(facility => facility.description ?? '-').join(', ')
                : data.facilities == null || data.facilities == undefined
                ? '-'
                : '-',
                services: data.services && data.services.length > 0
                ? data.services.map(service => service.description ?? '-').join(', ')
                : data.services == null || data.services == undefined
                ? '-'
                : '-',
                payment_method: data.payment_method && data.payment_method.length > 0
                ? data.payment_method.map(payment => payment.description ?? '-').join(', ')
                : data.payment_method == null || data.payment_method == undefined
                ? '-'
                : '-',
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
                <Image source={{ uri: placeDetail.img }} style={styles.image} />
                    <Text style={styles.detailText}>
                        <Text style={styles.label}>Name: </Text>
                        {placeDetail.place_name}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.label}>Address: </Text>
                        {placeDetail.address}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.label}>Detail: </Text>
                        {placeDetail.detail}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.label}>Tel: </Text>
                        {placeDetail.telephone}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.label}>Email: </Text>
                        {placeDetail.email}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.label}>Website: </Text>
                        {placeDetail.website}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.label}>Facilities: </Text>
                        {placeDetail.facilities}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.label}>Services: </Text>
                        {placeDetail.services}
                    </Text>
                    <Text style={styles.detailText}>
                        <Text style={styles.label}>Payment Method: </Text>
                        {placeDetail.payment_method}
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
        paddingTop: Platform.OS === 'android' ? 40 : 0,
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
    image: {
        width: '100%',
        height: 200,
        marginBottom: 16,
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