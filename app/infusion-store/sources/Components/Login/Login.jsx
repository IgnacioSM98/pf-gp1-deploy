import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";

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
    marginTop: 200,
    left: "35%",
    fontSize: 20,
  },

  login: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
});

export default function Login({ onAuth }) {
  return (
    <View>
      <Text style={styles.text}>Si ma re dulce</Text>
      <TouchableOpacity onPress={onAuth} style={styles.btn}>
        <Text style={styles.login}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
