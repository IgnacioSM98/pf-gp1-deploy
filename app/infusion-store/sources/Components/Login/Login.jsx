import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../redux/actions";

const styles = StyleSheet.create({
  btn: {
    marginTop: 300,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#0893FC",
    padding: 10,
    borderRadius: 5,
  },

  text: {
    left: "35%",
    fontSize: 20,
  },

  login: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
});

export default function Login({ onAuth, setIsAuthenticated }) {
  const dispatch = useDispatch();

  // Recuperamos el usuario de la cache
  // const user = await getData("user");

  // Guardamos la información del usuario
  dispatch(
    setUserInfo({
      uid: "kHXq79CbI7delhbqeFLdG3WJBqk2",
      displayName: "Rodrigo Cremella",
      email: "rodrigocremella@gmail.com",
      emailVerified: true,
      phoneNumber: null,
      photoURL:
        "https://lh3.googleusercontent.com/a-/AOh14GgZYieOLM4OfMsyQ1_-i1UimJySENWd0VmU6YUT8w=s96-c",
      isAnonymous: false,
      rol: "admin",
      visualizacion: "admin",
    })
  );

  return (
    <View>
      <Text style={styles.text}>Si ma re dulce</Text>
      <TouchableOpacity onPress={onAuth} style={styles.btn}>
        <Text style={styles.login}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setIsAuthenticated(true)}
        style={styles.btn}
      >
        <Text style={styles.login}>Login De Pana</Text>
      </TouchableOpacity>
    </View>
  );
}
