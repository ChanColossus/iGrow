import React, { useState,useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ControlPanelScreen = ({ navigation }) => {
    const [isOn, setIsOn] = useState(false);
    const [isOn2, setIsOn2] = useState(false);
    const [isOn3, setIsOn3] = useState(false);
    const [isOn4, setIsOn4] = useState(false);
    const [isOn5, setIsOn5] = useState(false);
  
    // Load states from AsyncStorage on mount
    useEffect(() => {
      const loadStates = async () => {
        try {
          const savedStates = await AsyncStorage.multiGet([
            'button1',
            'button2',
            'button3',
            'button4',
            'button5',
          ]);
  
          // Parse and set saved states
          setIsOn(JSON.parse(savedStates[0][1]) || false);
          setIsOn2(JSON.parse(savedStates[1][1]) || false);
          setIsOn3(JSON.parse(savedStates[2][1]) || false);
          setIsOn4(JSON.parse(savedStates[3][1]) || false);
          setIsOn5(JSON.parse(savedStates[4][1]) || false);
        } catch (error) {
          console.error('Error loading button states:', error);
        }
      };
  
      loadStates();
    }, []);
  
    // Save states to AsyncStorage when they change
    useEffect(() => {
      AsyncStorage.setItem('button1', JSON.stringify(isOn));
    }, [isOn]);
  
    useEffect(() => {
      AsyncStorage.setItem('button2', JSON.stringify(isOn2));
    }, [isOn2]);
  
    useEffect(() => {
      AsyncStorage.setItem('button3', JSON.stringify(isOn3));
    }, [isOn3]);
  
    useEffect(() => {
      AsyncStorage.setItem('button4', JSON.stringify(isOn4));
    }, [isOn4]);
  
    useEffect(() => {
      AsyncStorage.setItem('button5', JSON.stringify(isOn5));
    }, [isOn5]);
  
    const toggleButton = () => setIsOn((prev) => !prev);
    const toggleButton2 = () => setIsOn2((prev) => !prev);
    const toggleButton3 = () => setIsOn3((prev) => !prev);
    const toggleButton4 = () => setIsOn4((prev) => !prev);
    const toggleButton5 = () => setIsOn5((prev) => !prev);
  const showAlert = () => {
    navigation.navigate("Home");
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
        source={require('../../assets/16.png')} 
        style={styles.overlayImage5}
      />
      <Image 
        source={require('../../assets/18.png')} 
        style={styles.overlayImage3}
      />
      <Image 
        source={require('../../assets/19.png')} 
        style={styles.overlayImage2}
      />
      <Image 
        source={require('../../assets/20.png')} 
        style={styles.overlayImage4}
      />
      <Image 
        source={require('../../assets/3.png')} 
        style={styles.overlayImage6}
      />
      
      <TouchableOpacity style={styles.button} onPress={showAlert}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>

      {/* Toggle Button */}
      <TouchableOpacity 
        style={[styles.toggleButton, { backgroundColor: isOn ? '#b3eda9' : 'black' }]} 
        onPress={toggleButton}
      >
        <Text style={[styles.toggleButtonText, {color: isOn ? 'black' : 'white'}]}>{isOn ? 'On' : 'Off'}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.toggleButton2, { backgroundColor: isOn2 ? '#b3eda9' : 'black' }]} 
        onPress={toggleButton2}
      >
        <Text style={[styles.toggleButtonText2, {color: isOn2 ? 'black' : 'white'}]}>{isOn2 ? 'On' : 'Off'}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.toggleButton3, { backgroundColor: isOn3 ? '#b3eda9' : 'black' }]} 
        onPress={toggleButton3}
      >
        <Text style={[styles.toggleButtonText2, {color: isOn3 ? 'black' : 'white'}]}>{isOn3 ? 'On' : 'Off'}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.toggleButton4, { backgroundColor: isOn4 ? '#b3eda9' : 'black' }]} 
        onPress={toggleButton4}
      >
        <Text style={[styles.toggleButtonText4, {color: isOn4 ? 'black' : 'white'}]}>{isOn4 ? 'On' : 'Off'}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.toggleButton5, { backgroundColor: isOn5 ? '#b3eda9' : 'black' }]} 
        onPress={toggleButton5}
      >
        <Text style={[styles.toggleButtonText5, {color: isOn5 ? 'black' : 'white'}]}>{isOn5 ? 'On' : 'Off'}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#b3eda9',
    top: '10%',
    left: '78%',
    width: '20%',
    height: 25,
    borderRadius: 10,
  },
  buttonText: {
    
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
  },
  background: {
    flex: 1,
  },
  toggleButton: {
    position: 'absolute',
    top: '20.5%',
    left:'75%',
    alignSelf: 'center',
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  toggleButton2: {
    position: 'absolute',
    top: '25.7%',
    left:'75%',
    alignSelf: 'center',
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  toggleButton3: {
    position: 'absolute',
    top: '32.5%',
    left:'75%',
    alignSelf: 'center',
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  toggleButton4: {
    position: 'absolute',
    top: '37.8%',
    left:'75%',
    alignSelf: 'center',
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  toggleButton5: {
    position: 'absolute',
    top: '44.5%',
    left:'75%',
    alignSelf: 'center',
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  toggleButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleButtonText2: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleButtonText3: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleButtonText4: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleButtonText5: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
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
    top: '0%', 
    left: '0%',
    width: '100%', 
    height: '50%',
    resizeMode: 'contain',
    alignItems: 'center',
  },
  overlayImage3: {
    position: 'absolute',
    top: '12%', 
    left: '0%', 
    width: '100%', 
    height: '50%',
    resizeMode: 'contain', 
    alignItems: 'center', 
  },
  overlayImage4: {
    position: 'absolute',
    top: '24%', 
    left: '0%', 
    width: '100%', 
    height: '50%',
    resizeMode: 'contain', 
    alignItems: 'center', 
  },
  overlayImage6: {
    position: 'absolute',
    top: '65%', 
    left: '26%', 
    width: '50%', 
    height: '50%',
    resizeMode: 'contain', 
    alignItems: 'center', 
  },
  overlayImage5: {
    position: 'absolute',
    top: '18%', 
    left: '-35%', 
    width: '170%', 
    height: '100%',
    resizeMode: 'contain', 
    alignItems: 'center', 
  },
});

export default ControlPanelScreen;
