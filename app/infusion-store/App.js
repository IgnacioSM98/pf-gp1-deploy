import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Vibration, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
// import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";
import { Tienda, Home } from "./sources/Components/index.js";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

const WorldScreen = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>This is a {props.name}!</Text>
    </View>
  );
};

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

        {/* {(props) => <WorldScreen {...props} name="home" />} */}

        <Tab.Screen
          name="Tienda"
          component={Tienda}
          options={{
            tabBarIcon: ({ color, size }) => (
              // <MaterialCommunityIcons
              //   name="heart-sharp"
              //   // name="logo-google-playstore"
              //   color={color}
              //   size={21}
              // />
              <FontAwesome5 name="store" size={19} color="grey" />
            ),
          }}
        >
          {/* {(props) => <WorldScreen {...props} name="store" />} */}
        </Tab.Screen>

        <Tab.Screen
          name="Cuenta"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" color={color} size={26} />
            ),
          }}
        >
          {(props) => <WorldScreen {...props} name="account" />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
