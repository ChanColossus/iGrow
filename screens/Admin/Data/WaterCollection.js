import React, { useState,useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity, Text,ScrollView,Modal,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from "react-native-reanimated";
import { GestureHandlerRootView, DrawerLayout } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { DataTable, Button, TextInput } from 'react-native-paper';
import axios from 'axios';
const WaterCollection = ({ navigation }) => {
    const [WaterSource, setWaterSource] = useState('');
    const [WaterLevel, setWaterLevel] = useState('');
  
    const [modalVisible, setModalVisible] = useState(false);
    const handleCreateData = () => {
        const post = {
       WaterSource: WaterSource,
       WaterLevel: WaterLevel
     };
   
     // Create a FormData object to append the images and user data
     const formData = new FormData();
     formData.append('WaterSource', WaterSource);
     formData.append('WaterLevel', WaterLevel);
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
  .post(`http://192.168.100.117:8000/wc-create`, formData, config)
  .then((response) => {
    console.log('Response:', response);
    
    if (response.status === 200 || response.status === 201) {
      setWaterSource('');
      setWaterLevel('');
      Alert.alert('Create Data Successful', 'You have posted data successfully.');
    } else {
      Alert.alert('Unexpected Response', `Server returned status: ${response.status}`);
    }
  })
  .catch((error) => {
    if (error.response) {
      console.log('Error response:', error.response);
      Alert.alert('Create Data Error', `Server Error: ${error.response.status}`);
    } else if (error.request) {
      console.log('Error request:', error.request);
      Alert.alert('Create Data Error', 'No response from server. Check network.');
    } else {
      console.log('Error message:', error.message);
      Alert.alert('Create Data Error', error.message);
    }
  })
  .finally(() => {
    setModalVisible(false);
  });

     
   };
    const showAlert = () => {
        navigation.navigate("ControlPanel");
      };

 
      const showAlert2 = () => {
        navigation.navigate("Dashboard");
      };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ImageBackground 
      source={require('../../../assets/6.png')} 
      style={styles.background}
      resizeMode="cover" 
    >
      <Image 
        source={require('../../../assets/1.png')} 
        style={styles.overlayImage1}
      />
      <Image 
        source={require('../../../assets/16.png')} 
        style={styles.overlayImage5}
      />  
      <Image 
        source={require('../../../assets/3.png')} 
        style={styles.overlayImage6}
      />
      
      
        {/* this is where you add the codes */}
        {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -1700, }}> */}
  <DataTable style={{marginTop: 110}}>
    {/* Table Header */}
    <DataTable.Header>
      <DataTable.Title>Water Source</DataTable.Title>
      <DataTable.Title numeric>Water Level</DataTable.Title>
      <DataTable.Title numeric>Date</DataTable.Title>
      <DataTable.Title numeric>Actions</DataTable.Title>
    </DataTable.Header>

    {/* Table Rows */}
    <DataTable.Row>
      <DataTable.Cell>Commercial Water</DataTable.Cell>
      <DataTable.Cell numeric>30.4 L</DataTable.Cell>
      <DataTable.Cell numeric>02-27-2025</DataTable.Cell>
      <DataTable.Cell numeric>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <TouchableOpacity onPress={() => console.log("Update John")}>
          <Icon name="edit" size={20} color="blue" style={{ marginRight: 10 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Delete John")}>
          <Icon name="delete" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Filtered Rain Water</DataTable.Cell>
      <DataTable.Cell numeric>24 L</DataTable.Cell>
      <DataTable.Cell numeric>02-26-2025</DataTable.Cell>
      <DataTable.Cell numeric>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <TouchableOpacity onPress={() => console.log("Update John")}>
          <Icon name="edit" size={20} color="blue" style={{ marginRight: 10 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Delete John")}>
          <Icon name="delete" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </DataTable.Cell>
    </DataTable.Row>
  </DataTable>
 {/* <DataTable>

<DataTable.Header>
  <DataTable.Title>Name</DataTable.Title>
  <DataTable.Title numeric>Age</DataTable.Title>
  <DataTable.Title numeric>Score</DataTable.Title>
</DataTable.Header>

{data.map((item, index) => (
  <DataTable.Row key={index}>
    <DataTable.Cell>{item.name}</DataTable.Cell>
    <DataTable.Cell numeric>{item.age}</DataTable.Cell>
    <DataTable.Cell numeric>{item.score}</DataTable.Cell>
  </DataTable.Row>
))}
</DataTable> */}
{/* </View> */}
 <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
      <Text style={styles.buttonText}>Create Data</Text>
    </TouchableOpacity>
<TouchableOpacity style={styles.buttonl} onPress={showAlert2}>
      <Text style={styles.buttonText}>Dashboard</Text>
    </TouchableOpacity>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back press
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create a New Data</Text>
            <TextInput
              style={styles.textInput1}
              placeholder="WaterSource"
              value={WaterSource}
              onChangeText={setWaterSource}
              mode="outlined"
            />
              <TextInput
              style={styles.textInput}
              placeholder="WaterLevel"
              value={WaterLevel}
              onChangeText={setWaterLevel}
              multiline
              mode="outlined"
            />
                        <View style={styles.modalButtons}>
              <Button mode="contained" onPress={handleCreateData} style={styles.modalButton}>
                Create
              </Button>
              <Button mode="text" onPress={() => setModalVisible(false)} style={styles.modalButton1}>
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0)",
      },
      buttonN: {
        position: 'absolute',
        top: 80,  // Adjust the top position to your preference
        left: 10, // Adjust the left position to your preference
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#b3eda9',
        padding: 5,
        borderRadius: 10,
        zIndex:5
      },
      
      buttonNText: {
        color: "black",
        marginLeft: 10,
        fontSize: 10,
        fontWeight: "bold",
        
      },
      drawerContainer: {
        flex: 1,
     backgroundColor:"#b3eda9",
        padding: 20,
        zIndex:100
      },
      drawerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
      },
      links: {
        marginTop: 50,
        marginLeft: -15
      },
      link: {
        fontSize: 16,
        color: "black",
        marginBottom: 0,
        marginLeft: 20
      },
      linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
      },
      button: {
        backgroundColor: '#b3eda9',
        position: 'absolute', // Ensure absolute positioning
        top: '9.8%', // Adjust percentage based on layout
        right: '79%', // Use right instead of left for better alignment
       // Set fixed height
        borderRadius: 10,
        justifyContent: 'center', 
        alignItems: 'center',
        zIndex: 5, 
        padding:7// Ensure it appears on top
      },
      
      buttonl: {
        backgroundColor: '#b3eda9',
        position: 'absolute',
        top: '9.8%',
        left: '81%', // Adjust positioning
    
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
        padding:7
      },
      
      buttonText: {
        fontSize: 10,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
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
  overlayImage111: {
    position: 'absolute',
    top: 10, 
    left: 0, 
    width: '110%', 
    height: 100, 
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
  overlayImage55: {
    position: 'absolute',
    top: '0%', 
    left: '-66%', 
    width: '250%', 
    height: '100%',
    resizeMode: 'contain', 
    alignItems: 'center', 
  },
});

export default WaterCollection;