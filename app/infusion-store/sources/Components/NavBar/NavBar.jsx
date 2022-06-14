import React, { useEffect, useState } from "react";
import { StyleSheet, Keyboard } from "react-native";
import { MaterialCommunityIcons, Foundation } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import styled from "styled-components/native";
import { setProductosFiltrados } from "../../../redux/actions";

const Container = styled.View`
  position: relative;
  // justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 10%;
  top: 5%;
  margin-bottom: 10%;
  // background-color: grey;
`;

const Button = styled.Pressable`
  position: absolute;
  bottom: 5%;
  right: 5%;
  padding: 10px;
  background-color: rgba(194, 194, 194, 0.69);
  border-radius: 15px;
`;
const Filter = styled.Pressable`
  position: absolute;
  bottom: 5%;
  right: 18%;
  padding: 10px;
  padding-left: 12px;
  padding-right: 12px;
  background-color: rgba(194, 194, 194, 0.69);
  border-radius: 15px;
`;

const Titulo = styled.Text`
  position: absolute;
  top: 50%;
  left: 8%;
  font-size: 20;
  font-weight: 600;
`;

const styles = StyleSheet.create({
  buscador: {
    position: "absolute",
    flex: 1,
    width: "65%",
    bottom: "5%",
    left: "5%",
    // padding: 10,
    borderRadius: 12,
    backgroundColor: "rgba(194, 194, 194, 0.69)",
    color: "grey",
    fontFamily: "PoppinsM",
  },
});

export default function NavBar({ titulo, screen, mostrar, setMostrar, flag }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const productos = useSelector((state) => state.productos);
  const searchValue = useSelector((state) => state.searchBar);

  useEffect(() => {
    if (screen === "Inicio") {
      // Keyboard.dismiss();
    }
  }, [screen]);

  const handleSearch = (text) => {
    dispatch(
      setProductosFiltrados(
        productos.filter((producto) =>
          producto.nombre.toUpperCase().includes(text.toUpperCase())
        ),
        text
      )
    );
  };

  const handleOnFocus = () => {
    screen === "Inicio" && navigation.navigate("Tienda");
  };
  return (
    <Container>
      <>
        <Filter onPress={() => setMostrar(!mostrar)}>
          <Foundation
            name="filter"
            size={26}
            color="black"
            style={{ alignItems: "center", justifyContent: "center" }}
          />
        </Filter>
        <Button onPress={() => navigation.navigate("Carrito")}>
          <MaterialCommunityIcons
            name="cart"
            size={26}
            color="black"
            style={{ alignItems: "center", justifyContent: "center" }}
          />
        </Button>
      </>

      {titulo ? (
        <Titulo>{titulo}</Titulo>
      ) : (
        <Searchbar
          placeholder="Buscar producto..."
          style={styles.buscador}
          onChangeText={(text) => handleSearch(text)}
          onFocus={handleOnFocus}
          value={searchValue}
          autoFocus={flag}
          showSoftInputOnFocus={flag}
          inputStyle={{
            fontFamily: "PoppinsM",
            fontSize: 15,
            color: "grey",
          }}
        />
      )}
    </Container>
  );
}
