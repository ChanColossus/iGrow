import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import LandingPage from "../screens/LandingPage";
import LoginScreen from "../screens/Auth/Login";
import ProfileScreen from "../screens/User/Profile";
import AboutUs from "../screens/User/AboutUs";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#b3eda9", height: 30 },
        tabBarActiveTintColor: "#105d5e",
        tabBarInactiveTintColor: "#105d5e",
        tabBarLabelStyle: { fontSize: 10, paddingBottom: 5 },
        headerShown: false, // No headers for tab screens
        tabBarIcon: () => null, // No icons for tabs
      }}
    >
      <Tab.Screen name="Home" component={LandingPage} />
      {/* auto landing when not logged in */}
      {/* <Tab.Screen name="Recents" component={HomeScreen} />  */}
      {/* set this as the landing once logged in */}
      <Tab.Screen name="About" component={AboutUs} />
      {/* <Tab.Screen name="Testimonials" component={ProfileScreen} /> */}
      {/* show Testimonials onced logged in */}
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
      {/* show profile onced logged in */}
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  );
}

export default function RouteNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        {/* <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }}
        /> */}
        {/* Render BottomTabs for main navigation */}
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
