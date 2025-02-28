import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity, Alert, ActivityIndicator,Modal,ScrollView } from 'react-native';
import { Text, Avatar,TextInput,Button,Card } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker'; 
import { useIsFocused } from '@react-navigation/native';
const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true); // State for loader
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused();
  const handleCPNavigation = () => {
    navigation.navigate("Dashboard");
  };
  const handleCreatePost = () => {
    if (images.length === 0) {
      Alert.alert('Image Required', 'Please select at least one image.');
      return;
    }
  
    const post = {
      title: title,
      description: description,
      email: email,
      user: user
    };
  
    // Create a FormData object to append the images and user data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('email', email);
    formData.append('user', user);
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
      .post(`https://igrow-backend.onrender.com/post-create`, formData, config)
      .then((response) => {
        console.log('Response:', response);
        setTitle('');
        setDescription('');
        setImages([]);  // Clear images after successful registration
        fetchPosts().then(() => {
          console.log('Posts refreshed after creation.');
        });
        Alert.alert('Create Post Successful', 'You have posted content successfully.');
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
        Alert.alert('Create Post Error', 'An error occurred during post creation.');
      });
    setModalVisible(false);
    
  };
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
  const fetchPosts = async () => {
    try {
      const emails = await AsyncStorage.getItem('email');
      if (emails) {
        const api = emails;
        const postResponse = await axios.get(`http://192.168.100.117:8000/post/${api}`);
        
        // Log the raw response for debugging
        console.log('Raw response:', postResponse.data);
  
        const responseData = postResponse.data;
  
        // Check if the response contains posts and is in the expected format
        if (responseData.success && Array.isArray(responseData.posts)) {
          const postsArray = responseData.posts;  // Extract the posts array
          if (Array.isArray(postsArray)) {
            // Log the posts in full (including images arrays)
            postsArray.forEach(post => {
              console.log('Post Details:', post);
              if (Array.isArray(post.images)) {
                console.log('Images:', post.images); // Log the images array for each post
              }
            });
            const sortedPosts = postsArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            // Update the state with the latest posts (slicing if needed)
            setPosts(sortedPosts.slice(0, 2));
          } else {
            console.log('No posts array found');
          }
        } else {
          console.log('Unexpected response format or no posts found');
        }
      } else {
        console.log('Authentication token not found');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };
  
  
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const emails = await AsyncStorage.getItem('email');
        if (emails) {
          const api = emails;
          const profileResponse = await axios.get(`http://192.168.100.117:8000/profile/${api}`);
          const userProfile = profileResponse.data;

          setEmail(userProfile.user.email);
          setPassword(userProfile.user.password);
          setName(userProfile.user.name);
          setRole(userProfile.user.role);
          setUser(userProfile.user.dp?.[0]?.url);
        } else {
          console.log('Authentication token not found');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    
    fetchPosts();
    fetchProfile();
    if (isFocused) {
      // Reload or refresh logic here
      console.log('HomeScreen is focused. Reloading data...');
      fetchPosts(); // Example function to fetch data
    }
  }, [console.log(posts),isFocused]);

  const highlight = {
    title: 'Innovative Farming',
    description: 'iGROW’s Dual Source Aquaponics Thrives in Central Signal Village, Taguig City',
    image: 'https://via.placeholder.com/150', 
  };

  if (loading) {
    // Show loader while data is being fetched
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Loading...</Text>
      </View>
    );
  }

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
        source={require('../assets/3.png')} 
        style={styles.overlayImage8}
      />
      <Image 
        source={require('../assets/7.png')} 
        style={styles.overlayImage5}
      />
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Create Post</Text>
      </TouchableOpacity>
    
      <Avatar.Image
        source={{ uri: user }}
        size={50}
        style={styles.avatar}
      />
      <Text variant="headlineMedium" style={styles.name}>
        {name}
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
      {role === 'admin' && (
        <TouchableOpacity style={styles.buttonLoc} onPress={handleCPNavigation}>
          <Text style={styles.buttonText2}>Dashboard</Text>
        </TouchableOpacity>
      )}
      <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>
          Your Recent Posts
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.container2} key={posts.length}>
        {posts.map((post, index) => (
          <Card key={index} style={styles.card2}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.cardTitle2}>
                {post.title}
              </Text>
              <Text variant="bodySmall" style={styles.cardContent2}>
                {post.description}
              </Text>
             
        
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back press
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create a New Post</Text>
            <TextInput
              style={styles.textInput1}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              mode="outlined"
            />
              <TextInput
              style={styles.textInput}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline
              mode="outlined"
            />
             <Button mode="outlined" onPress={handleImagePick} style={styles.buttonImage}>
          Upload
        </Button>
            <View style={styles.modalButtons}>
              <Button mode="contained" onPress={handleCreatePost} style={styles.modalButton}>
                Post
              </Button>
              <Button mode="text" onPress={() => setModalVisible(false)} style={styles.modalButton1}>
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  
  container2: {
    padding: 16,
  },
  buttonLoc: {
    top: '-5.5%',
    left: '44.8%',
    width: '50%',
 
    zIndex: 10,
    
  },
  buttonText2: {
    color: 'white', 
    fontWeight: 'bold',
    textAlign: 'right'
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card2: {
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  cardTitle2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardContent2: {
    fontSize: 14,
    color: '#555',
  },
  overlayImage8: {
    position: 'absolute',
    top: '70%', 
    left: '30%', 
    width: '40%', 
    height: '50%',
    resizeMode: 'contain', 
    alignItems: 'center', 
  },
  buttonImage: {
    top: '4%',
    width: '40%',
    backgroundColor: '#b3eda9',
    marginBottom:20,
    textColor:'black'
    
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput1: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    textAlignVertical: 'top',
    height: 40,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    textAlignVertical: 'top',
    height: 100,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#b3eda9',
    marginHorizontal: 5,
    marginTop: 10,
  },
  modalButton1: {
    marginHorizontal: 5,
    marginTop: 10,
  },
  card: {
    width: '80%',
    height: '19%',
    left: 35,
    top: 50,
    backgroundColor: 'transparent',
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
    top: 65,
  },
  button1: {
    backgroundColor: '#b3eda9',
    top: 110,
    left: 300,
    width: '20%',
    height: 25,
    borderRadius: 10,
    zIndex: 10, // Higher values bring the button to the front
  },
  button: {
    backgroundColor: '#b3eda9',
    top: 102,
    left: 300,
    width: '20%',
    height: 25,
    borderRadius: 10,
    zIndex: 10, // Higher values bring the button to the front
  },
  buttonText: {
    color: 'black',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
  },
  background: {
    flex: 1,
  },
  overlayImage1: {
    position: 'absolute',
    top: 4,
    left: 0,
    width: '100%',
    height: 100,
  },
  overlayImage5: {
    position: 'absolute',
    top: '4%',
    left: '-20%',
    width: '150%',
    height: '40%',
    resizeMode: 'contain',
  },
  avatar: {
    top: 65,
    left: 10
  },
  name: {
    top: 23,
    left: 70,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  headlineTitle: {
    top: 25,
    left: 50,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    top: 100,
    left: 50,
    fontSize: 10,
    color: 'white',
    width: '70%',
    lineHeight: 15,
  },
  imageHighlight: {
    position: 'absolute',
    top: 170,
    left: 44,
    width: '75%',
    height: 60,
  },
});

export default HomeScreen;
