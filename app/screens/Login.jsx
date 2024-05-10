import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Retrieve user data from AsyncStorage
      const userData = await AsyncStorage.getItem(email);
      if (userData) {
        // Parse stored user data
        const storedData = JSON.parse(userData);
        // Check if input matches stored data
        if (storedData.password === password) {
          // Authentication successful
          console.log('Login successful!');
          // Navigate to the main app screen upon successful login
          navigation.navigate('Home');
        } else {
          // Authentication failed, display error message
          Alert.alert('Error', 'Invalid email or password');
        }
      } else {
        // No user data found, display error message
        Alert.alert('Error', 'User not found');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <ImageBackground source={require('../img/main_bg.jpg')} style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Login" onPress={handleLogin} />
        <Text style={styles.signupText} onPress={() => navigation.navigate('SignUp')}>
          Don't have an account? Sign Up
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  signupText: {
    marginTop: 20,
    color: 'blue',
  },
});