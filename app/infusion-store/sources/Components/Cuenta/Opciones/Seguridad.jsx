import React from "react";
import { View, Text, Pressable } from "react-native";
import Cerrar from "../Cerrar";

export default function Seguridad({ setOption }) {
  return (
    <View>
      <Pressable onPress={() => setOption(false)}>
        <Cerrar />
      </Pressable>

      <Text>Seguridad</Text>
    </View>
  );
}
