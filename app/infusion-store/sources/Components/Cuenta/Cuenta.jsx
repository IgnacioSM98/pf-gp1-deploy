import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import { useFocusEffect } from "@react-navigation/native";
import { Platform, Text, View } from "react-native";
import {
  Ajustes,
  Contacto,
  Historial,
  Notificaciones,
  Reseñas,
  Seguridad,
} from "./Opciones/index";
import { NavBar } from "../index";

const Container = styled.View`
  display: flex;
  // justify-content: center;
  margin-top: 2%;
  // margin-top: ${Platform.OS === "ios" ? "10%" : 0};
`;

const Button = styled.Pressable`
  // background-color: red;
  padding: 6% 4%;
  margin: 1%;
`;

export default function Cuenta({ setIsAuthenticated }) {
  const [option, setOption] = useState(null);
  const user = useSelector((state) => state.userInfo);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => setOption(null);

      return () => unsubscribe();
    }, [])
  );

  return (
    <>
      <NavBar titulo="Cuenta" />
      <Container>
        {!option && (
          <View>
            <Button onPress={() => setOption("ajustes")}>
              <Text>Ajustes de Perfil</Text>
            </Button>

            <Button onPress={() => setOption("historial")}>
              <Text>Historial de Compras</Text>
            </Button>

            <Button onPress={() => setOption("reseñas")}>
              <Text>Mis Reseñas</Text>
            </Button>

            {/* <Button onPress={() => setOption("notificaciones")}>
              <Text>Notificaciones</Text>
            </Button>

            <Button onPress={() => setOption("seguridad")}>
              <Text>Seguridad</Text>
            </Button> */}

            <Button onPress={() => setOption("contacto")}>
              <Text>Contacto</Text>
            </Button>

            <Button onPress={() => setIsAuthenticated(false)}>
              <Text>Cerrar Sesión</Text>
            </Button>
          </View>
        )}

        {option === "ajustes" && <Ajustes setOption={setOption} />}
        {option === "historial" && <Historial setOption={setOption} />}
        {option === "reseñas" && <Reseñas setOption={setOption} />}
        {option === "notificaciones" && (
          <Notificaciones setOption={setOption} />
        )}
        {/* {option === "seguridad" && <Seguridad setOption={setOption} />} */}
        {option === "contacto" && <Contacto setOption={setOption} />}
      </Container>
    </>
  );
}
