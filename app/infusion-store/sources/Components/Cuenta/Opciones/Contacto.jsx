import React from "react";
import { View, Text, Pressable } from "react-native";
import Cerrar from "../Cerrar";

export default function Contacto({ setOption }) {
  return (
    <View>
      <Pressable onPress={() => setOption(false)}>
        <Cerrar />
      </Pressable>

      <Text>Contacto</Text>
    </View>
  );
}
