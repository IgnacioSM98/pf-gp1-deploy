import { Provider } from "react-redux";
import store from "./redux/store/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Login,
  Home,
  Tienda,
  Favoritos,
  Cuenta,
  DetalleProducto,
  Carrito,
} from "./sources/Components/index.js";
import { StatusBar } from "react-native";
import { useState, useEffect } from "react";

// ICONOS - Libreria: https://icons.expo.fyi

import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import * as LocalAuthentication from "expo-local-authentication";
import { setData, getData } from "./sources/Functions/localStorage";
import * as Font from "expo-font";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const fetchFonts = async () => {
  await Font.loadAsync({
    Poppins: require("./assets/fonts/Poppins-Thin.ttf"),
    PoppinsM: require("./assets/fonts/Poppins-Medium.ttf"),
  });
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  StatusBar.setBarStyle("dark-content", true);

  useEffect(() => {
    fetchFonts();

    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricAvailable(compatible);

      // Para guardar el usuario

      // Para recuperar el usuario

      // Usuario que inició sesión
      // console.log(isAuthenticated, "xd");
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

  const HomeTabs = () => {
    return (
      <Tab.Navigator
        initialRouteName="Store"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Inicio"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home-variant-outline"
                size={28}
                color={color}
              />
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
          name="Favoritos"
          component={Favoritos}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart-sharp" size={24} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Cuenta"
          children={() => <Cuenta setIsAuthenticated={setIsAuthenticated} />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <Provider store={store}>
      {isAuthenticated ? (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen name="DetalleProducto" component={DetalleProducto} />
            <Stack.Screen name="Carrito" component={Carrito} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <Login onAuth={onAuth} setIsAuthenticated={setIsAuthenticated} />
      )}
    </Provider>
  );
}
