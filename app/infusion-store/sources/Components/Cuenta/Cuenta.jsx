import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components/native";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View } from "react-native";

const Container = styled.View`
  padding-top: 10%;
`;

const Button = styled.Pressable`
  padding-top: 10%;
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

          <Button onPress={() => setOption("favoritos")}>
            <Text>Favoritos</Text>
          </Button>

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

      {option === "ajustes" && <Text>Ajustes</Text>}

      {option === "historial" && <Text>historial</Text>}

      {option === "reseñas" && <Text>reseñas</Text>}

      {option === "favoritos" && <Text>favoritos</Text>}

      {option === "notificaciones" && <Text>notificaciones</Text>}

      {option === "seguridad" && <Text>seguridad</Text>}

      {option === "contacto" && <Text>contacto</Text>}

      {option === "cerrar sesión" && <Text>cerrar sesión</Text>}
    </Container>
  );
}
