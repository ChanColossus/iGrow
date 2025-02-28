import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Image,Alert,Text,TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; 
import axios from "axios";
import { useAuth } from '../../navigation/RouteNavigator';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigation = useNavigation(); 
  const { login } = useAuth();
  const handleRegisterNavigation = () => {
    navigation.navigate("Register");
  };
  const handleForgotPassowrdNavigation = () => {
    navigation.navigate("ForgotPassword");
  };
  const handleLogin = () => {
    // Handle login logic here
    const user = {
      email: email,
      password: password,
    };
    console.log('Email:', email);
    console.log('Password:', password);
    axios
      .post(`http://192.168.100.117:8000/login`, user)
      .then((response) => {    
        const name = response.data.name;
        const roles = response.data.role;
        console.log(response.data);
        const userId = response.data.id;
        setRole(role);
        AsyncStorage.setItem("name", name);
        AsyncStorage.setItem("email", email);
        AsyncStorage.setItem("userId", userId);
        AsyncStorage.setItem("userRole", role);
        AsyncStorage.setItem("isLoggedIn", "true");
        login(userId);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 403) {
            Alert.alert("Login Error", "Account not verified");
          } else if (error.response.status === 401) {
            Alert.alert("Login Error", "Invalid Credentials");
          }
        } else {
          Alert.alert("Login Error", "Failed to log in");
          console.log("Error:", error.message);
        }
      });

  };

  return (
    <ImageBackground 
      source={require('../../assets/6.png')}
      style={styles.background}
      resizeMode="cover" 
    >
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
        source={require('../../assets/12.png')}
        style={styles.overlayImage6}
      />
      <Image 
        source={require('../../assets/3.png')} 
        style={styles.overlayImage3}
      />
      <Image 
        source={require('../../assets/2.png')} 
        style={styles.overlayImage2}
      />
      
      <View style={styles.overlay}>
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
        <Button mode="contained" onPress={handleLogin} style={styles.button} labelStyle={styles.buttonText}>
          Login
        </Button>
        <TouchableOpacity style={styles.buttonLoc}  onPress={handleRegisterNavigation}>
        <Text style={styles.buttonText2}>Don't have an account? Register here!</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonLoc2}  onPress={handleForgotPassowrdNavigation}>
        <Text style={styles.buttonText2}>Forgot Password</Text>
      </TouchableOpacity>
      </View>
   
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  buttonLoc: {
    top: '2%',
    left: '4%',
    width: '50%',
 
    zIndex: 10,
    
  },
  buttonLoc2: {
    top: '17%',
    left: '-9.9%',
    width: '50%',
 
    zIndex: 10,
    
  },
  buttonText2: {
    color: 'white', 
    fontWeight: 'bold',
    textAlign: 'right'
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  overlayImage1: {
    position: 'absolute',
    top: 4, 
    left: 0, 
    width: '100%', 
    height: 100, 
  },
  overlayImage2: {
    position: 'absolute',
    top: '-5%', 
    left: '15%',
    width: '70%', 
    height: '50%',
    resizeMode: 'contain',
    alignItems: 'center',
  },
  overlayImage3: {
    position: 'absolute',
    top: '7%', 
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
    top: '10%', 
    left: '-44.8%', 
    width: '200%', 
    height: '100%',
    resizeMode: 'contain', 
    alignItems: 'center', 
  },
  overlayImage6: {
    position: 'absolute',
    top: '-7%', 
    left: '-15%', 
    width: '130%', 
    height: '100%',
    resizeMode: 'contain', 
    alignItems: 'center', 
  },
  inputContainer: {
    top: '8%',
    width: '60%',
    marginBottom: 16,
    height: 20, 
    paddingVertical: 5, 
  },
  button: {
    top: '18%',
    width: '40%',
    backgroundColor: '#b3eda9',
  },
  buttonText: {
    color: '#17412d', 
  },
});

export default LoginScreen;
