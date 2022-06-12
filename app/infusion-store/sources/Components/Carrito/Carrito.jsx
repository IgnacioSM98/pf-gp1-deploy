import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Image, StyleSheet, FlatList } from "react-native";
import CarritoItem from "./CarritoItem";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  volver: {
    position: "absolute",
    fontSize: 30,
    top: 70,
    left: 30,
    zIndex: 999,
  },
});

export default function Carrito() {
  const navigation = useNavigation();
  const carrito = useSelector((state) => state.carrito);

  return (
    <View>
      <AntDesign
        style={styles.volver}
        name="arrowleft"
        size={24}
        color="black"
        onPress={() => {
          navigation.goBack();
        }}
      />
      {/* {carrito?.map((el) => (
        <View key={el.id}>
          <CarritoItem key={el.id} producto={el} />
        </View>
      ))} */}
      <FlatList
        data={carrito}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item, index }) => {
          return <CarritoItem producto={item} />;
        }}
      />
    </View>
  );
}
