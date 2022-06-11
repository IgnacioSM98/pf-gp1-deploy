import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  height: 40;
  width: 40;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10;

  position: absolute;
  top: 20;
  right: 20;

  background-color: #6f7580;
`;

const Text = styled.Text`
  font-size: 20;
`;

export default function Cerrar() {
  return (
    <Container>
      <Text>x</Text>
    </Container>
  );
}
