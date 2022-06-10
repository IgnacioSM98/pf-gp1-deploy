import React, { useEffect, useState } from "react";
import { Text, Button, View, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  contProd: {
    width: "100%",
  },
  nombre:{
    fontWeight: "bold",
  },

  contFoto: {
    width: 250,
    height: 250,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    marginLeft: 14,
  },

  img: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },

});

const DetalleProducto = ({ id }) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://proyecto-final-gp1.herokuapp.com/producto/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setData(response);
      })
      .catch((error) => console.error(error));
  }, [id]);
  return (
      <View style={styles.contProd}>
        <Text style={styles.nombre}>{data.nombre}</Text>
        <View style={styles.contFoto}>
        <Image source={{ uri: data.imagen }} style={styles.img} />
        </View>
        <Text>{data.precio}</Text>
        <Text>{data.descripcion}</Text>
        <Text>{data.stock}</Text>
        <Button title="Agregar al carrito"></Button>
      </View>
  );
};

export default DetalleProducto;
