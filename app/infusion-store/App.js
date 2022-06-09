import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  Login,
  Home,
  Tienda,
  Cuenta,
  NavBar,
} from "./sources/Components/index.js";
import { useState, useEffect } from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { View, Text } from "react-native";

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
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  useEffect(() => {
    (async () => {
      const compatable = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricAvailable(compatable);
    })();
  });

  const onAuth = () => {
    if (isBiometricAvailable) {
      LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with Touch ID",
        fallbackLabel: "Enter Password",
      }).then((result) => {
        setIsAuthenticated(result.success);
      });
    } else {
      //google Sign in
    }
  };

  return (
    <>
      <NavBar />

      {isAuthenticated ? (
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
              // component={Cuenta}
              children={() => (
                <Cuenta setIsAuthenticated={setIsAuthenticated} />
              )}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons
                    name="person-circle-outline"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <Login onAuth={onAuth} />
      )}
    </>
  );
}
