import React, { useEffect, useState, useCallback } from "react";
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

const Container = styled.View`
  display: flex;
  justify-content: center;
  margin-top: ${Platform.OS === "ios" ? "10%" : 0};
`;

const Button = styled.Pressable`
  // background-color: red;
  padding: 6% 4%;
  margin: 1%;
`;

export default function Cuenta({ setIsAuthenticated }) {
  const [option, setOption] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => setOption(null);

      return () => unsubscribe();
    }, [])
  );

  return (
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

          {/* <Button onPress={() => setOption("favoritos")}>
            <Text>Favoritos</Text>
          </Button> */}

          <Button onPress={() => setOption("notificaciones")}>
            <Text>Notificaciones</Text>
          </Button>

          <Button onPress={() => setOption("seguridad")}>
            <Text>Seguridad</Text>
          </Button>

          <Button onPress={() => setOption("contacto")}>
            <Text>Contacto</Text>
          </Button>

          <Button onPress={() => setIsAuthenticated(false)}>
            <Text>Cerrar Sesión</Text>
          </Button>
        </View>
      )}

      {option === "ajustes" && <Ajustes />}

      {option === "historial" && <Historial />}

      {option === "reseñas" && <Reseñas />}

      {/* {option === "favoritos" && <Text>favoritos</Text>} */}

      {option === "notificaciones" && <Notificaciones />}

      {option === "seguridad" && <Seguridad />}

      {option === "contacto" && <Contacto />}

      {/* {option === "cerrar sesión" && <Ajustes/>} */}
    </Container>
  );
}
