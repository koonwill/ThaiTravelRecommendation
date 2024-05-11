import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from './app/screens/SignUp';
import LoginScreen from './app/screens/Login';
import HomePage from './app/screens/Home';
import PlaceDetail from './app/screens/PlaceDetail';
import SearchScreen from './app/screens/Search';
import SearchResultScreen from './app/screens/SearchResult';

export default function App(){
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerShown: false,
      }}>
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="SearchResult" component={SearchResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
