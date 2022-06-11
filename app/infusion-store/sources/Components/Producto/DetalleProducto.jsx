import React, { useEffect, useState } from "react";
import { Text, Button, View, StyleSheet, Image } from "react-native";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  contProd: {
    width: "100%",
    paddingTop: 45,
    position: "relative",
  },
  nombre: {
    fontWeight: "600",
    color: "white",
    margin: 30,
    fontSize: 30,
  },
  descripcion: {
    color: "white",
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
  },

  contFoto: {
    width: "100%",
    height: 500,
    backgroundColor: "white",
    borderRadius: 40,
  },

  img: {
    width: "100%",
    height: 350,
    marginTop: 30,
    resizeMode: "contain",
  },
  contDatos: {
    width: "100%",
    height: 550,
    backgroundColor: "#333334",
    borderRadius: 40,
    display: "flex",
    position: "absolute",
    top: 450,
  },
  volver: {
    position: "absolute",
    fontSize: 30,
    top: 70,
    left: 30,
    zIndex: 999,
  },
  favoritos: {
    position: "absolute",
    fontSize: 30,
    top: 70,
    right: 30,
    zIndex: 999,
  },
  numeros: {
    fontWeight: "bold",
    color: "white",
    margin: 30,
    fontSize: 30,
  },
  botones: {
    display: "flex",
    flexDirection: "row",
    marginTop: 40,
    margin: 30,
  },
  cantidad: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  boton: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
    backgroundColor: "#414345",
    width: 60,
    height: 60,
    borderRadius: 15,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  agregar: {
    color: "white",
    fontSize: 30,
    backgroundColor: "#414345",
    marginLeft: 35,
    width: 180,
    height: 68,
    borderRadius: 25,
    textAlign: "center",
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  num: {
    color: "white",
    fontSize: 30,
    margin: 10,
  },
});

const DetalleProducto = ({ route }) => {
  const { id } = route.params;
  const [data, setData] = useState([]);
  const navigation = useNavigation();

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
      <AntDesign
        style={styles.volver}
        name="arrowleft"
        size={24}
        color="black"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <Octicons style={styles.favoritos} name="heart" size={24} color="black" />

      <View style={styles.contFoto}>
        <Image source={{ uri: data.imagen }} style={styles.img} />
      </View>

      <View style={styles.contDatos}>
        <Text style={styles.nombre}>{data.nombre}</Text>
        <Text style={styles.descripcion}>{data.descripcion}</Text>
        <Text style={styles.numeros}>${data.precio}</Text>
        <View style={styles.botones}>
          <View style={styles.cantidad}>
            <Text style={styles.boton}>+</Text>
            <Text style={styles.num}>01</Text>
            <Text style={styles.boton}>-</Text>
          </View>
          <Text style={styles.agregar}>Agregar</Text>
        </View>
      </View>
    </View>
  );
};

export default DetalleProducto;
