import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  Vibration,
  Platform,
} from "react-native";

const styles = StyleSheet.create({
  contProd: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#c8c8c8",
    borderBottomWidth: "1px",
    

  },
  contFoto: {
    width: "120px",
    height: "120px",
    backgroundColor: "white",
    borderRadius: "16px",
    margin: "10px",
    marginLeft: "14px",

  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  contDatos: {
    width: "200px",
    margin: "10px",
  },
  nombre: {
    fontWeight: "500",
    marginBottom: "5px",
  },
  parrafo: {
    fontWeight: "bold",
  },
});

const Producto = (props) => {
  return (
    <View style={styles.contProd}>
        
      <View style={styles.contFoto}>
        <Image source={props.imagen} style={styles.img} />
      </View>
      <View style={styles.contDatos}>
        <Text style={styles.nombre}>{props.nombre}</Text>
        <Text style={styles.parrafo}>$ {props.precio.toLocaleString("es-ES")}</Text>
        {/* <Text>Stock: {props.stock}</Text> */}
        {/* <Text>{props.descripcion}</Text> */}
      </View>
    </View>
  );
};

export default Producto;
