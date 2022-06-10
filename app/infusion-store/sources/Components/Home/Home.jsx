import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import axios from "axios";
import { Carrousel, NavBar, Bienvenida } from "../index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    marginTop: 2,
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
    fontFamily: "PoppinsM",
    color: "#222",
    fontWeight: "700",
    marginTop: 4,
    marginBottom: 10,
    marginLeft: 10,
  },

  containerProductos: {
    height: 250,
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
    padding: 10,
    marginTop: 15,
  },

  nombre: {
    fontSize: 15,
    fontFamily: "PoppinsM",
    color: "#222",
    // fontWeight: "700",
    textAlign: "center",
    margin: 10,
  },

  precio: {
    fontSize: 15,
    // fontFamily: "monospace" || "Apple Color Emoji",
    fontWeight: "700",
    marginLeft: 15,
    marginTop: 5,
  },

  descripcion: {
    fontSize: 13,
    textAlign: "center",
    // fontFamily: "notoserif" || "Al Nile",
  },
});

// const width = Dimensions.get("window").width;
const ANCHO_CONTENEDOR = 150;

export default function Home({ navigation }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  useEffect(() => {
    axios
      .get("https://proyecto-final-gp1.herokuapp.com/productos")
      .then((res) => setProductos(res.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <NavBar />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator style={styles.loading} size="large" color="red" />
        ) : (
          <View>
            <Carrousel />
            <Bienvenida />
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
                  <AnimatedPressable
                    onPress={() => {
                      navigation.navigate("DetalleProducto", { id: item.id });
                    }}
                    style={{
                      width: 150,
                      height: "75%",
                      margin: 15,
                      backgroundColor: "white",
                      borderRadius: 10,

                      shadowColor: "#000",
                      shadowOffset: {
                        width: 4,
                        height: 0,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 8,
                      transform: [{ translateY }],
                    }}
                  >
                    <Image
                      source={{ uri: item.imagen }}
                      style={styles.imagen}
                    />
                    <Text style={styles.nombre}>{item.nombre}</Text>
                  </AnimatedPressable>
                );
              }}
            />
          </View>
        )}
      </View>
    </>
  );
}
