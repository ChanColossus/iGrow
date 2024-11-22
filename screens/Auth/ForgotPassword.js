import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Image,Alert,TouchableOpacity,Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; 
import axios from "axios";
import { useAuth } from '../../navigation/RouteNavigator';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgotPassowrdScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation(); 
  const { login } = useAuth();
  const handleLoginNavigation = () => {
    navigation.navigate("Login");
  };
  const handleForgotPassword = () => {
    // Handle login logic here
    const user = {
      email: email,
    };
    console.log('Email:', email);
    axios
      .post(`http://192.168.100.117:8000/forgot-password`, user)
      .then((response) => {
        console.log(response);
        setEmail("");
        navigation.navigate("ResetPassword");
        Alert.alert(
          "Email Sent Successfully",
          "Please check email your email."
        );
      })
      .catch((error) => {
        Alert.alert(
          "Email Error",
          "An error occurred during forgoting password"
        );
        console.log("Reseting Password Failed", error);
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
        source={require('../../assets/13.png')}
        style={styles.overlayImage5}
      />
      <Image 
        source={require('../../assets/3.png')} 
        style={styles.overlayImage3}
      />
   
      
      <View style={styles.overlay}>
      
      <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.inputContainer}
          mode="outlined" 
        />
        <Button mode="contained" onPress={handleForgotPassword} style={styles.button} labelStyle={styles.buttonText}>
          Reset Password
        </Button>
        <TouchableOpacity style={styles.buttonLoc}  onPress={handleLoginNavigation}>
        <Text style={styles.buttonText2}>Return to Login</Text>
      </TouchableOpacity>
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
    top: '65%', 
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
    top: '28%', 
    left: '-5.5%', 
    width: '110%', 
    height: '50%',
    resizeMode: 'contain', 
    alignItems: 'center', 
  },
  inputContainer: {
    top: '7%',
    width: '70%',
    marginBottom: 16,
    height: 15, 
    paddingVertical: 5, 
  },
  button: {
    top: '7%',
    width: '80%',
    backgroundColor: '#b3eda9',
  },
  buttonLoc: {
    top: '7.8%',
    left: '42%',
    width: '100%',
    zIndex: 10,
    
  },
  buttonText: {
    color: '#17412d', 
  },
  buttonText2: {
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 8
  },
});

export default ForgotPassowrdScreen;
