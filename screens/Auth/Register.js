import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Image,Alert,TouchableOpacity,Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; 
import axios from "axios";
import { useAuth } from '../../navigation/RouteNavigator';
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); 
  const { login } = useAuth();
  const handleLoginNavigation = () => {
    navigation.navigate("Login");
  };
  const handleRegister = () => {
    // Handle login logic here
    const user = {
      name: name,
      email: email,
      password: password,
    };
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    axios
      .post(`http://192.168.100.117:8000/register`, user)
      .then((response) => {
        console.log(response);
        setName("");
        setPassword("");
        setEmail("");
        navigation.navigate("Login");
        Alert.alert(
          "Registration Successful",
          "You have registered successfully"
        );
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred during registration"
        );
        console.log("Registration Failed", error);
      });

  };

  return (
    
    <ImageBackground 
      source={require('../../assets/6.png')}
      style={styles.background}
      resizeMode="cover" 
    >
        <TouchableOpacity style={styles.buttonLoc}  onPress={handleLoginNavigation}>
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
    top: 0, 
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
    top: '6%',
    width: '80%',
    marginBottom: 16,
    height: 20, 
    paddingVertical: 5, 
  },
  button: {
    top: '13%',
    width: '40%',
    backgroundColor: '#b3eda9',
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
