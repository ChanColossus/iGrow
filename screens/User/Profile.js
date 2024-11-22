import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from '../../navigation/RouteNavigator';
import axios from "axios";

const ProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [user, setUser] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(true);  // Add loading state
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
          },
        },
      ]
    );
  };

  const { logout } = useAuth();
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const emails = await AsyncStorage.getItem('email');
        console.log(emails);
        if (emails) {
          const api = emails;
          const profileResponse = await axios.get(`http://192.168.100.117:8000/profile/${api}`);
          const userProfile = profileResponse.data;

          setEmail(userProfile.user.email);
          setPassword(userProfile.user.password);
          setName(userProfile.user.name);
          setRole(userProfile.user.role);
          setUser(userProfile.user);
          setLoading(false); // Set loading to false after data is fetched
        } else {
          console.log('Authentication token not found');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    // Show a loader until the data is fetched
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/6.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <Image source={require('../../assets/15.png')} style={styles.overlayImage3} />
      <Image source={require('../../assets/17.png')} style={styles.overlayImage2} />
      <Image source={require('../../assets/16.png')} style={styles.overlayImage4} />

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

      <View style={styles.overlay}>
        <Image
          source={{
            uri:
              user?.dp?.[0]?.url || "https://via.placeholder.com/300", // Fallback to placeholder if no dp
          }}
          style={styles.imagePreview}
        />
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          style={styles.inputContainer}
          mode="outlined"
          editable={false} // Disable the TextInput
        />
        <TextInput
          label="Username"
          value={email}
          onChangeText={setEmail}
          style={styles.inputContainer}
          mode="outlined"
          editable={false} // Disable the TextInput
        />
        <TextInput
          label="Role"
          value={role}
          onChangeText={setRole}
          style={styles.inputContainer}
          mode="outlined"
          editable={false} // Disable the TextInput
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible} // Toggle visibility
          style={styles.inputContainer}
          mode="outlined"
          editable={false}
          right={
            <TextInput.Icon
              icon={isPasswordVisible ? 'eye-off' : 'eye'}
              onPress={togglePasswordVisibility} // Handle eye icon press
            />
          }
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '80%',
    height: '19%',
    left: 35,
    top: 50,
    backgroundColor: 'transparent',
  },
  imagePreview: {
    top: '-5%',
    width: 250, // Set width and height for circular preview
    height: 250,
    borderRadius: 250, // Make it circular
    borderWidth: 3,
    borderColor: '#fff', // Optional: Add border color to make it more distinct
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  inputContainer: {
    top: '12%',
    width: '70%',
    marginBottom: 16,
    height: 25,
    paddingVertical: 5,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    top: -110,
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
    backgroundColor: 'red',
    top: '54%',
    left: '39%',
    width: '20%',
    height: 25,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
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
  overlayImage2: {
    position: 'absolute',
    top: '52%',
    left: '-45%',
    width: '190%',
    height: '50%',
    resizeMode: 'contain',
    alignItems: 'center',
  },
  overlayImage3: {
    position: 'absolute',
    top: '-32.2%',
    left: '-25%',
    width: '150%',
    height: '100%',
    resizeMode: 'contain',
    alignItems: 'center',
  },
  overlayImage4: {
    position: 'absolute',
    top: '0%',
    left: '-49%',
    width: '200%',
    height: '100%',
    resizeMode: 'contain',
    alignItems: 'center',
  },
  avatar: {
    top: 85,
    left: 25,
  },
  name: {
    top: 53,
    left: 50,
    fontSize: 8,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
  },
  headlineTitle: {
    top: 40,
    left: 50,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    top: 100,
    left: 50,
    fontSize: 8,
    color: 'white',
    width: '70%',
    lineHeight: 15,
  },
  imageHighlight: {
    position: 'absolute',
    top: 150,
    left: 44,
    width: '75%',
    height: 60,
  },
});

export default ProfileScreen;
