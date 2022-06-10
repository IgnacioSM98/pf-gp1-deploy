import React from "react";
import { Text, TextInput } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  position: relative;
  background-color: grey;
  height: 10%;
`;

const Button = styled.Pressable`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 2%;
`;

export default function NavBar() {
  return (
    <Container>
      <Button>
        <Text>Carrito</Text>
      </Button>

      <TextInput
        placeholder="Buscar producto"
        style={{
          position: "absolute",
          bottom: 0,
          width: "50%",
          margin: 10,
          borderWidth: 1,
          borderRadius: 8,
          padding: 6,
        }}
      ></TextInput>
    </Container>
  );
}
