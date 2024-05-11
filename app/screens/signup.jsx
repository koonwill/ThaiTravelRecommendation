import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    try {
      if (!email || !password || !confirmPassword) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      if (password.length < 12) {
        Alert.alert('Error', 'Password must be at least 12 characters');
        return;
      }
      if (!/\d/.test(password)) {
        Alert.alert('Error', 'Password must contain at least one digit');
        return;
      }
      if (!/[a-zA-Z]/.test(password)) {
        Alert.alert('Error', 'Password must contain at least one letter');
        return;
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
        Alert.alert('Error', 'Password must contain at least one special character');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

      // Check if email already exists in AsyncStorage
      const existingUserData = await AsyncStorage.getItem(email);
      if (existingUserData) {
        Alert.alert('Error', 'Email already exists');
        return;
      }

      const userData = { email, password };
      await AsyncStorage.setItem(email, JSON.stringify(userData));

      // Clear form fields
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      console.log('Signup successful!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const background = require('../img/main_bg.jpg');

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} style={styles.imageBackground}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Sign Up</Text>
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
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button title="Sign Up" onPress={handleSubmit} />
          <Text style={styles.signinText} onPress={() => navigation.navigate('Login')}>
            Already have an account? Sign In
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
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
  signinText: {
    marginTop: 20,
    color: 'blue',
  },
});
