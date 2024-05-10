import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, ScrollView, FlatList, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function HomePage() {
    const [touristAttractions, setTouristAttractions] = useState([
        { title: 'Attraction 1', image: require('../img/main_bg.jpg') },
        { title: 'Attraction 2', image: require('../img/main_bg.jpg') },
        { title: 'Attraction 3', image: require('../img/main_bg.jpg') },
      ]);
    
      const [interestingEvents, setInterestingEvents] = useState([
        { title: 'Attraction 1', image: require('../img/main_bg.jpg') },
        { title: 'Attraction 2', image: require('../img/main_bg.jpg') },
        { title: 'Attraction 3', image: require('../img/main_bg.jpg') },
      ]);
    
      const [restaurants, setRestaurants] = useState([
        { title: 'Attraction 1', image: require('../img/main_bg.jpg') },
        { title: 'Attraction 2', image: require('../img/main_bg.jpg') },
        { title: 'Attraction 3', image: require('../img/main_bg.jpg') },
      ]);

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={[styles.carouselImage, { width: width * 0.8 }]} />
      <Text style={styles.carouselTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { width: width }]}>
        <Text style={styles.title}>HomePage</Text>
      </View>
      <TextInput style={[styles.searchInput, { width: width * 0.9 }]} placeholder="Search" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tourist Attraction</Text>
          <FlatList
            data={touristAttractions}
            renderItem={renderCarouselItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interesting Event</Text>
          <FlatList
            data={interestingEvents}
            renderItem={renderCarouselItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Restaurant</Text>
          <FlatList
            data={restaurants}
            renderItem={renderCarouselItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
  },
  section: {
    marginVertical: 20,
    alignItems: 'center',
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