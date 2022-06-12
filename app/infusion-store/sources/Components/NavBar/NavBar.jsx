import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { Carrito } from "../index";
import { useNavigation } from "@react-navigation/native";

import styled from "styled-components/native";

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

const styles = StyleSheet.create({
  // contenedorInput: {
  //   flex: 1,
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   width: "70%",
  //   top: "5%",
  // },

  buscador: {
    position: "absolute",
    flex: 1,
    width: "65%",
    bottom: "5%",
    left: "5%",
    // padding: 10,
    borderRadius: 5,
    backgroundColor: "rgba(194, 194, 194, 0.69)",
    color: "grey",
    fontFamily: "PoppinsM",
  },

  // icono: {
  //   left: "20%",
  //   top: "5%",
  //   paddingLeft: 13,
  //   padding: 8,
  //   backgroundColor: "rgba(194, 194, 194, 0.69)",
  //   borderTopRighttRadius: 0,
  //   borderBottomRighttRadius: 0,
  //   borderTopLeftRadius: 13,
  //   borderBottomLeftRadius: 13,
  //   borderColor: "none",
  // },
});

export default function NavBar() {
  const navigation = useNavigation();
  const goToCart = () => {
    navigation.navigate("Carrito");
  };

  return (
    <Container>
      <Button onPress={() => goToCart()}>
        <MaterialCommunityIcons
          name="cart"
          size={26}
          color="black"
          style={{ alignItems: "center", justifyContent: "center" }}
        />
      </Button>

      <Searchbar
        placeholder="Buscar producto..."
        style={styles.buscador}
        inputStyle={{
          fontFamily: "PoppinsM",
          fontSize: 15,
          color: "grey",
        }}
      />

      {/* <View style={styles.contenedorInput}> */}
      {/* <Feather style={styles.icono} name="search" size={24} color="black" /> */}
      {/* <TextInput
        placeholder="Buscar producto..."
        placeholderTextColor="grey"
        style={styles.buscador}
      ></TextInput> */}
      {/* </View> */}
    </Container>
  );
}
