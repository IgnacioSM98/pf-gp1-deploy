import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Image, Text } from "react-native";

export default function CarritoItem({ producto }) {
  return (
    <View>
      <Image
        source={{ uri: producto.imagen }}
        style={{ width: 100, height: 100 }}
      />
      <Text>{producto.nombre}</Text>
      <Text>{producto.precio}</Text>
    </View>
  );
}
