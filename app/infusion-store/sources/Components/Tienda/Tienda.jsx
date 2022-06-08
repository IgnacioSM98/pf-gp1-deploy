import React, { useEffect, useState, useCallback, useRef } from "react";
import { InteractionManager } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

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

import { Producto } from "../index";

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
  const [cantidad, setCantidad] = useState(8);

  const scrollRef = useRef();

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => {
        InteractionManager.runAfterInteractions(() => {
          scrollRef?.current?.scrollToIndex({
            index: 0,
            animated: true,
          });
        });

        setCantidad(8);
      };

      return () => unsubscribe();
    }, [])
  );

  useEffect(() => {
    fetch("https://proyecto-final-gp1.herokuapp.com/productos")
      .then((response) => response.json())
      .then((response) => {
        setData(response);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [cantidad]);

  const handleMore = () => {
    cantidad < data.length && setCantidad(cantidad + 8);
  };

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
          data={data.slice(0, cantidad)}
          onEndReachedThreshold={0.1}
          onEndReached={handleMore}
          ref={scrollRef}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Producto
              // id={item.id}
              imagen={{ uri: item.imagen }}
              nombre={item.nombre}
              precio={item.precio}
              stock={item.stock}
              descripcion={item.descripcion}
              // categorias={item.categoria}
             
            />
          )}
        />
      )}
    </View>
  );
};

export default Tienda;
