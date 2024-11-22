import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Image, Alert, TouchableOpacity, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker'; // Import Expo Image Picker
import { useAuth } from '../../navigation/RouteNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [images, setImages] = useState([]);  // State to store multiple selected images
  const navigation = useNavigation();
  const { login } = useAuth();

  const handleLoginNavigation = () => {
    navigation.navigate("Login");
  };

  // Function to handle image selection using Expo Image Picker
  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need permission to access your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,  // Allow multiple images
    });

    if (!result.cancelled) {
      console.log('Picked images: ', result.assets);  // Log the result for debugging
      setImages((prevImages) => [...prevImages, result.assets[0].uri]);  // Store selected images in the state
    }
  };

const handleRegister = () => {
  if (images.length === 0) {
    Alert.alert('Image Required', 'Please select at least one image.');
    return;
  }

  const user = {
    name: name,
    email: email,
    password: password,
  };

  // Create a FormData object to append the images and user data
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('password', password);

  // Loop through the images array and append each image
  images.forEach((image, index) => {
    formData.append("images", {
      uri: image,
      type: "image/jpeg", 
      name: `image_${index}.jpg`,
    });
  });
  const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        // "Authorization": token, // Include authorization token if needed
      },
    };
  // Logging the FormData for debugging
  console.log('FormData being sent: ', formData);

  // Axios request to send the form data
  axios
    .post(`http://192.168.100.117:8000/register`, formData, config)
    .then((response) => {
      console.log('Response:', response);
      setName('');
      setPassword('');
      setEmail('');
      setImages([]);  // Clear images after successful registration
      navigation.navigate('Login');
      Alert.alert('Registration Successful', 'You have registered successfully.');
    })
    .catch((error) => {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.log('Error response:', error.response);
      } else if (error.request) {
        // Request was made but no response was received
        console.log('Error request:', error.request);
      } else {
        // Something else went wrong
        console.log('Error message:', error.message);
      }
      Alert.alert('Registration Error', 'An error occurred during registration.');
    });
};

  return (
    <ImageBackground 
      source={require('../../assets/6.png')}
      style={styles.background}
      resizeMode="cover" 
    >
      <TouchableOpacity style={styles.buttonLoc} onPress={handleLoginNavigation}>
        <Text style={styles.buttonText2}>Login</Text>
      </TouchableOpacity>

      <Image 
        source={require('../../assets/1.png')} 
        style={styles.overlayImage1}
      />
      <Image 
        source={require('../../assets/4.png')}
        style={styles.overlayImage4}
      />
      <Image 
        source={require('../../assets/5.png')}
        style={styles.overlayImage5}
      />
      <Image 
        source={require('../../assets/3.png')} 
        style={styles.overlayImage3}
      />
      <Image 
        source={require('../../assets/11.png')} 
        style={styles.overlayImage2}
      />

      <View style={styles.overlay}>
      {images.length > 0 && (
        <Image
        source={{ uri: images[0] }}  // Show the first selected image as a preview
        style={styles.imagePreview}
      />
    )}
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          style={styles.inputContainer}
          mode="outlined" 
        />
        <TextInput
          label="Username"
          value={email}
          onChangeText={setEmail}
          style={styles.inputContainer}
          mode="outlined" 
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.inputContainer}
          mode="outlined" 
        />

        <Button mode="outlined" onPress={handleImagePick} style={styles.button}>
          Pick Image(s)
        </Button>
        
        <Button mode="contained" onPress={handleRegister} style={styles.button} labelStyle={styles.buttonText}>
          Register
        </Button>
      </View>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  imagePreview: {
    top: '2%',
    width: 100,  // Set width and height for circular preview
    height: 100,
    borderRadius: 50,  // Make it circular
    borderWidth: 3,
    borderColor: '#fff',  // Optional: Add border color to make it more distinct
  },
  buttonText: {
    color: 'black',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  overlayImage1: {
    position: 'absolute',
    top: 8, 
    left: 0, 
    width: '100%', 
    height: 100, 
  },
  overlayImage2: {
    position: 'absolute',
    top: '-10%', 
    left: '4%',
    width: '100%', 
    height: '50%',
    resizeMode: 'contain',
    alignItems: 'center',
  },
  overlayImage3: {
    position: 'absolute',
    top: '-2%', 
    left: '30%', 
    width: '40%', 
    height: '50%',
    resizeMode: 'contain', 
    alignItems: 'center', 
  },
  overlayImage4: {
    position: 'absolute',
    top: '0%', 
    left: '0%', 
    width: '130%', 
    height: '100%',
    resizeMode: 'contain', 
    alignItems: 'center', 
  },
  overlayImage5: {
    position: 'absolute',
    top: '5%', 
    left: '-68.8%', 
    width: '250%', 
    height: '100%',
    resizeMode: 'contain', 
    alignItems: 'center', 
  },
  inputContainer: {
    top: '4%',
    width: '80%',
    marginBottom: 16,
    height: 20, 
    paddingVertical: 5, 
  },
  button: {
    top: '4%',
    width: '40%',
    backgroundColor: '#b3eda9',
    marginTop:20
  },
  buttonLoc: {
    top: '17.3%',
    left: '63%',
    width: '100%',
    zIndex: 10,
  },
  buttonText: {
    color: '#17412d', 
  },
  buttonText2: {
    color: '#105d5e', 
    fontWeight: 'bold'
  },
});

export default RegisterScreen;
