import React from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity,Alert } from 'react-native';
import { Text, Button, Avatar,Card } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const showAlert = () => {
    Alert.alert('Please login first! Thank you!');
    navigation.navigate("Login");
  };
  
  return (
    <ImageBackground 
      source={require('../assets/6.png')} 
      style={styles.background}
      resizeMode="cover" 
    >
      <Image 
        source={require('../assets/1.png')} 
        style={styles.overlayImage1}
      />
      <Image 
        source={require('../assets/4.png')}
        style={styles.overlayImage4}
      />
      
      <Image 
        source={require('../assets/3.png')} 
        style={styles.overlayImage3}
      />
      <Image 
        source={require('../assets/2.png')} 
        style={styles.overlayImage2}
      />
      
    <TouchableOpacity style={styles.button} onPress={showAlert}>
        <Text style={styles.buttonText}>Learn More</Text>
      </TouchableOpacity>
      


        

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '80%',
    height: '19%',
    left:35,
    top:50,
    backgroundColor:'transparent'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    top:-110
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  buttonBlue: {
    backgroundColor: '#007bff', 
    flex: 1,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#b3eda9',
    top: '54%',
    left: '8%',
    width: '20%',
    height: 25,
   
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5
  },
  background: {
    flex: 1,
  },
  overlayImage1: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 100,
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
    top: '22%', 
    left: '5%',
    width: '50%', 
    height: '50%',
    resizeMode: 'contain',
    alignItems: 'center',
  },
  overlayImage3: {
    position: 'absolute',
    top: '40%', 
    left: '8%', 
    width: '30%', 
    height: '50%',
    resizeMode: 'contain', 
    alignItems: 'center', 
  },
  overlayImage4: {
    position: 'absolute',
    top: '10%', 
    left: '20%', 
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
  avatar: {
    top: 85,
    left: 25
  },
  name: {
    top: 53,
    left: 50,
    fontSize: 8,
    textTransform: 'uppercase', 
    fontWeight: 'bold',  
    color:'white'       
  },
  headlineTitle: {
    top: 40,
    left:50,
    fontSize: 12,
    fontWeight: 'bold',  
    color:'white'      
  },
  description: {
    top: 100,
    left: 50,
    fontSize: 8,
    color:'white',
    width:'70%',
    lineHeight: 15      
  },
  imageHighlight: {
    position: 'absolute',
    top: 150,
    left: 44,
    width: '75%',
    height: 60,
  },
});

export default HomeScreen;
