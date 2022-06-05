import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: 10,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  containerProducto: {
    justifyContent: "center",
    width: 150,
    margin: 10,
  },

  imagen: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://proyecto-final-gp1.herokuapp.com/productos")
      .then((res) => setProductos(res.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color="#00ff00"
        />
      ) : (
        <FlatList
          data={productos.slice(0, 6)}
          keyExtractor={({ id }, index) => id}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.containerProducto}>
              {/* <Text>{item.id}</Text> */}
              <Image source={item.imagen} style={styles.imagen} />
              <Text>{item.nombre}</Text>
              <Text>{item.precio}</Text>
              <Text>{item.descripcion}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
