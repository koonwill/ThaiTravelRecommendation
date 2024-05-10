import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, Image, ScrollView, FlatList, Dimensions, Platform, TouchableOpacity } from 'react-native';
import axios from 'axios';
import {TAT_API_KEY} from '@env';

const { width } = Dimensions.get('window');

export default function HomePage({ navigation }) {
  const [touristAttractions, setTouristAttractions] = useState([]);
  const [interestingEvents, setInterestingEvents] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Accept-Language': 'EN',
      Authorization: `Bearer ${TAT_API_KEY}`,
    };

    try {
      const attractionResponse = await axios.get('https://tatapi.tourismthailand.org/tatapi/v5/places/search?numberOfResult=5&destination=Bangkok&categorycodes=ATTRACTION', { headers });
      setTouristAttractions(attractionResponse.data.result.map(item => ({id: item.place_id, category:item.category_code, title: item.place_name, image: { uri: item.thumbnail_url } })));

      const accommodationResponse = await axios.get('https://tatapi.tourismthailand.org/tatapi/v5/places/search?numberOfResult=5&destination=Bangkok&categorycodes=ACCOMMODATION', { headers });
      setInterestingEvents(accommodationResponse.data.result.map(item => ({id: item.place_id, category:item.category_code,title: item.place_name, image: { uri: item.thumbnail_url } })));

      const restaurantResponse = await axios.get('https://tatapi.tourismthailand.org/tatapi/v5/places/search?numberOfResult=5&destination=Bangkok&categorycodes=RESTAURANT', { headers });
      setRestaurants(restaurantResponse.data.result.map(item => ({id:item.place_id, category:item.category_code, title: item.place_name, image: { uri: item.thumbnail_url } })));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handlePlacePress = (place) => {
    navigation.navigate('PlaceDetail', { placeId: place.id, category: place.category.toLowerCase()});
  };

  const renderCarouselItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePlacePress(item)}>
    <View style={styles.carouselItem}>
      <Image source={item.image} style={[styles.carouselImage, { width: width * 0.8 }]} />
      <Text style={styles.carouselTitle}>{item.title}</Text>
    </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>HomePage</Text>
      </View>
      <TextInput style={styles.searchInput} placeholder="Search" />
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tourist Attraction</Text>
          <FlatList
            data={touristAttractions}
            renderItem={renderCarouselItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interesting Event</Text>
          <FlatList
            data={interestingEvents}
            renderItem={renderCarouselItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Restaurant</Text>
          <FlatList
            data={restaurants}
            renderItem={renderCarouselItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#8A2BE2',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  section: {
    marginVertical: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20,
  },
  carouselItem: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  carouselImage: {
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
