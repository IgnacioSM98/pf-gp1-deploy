import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  Login,
  Home,
  Tienda,
  Favoritos,
  Cuenta,
} from "./sources/Components/index.js";
import { useState, useEffect } from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { View, Text } from "react-native";
import { setData, getData } from "./sources/Functions/localStorage";

const Tab = createBottomTabNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricAvailable(compatible);

      // Para guardar el usuario
      // setData("user", "rodri");

      // Para recuperar el usuario
      const user = await getData("user");

      // Usuario que inició sesión
      console.log(isAuthenticated, "xd");
    })();
  }, []);

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
              name="Favs"
              component={Favoritos}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="heart-sharp" size={24} color="grey" />
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
        <Login onAuth={onAuth} setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
}
