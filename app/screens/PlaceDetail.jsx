import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import axios from 'axios';
import { TAT_API_KEY } from '@env';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

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
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Place Detail</Text>
            </View>
            {placeDetail ? (
                <ScrollView style={styles.detailContainer}>
                    <Image source={placeDetail.img ? { uri: placeDetail.img } : require('../img/image_not_avaiable.png')} style={styles.image} />
                    <View style={styles.detailsContainer}>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Name: </Text>
                            <Text ellipsizeMode='tail' style={styles.flexibleText}>{placeDetail.place_name}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Address: </Text>
                            <Text>{placeDetail.address}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Detail: </Text>
                            <Text ellipsizeMode='tail' style={styles.flexibleText}>{placeDetail.detail}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Tel: </Text>
                            <Text ellipsizeMode='tail' style={styles.flexibleText}>{placeDetail.telephone}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Email: </Text>
                            <Text ellipsizeMode='tail' style={styles.flexibleText}>{placeDetail.email}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Website: </Text>
                            <Text ellipsizeMode='tail' style={styles.flexibleText}>{placeDetail.website}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Facilities: </Text>
                            <Text ellipsizeMode='tail' style={styles.flexibleText}>{placeDetail.facilities}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Services: </Text>
                            <Text ellipsizeMode='tail' style={styles.flexibleText}>{placeDetail.services}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Payment Method: </Text>
                            <Text ellipsizeMode='tail' style={styles.flexibleText}>{placeDetail.payment_method}</Text>
                        </View>
                    </View>
                </ScrollView>
            ) : (
                <Text>Loading...</Text>
            )}
        </SafeAreaView>
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
    flexibleText:{
        flex:1,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 16,
    },
    detailsContainer: {
        flex: 1,
        marginTop: 16,
        paddingHorizontal: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 8,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 8,
        width: 100,
    },
});