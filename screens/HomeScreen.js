import React from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity,Alert } from 'react-native';
import { Text, Button, Avatar,Card } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const showAlert = () => {
    Alert.alert('Creating Post!');
  };
  const user = {
    name: 'Christian Quintero',
    email: 'john.doe@example.com',
    profilePicture: 'https://via.placeholder.com/150', 
  };
  const highlight = {
    title: 'Innovative Farming',
    description: 'iGROW’s Dual Source Aquaponics Thrives in Central Signal Village, Taguig City',
    image: 'https://via.placeholder.com/150', 
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
        source={require('../assets/7.png')} 
        style={styles.overlayImage5}
      />
      
    <TouchableOpacity style={styles.button} onPress={showAlert}>
        <Text style={styles.buttonText}>Create Post</Text>
      </TouchableOpacity>
      <Avatar.Image
            source={{ uri: user.profilePicture }}
            size={20}
            style={styles.avatar}
          />
          <Text variant="headlineMedium" style={styles.name}>
            {user.name}
          </Text>

          <Text variant="headlineMedium" style={styles.headlineTitle}>
            {highlight.title}
          </Text>
          <Image 
        source={require('../assets/8.png')} 
        style={styles.imageHighlight}
      />
          <Text variant="bodyMedium" style={styles.description}>
            {highlight.description}
          </Text>
          <View style={styles.buttonContainer}>
          </View>
        
      
      <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>
          Recent Posts
        </Text>


        <View style={styles.buttonContainer}>
         
        </View>
      </View>
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
    top: 73,
    left: 19,
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
  overlayImage5: {
    position: 'absolute',
    top: '10%', 
    left: '-5%',
    width: '110%', 
    height: '40%',
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
