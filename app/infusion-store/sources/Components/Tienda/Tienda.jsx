import React, { useEffect, useState, useCallback, useRef } from "react";
import { InteractionManager } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NavBar } from "../index";
import { useSelector } from "react-redux";

import { ActivityIndicator, FlatList, View, StyleSheet } from "react-native";

import { Producto, Filtros } from "../index";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: 2,
    // marginTop: Platform.OS === "ios" ? "10%" : 0,
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

const Tienda = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const data = useSelector((state) => state.productosFiltrados);
  const [cantidad, setCantidad] = useState(8);
  const [detalle, setDetalle] = useState(false);
  const [idProd, setIdProd] = useState();
  const [selected, setSelected] = useState("");
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
        setDetalle(false);
        setIdProd();
      };

      return () => unsubscribe();
    }, [])
  );

  useEffect(() => {
    if (data[0]) {
      setLoading(false);
    }
  }, [data]);

  const handleMore = () => {
    cantidad < data.length && setCantidad(cantidad + 8);
  };

  return (
    <>
      <NavBar />

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
              <View>
                <Producto
                  id={item.id}
                  imagen={{ uri: item.imagen }}
                  nombre={item.nombre}
                  precio={item.precio}
                  stock={item.stock}
                  descripcion={item.descripcion}
                  state={detalle}
                  setDetalle={setDetalle}
                  setIdProd={setIdProd}
                  navigation={navigation}

                  // categorias={item.categoria}
                />
              </View>
            )}
          />
        )}
        <Filtros setSelected={setSelected} />
      </View>
    </>
  );
};

export default Tienda;
