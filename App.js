import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RoutesNavigator from "./navigation/RouteNavigator";

import { PaperProvider } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";
export default function App() {
  return (
   
    <PaperProvider>
      <RoutesNavigator >
     
        </RoutesNavigator>
     
    </PaperProvider>

  );
}


