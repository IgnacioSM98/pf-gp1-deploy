import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
} from "react-native";
import axios from "axios";
import { Carrousel } from "../index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    marginTop: 20,
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

  productosTitulo: {
    fontSize: 18,
    fontFamily: "Roboto",
    color: "#222",
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 70,
  },

  containerProductos: {
    // backgroundColor: "grey",
    height: 250,
    // borderBottomWidth: 1,
    // borderTopWidth: 1,
  },

  // containerProducto: {
  //   // justifyContent: "center",
  //   width: 150,
  //   height: "90%",
  //   margin: 10,
  //   transform: [{ translateY }],
  // },

  imagen: {
    width: 150,
    height: 100,
    resizeMode: "contain",
  },
});

const width = Dimensions.get("window").width;
const ANCHO_CONTENEDOR = 150;
// const ESPACIO_LATERAL = (width - 150) / 2;

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollX = React.useRef(new Animated.Value(0)).current;

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
        <ActivityIndicator style={styles.loading} size="large" color="red" />
      ) : (
        <View>
          <Carrousel />
          <Text style={styles.productosTitulo}>Productos Destacados</Text>
          <Animated.FlatList
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            data={productos.slice(0, 8)}
            keyExtractor={({ id }, index) => id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginHorizontal: 15,
            }}
            decelerationRate={0}
            snapToInterval={ANCHO_CONTENEDOR}
            scrollEventThrottle={16}
            style={styles.containerProductos}
            horizontal
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * ANCHO_CONTENEDOR,
                index * ANCHO_CONTENEDOR,
                (index + 1) * ANCHO_CONTENEDOR,
              ];

              const outputRange = [-2, -8, 0];

              const translateY = scrollX.interpolate({
                inputRange,
                outputRange,
              });

              return (
                <Animated.View
                  style={{
                    width: 150,
                    height: "80%",
                    margin: 15,
                    // shadowColor: "#000",
                    // shadowOffset: {
                    //   width: 4,
                    //   height: 0,
                    // },
                    // shadowOpacity: 0.2,
                    // shadowRadius: 8,
                    transform: [{ translateY }],
                  }}
                >
                  <Image source={{ uri: item.imagen }} style={styles.imagen} />
                  <Text>{item.nombre}</Text>
                  <Text>{item.precio}</Text>
                  <Text>{item.descripcion.slice(0, 100)}</Text>
                </Animated.View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}
