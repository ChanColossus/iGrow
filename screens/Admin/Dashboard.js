import React, { useState,useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from "react-native-reanimated";
import { GestureHandlerRootView, DrawerLayout } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
const Dashboard = ({ navigation }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);


    const [drawer, setDrawer] = useState(null);
    const renderDrawer = () => (
      
        <View style={styles.drawerContainer}>
            
          <Image onPress={() => drawer?.closeDrawer()}
        source={require('../../assets/1.png')} 
        style={styles.overlayImage111}
      />
       {/* <Image 
        source={require('../../assets/16.png')} 
        style={styles.overlayImage55}
      /> */}
   
      
   {/* <TouchableOpacity onPress={() => drawer?.closeDrawer()} style={styles.closeButton}>
          <Icon name="close" size={24} color="black" />
        </TouchableOpacity> */}
          <View style={styles.links}>
      
            <TouchableOpacity 
  style={styles.linkContainer} 
  onPress={() => {
    if (drawer) drawer.closeDrawer(); // Close the drawer first
    navigation.navigate("WaterCollection"); // Then navigate
  }}
>
  <Icon name="water" size={24} color="black" />
  <Text style={styles.link}>Water Collection</Text>
</TouchableOpacity>
          <TouchableOpacity 
            style={styles.linkContainer} 
            onPress={() => {
                if (drawer) drawer.closeDrawer(); // Close the drawer first
                navigation.navigate("WaterSupply"); // Then navigate
              }}
          >
              <Icon name="water-drop" size={24} color="black" />
              <Text style={styles.link}>Water Supply</Text>
              </TouchableOpacity>
          
              <TouchableOpacity 
            style={styles.linkContainer} 
            onPress={() => {
                if (drawer) drawer.closeDrawer(); // Close the drawer first
                navigation.navigate("WaterFiltration"); // Then navigate
              }}
          >
              <Icon name="filter" size={24} color="black" />
              <Text style={styles.link}>Water Filtration</Text>
              </TouchableOpacity>
          
              <TouchableOpacity 
            style={styles.linkContainer} 
            onPress={() => {
                if (drawer) drawer.closeDrawer(); // Close the drawer first
                navigation.navigate("WaterDrain"); // Then navigate
              }}
          >
              <Icon name="delete" size={24} color="black" />
              <Text style={styles.link}>Water Drain</Text>
              </TouchableOpacity>
          
              <TouchableOpacity 
            style={styles.linkContainer} 
            onPress={() => {
                if (drawer) drawer.closeDrawer(); // Close the drawer first
                navigation.navigate("FishFeeding"); // Then navigate
              }}
          >
              <Icon name="pets" size={24} color="black" />
              <Text style={styles.link}>Fish Feeding</Text>
              </TouchableOpacity>
          
              <TouchableOpacity 
            style={styles.linkContainer} 
            onPress={() => {
                if (drawer) drawer.closeDrawer(); // Close the drawer first
                navigation.navigate("SolarPanel"); // Then navigate
              }}
          >
              <Icon name="solar-power" size={24} color="black" />
              <Text style={styles.link}>Solar Power</Text>
              </TouchableOpacity>
              <TouchableOpacity 
            style={styles.linkContainer} 
            onPress={() => {
                if (drawer) drawer.closeDrawer(); // Close the drawer first
                navigation.navigate("User"); // Then navigate
              }}
          >
              <Icon name="group" size={24} color="black" />
              <Text style={styles.link}>User Management</Text>
              </TouchableOpacity>
</View>

        </View>
      

      );
  const showAlert = () => {
    navigation.navigate("ControlPanel");
  };
  const showAlert2 = () => {
    navigation.navigate("Home");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
        source={require('../../assets/3.png')} 
        style={styles.overlayImage6}
      />
      
      <DrawerLayout
  ref={(ref) => setDrawer(ref)}
  drawerWidth={300}
  drawerPosition="left"
  renderNavigationView={renderDrawer}
  onDrawerOpen={() => setIsDrawerOpen(true)}
  onDrawerClose={() => setIsDrawerOpen(false)}
>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonN}
   
            onPress={() => drawer.openDrawer()}
          >
            <Icon name="menu" size={24} color="black" />
            <Text style={styles.buttonNText}>Open Drawer</Text>
          </TouchableOpacity>
        </View>
      </DrawerLayout>
    
     {!isDrawerOpen && (
  <>
    <TouchableOpacity style={styles.button} onPress={showAlert}>
      <Text style={styles.buttonText}>Control Panel</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.buttonl} onPress={showAlert2}>
      <Text style={styles.buttonText}>Home</Text>
    </TouchableOpacity>
  </>
)}
    </ImageBackground>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
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
        right: '2.6%', // Use right instead of left for better alignment
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
        left: '66%', // Adjust positioning
    
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

export default Dashboard;