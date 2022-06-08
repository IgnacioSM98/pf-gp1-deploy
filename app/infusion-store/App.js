// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View, Vibration, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Tienda, Home, Cuenta } from "./sources/Components/index.js";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Button } from "react-native";

const Tab = createBottomTabNavigator();

// const vibrate = () => {
//   if (Platform.OS === "ios") {
//     console.log(Platform.OS);
//     // this logic works in android too. you could omit the else statement
//     const interval = setInterval(() => Vibration.vibrate(), 1000);
//     // it will vibrate for 5 seconds
//     setTimeout(() => clearInterval(interval), 5000);
//   } else {
//     Vibration.vibrate(5000);
//   }
// };

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Store"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Inicio"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={21} />
            ),
          }}
        />

        <Tab.Screen
          name="Tienda"
          component={Tienda}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="store" size={19} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Cuenta"
          component={Cuenta}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
