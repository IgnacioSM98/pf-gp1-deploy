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
  container: {
    width: "100%",
    flex: 1,
    padding: 2,
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

  img: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  contProd: {
    width: "100%",
    flex: 1,
    padding: 24,
    marginTop: 10,
  },
});

const Tienda = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://proyecto-final-gp1.herokuapp.com/productos")
      .then((response) => response.json())
      .then((response) => {
        setData(response);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color="#00ff00"
        />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.contProd}>
              <Image source={{ uri: item.imagen }} style={styles.img} />
              <Text>{item.nombre}</Text>
              <Text>{item.precio}</Text>
              <Text>{item.stock}</Text>
              <Text>{item.descripcion}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Tienda;
