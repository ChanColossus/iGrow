import React, { createContext, useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../screens/HomeScreen';
import LandingPage from '../screens/LandingPage';
import LoginScreen from '../screens/Auth/Login';
import RegisterScreen from '../screens/Auth/Register';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword';
import ResetPasswordScreen from '../screens/Auth/ResetPassword';
import ProfileScreen from '../screens/User/Profile';
import AboutUs from '../screens/User/AboutUs';
import ControlPanel from '../screens/Admin/ControlPanel';
import Dashboard from '../screens/Admin/Dashboard';
import Testimonials from '../screens/User/Testimonials';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Create AuthContext to share login state across the app
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Public bottom tabs (always available)
function PublicTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#b3eda9', height: 30 },
        tabBarActiveTintColor: '#105d5e',
        tabBarInactiveTintColor: '#105d5e',
        tabBarLabelStyle: { fontSize: 10, paddingBottom: 5 },
        headerShown: false,
        tabBarIcon: () => null,
      }}
    >
      <Tab.Screen name="Home" component={LandingPage} />
      <Tab.Screen name="About" component={AboutUs} />
      <Tab.Screen name="Login" component={LoginScreen} />
      
    </Tab.Navigator>
  );
}

// Authenticated bottom tabs (only available after login)
function AuthenticatedTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#b3eda9', height: 30 },
        tabBarActiveTintColor: '#105d5e',
        tabBarInactiveTintColor: '#105d5e',
        tabBarLabelStyle: { fontSize: 10, paddingBottom: 5 },
        headerShown: false,
        tabBarIcon: () => null,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About" component={AboutUs} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Testimonials" component={Testimonials} />
      
    </Tab.Navigator>
  );
}

export default function RouteNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check if user is logged in (using AsyncStorage)
  useEffect(() => {
    const checkLoginStatus = async () => {
      const userId = await AsyncStorage.getItem('userId');
     
      setIsLoggedIn(!!userId);
      
    };
    checkLoginStatus();
  }, []);

  const authContext = {
    isLoggedIn,
    login: async (userId) => {
      await AsyncStorage.setItem('userId', userId);
      setIsLoggedIn(true);
      
    },
    logout: async () => {
      await AsyncStorage.clear();
      setIsLoggedIn(false);
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
          <Stack.Screen name="Authenticated" component={AuthenticatedTabs} />
          <Stack.Screen name="ControlPanel" component={ControlPanel} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          </>
          
          
        ) : (
          <>
            <Stack.Screen name="Public" component={PublicTabs} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
            <Stack.Screen name="ControlPanel" component={ControlPanel} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  </AuthContext.Provider>
  );
}
