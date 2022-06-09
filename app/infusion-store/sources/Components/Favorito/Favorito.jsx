import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";

const styles = StyleSheet.create({
  view: {
    marginTop: 50,
  },

  text: {
    left: "35%",
    fontSize: 20,
  },

  img: {
    width: "10%",
    height: "10%",
    borderRadius: 10,
    resizeMode: "contain",
  },

  btn: {
    display: "flex",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
  },
});

export default function Favorito({ navigation, item }) {
  return (
    <View style={styles.view}>
      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate("DetalleProducto", { id: item.id })}
      >
        {/* <Image source={item.imagen} style={styles.img} alt="uwu" /> */}
        <Text>{item.nombre}</Text>
        <Text>{item.precio}</Text>
      </Pressable>
    </View>
  );
}
