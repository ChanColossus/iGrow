import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; 

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); 

  const handleLogin = () => {
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    navigation.navigate('Main'); 
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
          value={username}
          onChangeText={setUsername}
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
      </View>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
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
    left: '-30%', 
    width: '170%', 
    height: '100%',
    resizeMode: 'contain', 
    alignItems: 'center', 
  },
  inputContainer: {
    top: '7%',
    width: '45%',
    marginBottom: 16,
    height: 20, 
    paddingVertical: 5, 
  },
  button: {
    top: '10%',
    width: '40%',
    backgroundColor: '#b3eda9',
  },
  buttonText: {
    color: '#17412d', 
  },
});

export default LoginScreen;
