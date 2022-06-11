import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { getData } from "../../../Functions/localStorage";
import styled from "styled-components/native";

const Container = styled.View`
  height: 10%;
  width: 100%;
  margin: 10% 0%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const Image = styled.Image`
  height: 90%;
  width: 15%;
  aspect-ratio: ${1 / 1};
  resize-mode: contain;
  border-radius: 100;
`;

const Saludo = styled.Text`
  font-family: PoppinsM;
  font-size: 16;
  font-weight: 600;
  margin: 2%;
`;

const Texto = styled.Text`
  font-size: 13;
`;

export default function Bienvenida() {
  const [user, setUser] = useState({});

  useEffect(() => {
    getData("user").then((res) => {
      setUser(res.userInfo);
    });
  });

  return user ? (
    <Container>
      <View>
        <Saludo>{`¡Hola ${user.displayName?.split(" ")[0]}!`}</Saludo>
        <Texto>{`¿Con qué infusión te gustaría empezar tu día?`}</Texto>
      </View>

      <Image source={{ uri: user.photoURL }} alt="Profile Picture"></Image>
    </Container>
  ) : (
    <View></View>
  );
}
